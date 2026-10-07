package com.stocktrading.dao;

import com.stocktrading.config.DBConnection;
import com.stocktrading.models.Trade;

import java.math.BigDecimal;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TradeDAO {

    /**
     * Executes a Buy or Sell trade atomically using JDBC Transactions.
     */
    public boolean executeTrade(int userId, int stockId, String type, int quantity, BigDecimal pricePerShare) throws SQLException {
        BigDecimal totalAmount = pricePerShare.multiply(new BigDecimal(quantity));
        String selectWalletSql = "SELECT cash_balance FROM wallets WHERE user_id = ? FOR UPDATE";
        String updateWalletSql = "UPDATE wallets SET cash_balance = cash_balance + ? WHERE user_id = ?";
        String selectPortfolioSql = "SELECT quantity, avg_buy_price FROM portfolios WHERE user_id = ? AND stock_id = ? FOR UPDATE";
        String insertTradeSql = "INSERT INTO trades (user_id, stock_id, type, quantity, price_per_share, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, 'FILLED')";

        Connection conn = null;
        try {
            conn = DBConnection.getConnection();
            conn.setAutoCommit(false); // Begin Transaction

            // 1. Check Cash Balance if BUY
            if ("BUY".equalsIgnoreCase(type)) {
                try (PreparedStatement psWallet = conn.prepareStatement(selectWalletSql)) {
                    psWallet.setInt(1, userId);
                    try (ResultSet rs = psWallet.executeQuery()) {
                        if (!rs.next() || rs.getBigDecimal("cash_balance").compareTo(totalAmount) < 0) {
                            conn.rollback();
                            return false; // Insufficient funds
                        }
                    }
                }

                // Deduct cash from wallet
                try (PreparedStatement psDeduct = conn.prepareStatement(updateWalletSql)) {
                    psDeduct.setBigDecimal(1, totalAmount.negate());
                    psDeduct.setInt(2, userId);
                    psDeduct.executeUpdate();
                }

                // Update or Insert into Portfolio
                int currentQty = 0;
                BigDecimal currentAvg = BigDecimal.ZERO;
                boolean exists = false;
                try (PreparedStatement psPort = conn.prepareStatement(selectPortfolioSql)) {
                    psPort.setInt(1, userId);
                    psPort.setInt(2, stockId);
                    try (ResultSet rs = psPort.executeQuery()) {
                        if (rs.next()) {
                            exists = true;
                            currentQty = rs.getInt("quantity");
                            currentAvg = rs.getBigDecimal("avg_buy_price");
                        }
                    }
                }

                if (exists) {
                    int newQty = currentQty + quantity;
                    BigDecimal totalSpent = (currentAvg.multiply(new BigDecimal(currentQty))).add(totalAmount);
                    BigDecimal newAvg = totalSpent.divide(new BigDecimal(newQty), 2, java.math.RoundingMode.HALF_UP);
                    String updatePortSql = "UPDATE portfolios SET quantity = ?, avg_buy_price = ? WHERE user_id = ? AND stock_id = ?";
                    try (PreparedStatement psUpPort = conn.prepareStatement(updatePortSql)) {
                        psUpPort.setInt(1, newQty);
                        psUpPort.setBigDecimal(2, newAvg);
                        psUpPort.setInt(3, userId);
                        psUpPort.setInt(4, stockId);
                        psUpPort.executeUpdate();
                    }
                } else {
                    String insertPortSql = "INSERT INTO portfolios (user_id, stock_id, quantity, avg_buy_price) VALUES (?, ?, ?, ?)";
                    try (PreparedStatement psInPort = conn.prepareStatement(insertPortSql)) {
                        psInPort.setInt(1, userId);
                        psInPort.setInt(2, stockId);
                        psInPort.setInt(3, quantity);
                        psInPort.setBigDecimal(4, pricePerShare);
                        psInPort.executeUpdate();
                    }
                }
            } else if ("SELL".equalsIgnoreCase(type)) {
                // Check stock quantity in portfolio
                int currentQty = 0;
                try (PreparedStatement psPort = conn.prepareStatement(selectPortfolioSql)) {
                    psPort.setInt(1, userId);
                    psPort.setInt(2, stockId);
                    try (ResultSet rs = psPort.executeQuery()) {
                        if (!rs.next() || rs.getInt("quantity") < quantity) {
                            conn.rollback();
                            return false; // Insufficient shares
                        }
                        currentQty = rs.getInt("quantity");
                    }
                }

                // Credit cash to wallet
                try (PreparedStatement psCredit = conn.prepareStatement(updateWalletSql)) {
                    psCredit.setBigDecimal(1, totalAmount);
                    psCredit.setInt(2, userId);
                    psCredit.executeUpdate();
                }

                // Update Portfolio
                if (currentQty == quantity) {
                    String delPortSql = "DELETE FROM portfolios WHERE user_id = ? AND stock_id = ?";
                    try (PreparedStatement psDel = conn.prepareStatement(delPortSql)) {
                        psDel.setInt(1, userId);
                        psDel.setInt(2, stockId);
                        psDel.executeUpdate();
                    }
                } else {
                    String updatePortSql = "UPDATE portfolios SET quantity = quantity - ? WHERE user_id = ? AND stock_id = ?";
                    try (PreparedStatement psUp = conn.prepareStatement(updatePortSql)) {
                        psUp.setInt(1, quantity);
                        psUp.setInt(2, userId);
                        psUp.setInt(3, stockId);
                        psUp.executeUpdate();
                    }
                }
            }

            // Insert Trade Record
            try (PreparedStatement psTrade = conn.prepareStatement(insertTradeSql)) {
                psTrade.setInt(1, userId);
                psTrade.setInt(2, stockId);
                psTrade.setString(3, type.toUpperCase());
                psTrade.setInt(4, quantity);
                psTrade.setBigDecimal(5, pricePerShare);
                psTrade.setBigDecimal(6, totalAmount);
                psTrade.executeUpdate();
            }

            conn.commit(); // Commit Transaction
            return true;
        } catch (SQLException e) {
            if (conn != null) conn.rollback();
            throw e;
        } finally {
            if (conn != null) conn.setAutoCommit(true);
        }
    }

    public List<Trade> getAllTrades() throws SQLException {
        List<Trade> list = new ArrayList<>();
        String sql = "SELECT t.*, u.name as user_name, s.symbol, s.company_name " +
                     "FROM trades t " +
                     "JOIN users u ON t.user_id = u.id " +
                     "JOIN stocks s ON t.stock_id = s.id " +
                     "ORDER BY t.timestamp DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Trade t = new Trade(
                    rs.getInt("id"),
                    rs.getInt("user_id"),
                    rs.getInt("stock_id"),
                    rs.getString("type"),
                    rs.getInt("quantity"),
                    rs.getBigDecimal("price_per_share"),
                    rs.getBigDecimal("total_amount"),
                    rs.getString("status"),
                    rs.getTimestamp("timestamp")
                );
                t.setUserName(rs.getString("user_name"));
                t.setStockSymbol(rs.getString("symbol"));
                t.setCompanyName(rs.getString("company_name"));
                list.add(t);
            }
        }
        return list;
    }
}
