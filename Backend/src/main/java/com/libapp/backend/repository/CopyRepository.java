package com.libapp.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.libapp.backend.entity.Copy;
import com.libapp.backend.entity.CopyStatus;

public interface CopyRepository extends JpaRepository<Copy, Long> {

    List<Copy> findByCatalogIsbn(String isbn);

    List<Copy> findByCatalogIsbnAndStatus(String isbn, CopyStatus status);

    long countByCatalogIsbnAndStatus(String isbn, CopyStatus status);

    void deleteByCatalogIsbn(String isbn);

    void deleteByIdIn(List<Long> ids);

}
