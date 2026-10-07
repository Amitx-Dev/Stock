import {
  INITIAL_STOCKS,
  INITIAL_USERS,
  INITIAL_WALLETS,
  INITIAL_PORTFOLIO,
  INITIAL_TRADES,
  INITIAL_ALERTS,
  INITIAL_SECURITY_SETTINGS,
  INITIAL_SECURITY_LOGS,
  INITIAL_SYSTEM_SETTINGS
} from './mockData';

// Toggle between pure LocalStorage mock and Java Backend
export const USE_MOCK = true;
const JAVA_API_BASE = 'http://localhost:8080/api';

// Helper to simulate realistic network delay in mock mode
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage Persistence Keys
const STORAGE_KEYS = {
  STOCKS: 'stock_platform_stocks',
  USERS: 'stock_platform_users',
  WALLETS: 'stock_platform_wallets',
  PORTFOLIO: 'stock_platform_portfolio',
  TRADES: 'stock_platform_trades',
  ALERTS: 'stock_platform_alerts',
  SECURITY: 'stock_platform_security',
  SETTINGS: 'stock_platform_settings',
  LOGS: 'stock_platform_security_logs'
};

const getStored = (key, defaultData) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultData;
  } catch (e) {
    return defaultData;
  }
};

const setStored = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Storage error', e);
  }
};

// Initialize default storage if empty
if (!localStorage.getItem(STORAGE_KEYS.STOCKS)) {
  setStored(STORAGE_KEYS.STOCKS, INITIAL_STOCKS);
  setStored(STORAGE_KEYS.USERS, INITIAL_USERS);
  setStored(STORAGE_KEYS.WALLETS, INITIAL_WALLETS);
  setStored(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
  setStored(STORAGE_KEYS.TRADES, INITIAL_TRADES);
  setStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
  setStored(STORAGE_KEYS.SECURITY, INITIAL_SECURITY_SETTINGS);
  setStored(STORAGE_KEYS.LOGS, INITIAL_SECURITY_LOGS);
  setStored(STORAGE_KEYS.SETTINGS, INITIAL_SYSTEM_SETTINGS);
}

export const api = {
  // === STOCKS ===
  async getStocks() {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/stocks`);
      return res.json();
    }
    await delay();
    return getStored(STORAGE_KEYS.STOCKS, INITIAL_STOCKS);
  },

  async updateStockPrice(stockId, newPrice, changePercent) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/stocks/${stockId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPrice: newPrice, changePercent })
      });
      return res.json();
    }
    const stocks = getStored(STORAGE_KEYS.STOCKS, INITIAL_STOCKS);
    const updated = stocks.map(s => {
      if (s.id === stockId) {
        const spark = [...(s.sparkline || [])];
        spark.shift();
        spark.push(newPrice);
        return {
          ...s,
          currentPrice: newPrice,
          changePercent,
          dayHigh: Math.max(s.dayHigh, newPrice),
          dayLow: Math.min(s.dayLow, newPrice),
          sparkline: spark
        };
      }
      return s;
    });
    setStored(STORAGE_KEYS.STOCKS, updated);
    return updated.find(s => s.id === stockId);
  },

  // === WALLET ===
  async getWallet(userId) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/wallets/${userId}`);
      return res.json();
    }
    await delay(100);
    const wallets = getStored(STORAGE_KEYS.WALLETS, INITIAL_WALLETS);
    return wallets[userId] || { userId, cashBalance: 50000.00 };
  },

  async depositCash(userId, amount) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/wallets/${userId}/deposit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      return res.json();
    }
    await delay();
    const wallets = getStored(STORAGE_KEYS.WALLETS, INITIAL_WALLETS);
    const current = wallets[userId] || { userId, cashBalance: 0 };
    const updatedWallet = {
      ...current,
      cashBalance: Number((current.cashBalance + amount).toFixed(2))
    };
    wallets[userId] = updatedWallet;
    setStored(STORAGE_KEYS.WALLETS, wallets);
    return updatedWallet;
  },

  // === PORTFOLIO ===
  async getPortfolio(userId) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/portfolio/${userId}`);
      return res.json();
    }
    await delay();
    const all = getStored(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
    return all.filter(p => p.userId === userId && p.quantity > 0);
  },

  // === TRADES ===
  async getTrades(userId = null) {
    if (!USE_MOCK) {
      const url = userId ? `${JAVA_API_BASE}/trades?userId=${userId}` : `${JAVA_API_BASE}/trades`;
      const res = await fetch(url);
      return res.json();
    }
    await delay();
    const trades = getStored(STORAGE_KEYS.TRADES, INITIAL_TRADES);
    if (userId) {
      return trades.filter(t => t.userId === userId);
    }
    return trades;
  },

  async executeTrade({ userId, userName, stockId, type, quantity, pricePerShare }) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, stockId, type, quantity, pricePerShare })
      });
      return res.json();
    }

    await delay(300);
    const totalAmount = Number((quantity * pricePerShare).toFixed(2));
    const wallets = getStored(STORAGE_KEYS.WALLETS, INITIAL_WALLETS);
    const wallet = wallets[userId] || { userId, cashBalance: 50000.00 };
    const portfolios = getStored(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
    const stocks = getStored(STORAGE_KEYS.STOCKS, INITIAL_STOCKS);
    const stock = stocks.find(s => s.id === stockId);

    if (type === 'BUY') {
      if (wallet.cashBalance < totalAmount) {
        throw new Error('Insufficient cash balance in wallet.');
      }
      wallet.cashBalance = Number((wallet.cashBalance - totalAmount).toFixed(2));

      // Update Portfolio
      const existingIdx = portfolios.findIndex(p => p.userId === userId && p.stockId === stockId);
      if (existingIdx >= 0) {
        const existing = portfolios[existingIdx];
        const newQty = existing.quantity + quantity;
        const newAvg = Number(((existing.quantity * existing.avgBuyPrice + totalAmount) / newQty).toFixed(2));
        portfolios[existingIdx] = {
          ...existing,
          quantity: newQty,
          avgBuyPrice: newAvg
        };
      } else {
        portfolios.push({
          userId,
          stockId,
          symbol: stock?.symbol || 'STOCK',
          companyName: stock?.companyName || 'Company',
          quantity,
          avgBuyPrice: pricePerShare
        });
      }
    } else if (type === 'SELL') {
      const existingIdx = portfolios.findIndex(p => p.userId === userId && p.stockId === stockId);
      if (existingIdx < 0 || portfolios[existingIdx].quantity < quantity) {
        throw new Error('Insufficient shares in portfolio to sell.');
      }
      wallet.cashBalance = Number((wallet.cashBalance + totalAmount).toFixed(2));
      const existing = portfolios[existingIdx];
      const remainingQty = existing.quantity - quantity;
      if (remainingQty === 0) {
        portfolios.splice(existingIdx, 1);
      } else {
        portfolios[existingIdx] = {
          ...existing,
          quantity: remainingQty
        };
      }
    }

    wallets[userId] = wallet;
    setStored(STORAGE_KEYS.WALLETS, wallets);
    setStored(STORAGE_KEYS.PORTFOLIO, portfolios);

    // Record trade
    const trades = getStored(STORAGE_KEYS.TRADES, INITIAL_TRADES);
    const newTrade = {
      id: Date.now(),
      userId,
      userName: userName || 'Trader',
      stockId,
      symbol: stock?.symbol || 'STOCK',
      companyName: stock?.companyName || 'Company',
      type,
      quantity,
      pricePerShare,
      totalAmount,
      status: 'FILLED',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    trades.unshift(newTrade);
    setStored(STORAGE_KEYS.TRADES, trades);

    return { success: true, trade: newTrade, wallet, portfolio: portfolios.filter(p => p.userId === userId) };
  },

  // === ALERTS ===
  async getAlerts(userId) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/alerts?userId=${userId}`);
      return res.json();
    }
    await delay(100);
    const alerts = getStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
    return alerts.filter(a => a.userId === userId);
  },

  async createAlert(alertData) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alertData)
      });
      return res.json();
    }
    await delay(150);
    const alerts = getStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
    const newAlert = {
      id: Date.now(),
      status: 'ACTIVE',
      ...alertData
    };
    alerts.unshift(newAlert);
    setStored(STORAGE_KEYS.ALERTS, alerts);
    return newAlert;
  },

  async deleteAlert(id) {
    if (!USE_MOCK) {
      await fetch(`${JAVA_API_BASE}/alerts/${id}`, { method: 'DELETE' });
      return true;
    }
    await delay(100);
    const alerts = getStored(STORAGE_KEYS.ALERTS, INITIAL_ALERTS);
    const updated = alerts.filter(a => a.id !== id);
    setStored(STORAGE_KEYS.ALERTS, updated);
    return true;
  },

  // === USERS (ADMIN) ===
  async getUsers() {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/users`);
      return res.json();
    }
    await delay(200);
    return getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
  },

  async createUser(userData) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return res.json();
    }
    await delay(200);
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const newUser = {
      id: Date.now(),
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
      ...userData
    };
    users.push(newUser);
    setStored(STORAGE_KEYS.USERS, users);

    // Initialize wallet
    const wallets = getStored(STORAGE_KEYS.WALLETS, INITIAL_WALLETS);
    wallets[newUser.id] = { userId: newUser.id, cashBalance: 50000.00 };
    setStored(STORAGE_KEYS.WALLETS, wallets);

    return newUser;
  },

  async updateUser(userData) {
    if (!USE_MOCK) {
      const res = await fetch(`${JAVA_API_BASE}/users/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      return res.json();
    }
    await delay(200);
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = users.map(u => (u.id === userData.id ? { ...u, ...userData } : u));
    setStored(STORAGE_KEYS.USERS, updated);
    return userData;
  },

  async deleteUser(id) {
    if (!USE_MOCK) {
      await fetch(`${JAVA_API_BASE}/users/${id}`, { method: 'DELETE' });
      return true;
    }
    await delay(150);
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const updated = users.filter(u => u.id !== id);
    setStored(STORAGE_KEYS.USERS, updated);
    return true;
  },

  // === SECURITY & SETTINGS (ADMIN) ===
  async getSecuritySettings() {
    await delay(100);
    return getStored(STORAGE_KEYS.SECURITY, INITIAL_SECURITY_SETTINGS);
  },

  async updateSecuritySettings(newSettings) {
    await delay(150);
    setStored(STORAGE_KEYS.SECURITY, newSettings);
    return newSettings;
  },

  async getSecurityLogs() {
    await delay(150);
    return getStored(STORAGE_KEYS.LOGS, INITIAL_SECURITY_LOGS);
  },

  async getSystemSettings() {
    await delay(100);
    return getStored(STORAGE_KEYS.SETTINGS, INITIAL_SYSTEM_SETTINGS);
  },

  async updateSystemSettings(newSettings) {
    await delay(200);
    setStored(STORAGE_KEYS.SETTINGS, newSettings);
    return newSettings;
  },

  // === REPORT GENERATION ===
  async generateReport(type) {
    await delay(400);
    const trades = getStored(STORAGE_KEYS.TRADES, INITIAL_TRADES);
    const users = getStored(STORAGE_KEYS.USERS, INITIAL_USERS);
    const stocks = getStored(STORAGE_KEYS.STOCKS, INITIAL_STOCKS);

    if (type === 'daily_summary') {
      const totalVolume = trades.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
      return {
        title: 'Daily Market Summary Report',
        generatedAt: new Date().toLocaleString(),
        metrics: [
          { label: 'Total Trades Executed', value: trades.length },
          { label: 'Gross Traded Volume', value: `$${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
          { label: 'Active Trading Users', value: users.filter(u => u.role === 'TRADER').length },
          { label: 'Top Moving Stock', value: 'NVDA (+4.12%)' }
        ],
        data: trades.slice(0, 10)
      };
    } else if (type === 'user_activity') {
      return {
        title: 'User Activity & Compliance Report',
        generatedAt: new Date().toLocaleString(),
        metrics: [
          { label: 'Total Registered Accounts', value: users.length },
          { label: 'Active Accounts', value: users.filter(u => u.status === 'ACTIVE').length },
          { label: 'Suspended Accounts', value: users.filter(u => u.status === 'SUSPENDED').length },
          { label: 'Administrators', value: users.filter(u => u.role === 'ADMIN').length }
        ],
        data: users
      };
    } else if (type === 'revenue') {
      const totalVolume = trades.reduce((acc, t) => acc + (t.totalAmount || 0), 0);
      const feeRevenue = totalVolume * 0.001; // 0.1% platform fee
      return {
        title: 'Platform Brokerage Revenue Report',
        generatedAt: new Date().toLocaleString(),
        metrics: [
          { label: 'Gross Traded Turnover', value: `$${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
          { label: 'Brokerage Fee Rate', value: '0.10%' },
          { label: 'Net Commission Revenue', value: `$${feeRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
          { label: 'Regulatory Compliance Status', value: '100% Cleared' }
        ],
        data: trades.map(t => ({
          ...t,
          platformFee: (t.totalAmount * 0.001).toFixed(2)
        }))
      };
    }
  },

  // Reset demo data
  resetAllData() {
    localStorage.clear();
    window.location.reload();
  }
};
