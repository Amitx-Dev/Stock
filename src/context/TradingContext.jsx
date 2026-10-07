import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { useMarket } from './MarketContext';

const TradingContext = createContext();

export const TradingProvider = ({ children }) => {
  const { user } = useAuth();
  const { stocks } = useMarket();

  const [wallet, setWallet] = useState({ cashBalance: 50000.00 });
  const [portfolio, setPortfolio] = useState([]);
  const [trades, setTrades] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast Helper
  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Load user data on user change
  const loadUserData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [walletData, portData, tradeData, alertData] = await Promise.all([
        api.getWallet(user.id),
        api.getPortfolio(user.id),
        api.getTrades(user.role === 'ADMIN' ? null : user.id),
        api.getAlerts(user.id)
      ]);
      setWallet(walletData || { cashBalance: 50000.00 });
      setPortfolio(portData || []);
      setTrades(tradeData || []);
      setAlerts(alertData || []);
    } catch (err) {
      console.error('Error loading trading data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [user]);

  // Check Price Alerts whenever stocks update
  useEffect(() => {
    if (!alerts.length || !stocks.length) return;

    alerts.forEach(alert => {
      if (alert.status === 'TRIGGERED') return;
      const stock = stocks.find(s => s.id === alert.stockId || s.symbol === alert.symbol);
      if (!stock) return;

      const current = stock.currentPrice;
      const target = alert.targetPrice;
      const isTriggered =
        (alert.condition === 'ABOVE' && current >= target) ||
        (alert.condition === 'BELOW' && current <= target);

      if (isTriggered) {
        showToast(
          `🔔 Price Alert Triggered: ${stock.symbol} is now $${current.toFixed(2)} (${alert.condition} $${target.toFixed(2)})`,
          'warning'
        );
        setAlerts(prev =>
          prev.map(a => (a.id === alert.id ? { ...a, status: 'TRIGGERED' } : a))
        );
      }
    });
  }, [stocks]);

  // Execute Trade (Buy/Sell)
  const executeTrade = async ({ stockId, type, quantity, pricePerShare }) => {
    if (!user) throw new Error('You must be logged in to trade.');
    try {
      const result = await api.executeTrade({
        userId: user.id,
        userName: user.name,
        stockId,
        type,
        quantity,
        pricePerShare
      });

      setWallet(result.wallet);
      setPortfolio(result.portfolio);
      setTrades(prev => [result.trade, ...prev]);

      showToast(
        `Successfully ${type === 'BUY' ? 'purchased' : 'sold'} ${quantity} shares of ${result.trade.symbol} for $${result.trade.totalAmount.toLocaleString()}`,
        'success'
      );
      return result;
    } catch (err) {
      showToast(err.message || 'Trade execution failed', 'error');
      throw err;
    }
  };

  // Deposit Cash
  const depositCash = async (amount) => {
    if (!user) return;
    try {
      const updated = await api.depositCash(user.id, amount);
      setWallet(updated);
      showToast(`Deposited $${amount.toLocaleString()} into trading wallet!`, 'success');
    } catch (err) {
      showToast('Deposit failed', 'error');
    }
  };

  // Create Alert
  const createAlert = async (alertData) => {
    if (!user) return;
    try {
      const newAlert = await api.createAlert({
        userId: user.id,
        ...alertData
      });
      setAlerts(prev => [newAlert, ...prev]);
      showToast(`Price alert created for ${alertData.symbol}!`, 'success');
      return newAlert;
    } catch (err) {
      showToast('Failed to create alert', 'error');
    }
  };

  // Delete Alert
  const deleteAlert = async (id) => {
    try {
      await api.deleteAlert(id);
      setAlerts(prev => prev.filter(a => a.id !== id));
      showToast('Alert removed', 'info');
    } catch (err) {
      showToast('Failed to delete alert', 'error');
    }
  };

  // Calculated Portfolio Values
  const portfolioSummary = React.useMemo(() => {
    let totalInvested = 0;
    let currentValue = 0;

    const holdingsWithMarketData = portfolio.map(item => {
      const liveStock = stocks.find(s => s.id === item.stockId || s.symbol === item.symbol);
      const curPrice = liveStock ? liveStock.currentPrice : item.avgBuyPrice;
      const invested = item.quantity * item.avgBuyPrice;
      const value = item.quantity * curPrice;
      const profitLoss = value - invested;
      const profitLossPercent = invested > 0 ? (profitLoss / invested) * 100 : 0;

      totalInvested += invested;
      currentValue += value;

      return {
        ...item,
        currentPrice: curPrice,
        invested,
        value,
        profitLoss,
        profitLossPercent
      };
    });

    const totalProfitLoss = currentValue - totalInvested;
    const totalProfitLossPercent = totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0;

    return {
      totalInvested,
      currentValue,
      totalProfitLoss,
      totalProfitLossPercent,
      holdings: holdingsWithMarketData
    };
  }, [portfolio, stocks]);

  const unreadAlertsCount = alerts.filter(a => a.status === 'TRIGGERED').length;

  return (
    <TradingContext.Provider value={{
      wallet,
      portfolio: portfolioSummary.holdings,
      portfolioSummary,
      trades,
      alerts,
      unreadAlertsCount,
      loading,
      toasts,
      showToast,
      removeToast,
      executeTrade,
      depositCash,
      createAlert,
      deleteAlert,
      refreshUserData: loadUserData
    }}>
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (!context) throw new Error('useTrading must be used within TradingProvider');
  return context;
};
