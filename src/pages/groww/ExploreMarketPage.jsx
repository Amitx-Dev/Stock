import React, { useState } from 'react';
import {
  MARKET_INDICES,
  PRO_STOCKS
} from '../../services/marketData';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Zap,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
  BarChart3
} from 'lucide-react';

export const ExploreMarketPage = ({ onSelectStock, onTradeStock }) => {
  const [activeMoversTab, setActiveMoversTab] = useState('gainers'); // 'gainers', 'losers', 'volume'

  // Top gainers & losers
  const sortedGainers = [...PRO_STOCKS].sort((a, b) => b.changePercent - a.changePercent);
  const sortedLosers = [...PRO_STOCKS].sort((a, b) => a.changePercent - b.changePercent);
  const sortedVolume = [...PRO_STOCKS].sort((a, b) => b.volume - a.volume);

  const displayedStocks =
    activeMoversTab === 'gainers'
      ? sortedGainers
      : activeMoversTab === 'losers'
      ? sortedLosers
      : sortedVolume;

  const sectors = [
    { name: 'NIFTY IT', change: '+1.84%', isGain: true, count: '10 Stocks' },
    { name: 'NIFTY Bank', change: '-0.16%', isGain: false, count: '12 Stocks' },
    { name: 'NIFTY Auto', change: '+2.41%', isGain: true, count: '15 Stocks' },
    { name: 'NIFTY Energy', change: '+1.12%', isGain: true, count: '8 Stocks' },
    { name: 'NIFTY FMCG', change: '+0.45%', isGain: true, count: '15 Stocks' },
    { name: 'NIFTY Pharma', change: '-0.28%', isGain: false, count: '20 Stocks' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-150">
      {/* 1. Market Indices Cards (Groww Home Screen) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {MARKET_INDICES.slice(0, 4).map((idx) => (
          <div
            key={idx.symbol}
            className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span>{idx.symbol}</span>
              <span className="text-[10px] font-mono">NSE</span>
            </div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white mt-1">
              {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <div
              className={`text-xs font-semibold font-mono flex items-center gap-0.5 mt-0.5 ${
                idx.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {idx.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
              <span>
                {idx.isPositive ? '+' : ''}
                {idx.change.toFixed(2)} ({idx.isPositive ? '+' : ''}
                {idx.changePercent}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Top Movers & Market Pulse Tabs (Groww staple) */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Market Movers
            </h2>
            <span className="text-xs text-slate-400">• Large Cap & Midcap</span>
          </div>

          {/* Tabs: Top Gainers / Losers / Volume */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold w-fit">
            <button
              onClick={() => setActiveMoversTab('gainers')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeMoversTab === 'gainers'
                  ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Top Gainers
            </button>
            <button
              onClick={() => setActiveMoversTab('losers')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeMoversTab === 'losers'
                  ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Top Losers
            </button>
            <button
              onClick={() => setActiveMoversTab('volume')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeMoversTab === 'volume'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Most Active (Volume)
            </button>
          </div>
        </div>

        {/* Equities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayedStocks.map((stock) => {
            const isGain = stock.change >= 0;

            return (
              <div
                key={stock.id}
                onClick={() => onSelectStock && onSelectStock(stock)}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-xs transition-all cursor-pointer bg-slate-50/50 dark:bg-slate-900/40 flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold font-mono text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {stock.symbol}
                    </span>
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-200/60 dark:bg-slate-800 text-slate-500">
                      {stock.exchange}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {stock.companyName}
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-medium">LTP</div>
                    <div className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                      ₹{stock.currentPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-xs font-bold font-mono inline-flex items-center ${
                        isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isGain ? '+' : ''}
                      {stock.change.toFixed(2)} ({isGain ? '+' : ''}
                      {stock.changePercent}%)
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Sectoral Overview & 52-Week High Breakouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sectoral Performance */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Sectors Performance
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real-time</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {sectors.map((sec) => (
              <div key={sec.name} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{sec.name}</div>
                  <div className="text-[10px] text-slate-400">{sec.count}</div>
                </div>
                <div
                  className={`font-bold font-mono ${
                    sec.isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {sec.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stocks at 52-Week High */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>52-Week High Breakouts</span>
              <Award className="w-4 h-4 text-amber-500" />
            </h3>
            <span className="text-xs text-slate-400">Bullish Momentum</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {PRO_STOCKS.slice(0, 4).map((stock) => (
              <div
                key={stock.id}
                onClick={() => onSelectStock && onSelectStock(stock)}
                className="py-2.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-lg px-1 transition-colors"
              >
                <div>
                  <div className="font-bold font-mono text-slate-900 dark:text-white">{stock.symbol}</div>
                  <div className="text-[10px] text-slate-400">52W High: ₹{stock.fiftyTwoWeekHigh.toFixed(2)}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-slate-900 dark:text-white">₹{stock.currentPrice.toFixed(2)}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold font-mono">
                    {((stock.currentPrice / stock.fiftyTwoWeekHigh) * 100).toFixed(1)}% of 52W High
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
