package com.tradenest.models;

import com.tradenest.interfaces.OrderExecutable;

/**
 * Abstract Base Class for Financial Orders.
 * Demonstrates Inheritance and Polymorphism in Java OOP.
 */
public abstract class Order extends AbstractEntity implements OrderExecutable {
    protected String userId;
    protected String symbol;
    protected String orderType; // 'BUY' or 'SELL'
    protected int quantity;
    protected double executionPrice;
    protected String status;     // 'Pending', 'Executed', 'Cancelled', 'Rejected'

    public Order() {
        super();
    }

    public Order(String id, String userId, String symbol, String orderType, int quantity, double executionPrice, String createdAt) {
        super(id, createdAt);
        this.userId = userId;
        this.symbol = symbol;
        this.orderType = orderType;
        this.quantity = quantity;
        this.executionPrice = executionPrice;
        this.status = "Pending";
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

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getExecutionPrice() {
        return executionPrice;
    }

    public void setExecutionPrice(double executionPrice) {
        this.executionPrice = executionPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getGrossAmount() {
        return quantity * executionPrice;
    }

    /**
     * Polymorphic method to calculate total financial consideration including fees.
     */
    public abstract double calculateTotalValue();

    @Override
    public String toJson() {
        return String.format(
            "{\"id\":\"%s\",\"userId\":\"%s\",\"symbol\":\"%s\",\"type\":\"%s\",\"quantity\":%d,\"price\":%.2f,\"status\":\"%s\",\"createdAt\":\"%s\",\"brokerage\":%.2f,\"totalValue\":%.2f}",
            escape(id), escape(userId), escape(symbol), escape(orderType), quantity, executionPrice, escape(status), escape(createdAt), calculateBrokerage(), calculateTotalValue()
        );
    }
}
