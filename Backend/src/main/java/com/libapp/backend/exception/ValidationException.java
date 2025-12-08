package com.libapp.backend.exception;

public class ValidationException extends RuntimeException {

    private final String field;
    private final String errorCode;

    public ValidationException(String message) {
        super(message);
        this.field = null;
        this.errorCode = null;
    }

    public ValidationException(String field, String message, String errorCode) {
        super(message);
        this.field = field;
        this.errorCode = errorCode;
    }

    public String getField() {
        return field;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
