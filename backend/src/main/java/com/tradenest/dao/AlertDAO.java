package com.tradenest.dao;

import com.tradenest.exceptions.DatabaseException;
import com.tradenest.interfaces.GenericDAO;
import com.tradenest.models.Alert;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for Price Alert notifications.
 * Implements GenericDAO<Alert, String>.
 */
public class AlertDAO extends BaseDAO<Alert> implements GenericDAO<Alert, String> {

    @Override
    public List<Alert> findAll() throws DatabaseException {
        List<Alert> list = new ArrayList<>();
        String sql = "SELECT id, user_id, symbol, condition_type, target_price, status, created_at FROM alerts ORDER BY created_at DESC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(mapRow(rs));
            }
            return list;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch alerts", e);
        }
    }

    @Override
    public Optional<Alert> findById(String id) throws DatabaseException {
        String sql = "SELECT id, user_id, symbol, condition_type, target_price, status, created_at FROM alerts WHERE id = ?";

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
            throw new DatabaseException("Failed to fetch alert: " + id, e);
        }
    }

    public List<Alert> findByUserId(String userId) throws DatabaseException {
        List<Alert> list = new ArrayList<>();
        String sql = "SELECT id, user_id, symbol, condition_type, target_price, status, created_at FROM alerts WHERE user_id = ? ORDER BY created_at DESC";

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
            throw new DatabaseException("Failed to fetch alerts for user: " + userId, e);
        }
    }

    @Override
    public boolean create(Alert alert) throws DatabaseException {
        String sql = "INSERT INTO alerts (id, user_id, symbol, condition_type, target_price, status) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            if (alert.getId() == null || alert.getId().isEmpty()) {
                alert.setId("ALT-" + (100 + (int)(Math.random() * 900)));
            }

            ps.setString(1, alert.getId());
            ps.setString(2, alert.getUserId());
            ps.setString(3, alert.getSymbol());
            ps.setString(4, alert.getConditionType());
            ps.setDouble(5, alert.getTargetPrice());
            ps.setString(6, alert.getStatus() != null ? alert.getStatus() : "ACTIVE");

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to insert alert", e);
        }
    }

    @Override
    public boolean update(Alert alert) throws DatabaseException {
        String sql = "UPDATE alerts SET status = ? WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, alert.getStatus());
            ps.setString(2, alert.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update alert: " + alert.getId(), e);
        }
    }

    @Override
    public boolean delete(String id) throws DatabaseException {
        String sql = "DELETE FROM alerts WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete alert: " + id, e);
        }
    }

    private Alert mapRow(ResultSet rs) throws SQLException {
        Timestamp ts = rs.getTimestamp("created_at");
        return new Alert(
            rs.getString("id"),
            rs.getString("user_id"),
            rs.getString("symbol"),
            rs.getString("condition_type"),
            rs.getDouble("target_price"),
            rs.getString("status"),
            ts != null ? ts.toString() : ""
        );
    }
}
