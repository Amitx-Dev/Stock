package com.tradenest.models;

import com.tradenest.exceptions.InvalidOrderException;
import com.tradenest.exceptions.TradeNestException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * Concrete implementation of a Market Order executed at prevailing spot market rate.
 * Polymorphically overrides calculateBrokerage() and execute().
 */
public class MarketOrder extends Order {
    private static final double BROKERAGE_FLAT = 20.0;
    private static final double BROKERAGE_RATE = 0.0005; // 0.05%

    public MarketOrder() {
        super();
    }

    public MarketOrder(String id, String userId, String symbol, String orderType, int quantity, double spotPrice, String createdAt) {
        super(id, userId, symbol, orderType, quantity, spotPrice, createdAt);
    }

    @Override
    public double calculateBrokerage() {
        // Upstox / TradeNest formula: Min(0.05% of turnover, ₹20)
        double turnover = getGrossAmount();
        double calculated = turnover * BROKERAGE_RATE;
        return Math.min(calculated, BROKERAGE_FLAT);
    }

    @Override
    public double calculateTotalValue() {
        if ("BUY".equalsIgnoreCase(orderType)) {
            return getGrossAmount() + calculateBrokerage();
        } else {
            return Math.max(0.0, getGrossAmount() - calculateBrokerage());
        }
    }

    @Override
    public void execute(Connection conn) throws TradeNestException, SQLException {
        if (quantity <= 0) {
            throw new InvalidOrderException("Market order quantity must be greater than zero.");
        }
        if (executionPrice <= 0) {
            throw new InvalidOrderException("Market order execution price must be positive.");
        }

        // Record trade row in database
        String sql = "INSERT INTO trades (id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, id);
            stmt.setString(2, userId);
            stmt.setString(3, symbol);
            stmt.setString(4, orderType.toUpperCase());
            stmt.setInt(5, quantity);
            stmt.setDouble(6, executionPrice);
            stmt.setDouble(7, calculateTotalValue());
            stmt.setDouble(8, 0.0);
            stmt.setDouble(9, 0.0);
            stmt.setString(10, "Executed");
            stmt.executeUpdate();
            this.status = "Executed";
        }
    }
}
