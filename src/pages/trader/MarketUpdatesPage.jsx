import React, { useState, useEffect } from 'react';
import { useMarket } from '../../context/MarketContext';
import { Sparkline } from '../../components/common/Sparkline';
import { Radio, Star, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Clock, Filter } from 'lucide-react';

export const MarketUpdatesPage = () => {
  const { stocks, watchlist, toggleWatchlist, priceTicks } = useMarket();
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' or 'WATCHLIST'
  const [feedLogs, setFeedLogs] = useState([]);

  // Generate real-time activity stream on stock updates
  useEffect(() => {
    if (!stocks || stocks.length === 0) return;

    // Pick top mover
    const sorted = [...stocks].sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent));
    const randomStock = sorted[Math.floor(Math.random() * 3)] || sorted[0];

    const newLog = {
      id: Date.now() + Math.random(),
      symbol: randomStock.symbol,
      company: randomStock.companyName,
      price: randomStock.currentPrice,
      changePercent: randomStock.changePercent,
      timestamp: new Date().toLocaleTimeString(),
      isGain: randomStock.changePercent >= 0
    };

    setFeedLogs(prev => [newLog, ...prev.slice(0, 19)]);
  }, [stocks]);

  // Top gainers and top losers
  const topGainers = [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 3);
  const topLosers = [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 3);

  const displayedStocks = filterMode === 'WATCHLIST'
    ? stocks.filter(s => watchlist.includes(s.symbol))
    : stocks;

  return (
    <div className="space-y-6">
      {/* Top Gainers & Losers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Gainers */}
        <div className="fintech-card p-5 border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Top Market Gainers Today</span>
          </div>
          <div className="space-y-2.5">
            {topGainers.map(s => (
              <div key={s.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="font-extrabold text-white text-sm mr-2">{s.symbol}</span>
                  <span className="text-xs text-slate-400">{s.companyName}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-white text-xs">${s.currentPrice.toFixed(2)}</div>
                  <div className="text-emerald-400 font-bold text-[11px] flex items-center justify-end">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    +{s.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="fintech-card p-5 border-rose-500/20 bg-rose-950/10">
          <div className="flex items-center gap-2 mb-3 text-rose-400 font-bold text-xs uppercase tracking-wider">
            <TrendingDown className="w-4 h-4" />
            <span>Top Market Losers Today</span>
          </div>
          <div className="space-y-2.5">
            {topLosers.map(s => (
              <div key={s.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="font-extrabold text-white text-sm mr-2">{s.symbol}</span>
                  <span className="text-xs text-slate-400">{s.companyName}</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-white text-xs">${s.currentPrice.toFixed(2)}</div>
                  <div className="text-rose-400 font-bold text-[11px] flex items-center justify-end">
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    {s.changePercent.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Ticker Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Equities Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="fintech-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Live Price Feed & Equities Tape
              </h3>
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFilterMode('ALL')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterMode === 'ALL'
                    ? 'bg-cyan-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Equities ({stocks.length})
              </button>
              <button
                onClick={() => setFilterMode('WATCHLIST')}
                className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                  filterMode === 'WATCHLIST'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Star className="w-3 h-3 fill-current" />
                <span>Watchlist ({watchlist.length})</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {displayedStocks.map((stock) => {
              const isPositive = stock.changePercent >= 0;
              const isWatch = watchlist.includes(stock.symbol);
              const tick = priceTicks[stock.id];

              return (
                <div
                  key={stock.id}
                  className={`p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                    tick === 'gain'
                      ? 'bg-emerald-950/30 border-emerald-500'
                      : tick === 'loss'
                      ? 'bg-rose-950/30 border-rose-500'
                      : 'bg-slate-900 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWatchlist(stock.symbol)}
                        className={isWatch ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <span className="font-extrabold text-white text-sm">{stock.symbol}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[120px] mt-0.5">
                      {stock.companyName}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black font-mono text-white">
                      ${stock.currentPrice.toFixed(2)}
                    </div>
                    <div className={`text-xs font-bold flex items-center justify-end ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                      {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Live Tick Stream Log */}
        <div className="fintech-card p-4 flex flex-col h-[520px]">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Simulated Market Stream
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Live ticks</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {feedLogs.map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>{log.symbol}</span>
                    <span className="text-[10px] font-mono font-normal text-slate-400">{log.timestamp}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-300 mt-0.5">
                    Last: ${log.price.toFixed(2)}
                  </div>
                </div>

                <div className={`font-mono font-bold text-xs ${log.isGain ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {log.isGain ? '+' : ''}{log.changePercent.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
