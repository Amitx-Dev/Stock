package com.tradenest.dao;

import com.tradenest.exceptions.DatabaseException;
import com.tradenest.interfaces.GenericDAO;
import com.tradenest.models.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Data Access Object for User entities.
 * Implements GenericDAO<User, String> showcasing Collections & Generics and JDBC Integration.
 */
public class UserDAO extends BaseDAO<User> implements GenericDAO<User, String> {

    @Override
    public List<User> findAll() throws DatabaseException {
        List<User> list = new ArrayList<>();
        String sql = "SELECT id, name, email, password, role, status, created_at, last_login, trades_count " +
                     "FROM users ORDER BY created_at DESC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(mapRow(rs));
            }
            return list;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch all users", e);
        }
    }

    @Override
    public Optional<User> findById(String id) throws DatabaseException {
        String sql = "SELECT id, name, email, password, role, status, created_at, last_login, trades_count " +
                     "FROM users WHERE id = ?";

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
            throw new DatabaseException("Failed to fetch user by id: " + id, e);
        }
    }

    public Optional<User> findByEmail(String email) throws DatabaseException {
        String sql = "SELECT id, name, email, password, role, status, created_at, last_login, trades_count " +
                     "FROM users WHERE email = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return Optional.of(mapRow(rs));
                }
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to find user by email: " + email, e);
        }
    }

    public Optional<User> authenticate(String email, String password) throws DatabaseException {
        String sql = "SELECT id, name, email, password, role, status, created_at, last_login, trades_count " +
                     "FROM users WHERE email = ? AND password = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, email);
            ps.setString(2, password);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    User user = mapRow(rs);
                    updateLastLogin(user.getId());
                    return Optional.of(user);
                }
            }
            return Optional.empty();
        } catch (SQLException e) {
            throw new DatabaseException("Authentication query failed for email: " + email, e);
        }
    }

    @Override
    public boolean create(User user) throws DatabaseException {
        String sql = "INSERT INTO users (id, name, email, password, role, status, created_at, last_login, trades_count) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            if (user.getId() == null || user.getId().isEmpty()) {
                user.setId("USR-" + System.currentTimeMillis() % 100000);
            }
            if (user.getCreatedAt() == null || user.getCreatedAt().isEmpty()) {
                user.setCreatedAt(LocalDate.now().toString());
            }

            ps.setString(1, user.getId());
            ps.setString(2, user.getName());
            ps.setString(3, user.getEmail());
            ps.setString(4, user.getPassword() != null ? user.getPassword() : "Trader@123");
            ps.setString(5, user.getRole() != null ? user.getRole() : "Trader");
            ps.setString(6, user.getStatus() != null ? user.getStatus() : "Active");
            ps.setString(7, user.getCreatedAt());
            ps.setString(8, "Never");
            ps.setInt(9, 0);

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to insert user into database", e);
        }
    }

    @Override
    public boolean update(User user) throws DatabaseException {
        String sql = "UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, user.getName());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getRole());
            ps.setString(4, user.getStatus());
            ps.setString(5, user.getId());

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update user: " + user.getId(), e);
        }
    }

    @Override
    public boolean delete(String id) throws DatabaseException {
        String sql = "DELETE FROM users WHERE id = ?";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, id);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to delete user: " + id, e);
        }
    }

    public void updateLastLogin(String id) {
        String sql = "UPDATE users SET last_login = 'Just now' WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id);
            ps.executeUpdate();
        } catch (Exception ignored) {
        }
    }

    private User mapRow(ResultSet rs) throws SQLException {
        return new User(
            rs.getString("id"),
            rs.getString("name"),
            rs.getString("email"),
            rs.getString("password"),
            rs.getString("role"),
            rs.getString("status"),
            rs.getString("created_at"),
            rs.getString("last_login"),
            rs.getInt("trades_count")
        );
    }
}
