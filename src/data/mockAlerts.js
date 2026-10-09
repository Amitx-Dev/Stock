export const initialAlerts = [
  {
    id: 'ALT-101',
    stock: 'RELIANCE',
    condition: 'ABOVE',
    targetPrice: 3000.00,
    currentPrice: 2985.50,
    status: 'ACTIVE',
    createdAt: '2025-10-08 09:30'
  },
  {
    id: 'ALT-102',
    stock: 'HDFCBANK',
    condition: 'BELOW',
    targetPrice: 1630.00,
    currentPrice: 1642.30,
    status: 'ACTIVE',
    createdAt: '2025-10-07 14:10'
  },
  {
    id: 'ALT-103',
    stock: 'TATAMOTORS',
    condition: 'ABOVE',
    targetPrice: 975.00,
    currentPrice: 968.40,
    status: 'ACTIVE',
    createdAt: '2025-10-09 10:15'
  },
  {
    id: 'ALT-104',
    stock: 'TCS',
    condition: 'ABOVE',
    targetPrice: 4250.00,
    currentPrice: 4280.10,
    status: 'TRIGGERED',
    createdAt: '2025-10-06 11:00'
  }
];

export const initialNotifications = [
  {
    id: 'NTF-1',
    type: 'trade',
    title: 'Trade Executed: TATAMOTORS',
    message: 'Your BUY order for 20 shares of TATAMOTORS at ₹968.00 has been filled.',
    timestamp: '25 mins ago',
    read: false,
    badgeColor: 'green'
  },
  {
    id: 'NTF-2',
    type: 'alert',
    title: 'Price Alert Triggered: TCS',
    message: 'TCS crossed above ₹4,250.00 (Current: ₹4,280.10).',
    timestamp: '1 hour ago',
    read: false,
    badgeColor: 'purple'
  },
  {
    id: 'NTF-3',
    type: 'system',
    title: 'Dividend Credited',
    message: 'Dividend of ₹250.00 for INFY credited directly to your bank account.',
    timestamp: '3 hours ago',
    read: true,
    badgeColor: 'blue'
  },
  {
    id: 'NTF-4',
    type: 'security',
    title: 'New Device Login Detected',
    message: 'Successful login from Chrome on Windows (IP: 103.21.58.12).',
    timestamp: 'Yesterday',
    read: true,
    badgeColor: 'amber'
  }
];
