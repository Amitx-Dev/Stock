package com.tradenest.models;

/**
 * User Entity Model representing Platform Users (Traders and Admins).
 * Inherits from AbstractEntity.
 */
public class User extends AbstractEntity {
    private String name;
    private String email;
    private String password;
    private String role;       // 'Admin' or 'Trader'
    private String status;     // 'Active', 'Pending', 'Inactive'
    private String lastLogin;
    private int tradesCount;

    public User() {
        super();
    }

    public User(String id, String name, String email, String password, String role, String status, String createdAt, String lastLogin, int tradesCount) {
        super(id, createdAt);
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.status = status;
        this.lastLogin = lastLogin;
        this.tradesCount = tradesCount;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastLogin() {
        return lastLogin;
    }

    public void setLastLogin(String lastLogin) {
        this.lastLogin = lastLogin;
    }

    public int getTradesCount() {
        return tradesCount;
    }

    public void setTradesCount(int tradesCount) {
        this.tradesCount = tradesCount;
    }

    @Override
    public String toJson() {
        return String.format(
            "{\"id\":\"%s\",\"name\":\"%s\",\"email\":\"%s\",\"role\":\"%s\",\"status\":\"%s\",\"createdAt\":\"%s\",\"lastLogin\":\"%s\",\"tradesCount\":%d}",
            escape(id), escape(name), escape(email), escape(role), escape(status), escape(createdAt), escape(lastLogin), tradesCount
        );
    }
}
