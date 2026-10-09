export const reportTypes = [
  { id: 'financial', name: 'Financial Report', description: 'Brokerage revenue, STT, turnover tax, and clearing margins summary' },
  { id: 'user_activity', name: 'User Activity Report', description: 'Logins, onboarding completion rate, KYC status, and churn analytics' },
  { id: 'trade_summary', name: 'Trade Summary Report', description: 'Total trades, gross volume, buy/sell ratios, and exchange clearing batches' },
  { id: 'system_analytics', name: 'System Analytics Report', description: 'API uptime, error rate distribution, latencies, and server resource loads' }
];

export const mockReportDatasets = {
  financial: [
    { date: '2025-10-09', category: 'Equity Delivery', trades: 14200, turnover: '₹142.5 Cr', brokerageEarned: '₹2,84,000', sttTax: '₹1,42,500' },
    { date: '2025-10-08', category: 'Equity Intraday', trades: 38400, turnover: '₹384.2 Cr', brokerageEarned: '₹7,68,000', sttTax: '₹96,050' },
    { date: '2025-10-07', category: 'Futures & Options', trades: 89100, turnover: '₹1,240.0 Cr', brokerageEarned: '₹17,82,000', sttTax: '₹15,50,000' },
    { date: '2025-10-06', category: 'Mutual Funds', trades: 4100, turnover: '₹18.4 Cr', brokerageEarned: '₹0 (Free Direct)', sttTax: '₹0' },
    { date: '2025-10-05', category: 'Commodities', trades: 11200, turnover: '₹89.1 Cr', brokerageEarned: '₹2,24,000', sttTax: '₹89,100' }
  ],
  user_activity: [
    { date: '2025-10-09', newRegistrations: 1450, activeUsers: 48920, kycCompleted: 1390, sessionDurationAvg: '34 mins', bounceRate: '8.4%' },
    { date: '2025-10-08', newRegistrations: 1620, activeUsers: 51200, kycCompleted: 1540, sessionDurationAvg: '38 mins', bounceRate: '7.9%' },
    { date: '2025-10-07', newRegistrations: 1380, activeUsers: 46800, kycCompleted: 1310, sessionDurationAvg: '32 mins', bounceRate: '8.8%' },
    { date: '2025-10-06', newRegistrations: 1890, activeUsers: 54100, kycCompleted: 1810, sessionDurationAvg: '41 mins', bounceRate: '7.2%' },
    { date: '2025-10-05', newRegistrations: 980, activeUsers: 28400, kycCompleted: 920, sessionDurationAvg: '22 mins', bounceRate: '11.5%' }
  ],
  trade_summary: [
    { date: '2025-10-09', totalTrades: 141700, buyVolume: '₹780.2 Cr', sellVolume: '₹746.5 Cr', completedPercent: '99.98%', rejectedCount: 28 },
    { date: '2025-10-08', totalTrades: 156200, buyVolume: '₹890.4 Cr', sellVolume: '₹877.8 Cr', completedPercent: '99.96%', rejectedCount: 62 },
    { date: '2025-10-07', totalTrades: 132400, buyVolume: '₹695.1 Cr', sellVolume: '₹712.3 Cr', completedPercent: '99.99%', rejectedCount: 14 },
    { date: '2025-10-06', totalTrades: 168900, buyVolume: '₹940.0 Cr', sellVolume: '₹931.2 Cr', completedPercent: '99.97%', rejectedCount: 45 },
    { date: '2025-10-05', totalTrades: 38200, buyVolume: '₹190.5 Cr', sellVolume: '₹188.0 Cr', completedPercent: '100.00%', rejectedCount: 0 }
  ],
  system_analytics: [
    { date: '2025-10-09', avgLatency: '2.4 ms', p99Latency: '7.8 ms', peakRps: 18450, errorRate: '0.002%', cpuPeak: '54%', memoryPeak: '62%' },
    { date: '2025-10-08', avgLatency: '2.6 ms', p99Latency: '8.2 ms', peakRps: 21200, errorRate: '0.004%', cpuPeak: '59%', memoryPeak: '64%' },
    { date: '2025-10-07', avgLatency: '2.3 ms', p99Latency: '7.1 ms', peakRps: 17800, errorRate: '0.001%', cpuPeak: '51%', memoryPeak: '60%' },
    { date: '2025-10-06', avgLatency: '2.8 ms', p99Latency: '9.4 ms', peakRps: 23400, errorRate: '0.005%', cpuPeak: '63%', memoryPeak: '68%' },
    { date: '2025-10-05', avgLatency: '1.9 ms', p99Latency: '5.2 ms', peakRps: 8400, errorRate: '0.000%', cpuPeak: '32%', memoryPeak: '48%' }
  ]
};
