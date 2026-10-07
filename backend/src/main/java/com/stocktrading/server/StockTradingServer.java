package com.stocktrading.server;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import com.stocktrading.dao.*;
import com.stocktrading.models.*;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * Lightweight Built-in Java HTTP Server for Online Stock Trading REST API.
 * Uses pure Java standard libraries (com.sun.net.httpserver) - zero Maven/Gradle external bloat needed.
 */
public class StockTradingServer {
    private static final int PORT = 8080;
    private static final StockDAO stockDAO = new StockDAO();
    private static final UserDAO userDAO = new UserDAO();
    private static final TradeDAO tradeDAO = new TradeDAO();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        System.out.println(">>> Starting Stock Trading Java Backend Server on port " + PORT + "...");

        // Setup CORS and endpoints
        server.createContext("/api/stocks", new StocksHandler());
        server.createContext("/api/users", new UsersHandler());
        server.createContext("/api/trades", new TradesHandler());
        server.createContext("/api/health", exchange -> {
            sendResponse(exchange, 200, "{\"status\":\"UP\",\"message\":\"Stock Trading Java Backend is healthy\"}");
        });

        server.setExecutor(null); // default executor
        server.start();
        System.out.println(">>> Server is running at http://localhost:" + PORT + "/");
        System.out.println(">>> Endpoints: /api/stocks, /api/users, /api/trades, /api/health");
    }

    static class StocksHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            try {
                List<Stock> stocks = stockDAO.getAllStocks();
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < stocks.size(); i++) {
                    Stock s = stocks.get(i);
                    sb.append(String.format("{\"id\":%d,\"symbol\":\"%s\",\"companyName\":\"%s\",\"currentPrice\":%s,\"changePercent\":%s,\"dayHigh\":%s,\"dayLow\":%s,\"volume\":%d,\"sector\":\"%s\"}",
                            s.getId(), s.getSymbol(), s.getCompanyName(), s.getCurrentPrice(), s.getChangePercent(), s.getDayHigh(), s.getDayLow(), s.getVolume(), s.getSector()));
                    if (i < stocks.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendResponse(exchange, 200, sb.toString());
            } catch (Exception e) {
                sendResponse(exchange, 500, "{\"error\":\"" + e.getMessage() + "\"}");
            }
        }
    }

    static class UsersHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            try {
                List<User> users = userDAO.getAllUsers();
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < users.size(); i++) {
                    User u = users.get(i);
                    sb.append(String.format("{\"id\":%d,\"name\":\"%s\",\"email\":\"%s\",\"role\":\"%s\",\"status\":\"%s\"}",
                            u.getId(), u.getName(), u.getEmail(), u.getRole(), u.getStatus()));
                    if (i < users.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendResponse(exchange, 200, sb.toString());
            } catch (Exception e) {
                sendResponse(exchange, 500, "{\"error\":\"" + e.getMessage() + "\"}");
            }
        }
    }

    static class TradesHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            addCorsHeaders(exchange);
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            try {
                List<Trade> trades = tradeDAO.getAllTrades();
                StringBuilder sb = new StringBuilder("[");
                for (int i = 0; i < trades.size(); i++) {
                    Trade t = trades.get(i);
                    sb.append(String.format("{\"id\":%d,\"userId\":%d,\"userName\":\"%s\",\"symbol\":\"%s\",\"type\":\"%s\",\"quantity\":%d,\"pricePerShare\":%s,\"totalAmount\":%s,\"status\":\"%s\",\"timestamp\":\"%s\"}",
                            t.getId(), t.getUserId(), t.getUserName(), t.getStockSymbol(), t.getType(), t.getQuantity(), t.getPricePerShare(), t.getTotalAmount(), t.getStatus(), t.getTimestamp()));
                    if (i < trades.size() - 1) sb.append(",");
                }
                sb.append("]");
                sendResponse(exchange, 200, sb.toString());
            } catch (Exception e) {
                sendResponse(exchange, 500, "{\"error\":\"" + e.getMessage() + "\"}");
            }
        }
    }

    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        exchange.getResponseHeaders().add("Content-Type", "application/json; charset=UTF-8");
    }

    private static void sendResponse(HttpExchange exchange, int statusCode, String responseText) throws IOException {
        byte[] bytes = responseText.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }
}
