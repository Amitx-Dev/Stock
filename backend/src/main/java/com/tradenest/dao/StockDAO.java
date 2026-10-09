package com.tradenest.dao;

import com.tradenest.exceptions.DatabaseException;
import com.tradenest.interfaces.GenericDAO;
import com.tradenest.models.Stock;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Stock Instruments.
 * Implements GenericDAO<Stock, String> for JDBC Database operations.
 */
public class StockDAO extends BaseDAO<Stock> implements GenericDAO<Stock, String> {

    @Override
    public List<Stock> findAll() throws DatabaseException {
        List<Stock> list = new ArrayList<>();
        String sql = "SELECT symbol, name, sector, price, change_val, change_percent, day_high, day_low, open_price, prev_close, volume, market_cap, pe_ratio " +
                     "FROM stocks ORDER BY symbol ASC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(mapRow(rs));
            }
            return list;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch stocks from database", e);
        }
    }

    @Override
    public Optional<Stock> findById(String symbol) throws DatabaseException {
        String sql = "SELECT symbol, name, sector, price, change_val, change_percent, day_high, day_low, open_price, prev_close, volume, market_cap, pe_ratio " +
                     "FROM stocks WHERE symbol = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, symbol);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch stock with symbol: " + symbol, e);
        }
    }

    @Override
    public boolean create(Stock s) throws DatabaseException {
        String sql = "INSERT INTO stocks (symbol, name, sector, price, change_val, change_percent, day_high, day_low, open_price, prev_close, volume, market_cap, pe_ratio) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, s.getSymbol());
            ps.setString(2, s.getName());
            ps.setString(3, s.getSector());
            ps.setDouble(4, s.getPrice());
            ps.setDouble(5, s.getChangeVal());
            ps.setDouble(6, s.getChangePercent());
            ps.setDouble(7, s.getDayHigh());
            ps.setDouble(8, s.getDayLow());
            ps.setDouble(9, s.getOpenPrice());
            ps.setDouble(10, s.getPrevClose());
            ps.setString(11, s.getVolume());
            ps.setString(12, s.getMarketCap());
            ps.setDouble(13, s.getPeRatio());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to insert stock: " + s.getSymbol(), e);
        }
    }

    @Override
    public boolean update(Stock s) throws DatabaseException {
        String sql = "UPDATE stocks SET price = ?, change_val = ?, change_percent = ?, day_high = ?, day_low = ?, volume = ? WHERE symbol = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setDouble(1, s.getPrice());
            ps.setDouble(2, s.getChangeVal());
            ps.setDouble(3, s.getChangePercent());
            ps.setDouble(4, s.getDayHigh());
            ps.setDouble(5, s.getDayLow());
            ps.setString(6, s.getVolume());
            ps.setString(7, s.getSymbol());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update stock quote: " + s.getSymbol(), e);
        }
    }

    @Override
    public boolean delete(String symbol) throws DatabaseException {
        String sql = "DELETE FROM stocks WHERE symbol = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, symbol);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete stock: " + symbol, e);
        }
    }

    public synchronized void updateLivePrice(String symbol, double price, double changeVal, double changePercent, double dayHigh, double dayLow) throws DatabaseException {
        String sql = "UPDATE stocks SET price = ?, change_val = ?, change_percent = ?, day_high = ?, day_low = ? WHERE symbol = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setDouble(1, price);
            ps.setDouble(2, changeVal);
            ps.setDouble(3, changePercent);
            ps.setDouble(4, dayHigh);
            ps.setDouble(5, dayLow);
            ps.setString(6, symbol);

            ps.executeUpdate();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update live stock price for " + symbol, e);
        }
    }

    private Stock mapRow(ResultSet rs) throws SQLException {
        return new Stock(
            rs.getString("symbol"),
            rs.getString("name"),
            rs.getString("sector"),
            rs.getDouble("price"),
            rs.getDouble("change_val"),
            rs.getDouble("change_percent"),
            rs.getDouble("day_high"),
            rs.getDouble("day_low"),
            rs.getDouble("open_price"),
            rs.getDouble("prev_close"),
            rs.getString("volume"),
            rs.getString("market_cap"),
            rs.getDouble("pe_ratio")
        );
    }
}
