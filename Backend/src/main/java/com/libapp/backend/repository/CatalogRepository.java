package com.libapp.backend.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.libapp.backend.entity.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, Long> {

    Optional<Catalog> findByIsbn(String isbn);

    boolean existsByIsbn(String isbn);

    void deleteByIsbn(String isbn);

    @Query(value = """
        SELECT c
        FROM Catalog c
        WHERE (:query IS NULL OR :query = '' OR
               LOWER(c.title) LIKE LOWER(CONCAT('%', :query, '%')) OR 
               c.isbn LIKE CONCAT('%', :query, '%'))
    """)
    Page<Catalog> findByQueryWithPagination(
            @Param("query") String query,
            Pageable pageable
    );

}
