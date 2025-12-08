package com.libapp.backend.service;

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

    public CatalogService(CatalogRepository catalogRepository, IsbnLookupService isbnLookupService) {
        this.catalogRepository = catalogRepository;
        this.isbnLookupService = isbnLookupService;
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

    public Page<CatalogSummaryDTO> findPublicCatalog(String query, Pageable pageable) {
        String safeQuery = (query != null && !query.trim().isEmpty()) ? query.trim() : null;
        return catalogRepository.findCatalogSummariesWithSearchAndPagination(safeQuery, pageable);
    }
}
