export const mockHoldings = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    qty: 25,
    avgPrice: 2840.00,
    ltp: 2985.50,
    invested: 71000.00,
    current: 74637.50,
    pnl: 3637.50,
    pnlPercent: 5.12,
    allocation: 28.5,
    sector: 'Energy'
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    qty: 12,
    avgPrice: 4120.00,
    ltp: 4280.10,
    invested: 49440.00,
    current: 51361.20,
    pnl: 1921.20,
    pnlPercent: 3.89,
    allocation: 19.6,
    sector: 'IT'
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    qty: 30,
    avgPrice: 1780.00,
    ltp: 1894.20,
    invested: 53400.00,
    current: 56826.00,
    pnl: 3426.00,
    pnlPercent: 6.42,
    allocation: 21.7,
    sector: 'IT'
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Limited',
    qty: 40,
    avgPrice: 910.00,
    ltp: 968.40,
    invested: 36400.00,
    current: 38736.00,
    pnl: 2336.00,
    pnlPercent: 6.42,
    allocation: 14.8,
    sector: 'Auto'
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    qty: 25,
    avgPrice: 1675.00,
    ltp: 1642.30,
    invested: 41875.00,
    current: 41057.50,
    pnl: -817.50,
    pnlPercent: -1.95,
    allocation: 15.4,
    sector: 'Banking'
  }
];

export const portfolioSummary = {
  totalInvested: 252115.00,
  currentValue: 262618.20,
  dayPnl: 3240.50,
  dayPnlPercent: 1.25,
  overallPnl: 10503.20,
  overallPnlPercent: 4.17,
  availableMargin: 84320.00,
  usedMargin: 15680.00
};

export const portfolioTimeline = {
  '1D': [
    { time: '09:15', value: 259377 },
    { time: '10:00', value: 260100 },
    { time: '10:45', value: 259850 },
    { time: '11:30', value: 260800 },
    { time: '12:15', value: 261400 },
    { time: '13:00', value: 261100 },
    { time: '13:45', value: 261900 },
    { time: '14:30', value: 262800 },
    { time: '15:15', value: 262450 },
    { time: '15:30', value: 262618.20 }
  ],
  '1W': [
    { time: 'Mon', value: 254200 },
    { time: 'Tue', value: 256800 },
    { time: 'Wed', value: 255400 },
    { time: 'Thu', value: 259800 },
    { time: 'Fri', value: 262618.20 }
  ],
  '1M': [
    { time: 'Week 1', value: 245000 },
    { time: 'Week 2', value: 248600 },
    { time: 'Week 3', value: 253400 },
    { time: 'Week 4', value: 262618.20 }
  ],
  '1Y': [
    { time: 'Oct 24', value: 198000 },
    { time: 'Dec 24', value: 215000 },
    { time: 'Feb 25', value: 224000 },
    { time: 'Apr 25', value: 236000 },
    { time: 'Jun 25', value: 244000 },
    { time: 'Aug 25', value: 251000 },
    { time: 'Oct 25', value: 262618.20 }
  ]
};

export const sectorAllocations = [
  { name: 'Energy', value: 74637.50, color: '#5F259F' },
  { name: 'Information Tech', value: 108187.20, color: '#805ad5' },
  { name: 'Automobile', value: 38736.00, color: '#00b386' },
  { name: 'Banking & Finance', value: 41057.50, color: '#3b82f6' }
];
