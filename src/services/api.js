const API_BASE = 'http://localhost:5000/api';

/**
 * TradeNest API Client
 * Connects to Express + MySQL backend with automatic fallback
 */

const fetchWithTimeout = async (url, options = {}, timeout = 3000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/health`, {}, 2000);
      return await res.json();
    } catch {
      return { status: 'OFFLINE', database: 'In-Memory Fallback' };
    }
  },

  // Auth Login
  login: async (email, password, role) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Users
  getUsers: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/users`);
      return await res.json();
    } catch {
      return null;
    }
  },

  createUser: async (user) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  updateUser: async (id, user) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/users/${id}`, { method: 'DELETE' });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Stocks
  getStocks: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/stocks`);
      return await res.json();
    } catch {
      return null;
    }
  },

  // Holdings
  getHoldings: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/holdings`);
      return await res.json();
    } catch {
      return null;
    }
  },

  // Trades
  getTrades: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/trades`);
      return await res.json();
    } catch {
      return null;
    }
  },

  createTrade: async (trade) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/trades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trade)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Alerts
  getAlerts: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/alerts`);
      return await res.json();
    } catch {
      return null;
    }
  },

  createAlert: async (alert) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  deleteAlert: async (id) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/alerts/${id}`, { method: 'DELETE' });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Security
  getSecurity: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/security`);
      return await res.json();
    } catch {
      return null;
    }
  },

  updateSecurity: async (settings) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/security`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      return await res.json();
    } catch {
      return null;
    }
  },

  // Settings
  getSettings: async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/settings`);
      return await res.json();
    } catch {
      return null;
    }
  },

  updateSettings: async (settings) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      return await res.json();
    } catch {
      return null;
    }
  }
};
