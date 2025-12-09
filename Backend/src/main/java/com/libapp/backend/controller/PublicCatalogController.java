package com.libapp.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.libapp.backend.dto.CatalogDetailsResponse;
import com.libapp.backend.dto.CatalogSummaryDTO;
import com.libapp.backend.entity.Catalog;
import com.libapp.backend.service.CatalogService;
import com.libapp.backend.service.CopyService;

@RestController
@RequestMapping("/catalog")
@CrossOrigin
public class PublicCatalogController {

    private final CatalogService catalogService;
    private final CopyService copyService;

    public PublicCatalogController(CatalogService catalogService, CopyService copyService) {
        this.catalogService = catalogService;
        this.copyService = copyService;
    }

    @GetMapping
    public Page<CatalogSummaryDTO> getPublicCatalog(
            @RequestParam(required = false) String query,
            Pageable pageable
    ) {
        return catalogService.findPublicCatalog(query, pageable);
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<CatalogDetailsResponse> getBookDetails(@PathVariable String isbn) {
        Catalog catalog = catalogService.findByIsbn(isbn)
                .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Catalog not found for ISBN: " + isbn
        ));

        long availableCopies = copyService.countAvailableCopies(isbn);

        CatalogDetailsResponse response = new CatalogDetailsResponse(catalog, availableCopies);

        return ResponseEntity.ok(response);
    }

}
