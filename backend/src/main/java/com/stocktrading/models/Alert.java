package com.stocktrading.models;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Alert {
    private int id;
    private int userId;
    private int stockId;
    private BigDecimal targetPrice;
    private String condition; // "ABOVE" or "BELOW"
    private String status;    // "ACTIVE" or "TRIGGERED"
    private Timestamp createdAt;

    // Joined fields
    private String symbol;
    private String companyName;
    private BigDecimal currentPrice;

    public Alert() {}

    public Alert(int id, int userId, int stockId, BigDecimal targetPrice, String condition, String status, Timestamp createdAt) {
        this.id = id;
        this.userId = userId;
        this.stockId = stockId;
        this.targetPrice = targetPrice;
        this.condition = condition;
        this.status = status;
        this.createdAt = createdAt;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public int getStockId() { return stockId; }
    public void setStockId(int stockId) { this.stockId = stockId; }

    public BigDecimal getTargetPrice() { return targetPrice; }
    public void setTargetPrice(BigDecimal targetPrice) { this.targetPrice = targetPrice; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }

    public String getSymbol() { return symbol; }
    public void setSymbol(String symbol) { this.symbol = symbol; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public BigDecimal getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(BigDecimal currentPrice) { this.currentPrice = currentPrice; }
}
