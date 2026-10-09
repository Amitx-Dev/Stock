export const mockTradeHistory = [
  {
    id: 'TRD-9021',
    date: '2025-10-09 14:15',
    stock: 'TATAMOTORS',
    type: 'BUY',
    qty: 20,
    price: 968.00,
    total: 19360.00,
    status: 'Executed',
    pnl: 140.00,
    pnlPercent: 0.72
  },
  {
    id: 'TRD-9018',
    date: '2025-10-09 11:42',
    stock: 'INFY',
    type: 'BUY',
    qty: 15,
    price: 1875.50,
    total: 28132.50,
    status: 'Executed',
    pnl: 280.50,
    pnlPercent: 1.00
  },
  {
    id: 'TRD-8994',
    date: '2025-10-08 15:10',
    stock: 'ZOMATO',
    type: 'SELL',
    qty: 50,
    price: 275.20,
    total: 13760.00,
    status: 'Executed',
    pnl: 1850.00,
    pnlPercent: 15.53
  },
  {
    id: 'TRD-8972',
    date: '2025-10-07 10:20',
    stock: 'RELIANCE',
    type: 'BUY',
    qty: 10,
    price: 2940.00,
    total: 29400.00,
    status: 'Executed',
    pnl: 455.00,
    pnlPercent: 1.55
  },
  {
    id: 'TRD-8950',
    date: '2025-10-06 14:45',
    stock: 'HDFCBANK',
    type: 'BUY',
    qty: 15,
    price: 1665.00,
    total: 24975.00,
    status: 'Executed',
    pnl: -340.50,
    pnlPercent: -1.36
  },
  {
    id: 'TRD-8910',
    date: '2025-10-03 12:30',
    stock: 'TCS',
    type: 'SELL',
    qty: 8,
    price: 4260.00,
    total: 34080.00,
    status: 'Executed',
    pnl: 1680.00,
    pnlPercent: 5.18
  },
  {
    id: 'TRD-8880',
    date: '2025-10-01 10:05',
    stock: 'BHARTIARTL',
    type: 'BUY',
    qty: 25,
    price: 1610.00,
    total: 40250.00,
    status: 'Executed',
    pnl: 1102.50,
    pnlPercent: 2.74
  },
  {
    id: 'TRD-8842',
    date: '2025-09-28 11:15',
    stock: 'WIPRO',
    type: 'SELL',
    qty: 40,
    price: 538.00,
    total: 21520.00,
    status: 'Executed',
    pnl: -480.00,
    pnlPercent: -2.18
  }
];

export const tradePerformanceStats = {
  totalTrades: 42,
  profitableTrades: 31,
  lossTrades: 11,
  winRate: 73.8,
  bestTrade: {
    stock: 'ZOMATO',
    profit: '+₹1,850.00 (+15.5%)',
    date: '08 Oct 2025'
  },
  worstTrade: {
    stock: 'WIPRO',
    loss: '-₹480.00 (-2.18%)',
    date: '28 Sep 2025'
  },
  totalProfitRealized: 18420.50,
  averageTradeValue: 24500.00
};
