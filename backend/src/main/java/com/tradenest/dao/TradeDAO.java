package com.tradenest.dao;

import com.tradenest.exceptions.DatabaseException;
import com.tradenest.exceptions.TradeNestException;
import com.tradenest.interfaces.GenericDAO;
import com.tradenest.models.Trade;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Trade transactions.
 * Features robust JDBC Transaction Management (setAutoCommit(false), commit, rollback).
 * Implements GenericDAO<Trade, String>.
 */
public class TradeDAO extends BaseDAO<Trade> implements GenericDAO<Trade, String> {

    @Override
    public List<Trade> findAll() throws DatabaseException {
        List<Trade> list = new ArrayList<>();
        String sql = "SELECT id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status, created_at " +
                     "FROM trades ORDER BY created_at DESC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(mapRow(rs));
            }
            return list;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch all trades from database", e);
        }
    }

    @Override
    public Optional<Trade> findById(String id) throws DatabaseException {
        String sql = "SELECT id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status, created_at " +
                     "FROM trades WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch trade by id: " + id, e);
        }
    }

    public List<Trade> findByUserId(String userId) throws DatabaseException {
        List<Trade> list = new ArrayList<>();
        String sql = "SELECT id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status, created_at " +
                     "FROM trades WHERE user_id = ? ORDER BY created_at DESC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    list.add(mapRow(rs));
                }
            }
            return list;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch trades for user: " + userId, e);
        }
    }

    @Override
    public boolean create(Trade trade) throws DatabaseException {
        // Execute trade wrapped in an ACID JDBC Transaction
        return executeTradeTransaction(trade);
    }

    /**
     * Executes a trade transaction atomically.
     * Demonstrates JDBC Transactions: setAutoCommit(false), commit(), rollback().
     */
    public boolean executeTradeTransaction(Trade trade) throws DatabaseException {
        Connection conn = null;
        try {
            conn = getConnection();
            // 1. Begin atomic transaction boundary
            conn.setAutoCommit(false);

            // Generate ID if missing
            if (trade.getId() == null || trade.getId().isEmpty()) {
                trade.setId("TRD-" + (1000 + (int)(Math.random() * 9000)));
            }

            // 2. Insert trade record into trades table
            String insertTradeSql = "INSERT INTO trades (id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status) " +
                                    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            try (PreparedStatement psTrade = conn.prepareStatement(insertTradeSql)) {
                psTrade.setString(1, trade.getId());
                psTrade.setString(2, trade.getUserId());
                psTrade.setString(3, trade.getSymbol());
                psTrade.setString(4, trade.getTradeType().toUpperCase());
                psTrade.setInt(5, trade.getQuantity());
                psTrade.setDouble(6, trade.getPrice());
                psTrade.setDouble(7, trade.getTotal());
                psTrade.setDouble(8, trade.getPnl());
                psTrade.setDouble(9, trade.getPnlPercent());
                psTrade.setString(10, trade.getStatus() != null ? trade.getStatus() : "Executed");
                psTrade.executeUpdate();
            }

            // 3. Update or Insert into holdings table based on trade type
            if ("BUY".equalsIgnoreCase(trade.getTradeType())) {
                updateHoldingOnBuy(conn, trade.getUserId(), trade.getSymbol(), trade.getQuantity(), trade.getPrice());
            } else if ("SELL".equalsIgnoreCase(trade.getTradeType())) {
                updateHoldingOnSell(conn, trade.getUserId(), trade.getSymbol(), trade.getQuantity());
            }

            // 4. Update user's trade count
            String updateCountSql = "UPDATE users SET trades_count = trades_count + 1 WHERE id = ?";
            try (PreparedStatement psUser = conn.prepareStatement(updateCountSql)) {
                psUser.setString(1, trade.getUserId());
                psUser.executeUpdate();
            }

            // 5. Commit atomic transaction
            conn.commit();
            return true;

        } catch (SQLException e) {
            // Rollback on any failure to maintain database consistency
            rollbackQuietly(conn);
            throw new DatabaseException("Transaction failed and was rolled back", e);
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException ignored) {
                }
            }
        }
    }

    private void updateHoldingOnBuy(Connection conn, String userId, String symbol, int qty, double price) throws SQLException {
        String querySql = "SELECT id, quantity, avg_price FROM holdings WHERE user_id = ? AND symbol = ?";
        try (PreparedStatement ps = conn.prepareStatement(querySql)) {
            ps.setString(1, userId);
            ps.setString(2, symbol);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int existingQty = rs.getInt("quantity");
                    double existingAvg = rs.getDouble("avg_price");
                    int newQty = existingQty + qty;
                    double newAvg = ((existingQty * existingAvg) + (qty * price)) / newQty;

                    String updateSql = "UPDATE holdings SET quantity = ?, avg_price = ? WHERE id = ?";
                    try (PreparedStatement psUp = conn.prepareStatement(updateSql)) {
                        psUp.setInt(1, newQty);
                        psUp.setDouble(2, newAvg);
                        psUp.setInt(3, rs.getInt("id"));
                        psUp.executeUpdate();
                    }
                } else {
                    String insertSql = "INSERT INTO holdings (user_id, symbol, quantity, avg_price, sector) VALUES (?, ?, ?, ?, 'Equities')";
                    try (PreparedStatement psIn = conn.prepareStatement(insertSql)) {
                        psIn.setString(1, userId);
                        psIn.setString(2, symbol);
                        psIn.setInt(3, qty);
                        psIn.setDouble(4, price);
                        psIn.executeUpdate();
                    }
                }
            }
        }
    }

    private void updateHoldingOnSell(Connection conn, String userId, String symbol, int qty) throws SQLException {
        String querySql = "SELECT id, quantity FROM holdings WHERE user_id = ? AND symbol = ?";
        try (PreparedStatement ps = conn.prepareStatement(querySql)) {
            ps.setString(1, userId);
            ps.setString(2, symbol);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    int existingQty = rs.getInt("quantity");
                    int newQty = existingQty - qty;
                    if (newQty <= 0) {
                        String delSql = "DELETE FROM holdings WHERE id = ?";
                        try (PreparedStatement psDel = conn.prepareStatement(delSql)) {
                            psDel.setInt(1, rs.getInt("id"));
                            psDel.executeUpdate();
                        }
                    } else {
                        String upSql = "UPDATE holdings SET quantity = ? WHERE id = ?";
                        try (PreparedStatement psUp = conn.prepareStatement(upSql)) {
                            psUp.setInt(1, newQty);
                            psUp.setInt(2, rs.getInt("id"));
                            psUp.executeUpdate();
                        }
                    }
                }
            }
        }
    }

    @Override
    public boolean update(Trade entity) throws DatabaseException {
        String sql = "UPDATE trades SET status = ? WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, entity.getStatus());
            ps.setString(2, entity.getId());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update trade: " + entity.getId(), e);
        }
    }

    @Override
    public boolean delete(String id) throws DatabaseException {
        String sql = "DELETE FROM trades WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete trade: " + id, e);
        }
    }

    private Trade mapRow(ResultSet rs) throws SQLException {
        Timestamp ts = rs.getTimestamp("created_at");
        String timeStr = ts != null ? ts.toString() : "";
        return new Trade(
            rs.getString("id"),
            rs.getString("user_id"),
            rs.getString("symbol"),
            rs.getString("trade_type"),
            rs.getInt("quantity"),
            rs.getDouble("price"),
            rs.getDouble("total"),
            rs.getDouble("pnl"),
            rs.getDouble("pnl_percent"),
            rs.getString("status"),
            timeStr
        );
    }
}
