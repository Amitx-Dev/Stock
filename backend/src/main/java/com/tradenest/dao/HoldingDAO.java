package com.tradenest.dao;

import com.tradenest.exceptions.DatabaseException;
import com.tradenest.interfaces.GenericDAO;
import com.tradenest.models.Holding;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Portfolio Holdings.
 * Implements GenericDAO<Holding, Integer>.
 */
public class HoldingDAO extends BaseDAO<Holding> implements GenericDAO<Holding, Integer> {

    @Override
    public List<Holding> findAll() throws DatabaseException {
        List<Holding> list = new ArrayList<>();
        String sql = "SELECT id, user_id, symbol, quantity, avg_price, sector FROM holdings ORDER BY symbol ASC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(mapRow(rs));
            }
            return list;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch all holdings", e);
        }
    }

    @Override
    public Optional<Holding> findById(Integer id) throws DatabaseException {
        String sql = "SELECT id, user_id, symbol, quantity, avg_price, sector FROM holdings WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch holding with id: " + id, e);
        }
    }

    public List<Holding> findByUserId(String userId) throws DatabaseException {
        List<Holding> list = new ArrayList<>();
        String sql = "SELECT id, user_id, symbol, quantity, avg_price, sector FROM holdings WHERE user_id = ? ORDER BY symbol ASC";

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
            throw new DatabaseException("Failed to fetch holdings for user: " + userId, e);
        }
    }

    @Override
    public boolean create(Holding h) throws DatabaseException {
        String sql = "INSERT INTO holdings (user_id, symbol, quantity, avg_price, sector) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, h.getUserId());
            ps.setString(2, h.getSymbol());
            ps.setInt(3, h.getQuantity());
            ps.setDouble(4, h.getAvgPrice());
            ps.setString(5, h.getSector() != null ? h.getSector() : "Equities");

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to insert holding", e);
        }
    }

    @Override
    public boolean update(Holding h) throws DatabaseException {
        String sql = "UPDATE holdings SET quantity = ?, avg_price = ?, sector = ? WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, h.getQuantity());
            ps.setDouble(2, h.getAvgPrice());
            ps.setString(3, h.getSector());
            ps.setInt(4, Integer.parseInt(h.getId()));

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update holding", e);
        }
    }

    @Override
    public boolean delete(Integer id) throws DatabaseException {
        String sql = "DELETE FROM holdings WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete holding with id: " + id, e);
        }
    }

    private Holding mapRow(ResultSet rs) throws SQLException {
        return new Holding(
            String.valueOf(rs.getInt("id")),
            rs.getString("user_id"),
            rs.getString("symbol"),
            rs.getInt("quantity"),
            rs.getDouble("avg_price"),
            rs.getString("sector")
        );
    }
}
