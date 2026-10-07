import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from '../services/api';

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('stock_watchlist');
      return saved ? JSON.parse(saved) : ['AAPL', 'NVDA', 'TSLA'];
    } catch {
      return ['AAPL', 'NVDA', 'TSLA'];
    }
  });

  // Track recent price ticks for flash animations: { [stockId]: 'gain' | 'loss' }
  const [priceTicks, setPriceTicks] = useState({});
  const tickTimeouts = useRef({});

  // Fetch initial stocks
  const fetchStocks = async () => {
    try {
      const data = await api.getStocks();
      setStocks(data);
    } catch (err) {
      console.error('Error fetching stocks:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Save watchlist
  useEffect(() => {
    localStorage.setItem('stock_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (symbol) => {
    setWatchlist(prev =>
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  // Real-time market tick simulator (runs every 3.5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => {
        if (!prevStocks || prevStocks.length === 0) return prevStocks;

        // Choose 1 or 2 random stocks to fluctuate
        const numToUpdate = Math.random() > 0.5 ? 2 : 1;
        const newStocks = [...prevStocks];
        const newTicks = {};

        for (let i = 0; i < numToUpdate; i++) {
          const randomIndex = Math.floor(Math.random() * newStocks.length);
          const stock = newStocks[randomIndex];

          // Fluctuate price by -1.5% to +1.5%
          const pctChange = (Math.random() * 2.5 - 1.2) / 100;
          const oldPrice = stock.currentPrice;
          const newPrice = Number(Math.max(1, oldPrice * (1 + pctChange)).toFixed(2));
          const netChangePct = Number((stock.changePercent + (pctChange * 100)).toFixed(2));

          const tickType = newPrice >= oldPrice ? 'gain' : 'loss';
          newTicks[stock.id] = tickType;

          // Update sparkline
          const sparkline = [...(stock.sparkline || [])];
          sparkline.shift();
          sparkline.push(newPrice);

          newStocks[randomIndex] = {
            ...stock,
            currentPrice: newPrice,
            changePercent: netChangePct,
            dayHigh: Math.max(stock.dayHigh, newPrice),
            dayLow: Math.min(stock.dayLow, newPrice),
            sparkline
          };
        }

        // Trigger flash highlight
        setPriceTicks(prev => ({ ...prev, ...newTicks }));

        // Clear highlight after 1.4s
        Object.keys(newTicks).forEach(id => {
          if (tickTimeouts.current[id]) clearTimeout(tickTimeouts.current[id]);
          tickTimeouts.current[id] = setTimeout(() => {
            setPriceTicks(prev => {
              const updated = { ...prev };
              delete updated[id];
              return updated;
            });
          }, 1400);
        });

        return newStocks;
      });
    }, 3500);

    return () => {
      clearInterval(interval);
      Object.values(tickTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <MarketContext.Provider value={{
      stocks,
      loading,
      watchlist,
      toggleWatchlist,
      priceTicks,
      refreshStocks: fetchStocks
    }}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) throw new Error('useMarket must be used within MarketProvider');
  return context;
};
