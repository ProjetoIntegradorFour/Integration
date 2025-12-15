package com.libapp.backend.service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.libapp.backend.dto.CatalogSummaryDTO;
import com.libapp.backend.entity.Catalog;
import com.libapp.backend.exception.ValidationException;
import com.libapp.backend.repository.CatalogRepository;

@Service
@Transactional
public class CatalogService {

    private static final Logger log = LoggerFactory.getLogger(CatalogService.class);

    private final CatalogRepository catalogRepository;
    private final IsbnLookupService isbnLookupService;
    private final CopyService copyService;

    public CatalogService(CatalogRepository catalogRepository, IsbnLookupService isbnLookupService,
            CopyService copyService) {
        this.catalogRepository = catalogRepository;
        this.isbnLookupService = isbnLookupService;
        this.copyService = copyService;
    }

    public List<Catalog> findAll() {
        return catalogRepository.findAll();
    }

    public Optional<Catalog> findByIsbn(String isbn) {
        return catalogRepository.findByIsbn(isbn);
    }

    public Catalog save(Catalog catalog) {
        return catalogRepository.save(catalog);
    }

    public void delete(String isbn) {
        catalogRepository.deleteByIsbn(isbn);
    }

    public Catalog fetchFromIsbnApi(String isbn) {
        if (isbn == null || isbn.trim().isEmpty()) {
            throw new ValidationException("isbn", "ISBN não pode ser vazio", "ISBN_EMPTY");
        }

        String cleanIsbn = isbn.replaceAll("[^0-9]", "");
        if (cleanIsbn.length() != 10 && cleanIsbn.length() != 13) {
            throw new ValidationException("isbn", "ISBN deve ter 10 ou 13 dígitos", "ISBN_INVALID");
        }

        if (catalogRepository.existsByIsbn(isbn)) {
            throw new ValidationException("isbn",
                    "Catálogo com ISBN " + isbn + " já existe", "ISBN_DUPLICATE");
        }

        Catalog metadata = isbnLookupService.fetchMetadata(isbn);
        return catalogRepository.save(metadata);
    }

    public Catalog applyPartialUpdates(Catalog existingCatalog, Catalog updates) {
        if (updates.getTitle() != null) {
            existingCatalog.setTitle(updates.getTitle());
        }

        if (updates.getTitlePt() != null) {
            existingCatalog.setTitlePt(updates.getTitlePt());
        }

        if (updates.getAuthors() != null) {
            existingCatalog.setAuthors(updates.getAuthors());
        }

        if (updates.getPublisher() != null) {
            existingCatalog.setPublisher(updates.getPublisher());
        }

        if (updates.getPublishedDate() != null) {
            existingCatalog.setPublishedDate(updates.getPublishedDate());
        }

        if (updates.getLanguage() != null) {
            existingCatalog.setLanguage(updates.getLanguage());
        }

        if (updates.getCoverUrl() != null) {
            existingCatalog.setCoverUrl(updates.getCoverUrl());
        }

        if (updates.getDescription() != null) {
            existingCatalog.setDescription(updates.getDescription());
        }

        if (updates.getGenres() != null) {
            existingCatalog.setGenres(updates.getGenres());
        }

        existingCatalog.setIsAdminOverridden(updates.isIsAdminOverridden());

        return existingCatalog;
    }

    public Page<CatalogSummaryDTO> findPublicCatalog(String query, Pageable pageable) {
        String safeQuery = (query != null && !query.trim().isEmpty()) ? query.trim() : null;

        Page<Catalog> catalogPage = catalogRepository.findByQueryWithPagination(safeQuery, pageable);

        return catalogPage.map(catalog -> {
            Long availableCopies = copyService.countAvailableCopies(catalog.getIsbn());

            List<String> genres;
            String genresString = catalog.getGenres();
            if (genresString != null && !genresString.trim().isEmpty()) {
                genres = Arrays.asList(genresString.split("\\s*,\\s*"));
            } else {
                genres = Collections.emptyList();
            }

            return new CatalogSummaryDTO(
                    catalog.getIsbn(),
                    catalog.getTitle(),
                    catalog.getAuthors(),
                    catalog.getCoverUrl(),
                    genres,
                    availableCopies);
        });
    }
}