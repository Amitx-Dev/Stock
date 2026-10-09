const JAVA_API_BASE = 'http://localhost:8080/api';
const NODE_API_BASE = 'http://localhost:5000/api';
const API_BASE = JAVA_API_BASE;

/**
 * TradeNest API Client
 * Seamlessly connects to Java Web Backend (Port 8080) with automatic fallback to Express (Port 5000)
 */

let activeBaseUrl = null;

const getActiveApiBase = async () => {
  if (activeBaseUrl) return activeBaseUrl;
  try {
    const testJava = await fetch(`${JAVA_API_BASE}/health`, { signal: AbortSignal.timeout(600) });
    if (testJava.ok) {
      activeBaseUrl = JAVA_API_BASE;
      return JAVA_API_BASE;
    }
  } catch {}
  try {
    const testNode = await fetch(`${NODE_API_BASE}/health`, { signal: AbortSignal.timeout(600) });
    if (testNode.ok) {
      activeBaseUrl = NODE_API_BASE;
      return NODE_API_BASE;
    }
  } catch {}
  return JAVA_API_BASE;
};

const fetchWithTimeout = async (pathOrUrl, options = {}, timeout = 3000) => {
  const base = await getActiveApiBase();
  let url = pathOrUrl;
  if (url.startsWith('http://localhost:8080/api') || url.startsWith('http://localhost:5000/api')) {
    const relativePath = url.replace(/^http:\/\/localhost:(?:8080|5000)\/api/, '');
    url = `${base}${relativePath}`;
  } else if (!url.startsWith('http')) {
    url = `${base}${url.startsWith('/') ? '' : '/'}${url}`;
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    if (base === JAVA_API_BASE) {
      try {
        const fallbackUrl = url.replace('8080', '5000');
        const fallbackRes = await fetch(fallbackUrl, { ...options, signal: AbortSignal.timeout(1500) });
        if (fallbackRes.ok) {
          activeBaseUrl = NODE_API_BASE;
          clearTimeout(id);
          return fallbackRes;
        }
      } catch {}
    }
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
