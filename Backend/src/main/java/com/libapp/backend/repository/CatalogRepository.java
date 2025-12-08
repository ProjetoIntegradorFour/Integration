package com.libapp.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.libapp.backend.dto.CatalogSummaryDTO;
import com.libapp.backend.entity.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

    Optional<Catalog> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

    void deleteByIsbn(String isbn);

    @Query(value = """
        SELECT new com.libapp.backend.dto.CatalogSummaryDTO(
            c.isbn,
            c.title,
            c.authors,
            c.coverUrl,
            (SELECT COUNT(cp) FROM Copy cp 
             WHERE cp.catalog.isbn = c.isbn 
             AND cp.status = 'AVAILABLE')
        )
        FROM Catalog c
        WHERE (:query IS NULL OR :query = '' OR
               LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR 
               c.isbn LIKE CONCAT('%', :query, '%'))
    """,
            countQuery = """
        SELECT COUNT(c) FROM Catalog c
        WHERE (:query IS NULL OR :query = '' OR
               LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR 
               c.isbn LIKE CONCAT('%', :query, '%'))
    """)
    Page<CatalogSummaryDTO> findCatalogSummariesWithSearchAndPagination(
            @Param("query") String query,
            Pageable pageable
    );

}
