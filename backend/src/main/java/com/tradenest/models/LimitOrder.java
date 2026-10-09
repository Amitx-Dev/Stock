package com.tradenest.models;

import com.tradenest.exceptions.InvalidOrderException;
import com.tradenest.exceptions.TradeNestException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Concrete implementation of a Limit Order with specified threshold trigger price.
 * Demonstrates Polymorphism alongside MarketOrder.
 */
public class LimitOrder extends Order {
    private double limitPrice;
    private static final double BROKERAGE_FLAT = 20.0;

    public LimitOrder() {
        super();
    }

    public LimitOrder(String id, String userId, String symbol, String orderType, int quantity, double limitPrice, String createdAt) {
        super(id, userId, symbol, orderType, quantity, limitPrice, createdAt);
        this.limitPrice = limitPrice;
    }

    public double getLimitPrice() {
        return limitPrice;
    }

    public void setLimitPrice(double limitPrice) {
        this.limitPrice = limitPrice;
        this.executionPrice = limitPrice;
    }

    @Override
    public double calculateBrokerage() {
        // Flat ₹20 delivery/intraday limit order tariff
        return BROKERAGE_FLAT;
    }

    @Override
    public double calculateTotalValue() {
        double gross = quantity * limitPrice;
        if ("BUY".equalsIgnoreCase(orderType)) {
            return gross + calculateBrokerage();
        } else {
            return Math.max(0.0, gross - calculateBrokerage());
        }
    }

    @Override
    public void execute(Connection conn) throws TradeNestException, SQLException {
        if (quantity <= 0) {
            throw new InvalidOrderException("Limit order quantity must be greater than zero.");
        }
        if (limitPrice <= 0) {
            throw new InvalidOrderException("Limit price must be greater than zero.");
        }

        String sql = "INSERT INTO trades (id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            stmt.setString(2, userId);
            stmt.setString(3, symbol);
            stmt.setString(4, orderType.toUpperCase());
            stmt.setInt(5, quantity);
            stmt.setDouble(6, limitPrice);
            stmt.setDouble(7, calculateTotalValue());
            stmt.setDouble(8, 0.0);
            stmt.setDouble(9, 0.0);
            stmt.setString(10, "Pending Limit");
            stmt.executeUpdate();
            this.status = "Pending Limit";
        }
    }
}
