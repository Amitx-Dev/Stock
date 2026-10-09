package com.tradenest.exceptions;

/**
 * Thrown when an order contains invalid parameters (e.g., non-positive quantity or price).
 */
public class InvalidOrderException extends TradeNestException {
    public InvalidOrderException(String message) {
        super("INVALID_ORDER", message);
    }
}
