export const initialSystemSettings = {
  platformName: 'TradeNest Pro',
  tradingHours: '09:15 - 15:30 IST',
  brokerageRateEquity: '0.05% or ₹20 (whichever is lower)',
  brokerageFlatAmount: 20,
  defaultCurrency: 'INR (₹)',
  maintenanceMode: false,
  orderRateLimitPerSec: 100,
  settlementCycle: 'T+1 Days',
  tickSize: 0.05,
  supportEmail: 'support@tradenest.fintech.in'
};

export const initialSystemServices = [
  {
    name: 'Core Trading Engine',
    category: 'Execution',
    status: 'Operational',
    statusColor: 'emerald',
    uptime: '99.99%',
    latency: '1.2 ms',
    load: '28%'
  },
  {
    name: 'Real-Time Market Feed (NSE/BSE)',
    category: 'Market Data',
    status: 'Operational',
    statusColor: 'emerald',
    uptime: '99.98%',
    latency: '4.8 ms',
    load: '42%'
  },
  {
    name: 'Primary Ledger DB (PostgreSQL Cluster)',
    category: 'Database',
    status: 'Operational',
    statusColor: 'emerald',
    uptime: '99.95%',
    latency: '2.1 ms',
    load: '35%'
  },
  {
    name: 'Payment & Banking Gateway',
    category: 'Payments',
    status: 'Minor Degradation',
    statusColor: 'amber',
    uptime: '99.60%',
    latency: '148 ms',
    load: '67%'
  },
  {
    name: 'Public REST & WebSocket Gateway',
    category: 'API Gateway',
    status: 'Operational',
    statusColor: 'emerald',
    uptime: '99.99%',
    latency: '3.4 ms',
    load: '31%'
  }
];
