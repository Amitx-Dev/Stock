-- ==========================================================
-- Online Stock Trading Platform - Database Schema
-- Compatible with MySQL 8.0+
-- Database: stock_trading_db
-- ==========================================================

CREATE DATABASE IF NOT EXISTS stock_trading_db;
USE stock_trading_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'TRADER') NOT NULL DEFAULT 'TRADER',
    status ENUM('ACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. WALLETS TABLE
CREATE TABLE IF NOT EXISTS wallets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    cash_balance DECIMAL(15, 2) NOT NULL DEFAULT 50000.00,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. STOCKS TABLE
CREATE TABLE IF NOT EXISTS stocks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    company_name VARCHAR(150) NOT NULL,
    current_price DECIMAL(10, 2) NOT NULL,
    change_percent DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    day_high DECIMAL(10, 2) NOT NULL,
    day_low DECIMAL(10, 2) NOT NULL,
    volume BIGINT NOT NULL DEFAULT 0,
    sector VARCHAR(50) DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. PORTFOLIOS TABLE (HOLDINGS)
CREATE TABLE IF NOT EXISTS portfolios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    avg_buy_price DECIMAL(10, 2) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE,
    UNIQUE KEY user_stock_unique (user_id, stock_id)
);

-- 5. TRADES TABLE (EXECUTION AUDIT LOG)
CREATE TABLE IF NOT EXISTS trades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stock_id INT NOT NULL,
    type ENUM('BUY', 'SELL') NOT NULL,
    quantity INT NOT NULL,
    price_per_share DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(15, 2) NOT NULL,
    status ENUM('FILLED', 'PENDING', 'CANCELLED') NOT NULL DEFAULT 'FILLED',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE
);

-- 6. ALERTS TABLE
CREATE TABLE IF NOT EXISTS alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stock_id INT NOT NULL,
    target_price DECIMAL(10, 2) NOT NULL,
    `condition` ENUM('ABOVE', 'BELOW') NOT NULL,
    status ENUM('ACTIVE', 'TRIGGERED', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (stock_id) REFERENCES stocks(id) ON DELETE CASCADE
);

-- 7. SECURITY LOGS TABLE
CREATE TABLE IF NOT EXISTS security_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45) NOT NULL,
    event_description VARCHAR(255) NOT NULL,
    severity ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'LOW'
);

-- 8. SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================================
-- SEED SAMPLE DATA
-- ==========================================================

-- Seed Users
INSERT INTO users (id, name, email, password_hash, role, status) VALUES
(1, 'Administrator', 'admin@trade.com', 'admin123', 'ADMIN', 'ACTIVE'),
(2, 'Alex Morgan', 'trader@trade.com', 'trader123', 'TRADER', 'ACTIVE'),
(3, 'Sarah Connor', 'sarah@trade.com', 'sarah123', 'TRADER', 'ACTIVE'),
(4, 'David Beckham', 'david@trade.com', 'david123', 'TRADER', 'ACTIVE'),
(5, 'Elena Gilbert', 'elena@trade.com', 'elena123', 'TRADER', 'SUSPENDED')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Wallets
INSERT INTO wallets (user_id, cash_balance) VALUES
(1, 100000.00),
(2, 45280.50),
(3, 18900.00),
(4, 32150.00),
(5, 5000.00)
ON DUPLICATE KEY UPDATE cash_balance=VALUES(cash_balance);

-- Seed Stocks
INSERT INTO stocks (id, symbol, company_name, current_price, change_percent, day_high, day_low, volume, sector) VALUES
(1, 'AAPL', 'Apple Inc.', 182.45, 1.85, 184.20, 180.10, 48291000, 'Technology'),
(2, 'TSLA', 'Tesla Inc.', 248.50, -2.40, 256.30, 245.10, 65120000, 'Automotive / EV'),
(3, 'NVDA', 'NVIDIA Corporation', 875.20, 4.12, 882.00, 852.10, 92140000, 'Technology / AI'),
(4, 'MSFT', 'Microsoft Corporation', 415.80, 0.95, 418.50, 412.30, 21890000, 'Technology'),
(5, 'AMZN', 'Amazon.com Inc.', 178.60, -0.65, 181.00, 177.20, 31450000, 'Consumer Cyclical'),
(6, 'GOOGL', 'Alphabet Inc.', 154.20, 1.15, 156.40, 153.10, 24320000, 'Communication'),
(7, 'JPM', 'JPMorgan Chase & Co.', 198.30, 0.45, 199.50, 196.80, 14210000, 'Financial Services'),
(8, 'RELIANCE', 'Reliance Industries', 2940.00, 1.35, 2965.00, 2920.00, 8950000, 'Energy / Conglomerate'),
(9, 'TCS', 'Tata Consultancy Services', 3890.50, -0.80, 3925.00, 3870.00, 4120000, 'Technology'),
(10, 'INFY', 'Infosys Limited', 1520.10, 2.10, 1535.00, 1495.00, 7840000, 'Technology')
ON DUPLICATE KEY UPDATE current_price=VALUES(current_price);

-- Seed Holdings for Trader Alex Morgan (User ID 2)
INSERT INTO portfolios (user_id, stock_id, quantity, avg_buy_price) VALUES
(2, 1, 25, 175.20),
(2, 3, 10, 820.00),
(2, 4, 15, 402.50),
(2, 7, 30, 190.00)
ON DUPLICATE KEY UPDATE quantity=VALUES(quantity);

-- Seed Recent Trades
INSERT INTO trades (id, user_id, stock_id, type, quantity, price_per_share, total_amount, status, timestamp) VALUES
(101, 2, 1, 'BUY', 25, 175.20, 4380.00, 'FILLED', NOW() - INTERVAL 5 DAY),
(102, 2, 3, 'BUY', 10, 820.00, 8200.00, 'FILLED', NOW() - INTERVAL 3 DAY),
(103, 3, 2, 'BUY', 15, 252.00, 3780.00, 'FILLED', NOW() - INTERVAL 2 DAY),
(104, 2, 4, 'BUY', 15, 402.50, 6037.50, 'FILLED', NOW() - INTERVAL 1 DAY),
(105, 4, 1, 'BUY', 50, 180.50, 9025.00, 'FILLED', NOW() - INTERVAL 18 HOUR),
(106, 2, 2, 'SELL', 10, 255.00, 2550.00, 'FILLED', NOW() - INTERVAL 6 HOUR),
(107, 3, 5, 'BUY', 20, 179.00, 3580.00, 'FILLED', NOW() - INTERVAL 2 HOUR)
ON DUPLICATE KEY UPDATE total_amount=VALUES(total_amount);

-- Seed Alerts
INSERT INTO alerts (id, user_id, stock_id, target_price, `condition`, status) VALUES
(1, 2, 1, 185.00, 'ABOVE', 'ACTIVE'),
(2, 2, 2, 240.00, 'BELOW', 'ACTIVE'),
(3, 2, 3, 900.00, 'ABOVE', 'ACTIVE'),
(4, 2, 4, 410.00, 'BELOW', 'TRIGGERED')
ON DUPLICATE KEY UPDATE target_price=VALUES(target_price);

-- Seed Security Logs
INSERT INTO security_logs (id, ip_address, event_description, severity, timestamp) VALUES
(1, '192.168.1.105', 'Failed login attempt threshold exceeded (user: elena@trade.com)', 'HIGH', NOW() - INTERVAL 4 HOUR),
(2, '10.0.0.12', 'Admin session initiated with 2FA verified', 'LOW', NOW() - INTERVAL 3 HOUR),
(3, '172.16.4.88', 'Unusual high-frequency trade burst detected and rate limited', 'MEDIUM', NOW() - INTERVAL 90 MINUTE),
(4, '192.168.1.201', 'Password reset requested via registered email', 'LOW', NOW() - INTERVAL 45 MINUTE),
(5, '45.33.32.156', 'Automated vulnerability port scan blocked by firewall', 'CRITICAL', NOW() - INTERVAL 15 MINUTE)
ON DUPLICATE KEY UPDATE event_description=VALUES(event_description);

-- Seed System Settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('MARKET_HOURS_OPEN', '09:15', 'Daily trading market opening time (EST/IST)'),
('MARKET_HOURS_CLOSE', '15:30', 'Daily trading market closing time'),
('MAX_TRADE_LIMIT', '100000', 'Maximum allowed single order size in currency units'),
('CIRCUIT_BREAKER_PERCENT', '10', 'Daily volatility trigger threshold to pause trading'),
('SESSION_TIMEOUT_MINUTES', '30', 'Trader session inactivity timeout duration'),
('ENFORCE_2FA', 'true', 'Require multi-factor authentication for withdrawals and administrative actions'),
('MAINTENANCE_MODE', 'false', 'Disable client trading access for scheduled maintenance')
ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value);
