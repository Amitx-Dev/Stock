package com.tradenest.dao;

import com.tradenest.exceptions.DatabaseException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Data Access Object for Financial Security Configuration & Incidents.
 */
public class SecurityDAO extends BaseDAO<Object> {

    public Map<String, Object> getSecuritySettings() throws DatabaseException {
        Map<String, Object> map = new HashMap<>();
        String sql = "SELECT two_factor_enforced, data_encryption_at_rest, session_timeout_minutes, ip_whitelisting_enabled, strict_password_policy, biometric_allowed " +
                     "FROM security_settings WHERE id = 1";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                map.put("twoFactorEnforced", rs.getBoolean("two_factor_enforced"));
                map.put("dataEncryptionAtRest", rs.getBoolean("data_encryption_at_rest"));
                map.put("sessionTimeoutMinutes", rs.getInt("session_timeout_minutes"));
                map.put("ipWhitelistingEnabled", rs.getBoolean("ip_whitelisting_enabled"));
                map.put("strictPasswordPolicy", rs.getBoolean("strict_password_policy"));
                map.put("biometricAllowed", rs.getBoolean("biometric_allowed"));
            }
            return map;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch security settings", e);
        }
    }

    public boolean updateSecuritySettings(boolean twoFactor, boolean encryption, int sessionTimeout, boolean ipWhitelist, boolean strictPassword, boolean biometric) throws DatabaseException {
        String sql = "UPDATE security_settings SET two_factor_enforced = ?, data_encryption_at_rest = ?, session_timeout_minutes = ?, ip_whitelisting_enabled = ?, strict_password_policy = ?, biometric_allowed = ? WHERE id = 1";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setBoolean(1, twoFactor);
            ps.setBoolean(2, encryption);
            ps.setInt(3, sessionTimeout);
            ps.setBoolean(4, ipWhitelist);
            ps.setBoolean(5, strictPassword);
            ps.setBoolean(6, biometric);

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update security settings", e);
        }
    }

    public List<Map<String, String>> getSecurityIncidents() throws DatabaseException {
        List<Map<String, String>> list = new ArrayList<>();
        String sql = "SELECT id, time_recorded, incident_type, source_ip, target_resource, severity, status, action_taken " +
                     "FROM security_incidents ORDER BY time_recorded DESC";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Map<String, String> incident = new HashMap<>();
                incident.put("id", rs.getString("id"));
                incident.put("time", rs.getString("time_recorded"));
                incident.put("type", rs.getString("incident_type"));
                incident.put("ip", rs.getString("source_ip"));
                incident.put("resource", rs.getString("target_resource"));
                incident.put("severity", rs.getString("severity"));
                incident.put("status", rs.getString("status"));
                incident.put("action", rs.getString("action_taken"));
                list.add(incident);
            }
            return list;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch security incidents", e);
        }
    }
}
