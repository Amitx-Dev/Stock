package com.stocktrading.dao;

import com.stocktrading.config.DBConnection;
import com.stocktrading.models.Stock;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class StockDAO {

    public List<Stock> getAllStocks() throws SQLException {
        List<Stock> stocks = new ArrayList<>();
        String sql = "SELECT * FROM stocks ORDER BY symbol ASC";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                Stock s = new Stock(
                    rs.getInt("id"),
                    rs.getString("symbol"),
                    rs.getString("company_name"),
                    rs.getBigDecimal("current_price"),
                    rs.getBigDecimal("change_percent"),
                    rs.getBigDecimal("day_high"),
                    rs.getBigDecimal("day_low"),
                    rs.getLong("volume"),
                    rs.getString("sector")
                );
                stocks.add(s);
            }
        }
        return stocks;
    }

    public Stock getStockById(int id) throws SQLException {
        String sql = "SELECT * FROM stocks WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new Stock(
                        rs.getInt("id"),
                        rs.getString("symbol"),
                        rs.getString("company_name"),
                        rs.getBigDecimal("current_price"),
                        rs.getBigDecimal("change_percent"),
                        rs.getBigDecimal("day_high"),
                        rs.getBigDecimal("day_low"),
                        rs.getLong("volume"),
                        rs.getString("sector")
                    );
                }
            }
        }
        return null;
    }
}
