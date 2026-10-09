package com.tradenest.interfaces;

import com.tradenest.exceptions.TradeNestException;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Interface contract for executable market/limit orders.
 * Illustrates Polymorphism and Interface realization.
 */
public interface OrderExecutable {
    /**
     * Executes order logic within an active JDBC transaction.
     * @param conn Open database connection with active transaction
     * @throws TradeNestException domain business violation
     * @throws SQLException database communication error
     */
    void execute(Connection conn) throws TradeNestException, SQLException;

    /**
     * Calculates the estimated total brokerage and turnover fees.
     * @return fee in INR
     */
    double calculateBrokerage();
}
