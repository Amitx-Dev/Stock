package com.tradenest.models;

/**
 * Price Alert Trigger Entity.
 * Inherits from AbstractEntity.
 */
public class Alert extends AbstractEntity {
    private String userId;
    private String symbol;
    private String conditionType; // 'ABOVE' or 'BELOW'
    private double targetPrice;
    private String status;         // 'ACTIVE', 'TRIGGERED', 'PAUSED'

    public Alert() {
        super();
    }

    public Alert(String id, String userId, String symbol, String conditionType, double targetPrice, String status, String createdAt) {
        super(id, createdAt);
        this.userId = userId;
        this.symbol = symbol;
        this.conditionType = conditionType;
        this.targetPrice = targetPrice;
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

    public String getConditionType() {
        return conditionType;
    }

    public void setConditionType(String conditionType) {
        this.conditionType = conditionType;
    }

    public double getTargetPrice() {
        return targetPrice;
    }

    public void setTargetPrice(double targetPrice) {
        this.targetPrice = targetPrice;
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
            "{\"id\":\"%s\",\"userId\":\"%s\",\"symbol\":\"%s\",\"conditionType\":\"%s\",\"targetPrice\":%.2f,\"status\":\"%s\",\"createdAt\":\"%s\"}",
            escape(id), escape(userId), escape(symbol), escape(conditionType), targetPrice, escape(status), escape(createdAt)
        );
    }
}
