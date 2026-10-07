package com.stocktrading.dao;

import com.stocktrading.config.DBConnection;
import com.stocktrading.models.Portfolio;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class PortfolioDAO {

    public List<Portfolio> getPortfolioByUserId(int userId) throws SQLException {
        List<Portfolio> list = new ArrayList<>();
        String sql = "SELECT p.*, s.symbol, s.company_name, s.current_price " +
                     "FROM portfolios p " +
                     "JOIN stocks s ON p.stock_id = s.id " +
                     "WHERE p.user_id = ? AND p.quantity > 0 " +
                     "ORDER BY s.symbol ASC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, userId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    Portfolio p = new Portfolio(
                        rs.getInt("id"),
                        rs.getInt("user_id"),
                        rs.getInt("stock_id"),
                        rs.getInt("quantity"),
                        rs.getBigDecimal("avg_buy_price")
                    );
                    p.setSymbol(rs.getString("symbol"));
                    p.setCompanyName(rs.getString("company_name"));
                    p.setCurrentPrice(rs.getBigDecimal("current_price"));
                    list.add(p);
                }
            }
        }
        return list;
    }
}
