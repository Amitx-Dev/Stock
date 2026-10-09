package com.tradenest.dao;

import com.tradenest.config.DBConnection;
import com.tradenest.exceptions.DatabaseException;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Base Abstract DAO class.
 * Centralizes JDBC connection acquisition, transaction handling, and resource lifecycle.
 *
 * @param <T> Entity type
 */
public abstract class BaseDAO<T> {
    /**
     * Obtains an active connection from the singleton manager.
     */
    protected Connection getConnection() throws DatabaseException {
        try {
            return DBConnection.getConnection();
        } catch (SQLException e) {
            throw new DatabaseException("Failed to acquire JDBC database connection", e);
        }
    }

    /**
     * Executes safe rollback on an active transactional connection.
     */
    protected void rollbackQuietly(Connection conn) {
        if (conn != null) {
            try {
                conn.rollback();
            } catch (SQLException ignored) {
            }
        }
    }
}
