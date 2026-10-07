import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { PRO_STOCKS } from '../../services/marketData';

export const GrowwSearchModal = ({ isOpen, onClose, onSelectStock, onTradeStock }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        if (window.openGrowwSearch) window.openGrowwSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = PRO_STOCKS.filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.companyName.toLowerCase().includes(query.toLowerCase()) ||
      s.sector.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-emerald-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for stocks, options, indices (e.g. Reliance, TCS, Nifty)..."
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filtered.map((stock) => {
            const isGain = stock.change >= 0;

            return (
              <div
                key={stock.id}
                onClick={() => {
                  onSelectStock(stock);
                  onClose();
                }}
                className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl cursor-pointer transition-colors group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold font-mono text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                      {stock.symbol}
                    </span>
                    <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                      {stock.exchange}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{stock.companyName}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold font-mono text-xs text-slate-900 dark:text-white">
                      ₹{stock.currentPrice.toFixed(2)}
                    </div>
                    <div
                      className={`text-[10px] font-semibold font-mono ${
                        isGain ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isGain ? '+' : ''}
                      {stock.change.toFixed(2)} ({isGain ? '+' : ''}
                      {stock.changePercent}%)
                    </div>
                  </div>

                  {/* B / S Quick Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTradeStock(stock, 'BUY');
                        onClose();
                      }}
                      className="w-6 h-6 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                      title="Buy"
                    >
                      B
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onTradeStock(stock, 'SELL');
                        onClose();
                      }}
                      className="w-6 h-6 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px]"
                      title="Sell"
                    >
                      S
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
