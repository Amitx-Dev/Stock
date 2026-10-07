package com.stocktrading.dao;

import com.stocktrading.config.DBConnection;
import com.stocktrading.models.Alert;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AlertDAO {

    public List<Alert> getAlertsByUserId(int userId) throws SQLException {
        List<Alert> list = new ArrayList<>();
        String sql = "SELECT a.*, s.symbol, s.company_name, s.current_price " +
                     "FROM alerts a " +
                     "JOIN stocks s ON a.stock_id = s.id " +
                     "WHERE a.user_id = ? " +
                     "ORDER BY a.created_at DESC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Alert a = new Alert(
                        rs.getInt("id"),
                        rs.getInt("user_id"),
                        rs.getInt("stock_id"),
                        rs.getBigDecimal("target_price"),
                        rs.getString("condition"),
                        rs.getString("status"),
                        rs.getTimestamp("created_at")
                    );
                    a.setSymbol(rs.getString("symbol"));
                    a.setCompanyName(rs.getString("company_name"));
                    a.setCurrentPrice(rs.getBigDecimal("current_price"));
                    list.add(a);
                }
            }
        }
        return list;
    }

    public boolean createAlert(Alert alert) throws SQLException {
        String sql = "INSERT INTO alerts (user_id, stock_id, target_price, `condition`, status) VALUES (?, ?, ?, ?, 'ACTIVE')";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, alert.getUserId());
            ps.setInt(2, alert.getStockId());
            ps.setBigDecimal(3, alert.getTargetPrice());
            ps.setString(4, alert.getCondition());
            return ps.executeUpdate() > 0;
        }
    }

    public boolean deleteAlert(int alertId, int userId) throws SQLException {
        String sql = "DELETE FROM alerts WHERE id = ? AND user_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, alertId);
            ps.setInt(2, userId);
            return ps.executeUpdate() > 0;
        }
    }
}
