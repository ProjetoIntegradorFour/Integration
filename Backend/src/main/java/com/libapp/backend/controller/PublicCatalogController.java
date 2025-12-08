package com.libapp.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.libapp.backend.dto.CatalogSummaryDTO;
import com.libapp.backend.service.CatalogService;

@RestController
@RequestMapping("/catalog")
@CrossOrigin
public class PublicCatalogController {

    private final CatalogService catalogService;

    public PublicCatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping
    public Page<CatalogSummaryDTO> getPublicCatalog(
            @RequestParam(required = false) String query,
            Pageable pageable
    ) {
        return catalogService.findPublicCatalog(query, pageable);
    }

}
