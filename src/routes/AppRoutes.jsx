import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Public pages
import { HomePage } from '../pages/public/HomePage';
import { LoginPage } from '../pages/public/LoginPage';

// Admin pages
import { AdminLayout } from '../pages/admin/AdminLayout';
import { UserManagementPage } from '../pages/admin/UserManagementPage';
import { FinancialSecurityPage } from '../pages/admin/FinancialSecurityPage';
import { SystemSettingsPage } from '../pages/admin/SystemSettingsPage';
import { TradeActivityPage } from '../pages/admin/TradeActivityPage';
import { ReportGenerationPage } from '../pages/admin/ReportGenerationPage';

// Trader pages
import { TraderLayout } from '../pages/trader/TraderLayout';
import { StockTradingPage } from '../pages/trader/StockTradingPage';
import { PortfolioOverviewPage } from '../pages/trader/PortfolioOverviewPage';
import { MarketUpdatesPage } from '../pages/trader/MarketUpdatesPage';
import { TradeHistoryPage } from '../pages/trader/TradeHistoryPage';
import { AlertsNotificationsPage } from '../pages/trader/AlertsNotificationsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Admin Dashboard (Protected for Admin role) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/users" replace />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="security" element={<FinancialSecurityPage />} />
        <Route path="settings" element={<SystemSettingsPage />} />
        <Route path="activity" element={<TradeActivityPage />} />
        <Route path="reports" element={<ReportGenerationPage />} />
      </Route>

      {/* Trader Dashboard (Protected for Trader role) */}
      <Route
        path="/trader"
        element={
          <ProtectedRoute requiredRole="trader">
            <TraderLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/trader/trading" replace />} />
        <Route path="trading" element={<StockTradingPage />} />
        <Route path="portfolio" element={<PortfolioOverviewPage />} />
        <Route path="market" element={<MarketUpdatesPage />} />
        <Route path="history" element={<TradeHistoryPage />} />
        <Route path="alerts" element={<AlertsNotificationsPage />} />
      </Route>

      {/* Catch-all redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
