-- ==========================================================
-- TradeNest Online Stock Trading Platform - MySQL Database Schema
-- Compatible with MySQL 5.7+ and MySQL 8.0+ / MariaDB
-- ==========================================================

CREATE DATABASE IF NOT EXISTS tradenest_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE tradenest_db;

-- ----------------------------------------------------------
-- 1. USERS TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Trader') NOT NULL DEFAULT 'Trader',
  status ENUM('Active', 'Pending', 'Inactive') NOT NULL DEFAULT 'Active',
  created_at DATE NOT NULL,
  last_login VARCHAR(50) DEFAULT 'Never',
  trades_count INT DEFAULT 0
) ENGINE=InnoDB;

INSERT INTO users (id, name, email, password, role, status, created_at, last_login, trades_count) VALUES
('USR-001', 'Vikram Malhotra', 'admin@tradenest.in', 'Admin@123', 'Admin', 'Active', '2025-01-15', 'Just now', 142),
('USR-002', 'Aanya Sharma', 'aanya.sharma@tradenest.in', 'Trader@123', 'Trader', 'Active', '2025-02-10', '5 mins ago', 88),
('USR-003', 'Rohan Mehta', 'rohan.mehta@invest.in', 'Trader@123', 'Trader', 'Active', '2025-03-01', '2 hours ago', 312),
('USR-004', 'Priya Iyer', 'priya.iyer@fintech.com', 'Admin@123', 'Admin', 'Active', '2025-01-20', 'Yesterday', 45),
('USR-005', 'Karan Singhania', 'karan.s@wealthnest.com', 'Trader@123', 'Trader', 'Inactive', '2025-04-12', '5 days ago', 19),
('USR-006', 'Sneha Patel', 'sneha.patel@dalalstreet.com', 'Trader@123', 'Trader', 'Active', '2025-05-18', '1 hour ago', 520),
('USR-007', 'Aditya Verma', 'aditya.v@quantum.io', 'Trader@123', 'Trader', 'Pending', '2025-06-22', 'Never', 0),
('USR-008', 'Devika Nair', 'devika.nair@matrix.com', 'Trader@123', 'Trader', 'Active', '2025-07-04', '3 hours ago', 167);

-- ----------------------------------------------------------
-- 2. STOCKS & MARKET INSTRUMENTS TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS stocks;
CREATE TABLE stocks (
  symbol VARCHAR(20) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  change_val DECIMAL(10, 2) NOT NULL,
  change_percent DECIMAL(6, 2) NOT NULL,
  day_high DECIMAL(10, 2) NOT NULL,
  day_low DECIMAL(10, 2) NOT NULL,
  open_price DECIMAL(10, 2) NOT NULL,
  prev_close DECIMAL(10, 2) NOT NULL,
  volume VARCHAR(50) NOT NULL,
  market_cap VARCHAR(50) NOT NULL,
  pe_ratio DECIMAL(6, 2) NOT NULL
) ENGINE=InnoDB;

INSERT INTO stocks (symbol, name, sector, price, change_val, change_percent, day_high, day_low, open_price, prev_close, volume, market_cap, pe_ratio) VALUES
('RELIANCE', 'Reliance Industries Ltd.', 'Energy & Petrochemicals', 2985.50, 34.20, 1.16, 3012.00, 2948.10, 2955.00, 2951.30, '3.4M', '₹20.19 Lakh Cr', 28.40),
('TCS', 'Tata Consultancy Services', 'Information Technology', 4280.10, 72.40, 1.72, 4310.00, 4215.50, 4220.00, 4207.70, '1.8M', '₹15.48 Lakh Cr', 32.10),
('HDFCBANK', 'HDFC Bank Ltd.', 'Banking & Financial', 1642.30, -8.90, -0.54, 1660.00, 1638.20, 1655.00, 1651.20, '8.2M', '₹12.50 Lakh Cr', 19.80),
('INFY', 'Infosys Limited', 'Information Technology', 1894.20, 36.80, 1.98, 1908.00, 1862.00, 1865.00, 1857.40, '4.6M', '₹7.86 Lakh Cr', 29.50),
('TATAMOTORS', 'Tata Motors Limited', 'Automobile', 968.40, 18.25, 1.92, 979.80, 952.10, 954.00, 950.15, '11.5M', '₹3.56 Lakh Cr', 11.20),
('ICICIBANK', 'ICICI Bank Ltd.', 'Banking & Financial', 1228.75, -4.30, -0.35, 1242.00, 1222.10, 1238.00, 1233.05, '5.1M', '₹8.65 Lakh Cr', 18.90),
('BHARTIARTL', 'Bharti Airtel Ltd.', 'Telecom', 1654.10, 22.80, 1.40, 1668.00, 1635.00, 1638.00, 1631.30, '3.9M', '₹9.42 Lakh Cr', 72.30),
('ZOMATO', 'Zomato Limited', 'Consumer Tech', 278.40, 14.15, 5.35, 284.00, 265.50, 266.00, 264.25, '28.4M', '₹2.45 Lakh Cr', 118.00);

-- ----------------------------------------------------------
-- 3. PORTFOLIO HOLDINGS TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS holdings;
CREATE TABLE holdings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  quantity INT NOT NULL,
  avg_price DECIMAL(10, 2) NOT NULL,
  sector VARCHAR(100) NOT NULL,
  FOREIGN KEY (symbol) REFERENCES stocks(symbol) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO holdings (user_id, symbol, quantity, avg_price, sector) VALUES
('USR-002', 'RELIANCE', 25, 2840.00, 'Energy'),
('USR-002', 'TCS', 12, 4120.00, 'Information Technology'),
('USR-002', 'INFY', 30, 1780.00, 'Information Technology'),
('USR-002', 'TATAMOTORS', 40, 910.00, 'Automobile'),
('USR-002', 'HDFCBANK', 25, 1675.00, 'Banking & Financial');

-- ----------------------------------------------------------
-- 4. TRADES & ORDER EXECUTION TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS trades;
CREATE TABLE trades (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  trade_type ENUM('BUY', 'SELL') NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  total DECIMAL(12, 2) NOT NULL,
  pnl DECIMAL(10, 2) DEFAULT 0.00,
  pnl_percent DECIMAL(6, 2) DEFAULT 0.00,
  status VARCHAR(50) DEFAULT 'Executed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO trades (id, user_id, symbol, trade_type, quantity, price, total, pnl, pnl_percent, status) VALUES
('TRD-9021', 'USR-002', 'TATAMOTORS', 'BUY', 20, 968.00, 19360.00, 140.00, 0.72, 'Executed'),
('TRD-9018', 'USR-002', 'INFY', 'BUY', 15, 1875.50, 28132.50, 280.50, 1.00, 'Executed'),
('TRD-8994', 'USR-002', 'ZOMATO', 'SELL', 50, 275.20, 13760.00, 1850.00, 15.53, 'Executed'),
('TRD-8972', 'USR-002', 'RELIANCE', 'BUY', 10, 2940.00, 29400.00, 455.00, 1.55, 'Executed'),
('TRD-8950', 'USR-002', 'HDFCBANK', 'BUY', 15, 1665.00, 24975.00, -340.50, -1.36, 'Executed'),
('TRD-8910', 'USR-002', 'TCS', 'SELL', 8, 4260.00, 34080.00, 1680.00, 5.18, 'Executed'),
('TRD-8880', 'USR-002', 'BHARTIARTL', 'BUY', 25, 1610.00, 40250.00, 1102.50, 2.74, 'Executed');

-- ----------------------------------------------------------
-- 5. PRICE ALERTS TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS alerts;
CREATE TABLE alerts (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  symbol VARCHAR(20) NOT NULL,
  condition_type ENUM('ABOVE', 'BELOW') NOT NULL,
  target_price DECIMAL(10, 2) NOT NULL,
  status ENUM('ACTIVE', 'TRIGGERED', 'PAUSED') DEFAULT 'ACTIVE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO alerts (id, user_id, symbol, condition_type, target_price, status) VALUES
('ALT-101', 'USR-002', 'RELIANCE', 'ABOVE', 3000.00, 'ACTIVE'),
('ALT-102', 'USR-002', 'HDFCBANK', 'BELOW', 1630.00, 'ACTIVE'),
('ALT-103', 'USR-002', 'TATAMOTORS', 'ABOVE', 975.00, 'ACTIVE'),
('ALT-104', 'USR-002', 'TCS', 'ABOVE', 4250.00, 'TRIGGERED');

-- ----------------------------------------------------------
-- 6. FINANCIAL SECURITY SETTINGS TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS security_settings;
CREATE TABLE security_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  two_factor_enforced BOOLEAN DEFAULT TRUE,
  data_encryption_at_rest BOOLEAN DEFAULT TRUE,
  session_timeout_minutes INT DEFAULT 15,
  ip_whitelisting_enabled BOOLEAN DEFAULT FALSE,
  strict_password_policy BOOLEAN DEFAULT TRUE,
  biometric_allowed BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

INSERT INTO security_settings (id, two_factor_enforced, data_encryption_at_rest, session_timeout_minutes, ip_whitelisting_enabled, strict_password_policy, biometric_allowed) VALUES
(1, TRUE, TRUE, 15, FALSE, TRUE, TRUE);

-- ----------------------------------------------------------
-- 7. SECURITY INCIDENTS LOG TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS security_incidents;
CREATE TABLE security_incidents (
  id VARCHAR(36) PRIMARY KEY,
  time_recorded VARCHAR(50) NOT NULL,
  incident_type VARCHAR(100) NOT NULL,
  source_ip VARCHAR(50) NOT NULL,
  target_resource VARCHAR(150) NOT NULL,
  severity ENUM('High', 'Medium', 'Low') NOT NULL,
  status VARCHAR(50) NOT NULL,
  action_taken TEXT
) ENGINE=InnoDB;

INSERT INTO security_incidents (id, time_recorded, incident_type, source_ip, target_resource, severity, status, action_taken) VALUES
('SEC-991', '2025-10-09 13:22', 'Brute Force Attempt', '185.220.101.5', 'admin@tradenest.in', 'High', 'Blocked', 'IP blacklisted automatically by WAF'),
('SEC-988', '2025-10-09 11:05', 'Unrecognized Device Login', '45.134.20.18', 'rohan.mehta@invest.in', 'Medium', 'Resolved', 'OTP verification required and passed'),
('SEC-984', '2025-10-08 18:40', 'Rate Limit Threshold Exceeded', '103.45.12.89', '/api/v1/quotes', 'Low', 'Throttled', 'Client throttled for 15 minutes'),
('SEC-979', '2025-10-08 09:12', 'Invalid API Key Signature', '192.178.4.11', '/api/v1/orders', 'Medium', 'Rejected', 'Request rejected with HTTP 401');

-- ----------------------------------------------------------
-- 8. SYSTEM CONFIGURATION SETTINGS TABLE
-- ----------------------------------------------------------
DROP TABLE IF EXISTS system_settings;
CREATE TABLE system_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  platform_name VARCHAR(100) NOT NULL DEFAULT 'TradeNest Pro',
  trading_hours VARCHAR(100) NOT NULL DEFAULT '09:15 - 15:30 IST',
  brokerage_rate VARCHAR(100) NOT NULL DEFAULT '0.05% or ₹20 (whichever is lower)',
  brokerage_flat DECIMAL(10, 2) NOT NULL DEFAULT 20.00,
  default_currency VARCHAR(20) NOT NULL DEFAULT 'INR (₹)',
  maintenance_mode BOOLEAN DEFAULT FALSE,
  support_email VARCHAR(150) NOT NULL DEFAULT 'support@tradenest.fintech.in'
) ENGINE=InnoDB;

INSERT INTO system_settings (id, platform_name, trading_hours, brokerage_rate, brokerage_flat, default_currency, maintenance_mode, support_email) VALUES
(1, 'TradeNest Pro', '09:15 - 15:30 IST', '0.05% or ₹20 (whichever is lower)', 20.00, 'INR (₹)', FALSE, 'support@tradenest.fintech.in');
