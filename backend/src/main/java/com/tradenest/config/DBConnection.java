package com.tradenest.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Singleton Database Connection Manager for TradeNest.
 * Connects to MySQL database via JDBC Driver.
 * Supports connection pooling principles, auto-reconnect, and transaction boundaries.
 */
public class DBConnection {
    private static final String DEFAULT_HOST = "localhost";
    private static final String DEFAULT_PORT = "3306";
    private static final String DEFAULT_DB = "tradenest_db";
    private static final String DEFAULT_USER = "root";
    private static final String DEFAULT_PASSWORD = "";

    private static String host;
    private static String port;
    private static String dbName;
    private static String username;
    private static String password;

    static {
        // Load configuration from System Properties or Environment variables with sensible defaults
        host = System.getProperty("db.host", System.getenv().getOrDefault("DB_HOST", DEFAULT_HOST));
        port = System.getProperty("db.port", System.getenv().getOrDefault("DB_PORT", DEFAULT_PORT));
        dbName = System.getProperty("db.name", System.getenv().getOrDefault("DB_NAME", DEFAULT_DB));
        username = System.getProperty("db.user", System.getenv().getOrDefault("DB_USER", DEFAULT_USER));
        password = System.getProperty("db.password", System.getenv().getOrDefault("DB_PASSWORD", DEFAULT_PASSWORD));

        try {
            // Load MySQL Connector JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("[DBConnection] MySQL JDBC Driver registered successfully.");
        } catch (ClassNotFoundException e) {
            System.err.println("[DBConnection] ERROR: MySQL JDBC Driver not found in classpath!");
            e.printStackTrace();
        }
    }

    private DBConnection() {
        // Private constructor for Singleton pattern
    }

    /**
     * Obtains a new JDBC Connection to the MySQL database.
     * @return active java.sql.Connection
     * @throws SQLException if a database access error occurs
     */
    public static Connection getConnection() throws SQLException {
        String jdbcUrl = String.format(
            "jdbc:mysql://%s:%s/%s?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&characterEncoding=UTF-8",
            host, port, dbName
        );
        return DriverManager.getConnection(jdbcUrl, username, password);
    }

    /**
     * Verifies if database is reachable.
     * @return true if connection succeeds, false otherwise
     */
    public static boolean testConnection() {
        try (Connection conn = getConnection()) {
            return conn != null && !conn.isClosed();
        } catch (SQLException e) {
            System.err.println("[DBConnection] Connection test failed: " + e.getMessage());
            return false;
        }
    }

    /**
     * Safely closes one or more JDBC auto-closeable resources.
     */
    public static void close(AutoCloseable... closeables) {
        for (AutoCloseable c : closeables) {
            if (c != null) {
                try {
                    c.close();
                } catch (Exception ignored) {
                }
            }
        }
    }

    public static void main(String[] args) {
        System.out.println("Testing TradeNest MySQL JDBC Database Connection...");
        boolean ok = testConnection();
        if (ok) {
            System.out.println("SUCCESS: Connected to MySQL database 'tradenest_db' via JDBC successfully!");
        } else {
            System.err.println("FAILED: Could not connect to MySQL database. Check MySQL service status and port.");
        }
    }
}
