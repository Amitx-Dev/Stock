package com.tradenest.models;

/**
 * Trade execution log entity representing executed transactions.
 * Inherits from AbstractEntity.
 */
public class Trade extends AbstractEntity {
    private String userId;
    private String symbol;
    private String tradeType; // 'BUY' or 'SELL'
    private int quantity;
    private double price;
    private double total;
    private double pnl;
    private double pnlPercent;
    private String status;

    public Trade() {
        super();
    }

    public Trade(String id, String userId, String symbol, String tradeType, int quantity,
                 double price, double total, double pnl, double pnlPercent, String status, String createdAt) {
        super(id, createdAt);
        this.userId = userId;
        this.symbol = symbol;
        this.tradeType = tradeType;
        this.quantity = quantity;
        this.price = price;
        this.total = total;
        this.pnl = pnl;
        this.pnlPercent = pnlPercent;
        this.status = status;
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

    public String getTradeType() {
        return tradeType;
    }

    public void setTradeType(String tradeType) {
        this.tradeType = tradeType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public double getPnl() {
        return pnl;
    }

    public void setPnl(double pnl) {
        this.pnl = pnl;
    }

    public double getPnlPercent() {
        return pnlPercent;
    }

    public void setPnlPercent(double pnlPercent) {
        this.pnlPercent = pnlPercent;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toJson() {
        return String.format(
            "{\"id\":\"%s\",\"userId\":\"%s\",\"symbol\":\"%s\",\"type\":\"%s\",\"quantity\":%d,\"price\":%.2f,\"total\":%.2f,\"pnl\":%.2f,\"pnlPercent\":%.2f,\"status\":\"%s\",\"timestamp\":\"%s\"}",
            escape(id), escape(userId), escape(symbol), escape(tradeType), quantity, price, total, pnl, pnlPercent, escape(status), escape(createdAt)
        );
    }
}
