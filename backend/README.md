# TradeNest - Java Backend & Desktop Architecture (JDBC + Servlets + Swing)

This module provides a production-grade Java architecture designed to strictly fulfill both the **Java Web Based Projects Marking Rubric** and the **Java GUI Based Projects Marking Rubric**.

---

## 🎯 Academic Marking Rubric Compliance Matrix

### 1. Java GUI Based Projects Marking Rubric (33 Marks)

| Rubric Component | Marks | Implementation in Codebase |
| :--- | :---: | :--- |
| **OOP Implementation (Polymorphism, Inheritance, Exception Handling, Interfaces)** | **10** | • **Inheritance**: `AbstractEntity` inherited by `User`, `Stock`, `Order`, `Trade`, `Holding`, `Alert`.<br>• **Polymorphism**: `Order` abstract base class with polymorphic subclasses `MarketOrder` and `LimitOrder` overriding `calculateBrokerage()` and `execute()`.<br>• **Exception Handling**: Custom exception hierarchy: `TradeNestException`, `InsufficientFundsException`, `StockNotFoundException`, `InvalidOrderException`, `DatabaseException`.<br>• **Interfaces**: `GenericDAO<T, ID>`, `OrderExecutable`, `MarketFeedListener`, `JsonSerializable`. |
| **Collections & Generics** | **6** | • `GenericDAO<T, ID>` with generic CRUD methods.<br>• `ApiResponse<T>` generic envelope container.<br>• Generics in `List<Stock>`, `List<Trade>`, `Map<String, Stock>`, `ConcurrentLinkedQueue<Order>`, `ConcurrentHashMap<String, Stock>`. |
| **Multithreading & Synchronization** | **4** | • `MarketFeedService`: Scheduled daemon thread simulating real-time market ticks with `synchronized(stock)` locks.<br>• `OrderService`: Multi-worker thread pool (`ExecutorService`) with `synchronized(orderExecutionLock)` block preventing race conditions during trade execution.<br>• `TradeNestGUI`: `SwingWorker` background threads updating UI without blocking Event Dispatch Thread (EDT). |
| **Classes for Database Operations** | **7** | • Layered DAO design: `BaseDAO<T>`, `UserDAO`, `StockDAO`, `TradeDAO`, `HoldingDAO`, `AlertDAO`, `SecurityDAO`, `SystemSettingsDAO`. Clean separation between Models, DAOs, and Business Logic. |
| **Database Connectivity (JDBC)** | **3** | • `DBConnection.java`: Singleton pattern managing MySQL connection lifecycle, URL properties, credentials, and connection validation. |
| **Implement JDBC for Database Connectivity** | **3** | • `PreparedStatement` parameter binding to prevent SQL injection.<br>• `ResultSet` entity mapping.<br>• **JDBC Transactions**: `conn.setAutoCommit(false)`, `conn.commit()`, and `conn.rollback()` in `TradeDAO.executeTradeTransaction()`. |

---

### 2. Java Web Based Projects Marking Rubric (33 Marks)

| Rubric Component | Marks | Implementation in Codebase |
| :--- | :---: | :--- |
| **Problem Understanding & Solution Design** | **8** | Complete fintech stock trading ecosystem: live market watch, portfolio management, order placement, trade auditing, user administration, financial security logging, REST architecture. |
| **Core Java Concepts** | **10** | Comprehensive usage of OOP (Inheritance, Polymorphism, Encapsulation, Abstraction), Interfaces, Custom Exceptions, Multithreading, Thread Synchronization, and Generics. |
| **Database Integration (JDBC)** | **8** | Normalized MySQL schema (`tradenest_db`), relational integrity with foreign keys, transactional atomicity, PreparedStatement queries. |
| **Servlets & Web Integration** | **7** | Built-in Java HTTP Server & Servlets API (`TradeNestServer.java`): REST endpoints (`/api/auth/login`, `/api/stocks`, `/api/trades`, `/api/holdings`, `/api/users`, `/api/alerts`, `/api/security`, `/api/settings`), CORS headers, JSON streaming, integrated with Vite React frontend. |

---

## 🚀 How to Run

### Option 1: Java Web Server (Servlets / REST API on Port 8080)
```powershell
# Using batch file
.\run-java-server.bat

# Or using npm
npm run java:server

# Or direct command
javac -cp "backend\lib\mysql-connector-j-8.3.0.jar" -d "backend\bin" backend\src\main\java\com\tradenest\**\*.java
java -cp "backend\bin;backend\lib\mysql-connector-j-8.3.0.jar" com.tradenest.server.TradeNestServer 8080
```

### Option 2: Java Swing GUI Desktop Terminal
```powershell
# Using batch file
.\run-java-gui.bat

# Or using npm
npm run java:gui

# Or direct command
java -cp "backend\bin;backend\lib\mysql-connector-j-8.3.0.jar" com.tradenest.gui.TradeNestGUI
```

### Option 3: Test Database Connectivity via Java
```powershell
java -cp "backend\bin;backend\lib\mysql-connector-j-8.3.0.jar" com.tradenest.config.DBConnection
```
