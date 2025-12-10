package com.libapp.backend.dto;

import java.util.List;

public record CatalogSummaryDTO(
        String isbn,
        String title,
        String author,
        String cover,
        List<String> genres,
        Long availableCopies
        ) {

}
