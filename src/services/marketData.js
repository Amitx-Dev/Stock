// Professional Market Data Service modeled after Groww, Upstox, and Zerodha Kite
// Real Indian NSE & BSE Bluechip Equities, Indices, Market Depth & Option Chain

export const MARKET_INDICES = [
  {
    symbol: 'NIFTY 50',
    name: 'NIFTY 50 Index',
    value: 24852.15,
    change: 118.40,
    changePercent: 0.48,
    isPositive: true,
    dayHigh: 24898.30,
    dayLow: 24720.10,
    sparkline: [24720, 24760, 24740, 24810, 24830, 24800, 24852]
  },
  {
    symbol: 'SENSEX',
    name: 'BSE SENSEX',
    value: 81425.60,
    change: 342.10,
    changePercent: 0.42,
    isPositive: true,
    dayHigh: 81560.00,
    dayLow: 81090.50,
    sparkline: [81090, 81180, 81250, 81380, 81300, 81425]
  },
  {
    symbol: 'BANK NIFTY',
    name: 'NIFTY Bank',
    value: 51320.80,
    change: -84.20,
    changePercent: -0.16,
    isPositive: false,
    dayHigh: 51580.00,
    dayLow: 51190.20,
    sparkline: [51580, 51420, 51380, 51220, 51350, 51320]
  },
  {
    symbol: 'FINNIFTY',
    name: 'NIFTY Financial',
    value: 23610.45,
    change: 45.10,
    changePercent: 0.19,
    isPositive: true,
    dayHigh: 23680.00,
    dayLow: 23540.00,
    sparkline: [23540, 23590, 23580, 23640, 23610]
  },
  {
    symbol: 'MIDCPNIFTY',
    name: 'NIFTY Midcap Select',
    value: 12840.90,
    change: 92.30,
    changePercent: 0.72,
    isPositive: true,
    dayHigh: 12870.00,
    dayLow: 12710.00,
    sparkline: [12710, 12750, 12790, 12820, 12840]
  }
];

export const PRO_STOCKS = [
  {
    id: 'RELIANCE',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd.',
    exchange: 'NSE',
    sector: 'Energy & Oil',
    currentPrice: 2942.50,
    previousClose: 2904.00,
    change: 38.50,
    changePercent: 1.33,
    dayOpen: 2912.00,
    dayHigh: 2965.00,
    dayLow: 2908.00,
    volume: 8492010,
    volumeFormatted: '8.49M',
    marketCap: '19.92 Lakh Cr',
    peRatio: 28.4,
    pbRatio: 2.35,
    dividendYield: '0.34%',
    fiftyTwoWeekHigh: 3024.90,
    fiftyTwoWeekLow: 2220.30,
    lowerCircuit: 2613.60,
    upperCircuit: 3194.40,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 412850,
      sellTotal: 389200,
      bids: [
        { price: 2942.50, orders: 42, qty: 12450 },
        { price: 2942.45, orders: 18, qty: 8900 },
        { price: 2942.40, orders: 64, qty: 24100 },
        { price: 2942.35, orders: 31, qty: 15400 },
        { price: 2942.30, orders: 85, qty: 32600 }
      ],
      asks: [
        { price: 2942.55, orders: 35, qty: 9800 },
        { price: 2942.60, orders: 52, qty: 18400 },
        { price: 2942.65, orders: 29, qty: 11200 },
        { price: 2942.70, orders: 74, qty: 28900 },
        { price: 2942.75, orders: 40, qty: 16500 }
      ]
    },
    candles: [
      { time: '09:15', open: 2912.0, high: 2928.0, low: 2908.0, close: 2924.5, volume: 840000 },
      { time: '10:00', open: 2924.5, high: 2938.0, low: 2919.0, close: 2935.0, volume: 1120000 },
      { time: '11:00', open: 2935.0, high: 2944.0, low: 2930.0, close: 2932.0, volume: 920000 },
      { time: '12:00', open: 2932.0, high: 2948.0, low: 2928.0, close: 2945.5, volume: 1450000 },
      { time: '13:00', open: 2945.5, high: 2955.0, low: 2940.0, close: 2951.0, volume: 1680000 },
      { time: '14:00', open: 2951.0, high: 2965.0, low: 2946.0, close: 2960.0, volume: 1940000 },
      { time: '15:00', open: 2960.0, high: 2962.0, low: 2938.0, close: 2942.5, volume: 1542010 }
    ]
  },
  {
    id: 'TCS',
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services Ltd.',
    exchange: 'NSE',
    sector: 'Information Tech',
    currentPrice: 3894.20,
    previousClose: 3925.60,
    change: -31.40,
    changePercent: -0.80,
    dayOpen: 3915.00,
    dayHigh: 3930.00,
    dayLow: 3880.00,
    volume: 2410800,
    volumeFormatted: '2.41M',
    marketCap: '14.08 Lakh Cr',
    peRatio: 30.2,
    pbRatio: 14.8,
    dividendYield: '1.24%',
    fiftyTwoWeekHigh: 4585.00,
    fiftyTwoWeekLow: 3313.00,
    lowerCircuit: 3533.00,
    upperCircuit: 4318.00,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 184500,
      sellTotal: 215400,
      bids: [
        { price: 3894.20, orders: 19, qty: 4500 },
        { price: 3894.10, orders: 25, qty: 7200 },
        { price: 3894.00, orders: 48, qty: 15100 },
        { price: 3893.80, orders: 12, qty: 3400 },
        { price: 3893.50, orders: 36, qty: 11800 }
      ],
      asks: [
        { price: 3894.30, orders: 28, qty: 6200 },
        { price: 3894.40, orders: 41, qty: 11400 },
        { price: 3894.50, orders: 62, qty: 18900 },
        { price: 3894.80, orders: 15, qty: 4100 },
        { price: 3895.00, orders: 55, qty: 16700 }
      ]
    },
    candles: [
      { time: '09:15', open: 3915.0, high: 3930.0, low: 3905.0, close: 3922.0, volume: 320000 },
      { time: '10:00', open: 3922.0, high: 3925.0, low: 3900.0, close: 3905.0, volume: 410000 },
      { time: '11:00', open: 3905.0, high: 3914.0, low: 3892.0, close: 3898.0, volume: 280000 },
      { time: '12:00', open: 3898.0, high: 3908.0, low: 3890.0, close: 3892.0, volume: 390000 },
      { time: '13:00', open: 3892.0, high: 3899.0, low: 3880.0, close: 3885.0, volume: 450000 },
      { time: '14:00', open: 3885.0, high: 3896.0, low: 3882.0, close: 3890.0, volume: 510000 },
      { time: '15:00', open: 3890.0, high: 3898.0, low: 3888.0, close: 3894.2, volume: 508000 }
    ]
  },
  {
    id: 'HDFCBANK',
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Limited',
    exchange: 'NSE',
    sector: 'Banking & Finance',
    currentPrice: 1664.80,
    previousClose: 1648.20,
    change: 16.60,
    changePercent: 1.01,
    dayOpen: 1652.00,
    dayHigh: 1672.40,
    dayLow: 1649.00,
    volume: 14280900,
    volumeFormatted: '14.28M',
    marketCap: '12.65 Lakh Cr',
    peRatio: 18.9,
    pbRatio: 2.74,
    dividendYield: '1.17%',
    fiftyTwoWeekHigh: 1794.00,
    fiftyTwoWeekLow: 1363.55,
    lowerCircuit: 1483.40,
    upperCircuit: 1813.00,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 580200,
      sellTotal: 490100,
      bids: [
        { price: 1664.80, orders: 84, qty: 32400 },
        { price: 1664.75, orders: 45, qty: 18200 },
        { price: 1664.70, orders: 92, qty: 45100 },
        { price: 1664.60, orders: 38, qty: 14900 },
        { price: 1664.50, orders: 110, qty: 62000 }
      ],
      asks: [
        { price: 1664.85, orders: 51, qty: 21800 },
        { price: 1664.90, orders: 67, qty: 29400 },
        { price: 1665.00, orders: 120, qty: 74200 },
        { price: 1665.10, orders: 39, qty: 15600 },
        { price: 1665.20, orders: 48, qty: 20100 }
      ]
    },
    candles: [
      { time: '09:15', open: 1652.0, high: 1660.0, low: 1649.0, close: 1658.0, volume: 1800000 },
      { time: '10:00', open: 1658.0, high: 1666.0, low: 1655.0, close: 1664.0, volume: 2200000 },
      { time: '11:00', open: 1664.0, high: 1669.0, low: 1660.0, close: 1662.0, volume: 1750000 },
      { time: '12:00', open: 1662.0, high: 1670.0, low: 1661.0, close: 1668.0, volume: 2100000 },
      { time: '13:00', open: 1668.0, high: 1672.4, low: 1664.0, close: 1670.0, volume: 2400000 },
      { time: '14:00', open: 1670.0, high: 1671.0, low: 1662.0, close: 1663.5, volume: 2600000 },
      { time: '15:00', open: 1663.5, high: 1667.0, low: 1661.0, close: 1664.8, volume: 2430900 }
    ]
  },
  {
    id: 'INFY',
    symbol: 'INFY',
    companyName: 'Infosys Limited',
    exchange: 'NSE',
    sector: 'Information Tech',
    currentPrice: 1918.40,
    previousClose: 1876.10,
    change: 42.30,
    changePercent: 2.25,
    dayOpen: 1888.00,
    dayHigh: 1928.00,
    dayLow: 1882.00,
    volume: 9140200,
    volumeFormatted: '9.14M',
    marketCap: '7.96 Lakh Cr',
    peRatio: 29.8,
    pbRatio: 8.42,
    dividendYield: '2.14%',
    fiftyTwoWeekHigh: 1991.45,
    fiftyTwoWeekLow: 1358.35,
    lowerCircuit: 1688.50,
    upperCircuit: 2063.70,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 340100,
      sellTotal: 298400,
      bids: [
        { price: 1918.40, orders: 52, qty: 16800 },
        { price: 1918.30, orders: 31, qty: 9400 },
        { price: 1918.20, orders: 46, qty: 15200 },
        { price: 1918.00, orders: 88, qty: 34100 },
        { price: 1917.50, orders: 40, qty: 12900 }
      ],
      asks: [
        { price: 1918.50, orders: 44, qty: 14200 },
        { price: 1918.60, orders: 37, qty: 11900 },
        { price: 1918.80, orders: 29, qty: 8600 },
        { price: 1919.00, orders: 95, qty: 41200 },
        { price: 1919.50, orders: 33, qty: 10400 }
      ]
    },
    candles: [
      { time: '09:15', open: 1888.0, high: 1904.0, low: 1882.0, close: 1901.0, volume: 1100000 },
      { time: '10:00', open: 1901.0, high: 1912.0, low: 1898.0, close: 1910.0, volume: 1400000 },
      { time: '11:00', open: 1910.0, high: 1918.0, low: 1905.0, close: 1914.0, volume: 1200000 },
      { time: '12:00', open: 1914.0, high: 1922.0, low: 1910.0, close: 1919.0, volume: 1350000 },
      { time: '13:00', open: 1919.0, high: 1928.0, low: 1916.0, close: 1924.0, volume: 1650000 },
      { time: '14:00', open: 1924.0, high: 1926.0, low: 1912.0, close: 1916.0, volume: 1800000 },
      { time: '15:00', open: 1916.0, high: 1920.0, low: 1914.0, close: 1918.4, volume: 1640200 }
    ]
  },
  {
    id: 'TATAMOTORS',
    symbol: 'TATAMOTORS',
    companyName: 'Tata Motors Limited',
    exchange: 'NSE',
    sector: 'Automobile',
    currentPrice: 968.75,
    previousClose: 934.10,
    change: 34.65,
    changePercent: 3.71,
    dayOpen: 942.00,
    dayHigh: 974.50,
    dayLow: 938.20,
    volume: 18450100,
    volumeFormatted: '18.45M',
    marketCap: '3.56 Lakh Cr',
    peRatio: 11.4,
    pbRatio: 3.82,
    dividendYield: '0.62%',
    fiftyTwoWeekHigh: 1179.05,
    fiftyTwoWeekLow: 621.75,
    lowerCircuit: 840.70,
    upperCircuit: 1027.50,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 720400,
      sellTotal: 589200,
      bids: [
        { price: 968.75, orders: 112, qty: 54200 },
        { price: 968.70, orders: 64, qty: 28900 },
        { price: 968.60, orders: 85, qty: 41200 },
        { price: 968.50, orders: 140, qty: 78900 },
        { price: 968.40, orders: 49, qty: 19400 }
      ],
      asks: [
        { price: 968.80, orders: 78, qty: 36100 },
        { price: 968.90, orders: 59, qty: 24800 },
        { price: 969.00, orders: 135, qty: 69400 },
        { price: 969.10, orders: 42, qty: 18200 },
        { price: 969.25, orders: 61, qty: 27500 }
      ]
    },
    candles: [
      { time: '09:15', open: 942.0, high: 955.0, low: 938.2, close: 952.0, volume: 2400000 },
      { time: '10:00', open: 952.0, high: 961.0, low: 948.0, close: 958.5, volume: 2800000 },
      { time: '11:00', open: 958.5, high: 966.0, low: 955.0, close: 962.0, volume: 2200000 },
      { time: '12:00', open: 962.0, high: 969.0, low: 959.0, close: 967.5, volume: 2700000 },
      { time: '13:00', open: 967.5, high: 974.5, low: 965.0, close: 971.0, volume: 3100000 },
      { time: '14:00', open: 971.0, high: 973.0, low: 964.0, close: 966.0, volume: 3400000 },
      { time: '15:00', open: 966.0, high: 970.0, low: 964.5, close: 968.75, volume: 2850100 }
    ]
  },
  {
    id: 'ICICIBANK',
    symbol: 'ICICIBANK',
    companyName: 'ICICI Bank Limited',
    exchange: 'NSE',
    sector: 'Banking & Finance',
    currentPrice: 1248.30,
    previousClose: 1236.40,
    change: 11.90,
    changePercent: 0.96,
    dayOpen: 1240.00,
    dayHigh: 1254.00,
    dayLow: 1237.50,
    volume: 11840200,
    volumeFormatted: '11.84M',
    marketCap: '8.78 Lakh Cr',
    peRatio: 18.2,
    pbRatio: 3.12,
    dividendYield: '0.80%',
    fiftyTwoWeekHigh: 1334.80,
    fiftyTwoWeekLow: 914.00,
    lowerCircuit: 1112.80,
    upperCircuit: 1360.00,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 420100,
      sellTotal: 395400,
      bids: [
        { price: 1248.30, orders: 49, qty: 21400 },
        { price: 1248.25, orders: 36, qty: 14800 },
        { price: 1248.20, orders: 72, qty: 31200 },
        { price: 1248.10, orders: 28, qty: 11900 },
        { price: 1248.00, orders: 94, qty: 45600 }
      ],
      asks: [
        { price: 1248.35, orders: 41, qty: 18200 },
        { price: 1248.40, orders: 55, qty: 23600 },
        { price: 1248.50, orders: 88, qty: 39800 },
        { price: 1248.60, orders: 32, qty: 12400 },
        { price: 1248.75, orders: 47, qty: 19100 }
      ]
    },
    candles: [
      { time: '09:15', open: 1240.0, high: 1246.0, low: 1237.5, close: 1243.0, volume: 1500000 },
      { time: '10:00', open: 1243.0, high: 1249.0, low: 1241.0, close: 1247.0, volume: 1800000 },
      { time: '11:00', open: 1247.0, high: 1251.0, low: 1244.0, close: 1249.0, volume: 1450000 },
      { time: '12:00', open: 1249.0, high: 1254.0, low: 1246.0, close: 1252.0, volume: 1700000 },
      { time: '13:00', open: 1252.0, high: 1253.5, low: 1248.0, close: 1250.0, volume: 1900000 },
      { time: '14:00', open: 1250.0, high: 1251.0, low: 1245.0, close: 1246.5, volume: 2100000 },
      { time: '15:00', open: 1246.5, high: 1249.5, low: 1245.0, close: 1248.3, volume: 2390200 }
    ]
  },
  {
    id: 'SBIN',
    symbol: 'SBIN',
    companyName: 'State Bank of India',
    exchange: 'NSE',
    sector: 'PSU Banking',
    currentPrice: 792.15,
    previousClose: 801.30,
    change: -9.15,
    changePercent: -1.14,
    dayOpen: 802.00,
    dayHigh: 804.80,
    dayLow: 788.00,
    volume: 16920400,
    volumeFormatted: '16.92M',
    marketCap: '7.07 Lakh Cr',
    peRatio: 10.8,
    pbRatio: 1.62,
    dividendYield: '1.74%',
    fiftyTwoWeekHigh: 912.10,
    fiftyTwoWeekLow: 543.15,
    lowerCircuit: 721.20,
    upperCircuit: 881.40,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 610200,
      sellTotal: 684500,
      bids: [
        { price: 792.15, orders: 67, qty: 31200 },
        { price: 792.10, orders: 42, qty: 18900 },
        { price: 792.00, orders: 120, qty: 65400 },
        { price: 791.80, orders: 35, qty: 14200 },
        { price: 791.50, orders: 84, qty: 42100 }
      ],
      asks: [
        { price: 792.20, orders: 58, qty: 26400 },
        { price: 792.25, orders: 41, qty: 19100 },
        { price: 792.30, orders: 79, qty: 38200 },
        { price: 792.50, orders: 142, qty: 79100 },
        { price: 792.75, orders: 50, qty: 22800 }
      ]
    },
    candles: [
      { time: '09:15', open: 802.0, high: 804.8, low: 798.0, close: 800.5, volume: 2200000 },
      { time: '10:00', open: 800.5, high: 802.0, low: 794.0, close: 796.0, volume: 2600000 },
      { time: '11:00', open: 796.0, high: 798.5, low: 792.0, close: 794.2, volume: 2100000 },
      { time: '12:00', open: 794.2, high: 796.0, low: 790.0, close: 791.5, volume: 2500000 },
      { time: '13:00', open: 791.5, high: 793.0, low: 788.0, close: 789.2, volume: 2900000 },
      { time: '14:00', open: 789.2, high: 792.5, low: 788.5, close: 791.0, volume: 2800000 },
      { time: '15:00', open: 791.0, high: 793.5, low: 790.0, close: 792.15, volume: 2820400 }
    ]
  },
  {
    id: 'BHARTIARTL',
    symbol: 'BHARTIARTL',
    companyName: 'Bharti Airtel Limited',
    exchange: 'NSE',
    sector: 'Telecom',
    currentPrice: 1642.10,
    previousClose: 1618.30,
    change: 23.80,
    changePercent: 1.47,
    dayOpen: 1625.00,
    dayHigh: 1650.00,
    dayLow: 1621.50,
    volume: 5820100,
    volumeFormatted: '5.82M',
    marketCap: '9.34 Lakh Cr',
    peRatio: 52.4,
    pbRatio: 8.91,
    dividendYield: '0.49%',
    fiftyTwoWeekHigh: 1712.00,
    fiftyTwoWeekLow: 890.25,
    lowerCircuit: 1456.50,
    upperCircuit: 1780.00,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 290400,
      sellTotal: 245100,
      bids: [
        { price: 1642.10, orders: 45, qty: 15400 },
        { price: 1642.00, orders: 62, qty: 24100 },
        { price: 1641.80, orders: 28, qty: 9800 },
        { price: 1641.50, orders: 54, qty: 18900 },
        { price: 1641.00, orders: 81, qty: 32600 }
      ],
      asks: [
        { price: 1642.20, orders: 38, qty: 12900 },
        { price: 1642.30, orders: 49, qty: 16800 },
        { price: 1642.50, orders: 74, qty: 29400 },
        { price: 1642.70, orders: 25, qty: 8100 },
        { price: 1643.00, orders: 90, qty: 38500 }
      ]
    },
    candles: [
      { time: '09:15', open: 1625.0, high: 1634.0, low: 1621.5, close: 1632.0, volume: 780000 },
      { time: '10:00', open: 1632.0, high: 1638.0, low: 1628.0, close: 1636.5, volume: 920000 },
      { time: '11:00', open: 1636.5, high: 1642.0, low: 1633.0, close: 1640.0, volume: 810000 },
      { time: '12:00', open: 1640.0, high: 1646.0, low: 1638.0, close: 1644.5, volume: 950000 },
      { time: '13:00', open: 1644.5, high: 1650.0, low: 1642.0, close: 1648.0, volume: 1100000 },
      { time: '14:00', open: 1648.0, high: 1649.0, low: 1639.0, close: 1640.5, volume: 1260000 },
      { time: '15:00', open: 1640.5, high: 1644.0, low: 1639.5, close: 1642.1, volume: 1000100 }
    ]
  },
  {
    id: 'ZOMATO',
    symbol: 'ZOMATO',
    companyName: 'Zomato Limited',
    exchange: 'NSE',
    sector: 'Consumer Tech',
    currentPrice: 284.60,
    previousClose: 271.80,
    change: 12.80,
    changePercent: 4.71,
    dayOpen: 275.00,
    dayHigh: 288.40,
    dayLow: 273.50,
    volume: 38920400,
    volumeFormatted: '38.92M',
    marketCap: '2.51 Lakh Cr',
    peRatio: 124.5,
    pbRatio: 11.2,
    dividendYield: '0.00%',
    fiftyTwoWeekHigh: 298.20,
    fiftyTwoWeekLow: 98.40,
    lowerCircuit: 244.60,
    upperCircuit: 299.00,
    lotSize: 1,
    tickSize: 0.05,
    depth: {
      buyTotal: 1420500,
      sellTotal: 1180400,
      bids: [
        { price: 284.60, orders: 215, qty: 112400 },
        { price: 284.55, orders: 140, qty: 78900 },
        { price: 284.50, orders: 320, qty: 184500 },
        { price: 284.40, orders: 98, qty: 45200 },
        { price: 284.30, orders: 165, qty: 89400 }
      ],
      asks: [
        { price: 284.65, orders: 180, qty: 94200 },
        { price: 284.70, orders: 125, qty: 68100 },
        { price: 284.80, orders: 210, qty: 118400 },
        { price: 284.90, orders: 90, qty: 42600 },
        { price: 285.00, orders: 450, qty: 284500 }
      ]
    },
    candles: [
      { time: '09:15', open: 275.0, high: 280.0, low: 273.5, close: 278.5, volume: 5400000 },
      { time: '10:00', open: 278.5, high: 283.0, low: 277.0, close: 282.0, volume: 6200000 },
      { time: '11:00', open: 282.0, high: 285.5, low: 280.5, close: 284.0, volume: 5800000 },
      { time: '12:00', open: 284.0, high: 287.0, low: 282.5, close: 286.0, volume: 6100000 },
      { time: '13:00', open: 286.0, high: 288.4, low: 284.0, close: 287.2, volume: 6900000 },
      { time: '14:00', open: 287.2, high: 288.0, low: 283.0, close: 283.5, volume: 7400000 },
      { time: '15:00', open: 283.5, high: 285.5, low: 283.0, close: 284.6, volume: 6120400 }
    ]
  }
];

// NIFTY Option Chain Mock Sample
export const NIFTY_OPTION_CHAIN = [
  { strike: 24700, callOi: '48.2L', callLtp: 184.50, callChange: '+32.40', putLtp: 24.10, putChange: '-18.20', putOi: '84.5L' },
  { strike: 24750, callOi: '36.8L', callLtp: 142.10, callChange: '+28.10', putLtp: 36.80, putChange: '-15.40', putOi: '62.1L' },
  { strike: 24800, callOi: '64.1L', callLtp: 104.20, callChange: '+22.50', putLtp: 54.20, putChange: '-12.80', putOi: '98.4L' },
  { strike: 24850, callOi: '82.5L', callLtp: 72.80, callChange: '+18.40', putLtp: 78.40, putChange: '-9.20', putOi: '74.2L', isAtm: true },
  { strike: 24900, callOi: '112.4L', callLtp: 48.60, callChange: '+12.10', putLtp: 108.50, putChange: '-6.40', putOi: '42.8L' },
  { strike: 24950, callOi: '74.2L', callLtp: 31.40, callChange: '+8.20', putLtp: 146.20, putChange: '-4.10', putOi: '28.1L' },
  { strike: 25000, callOi: '148.9L', callLtp: 19.80, callChange: '+4.50', putLtp: 192.40, putChange: '-2.80', putOi: '19.4L' }
];

// Realistic Brokerage & Tax Calculator (NSE India Regulatory Rules)
export const calculateCharges = (type, product, price, quantity) => {
  const turnover = price * quantity;
  const brokerage = product === 'CNC' ? 0.00 : Math.min(20, turnover * 0.0003); // ₹0 on Delivery, flat ₹20 or 0.03% on Intraday
  const stt = product === 'CNC' ? turnover * 0.001 : (type === 'SELL' ? turnover * 0.00025 : 0); // 0.1% on delivery both ways
  const exchangeTxn = turnover * 0.0000345; // 0.00345%
  const sebiFee = turnover * 0.000001; // ₹10 per crore
  const stampDuty = type === 'BUY' ? turnover * 0.00015 : 0; // 0.015% on buy
  const gst = (brokerage + exchangeTxn + sebiFee) * 0.18; // 18% GST

  const totalCharges = Number((brokerage + stt + exchangeTxn + sebiFee + stampDuty + gst).toFixed(2));
  const requiredMargin = product === 'MIS' ? Number((turnover / 5).toFixed(2)) : Number(turnover.toFixed(2));

  return {
    turnover: Number(turnover.toFixed(2)),
    brokerage: Number(brokerage.toFixed(2)),
    stt: Number(stt.toFixed(2)),
    exchangeTxn: Number(exchangeTxn.toFixed(2)),
    gst: Number(gst.toFixed(2)),
    sebiFee: Number(sebiFee.toFixed(2)),
    stampDuty: Number(stampDuty.toFixed(2)),
    totalCharges,
    requiredMargin
  };
};
