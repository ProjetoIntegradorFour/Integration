package com.libapp.backend.dto;

public record CatalogSummaryDTO(
    String isbn,
    String title,
    String author,
    String cover,
    Long availableCopies
) {}