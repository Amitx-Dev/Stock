package com.tradenest.exceptions;

/**
 * Thrown when a specified stock ticker symbol does not exist in the platform registry.
 */
public class StockNotFoundException extends TradeNestException {
    private final String symbol;

    public StockNotFoundException(String symbol) {
        super("STOCK_NOT_FOUND", "Stock instrument with symbol '" + symbol + "' was not found.");
        this.symbol = symbol;
    }

    public String getSymbol() {
        return symbol;
    }
}
