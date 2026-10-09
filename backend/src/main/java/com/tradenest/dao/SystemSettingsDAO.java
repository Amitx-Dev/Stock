package com.tradenest.dao;

import com.tradenest.exceptions.DatabaseException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

/**
 * Data Access Object for System Settings & Platform Config.
 */
public class SystemSettingsDAO extends BaseDAO<Object> {

    public Map<String, Object> getSettings() throws DatabaseException {
        Map<String, Object> map = new HashMap<>();
        String sql = "SELECT platform_name, trading_hours, brokerage_rate, brokerage_flat, default_currency, maintenance_mode, support_email " +
                     "FROM system_settings WHERE id = 1";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            if (rs.next()) {
                map.put("platformName", rs.getString("platform_name"));
                map.put("tradingHours", rs.getString("trading_hours"));
                map.put("brokerageRate", rs.getString("brokerage_rate"));
                map.put("brokerageFlat", rs.getDouble("brokerage_flat"));
                map.put("defaultCurrency", rs.getString("default_currency"));
                map.put("maintenanceMode", rs.getBoolean("maintenance_mode"));
                map.put("supportEmail", rs.getString("support_email"));
            }
            return map;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to fetch system settings", e);
        }
    }

    public boolean updateSettings(String platformName, String tradingHours, String brokerageRate, double brokerageFlat, String defaultCurrency, boolean maintenanceMode, String supportEmail) throws DatabaseException {
        String sql = "UPDATE system_settings SET platform_name = ?, trading_hours = ?, brokerage_rate = ?, brokerage_flat = ?, default_currency = ?, maintenance_mode = ?, support_email = ? WHERE id = 1";

        try (Connection conn = getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {

            ps.setString(1, platformName);
            ps.setString(2, tradingHours);
            ps.setString(3, brokerageRate);
            ps.setDouble(4, brokerageFlat);
            ps.setString(5, defaultCurrency);
            ps.setBoolean(6, maintenanceMode);
            ps.setString(7, supportEmail);

            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new DatabaseException("Failed to update system settings", e);
        }
    }
}
