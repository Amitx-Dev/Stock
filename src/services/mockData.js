export const INITIAL_STOCKS = [
  {
    id: 1,
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    currentPrice: 182.45,
    changePercent: 1.85,
    dayHigh: 184.20,
    dayLow: 180.10,
    volume: 48291000,
    sector: 'Technology',
    sparkline: [178.5, 179.2, 178.8, 180.4, 181.1, 180.9, 182.0, 181.8, 182.45]
  },
  {
    id: 2,
    symbol: 'TSLA',
    companyName: 'Tesla Inc.',
    currentPrice: 248.50,
    changePercent: -2.40,
    dayHigh: 256.30,
    dayLow: 245.10,
    volume: 65120000,
    sector: 'Automotive / EV',
    sparkline: [256.0, 254.5, 255.0, 251.2, 249.0, 250.4, 247.8, 249.1, 248.50]
  },
  {
    id: 3,
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    currentPrice: 875.20,
    changePercent: 4.12,
    dayHigh: 882.00,
    dayLow: 852.10,
    volume: 92140000,
    sector: 'Technology / AI',
    sparkline: [845.0, 850.0, 858.4, 862.0, 860.5, 870.0, 868.2, 872.0, 875.20]
  },
  {
    id: 4,
    symbol: 'MSFT',
    companyName: 'Microsoft Corporation',
    currentPrice: 415.80,
    changePercent: 0.95,
    dayHigh: 418.50,
    dayLow: 412.30,
    volume: 21890000,
    sector: 'Technology',
    sparkline: [412.0, 413.2, 412.8, 414.5, 415.0, 414.8, 416.2, 415.4, 415.80]
  },
  {
    id: 5,
    symbol: 'AMZN',
    companyName: 'Amazon.com Inc.',
    currentPrice: 178.60,
    changePercent: -0.65,
    dayHigh: 181.00,
    dayLow: 177.20,
    volume: 31450000,
    sector: 'Consumer Cyclical',
    sparkline: [180.2, 179.8, 180.5, 178.9, 178.0, 179.2, 178.1, 178.4, 178.60]
  },
  {
    id: 6,
    symbol: 'GOOGL',
    companyName: 'Alphabet Inc.',
    currentPrice: 154.20,
    changePercent: 1.15,
    dayHigh: 156.40,
    dayLow: 153.10,
    volume: 24320000,
    sector: 'Communication',
    sparkline: [152.0, 153.1, 152.8, 154.0, 153.7, 154.5, 153.9, 154.6, 154.20]
  },
  {
    id: 7,
    symbol: 'JPM',
    companyName: 'JPMorgan Chase & Co.',
    currentPrice: 198.30,
    changePercent: 0.45,
    dayHigh: 199.50,
    dayLow: 196.80,
    volume: 14210000,
    sector: 'Financial Services',
    sparkline: [197.0, 197.5, 198.0, 197.8, 198.2, 198.0, 198.5, 198.1, 198.30]
  },
  {
    id: 8,
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd.',
    currentPrice: 2940.00,
    changePercent: 1.35,
    dayHigh: 2965.00,
    dayLow: 2920.00,
    volume: 8950000,
    sector: 'Energy / Conglomerate',
    sparkline: [2900, 2915, 2910, 2930, 2925, 2945, 2938, 2950, 2940]
  },
  {
    id: 9,
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    currentPrice: 3890.50,
    changePercent: -0.80,
    dayHigh: 3925.00,
    dayLow: 3870.00,
    volume: 4120000,
    sector: 'Technology',
    sparkline: [3920, 3915, 3925, 3900, 3895, 3905, 3885, 3892, 3890.50]
  },
  {
    id: 10,
    symbol: 'INFY',
    companyName: 'Infosys Limited',
    currentPrice: 1520.10,
    changePercent: 2.10,
    dayHigh: 1535.00,
    dayLow: 1495.00,
    volume: 7840000,
    sector: 'Technology',
    sparkline: [1490, 1500, 1495, 1510, 1505, 1525, 1518, 1522, 1520.10]
  }
];

export const INITIAL_USERS = [
  {
    id: 1,
    name: 'Platform Administrator',
    email: 'admin@trade.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2025-01-10'
  },
  {
    id: 2,
    name: 'Alex Morgan',
    email: 'trader@trade.com',
    role: 'TRADER',
    status: 'ACTIVE',
    createdAt: '2025-02-14'
  },
  {
    id: 3,
    name: 'Sarah Connor',
    email: 'sarah@trade.com',
    role: 'TRADER',
    status: 'ACTIVE',
    createdAt: '2025-02-20'
  },
  {
    id: 4,
    name: 'David Beckham',
    email: 'david@trade.com',
    role: 'TRADER',
    status: 'ACTIVE',
    createdAt: '2025-03-01'
  },
  {
    id: 5,
    name: 'Elena Gilbert',
    email: 'elena@trade.com',
    role: 'TRADER',
    status: 'SUSPENDED',
    createdAt: '2025-03-05'
  }
];

export const INITIAL_WALLETS = {
  2: { userId: 2, cashBalance: 45280.50 },
  3: { userId: 3, cashBalance: 18900.00 },
  4: { userId: 4, cashBalance: 32150.00 }
};

export const INITIAL_PORTFOLIO = [
  { userId: 2, stockId: 1, symbol: 'AAPL', companyName: 'Apple Inc.', quantity: 25, avgBuyPrice: 175.20 },
  { userId: 2, stockId: 3, symbol: 'NVDA', companyName: 'NVIDIA Corporation', quantity: 10, avgBuyPrice: 820.00 },
  { userId: 2, stockId: 4, symbol: 'MSFT', companyName: 'Microsoft Corporation', quantity: 15, avgBuyPrice: 402.50 },
  { userId: 2, stockId: 7, symbol: 'JPM', companyName: 'JPMorgan Chase & Co.', quantity: 30, avgBuyPrice: 190.00 }
];

export const INITIAL_TRADES = [
  {
    id: 101,
    userId: 2,
    userName: 'Alex Morgan',
    stockId: 1,
    symbol: 'AAPL',
    type: 'BUY',
    quantity: 25,
    pricePerShare: 175.20,
    totalAmount: 4380.00,
    status: 'FILLED',
    timestamp: '2026-03-18 10:15:22'
  },
  {
    id: 102,
    userId: 2,
    userName: 'Alex Morgan',
    stockId: 3,
    symbol: 'NVDA',
    type: 'BUY',
    quantity: 10,
    pricePerShare: 820.00,
    totalAmount: 8200.00,
    status: 'FILLED',
    timestamp: '2026-03-19 11:42:05'
  },
  {
    id: 103,
    userId: 3,
    userName: 'Sarah Connor',
    stockId: 2,
    symbol: 'TSLA',
    type: 'BUY',
    quantity: 15,
    pricePerShare: 252.00,
    totalAmount: 3780.00,
    status: 'FILLED',
    timestamp: '2026-03-20 14:02:11'
  },
  {
    id: 104,
    userId: 2,
    userName: 'Alex Morgan',
    stockId: 4,
    symbol: 'MSFT',
    type: 'BUY',
    quantity: 15,
    pricePerShare: 402.50,
    totalAmount: 6037.50,
    status: 'FILLED',
    timestamp: '2026-03-21 09:35:40'
  },
  {
    id: 105,
    userId: 4,
    userName: 'David Beckham',
    stockId: 1,
    symbol: 'AAPL',
    type: 'BUY',
    quantity: 50,
    pricePerShare: 180.50,
    totalAmount: 9025.00,
    status: 'FILLED',
    timestamp: '2026-03-22 13:10:02'
  },
  {
    id: 106,
    userId: 2,
    userName: 'Alex Morgan',
    stockId: 2,
    symbol: 'TSLA',
    type: 'SELL',
    quantity: 10,
    pricePerShare: 255.00,
    totalAmount: 2550.00,
    status: 'FILLED',
    timestamp: '2026-03-22 15:20:19'
  },
  {
    id: 107,
    userId: 3,
    userName: 'Sarah Connor',
    stockId: 5,
    symbol: 'AMZN',
    type: 'BUY',
    quantity: 20,
    pricePerShare: 179.00,
    totalAmount: 3580.00,
    status: 'FILLED',
    timestamp: '2026-03-23 09:45:10'
  }
];

export const INITIAL_ALERTS = [
  { id: 1, userId: 2, stockId: 1, symbol: 'AAPL', targetPrice: 185.00, condition: 'ABOVE', status: 'ACTIVE' },
  { id: 2, userId: 2, stockId: 2, symbol: 'TSLA', targetPrice: 240.00, condition: 'BELOW', status: 'ACTIVE' },
  { id: 3, userId: 2, stockId: 3, symbol: 'NVDA', targetPrice: 900.00, condition: 'ABOVE', status: 'ACTIVE' },
  { id: 4, userId: 2, stockId: 4, symbol: 'MSFT', targetPrice: 410.00, condition: 'BELOW', status: 'TRIGGERED' }
];

export const INITIAL_SECURITY_SETTINGS = {
  enforce2FA: true,
  sessionTimeout: '30m',
  strictPasswordPolicy: true,
  ipWhitelisting: false,
  auditLogging: true,
  maxLoginAttempts: 5
};

export const INITIAL_SECURITY_LOGS = [
  { id: 1, ipAddress: '192.168.1.105', event: 'Failed login attempt threshold exceeded (user: elena@trade.com)', severity: 'HIGH', time: '10 mins ago' },
  { id: 2, ipAddress: '10.0.0.12', event: 'Admin session initiated with 2FA verified', severity: 'LOW', time: '35 mins ago' },
  { id: 3, ipAddress: '172.16.4.88', event: 'Unusual trade burst rate limited', severity: 'MEDIUM', time: '1 hour ago' },
  { id: 4, ipAddress: '192.168.1.201', event: 'Password reset token requested', severity: 'LOW', time: '2 hours ago' },
  { id: 5, ipAddress: '45.33.32.156', event: 'Automated vulnerability port scan blocked by firewall', severity: 'CRITICAL', time: '4 hours ago' }
];

export const INITIAL_SYSTEM_SETTINGS = {
  marketOpenTime: '09:15',
  marketCloseTime: '15:30',
  maxTradeLimit: 100000,
  circuitBreakerPercent: 10,
  brokerageFeePercent: 0.1,
  maintenanceMode: false
};
