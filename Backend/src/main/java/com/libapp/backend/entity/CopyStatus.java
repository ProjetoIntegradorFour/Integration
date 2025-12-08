package com.libapp.backend.entity;

public enum CopyStatus {
    AVAILABLE,
    LOANED,
    RESERVED,
    LOST;

    public boolean isAvailable() {
        return this == AVAILABLE;
    }
}
