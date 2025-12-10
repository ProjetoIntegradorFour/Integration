package com.libapp.backend.dto;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.libapp.backend.entity.Catalog;

public class CatalogDetailsResponse {

    private String isbn;
    private String title;
    private String titlePt;
    private String authors;
    private String publisher;
    private String publishedDate;
    private String language;
    private String coverUrl;
    private String description;

    private List<String> genres;

    private long availableCopies;

    public CatalogDetailsResponse(Catalog catalog, long availableCopies) {
        this.isbn = catalog.getIsbn();
        this.title = catalog.getTitle();
        this.titlePt = catalog.getTitlePt();
        this.authors = catalog.getAuthors();
        this.publisher = catalog.getPublisher();
        this.publishedDate = catalog.getPublishedDate();
        this.language = catalog.getLanguage();
        this.coverUrl = catalog.getCoverUrl();
        this.description = catalog.getDescription();
        this.availableCopies = availableCopies;

        String genresString = catalog.getGenres();
        if (genresString != null && !genresString.trim().isEmpty()) {
            this.genres = Arrays.asList(genresString.split("\\s*,\\s*"));
        } else {
            this.genres = Collections.emptyList();
        }
    }

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTitlePt() {
        return titlePt;
    }

    public void setTitlePt(String titlePt) {
        this.titlePt = titlePt;
    }

    public String getAuthors() {
        return authors;
    }

    public void setAuthors(String authors) {
        this.authors = authors;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(String publishedDate) {
        this.publishedDate = publishedDate;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public long getAvailableCopies() {
        return availableCopies;
    }

    public void setAvailableCopies(long availableCopies) {
        this.availableCopies = availableCopies;
    }

}
