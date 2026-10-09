package com.tradenest.service;

import com.tradenest.dao.StockDAO;
import com.tradenest.dao.TradeDAO;
import com.tradenest.exceptions.InsufficientFundsException;
import com.tradenest.exceptions.InvalidOrderException;
import com.tradenest.exceptions.StockNotFoundException;
import com.tradenest.exceptions.TradeNestException;
import com.tradenest.models.MarketOrder;
import com.tradenest.models.Order;
import com.tradenest.models.Stock;
import com.tradenest.models.Trade;

import java.util.Optional;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * High-performance Order Matching & Execution Service.
 * Demonstrates Multithreading, Thread Synchronization, Collections & Generics, and Custom Exceptions.
 */
public class OrderService {
    private static volatile OrderService instance;
    private final TradeDAO tradeDAO;
    private final StockDAO stockDAO;
    private final ConcurrentLinkedQueue<Order> orderAuditQueue; // Collections & Generics
    private final ExecutorService threadPool;                   // Multithreading
    private final Object orderExecutionLock = new Object();     // Thread Synchronization Lock

    private OrderService() {
        this.tradeDAO = new TradeDAO();
        this.stockDAO = new StockDAO();
        this.orderAuditQueue = new ConcurrentLinkedQueue<>();
        // Dedicated thread pool for async order execution tasks
        this.threadPool = Executors.newFixedThreadPool(4, r -> {
            Thread t = new Thread(r, "TradeNest-OrderWorker");
            t.setDaemon(true);
            return t;
        });
    }

    public static OrderService getInstance() {
        if (instance == null) {
            synchronized (OrderService.class) {
                if (instance == null) {
                    instance = new OrderService();
                }
            }
        }
        return instance;
    }

    /**
     * Synchronously executes an order with strict synchronization lock.
     * Prevents race conditions during simultaneous trades on the same portfolio.
     */
    public Trade executeOrder(String userId, String symbol, String type, int quantity, double price)
            throws TradeNestException {

        if (quantity <= 0) {
            throw new InvalidOrderException("Order quantity must be at least 1 share.");
        }
        if (price <= 0) {
            throw new InvalidOrderException("Price per share must be greater than zero.");
        }

        // Validate stock instrument
        Optional<Stock> stockOpt = stockDAO.findById(symbol);
        if (stockOpt.isEmpty()) {
            throw new StockNotFoundException(symbol);
        }

        // Create polymorphic Order model
        String orderId = "ORD-" + System.currentTimeMillis() % 1000000;
        MarketOrder order = new MarketOrder(orderId, userId, symbol, type, quantity, price, null);
        double totalAmount = order.calculateTotalValue();

        // Critical Section: Synchronized to ensure atomic balance & holding consistency
        synchronized (orderExecutionLock) {
            Trade trade = new Trade(
                "TRD-" + (1000 + (int)(Math.random() * 9000)),
                userId,
                symbol,
                type.toUpperCase(),
                quantity,
                price,
                totalAmount,
                0.0,
                0.0,
                "Executed",
                null
            );

            // Execute atomic JDBC transaction
            tradeDAO.executeTradeTransaction(trade);

            // Audit queue tracking (Collections)
            orderAuditQueue.add(order);

            return trade;
        }
    }

    /**
     * Asynchronously submits an order to the Multithreaded Executor Pool.
     */
    public Future<Trade> submitOrderAsync(String userId, String symbol, String type, int quantity, double price) {
        return threadPool.submit(() -> executeOrder(userId, symbol, type, quantity, price));
    }

    public int getQueuedAuditCount() {
        return orderAuditQueue.size();
    }
}
