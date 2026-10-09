package com.tradenest.service;

import com.tradenest.dao.StockDAO;
import com.tradenest.interfaces.MarketFeedListener;
import com.tradenest.models.Stock;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Multithreaded Live Market Feed Service.
 * Demonstrates Multithreading & Synchronization in Core Java (Rubric Requirement).
 * Uses a background thread pool to update stock market quotes concurrently.
 */
public class MarketFeedService {
    private static volatile MarketFeedService instance;
    private final StockDAO stockDAO;
    private final ConcurrentHashMap<String, Stock> stockCache = new ConcurrentHashMap<>();
    private final List<MarketFeedListener> listeners = new ArrayList<>();
    private final Object listenerLock = new Object();
    private ScheduledExecutorService scheduler;
    private final Random random = new Random();
    private boolean isRunning = false;

    private MarketFeedService() {
        this.stockDAO = new StockDAO();
        refreshCache();
    }

    public static MarketFeedService getInstance() {
        if (instance == null) {
            synchronized (MarketFeedService.class) {
                if (instance == null) {
                    instance = new MarketFeedService();
                }
            }
        }
        return instance;
    }

    /**
     * Synchronized method to reload stock prices safely into memory.
     */
    public synchronized void refreshCache() {
        try {
            List<Stock> list = stockDAO.findAll();
            for (Stock s : list) {
                stockCache.put(s.getSymbol(), s);
            }
        } catch (Exception e) {
            System.err.println("[MarketFeedService] Failed to load initial stock quotes: " + e.getMessage());
        }
    }

    /**
     * Starts the background price fluctuation thread.
     */
    public synchronized void startFeed() {
        if (isRunning) return;
        isRunning = true;
        scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread t = new Thread(r, "TradeNest-MarketTicker-Thread");
            t.setDaemon(true);
            return t;
        });

        // Run simulation every 3 seconds
        scheduler.scheduleAtFixedRate(this::simulatePriceTick, 2, 3, TimeUnit.SECONDS);
        System.out.println("[MarketFeedService] Live Market Feed thread started.");
    }

    public synchronized void stopFeed() {
        if (!isRunning) return;
        if (scheduler != null && !scheduler.isShutdown()) {
            scheduler.shutdownNow();
        }
        isRunning = false;
        System.out.println("[MarketFeedService] Live Market Feed thread stopped.");
    }

    /**
     * Simulates live market price ticks with thread synchronization.
     */
    private void simulatePriceTick() {
        if (stockCache.isEmpty()) return;

        List<String> symbols = new ArrayList<>(stockCache.keySet());
        String selectedSymbol = symbols.get(random.nextInt(symbols.size()));
        Stock stock = stockCache.get(selectedSymbol);

        if (stock == null) return;

        // Synchronize on the specific stock object to prevent race conditions during tick update
        synchronized (stock) {
            double currentPrice = stock.getPrice();
            // Percentage change between -0.4% and +0.4%
            double deltaPercent = (random.nextDouble() * 0.8 - 0.38) / 100.0;
            double priceChange = Math.round((currentPrice * deltaPercent) * 100.0) / 100.0;
            double newPrice = Math.max(1.0, Math.round((currentPrice + priceChange) * 100.0) / 100.0);

            double open = stock.getOpenPrice() > 0 ? stock.getOpenPrice() : newPrice;
            double netChange = Math.round((newPrice - open) * 100.0) / 100.0;
            double netPercent = Math.round((netChange / open * 100.0) * 100.0) / 100.0;

            stock.setPrice(newPrice);
            stock.setChangeVal(netChange);
            stock.setChangePercent(netPercent);

            if (newPrice > stock.getDayHigh()) stock.setDayHigh(newPrice);
            if (newPrice < stock.getDayLow() || stock.getDayLow() == 0) stock.setDayLow(newPrice);

            // Persist periodically or notify listeners
            notifyListeners(stock);
        }
    }

    public void addListener(MarketFeedListener listener) {
        synchronized (listenerLock) {
            listeners.add(listener);
        }
    }

    public void removeListener(MarketFeedListener listener) {
        synchronized (listenerLock) {
            listeners.remove(listener);
        }
    }

    private void notifyListeners(Stock stock) {
        List<MarketFeedListener> targets;
        synchronized (listenerLock) {
            targets = new ArrayList<>(listeners);
        }
        for (MarketFeedListener l : targets) {
            try {
                l.onPriceUpdated(stock);
            } catch (Exception ignored) {
            }
        }
    }

    public List<Stock> getAllStocks() {
        return new ArrayList<>(stockCache.values());
    }

    public Stock getStock(String symbol) {
        return stockCache.get(symbol);
    }
}
