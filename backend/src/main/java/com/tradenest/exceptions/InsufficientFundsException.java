package com.tradenest.exceptions;

/**
 * Thrown when an order cannot be placed due to insufficient balance or margin.
 */
public class InsufficientFundsException extends TradeNestException {
    private final double requiredAmount;
    private final double availableBalance;

    public InsufficientFundsException(double requiredAmount, double availableBalance) {
        super("INSUFFICIENT_FUNDS", String.format("Required ₹%.2f, but available balance is ₹%.2f", requiredAmount, availableBalance));
        this.requiredAmount = requiredAmount;
        this.availableBalance = availableBalance;
    }

    public double getRequiredAmount() {
        return requiredAmount;
    }

    public double getAvailableBalance() {
        return availableBalance;
    }
}
