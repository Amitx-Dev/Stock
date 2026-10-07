package com.stocktrading.dao;

import com.stocktrading.config.DBConnection;
import com.stocktrading.models.Wallet;

import java.math.BigDecimal;
import java.sql.*;

public class WalletDAO {

    public Wallet getWalletByUserId(int userId) throws SQLException {
        String sql = "SELECT * FROM wallets WHERE user_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Wallet(
                        rs.getInt("id"),
                        rs.getInt("user_id"),
                        rs.getBigDecimal("cash_balance")
                    );
                }
            }
        }
        return null;
    }

    public boolean depositCash(int userId, BigDecimal amount) throws SQLException {
        String sql = "UPDATE wallets SET cash_balance = cash_balance + ? WHERE user_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setBigDecimal(1, amount);
            ps.setInt(2, userId);
            return ps.executeUpdate() > 0;
        }
    }
}
