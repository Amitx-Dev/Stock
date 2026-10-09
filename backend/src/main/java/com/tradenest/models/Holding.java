package com.tradenest.models;

/**
 * Portfolio Holding Entity representing securities held in demat account.
 * Inherits from AbstractEntity.
 */
public class Holding extends AbstractEntity {
    private String userId;
    private String symbol;
    private int quantity;
    private double avgPrice;
    private String sector;

    public Holding() {
        super();
    }

    public Holding(String id, String userId, String symbol, int quantity, double avgPrice, String sector) {
        super(id, null);
        this.userId = userId;
        this.symbol = symbol;
        this.quantity = quantity;
        this.avgPrice = avgPrice;
        this.sector = sector;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(double avgPrice) {
        this.avgPrice = avgPrice;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    @Override
    public String toJson() {
        return String.format(
            "{\"id\":\"%s\",\"userId\":\"%s\",\"symbol\":\"%s\",\"quantity\":%d,\"avgPrice\":%.2f,\"sector\":\"%s\"}",
            escape(id), escape(userId), escape(symbol), quantity, avgPrice, escape(sector)
        );
    }
}
