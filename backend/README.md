# Online Stock Trading Platform - Java + JDBC + MySQL Backend

This folder contains the complete Java backend architecture for the **Online Stock Trading Platform** college project.

---

## 🏗️ Architecture Overview

The backend is organized using standard **DAO (Data Access Object)** and **MVC / Service** design patterns:

- **Database**: MySQL 8.0+ (`schema.sql`)
- **Connection Management**: `DBConnection.java` with JDBC driver manager
- **Data Models**: `com.stocktrading.models.*` (User, Stock, Wallet, Portfolio, Trade, Alert)
- **Data Access Objects**: `com.stocktrading.dao.*` (PreparedStatements, ACID Transaction management for trade execution)
- **HTTP REST Server**: `com.stocktrading.server.StockTradingServer` (Lightweight pure Java server with zero external dependencies)

---

## 🗄️ Database Setup (MySQL)

1. Open your MySQL client (Command Line, MySQL Workbench, or phpMyAdmin).
2. Execute the `backend/schema.sql` script:
   ```bash
   mysql -u root -p < schema.sql
   ```
3. This creates:
   - Database: `stock_trading_db`
   - Tables: `users`, `wallets`, `stocks`, `portfolios`, `trades`, `alerts`, `security_logs`, `system_settings`
   - Seed data for default admin (`admin@trade.com`), demo trader (`trader@trade.com`), top stocks (AAPL, TSLA, NVDA, RELIANCE, TCS, etc.), and initial holdings.

---

## ☕ Compilation & Execution

### Prerequisites:
- Java JDK 17 or 21+
- `mysql-connector-j-8.x.x.jar` (MySQL JDBC Driver)

### 1. Compiling:
```bash
cd backend
javac -cp ".;lib/*" -d bin src/main/java/com/stocktrading/**/*.java
```

### 2. Running the Java REST API Server:
```bash
java -cp "bin;lib/*" com.stocktrading.server.StockTradingServer
```
The server will start listening at `http://localhost:8080/api/` with CORS enabled.

---

## 🔄 Connecting with Frontend

In `src/services/api.js`, switch the mock flag:
```javascript
export const USE_MOCK = false; // toggles between local mock storage and http://localhost:8080/api
```
When `USE_MOCK = false`, all API calls will fetch directly from this Java backend!
