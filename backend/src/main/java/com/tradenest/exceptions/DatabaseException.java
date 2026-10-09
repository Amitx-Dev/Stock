package com.tradenest.exceptions;

import java.sql.SQLException;

/**
 * Custom exception wrapping JDBC SQLException for clean error handling.
 */
public class DatabaseException extends TradeNestException {
    public DatabaseException(String message, SQLException cause) {
        super("DATABASE_ERROR", message + ": " + cause.getMessage(), cause);
    }

    public DatabaseException(String message) {
        super("DATABASE_ERROR", message);
    }
}
