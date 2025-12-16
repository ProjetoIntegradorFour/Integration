package com.libapp.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping; // Changed from PutMapping
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libapp.backend.entity.Catalog;
import com.libapp.backend.entity.Copy;
import com.libapp.backend.exception.ResourceNotFoundException;
import com.libapp.backend.service.CatalogService;
import com.libapp.backend.service.CopyService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin/catalog")
@CrossOrigin
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminCatalogController {

    private final CatalogService catalogService;
    private final CopyService copyService;

    public AdminCatalogController(CatalogService catalogService, CopyService copyService) {
        this.catalogService = catalogService;
        this.copyService = copyService;
    }

    @PostMapping("/fetch/{isbn}")
    public ResponseEntity<Catalog> fetchAndInsert(@PathVariable String isbn) {
        Catalog catalog = catalogService.fetchFromIsbnApi(isbn);
        return ResponseEntity.status(HttpStatus.CREATED).body(catalog);
    }

    @PostMapping("/{isbn}/copies")
    public ResponseEntity<Copy> addCopy(@PathVariable String isbn, @Valid @RequestBody Copy copy) {
        Catalog catalog = catalogService.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Catalog", "ISBN", isbn));
        copy.setCatalog(catalog);
        Copy savedCopy = copyService.save(copy);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCopy);
    }

    @PostMapping
    public ResponseEntity<Catalog> create(@Valid @RequestBody Catalog catalog) {
        Catalog savedCatalog = catalogService.save(catalog);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCatalog);
    }

    @PatchMapping("/{isbn}")
    public ResponseEntity<Catalog> updatePartial(@PathVariable String isbn, @RequestBody Catalog catalogUpdates) {
        Catalog existingCatalog = catalogService.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Catalog", "ISBN", isbn));
        Catalog updatedCatalog = catalogService.applyPartialUpdates(existingCatalog, catalogUpdates);
        Catalog savedCatalog = catalogService.save(updatedCatalog);
        return ResponseEntity.ok(savedCatalog);
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<Void> delete(@PathVariable String isbn) {
        catalogService.delete(isbn);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{isbn}/copies")
    public ResponseEntity<List<Copy>> listCopies(@PathVariable String isbn) {
        catalogService.findByIsbn(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Catalog", "ISBN", isbn));

        List<Copy> copies = copyService.findByIsbn(isbn);
        return ResponseEntity.ok(copies);
    }
}