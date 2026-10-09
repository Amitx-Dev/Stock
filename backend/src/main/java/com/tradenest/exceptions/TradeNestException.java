package com.tradenest.exceptions;

/**
 * Base checked exception class for all TradeNest domain errors.
 * Demonstrates Custom Exception Handling in Java OOP.
 */
public class TradeNestException extends Exception {
    private final String errorCode;

    public TradeNestException(String message) {
        super(message);
        this.errorCode = "TRADE_ERROR";
    }

    public TradeNestException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public TradeNestException(String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
