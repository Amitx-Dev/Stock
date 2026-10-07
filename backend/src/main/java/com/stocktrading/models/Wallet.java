package com.stocktrading.models;

import java.math.BigDecimal;

public class Wallet {
    private int id;
    private int userId;
    private BigDecimal cashBalance;

    public Wallet() {}

    public Wallet(int id, int userId, BigDecimal cashBalance) {
        this.id = id;
        this.userId = userId;
        this.cashBalance = cashBalance;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }

    public BigDecimal getCashBalance() { return cashBalance; }
    public void setCashBalance(BigDecimal cashBalance) { this.cashBalance = cashBalance; }
}
