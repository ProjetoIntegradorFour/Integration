package com.libapp.backend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.libapp.backend.entity.Catalog;
import com.libapp.backend.exception.ResourceNotFoundException;

@Service
public class IsbnLookupService {

    private static final Logger log = LoggerFactory.getLogger(IsbnLookupService.class);

    private final RestTemplate restTemplate = new RestTemplate();

    public Catalog fetchMetadata(String isbn) {
        log.info("Fetching metadata for ISBN: {}", isbn);

        try {
            String url = "https://openlibrary.org/api/books?bibkeys=ISBN:" + isbn + "&format=json&jscmd=details";

            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response == null || response.isEmpty()) {
                throw new ResourceNotFoundException("Book metadata not found for ISBN in OpenLibrary: " + isbn);
            }

            String isbnKey = "ISBN:" + isbn;

            if (!response.containsKey(isbnKey)) {
                throw new ResourceNotFoundException("Book metadata not found for ISBN in OpenLibrary: " + isbn);
            }

            Map<String, Object> bookEntry = (Map<String, Object>) response.get(isbnKey);
            Map<String, Object> detailsMap = (Map<String, Object>) bookEntry.get("details");

            if (detailsMap == null || detailsMap.isEmpty()) {
                log.warn("ISBN {} found, but 'details' map is missing or empty.", isbn);
                return createFallbackCatalog(isbn);
            }

            return mapResponseToCatalog(isbn, detailsMap);

        } catch (HttpClientErrorException.NotFound e) {
            log.warn("ISBN {} not found in OpenLibrary. Status: 404 Not Found.", isbn);
            throw new ResourceNotFoundException("Book metadata not found for ISBN in OpenLibrary: " + isbn);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error fetching metadata for ISBN {}: {}", isbn, e.getMessage(), e);
            return createFallbackCatalog(isbn);
        }
    }

    private Catalog mapResponseToCatalog(String isbn, Map<String, Object> data) {
        Catalog catalog = new Catalog();
        catalog.setIsbn(isbn);

        String title = (String) data.get("title");
        catalog.setTitle(title != null ? title : "Título Desconhecido");

        catalog.setAuthors(extractAuthors(data));

        List<String> publishers = (List<String>) data.get("publishers");
        catalog.setPublisher(publishers != null && !publishers.isEmpty()
                ? String.join(", ", publishers)
                : "Editora Desconhecida");

        String publishDate = (String) data.get("publish_date");
        catalog.setPublishedDate(publishDate != null ? publishDate : "Data Desconhecida");

        List<Map<String, String>> languages = (List<Map<String, String>>) data.get("languages");
        if (languages != null && !languages.isEmpty()) {
            String langKey = languages.get(0).get("key");
            catalog.setLanguage(langKey != null && langKey.contains("/por") ? "pt" : "en");
        } else {
            catalog.setLanguage("en");
        }

        catalog.setCoverUrl("https://covers.openlibrary.org/b/isbn/" + isbn + "-L.jpg");

        Object descriptionObject = data.get("description");
        String description = null;
        if (descriptionObject instanceof String) {
            description = (String) descriptionObject;
        } else if (descriptionObject instanceof Map) {
            description = (String) ((Map<String, Object>) descriptionObject).get("value");
        }

        catalog.setDescription(description != null ? description : "Sem descrição disponível");

        List<String> subjects = (List<String>) data.get("subjects");
        if (subjects != null && !subjects.isEmpty()) {
            catalog.setGenres(String.join(", ", subjects));
        } else {
            catalog.setGenres(null);
        }

        catalog.setLastSyncedAt(LocalDateTime.now());

        return catalog;
    }

    private String extractAuthors(Map<String, Object> data) {
        try {
            List<Map<String, String>> authorKeys = (List<Map<String, String>>) data.get("authors");
            if (authorKeys != null && !authorKeys.isEmpty()) {

                List<String> keys = authorKeys.stream()
                        .map(a -> a.get("key"))
                        .filter(Objects::nonNull)
                        .collect(Collectors.toList());

                String authors = keys.stream()
                        .map(this::fetchAuthorName)
                        .filter(name -> name != null && !name.isEmpty())
                        .collect(Collectors.joining(", "));

                if (!authors.isEmpty()) {
                    return authors;
                }
            }

            String byStatement = (String) data.get("by_statement");
            if (byStatement != null) {
                return byStatement;
            }

        } catch (Exception e) {
            log.debug("Could not parse authors", e);
        }
        return "Autor Desconhecido";
    }

    private String fetchAuthorName(String authorKey) {
        try {
            String authorUrl = "https://openlibrary.org" + authorKey + ".json";

            Map<String, Object> authorResponse = restTemplate.getForObject(authorUrl, Map.class);

            if (authorResponse != null && authorResponse.containsKey("name")) {
                return (String) authorResponse.get("name");
            }
        } catch (HttpClientErrorException.NotFound e) {
            log.warn("Author key {} not found.", authorKey);
        } catch (Exception e) {
            log.error("Error fetching author name for key {}: {}", authorKey, e.getMessage());
        }
        return null;
    }

    private Catalog createFallbackCatalog(String isbn) {
        Catalog catalog = new Catalog();
        catalog.setIsbn(isbn);
        catalog.setTitle("Livro não encontrado - ISBN: " + isbn);
        catalog.setAuthors("Desconhecido");
        catalog.setPublisher("Desconhecida");
        catalog.setLanguage("pt");
        catalog.setCoverUrl(null);
        catalog.setLastSyncedAt(LocalDateTime.now());
        catalog.setDescription("Falha ao buscar metadados do OpenLibrary. Título e dados inseridos manualmente.");
        catalog.setGenres(null);
        return catalog;
    }
}