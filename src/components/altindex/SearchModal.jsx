import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Smartphone, ArrowRight, ExternalLink } from 'lucide-react';
import { TOP_STOCKS_DATA, REDDIT_STOCKS_DATA } from '../../services/altIndexData';

export const SearchModal = ({ isOpen, onClose, onSelectStock, onNavigate }) => {
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
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else if (window.openAltSearch) window.openAltSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredStocks = TOP_STOCKS_DATA.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.industry.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stock, crypto, or alternative metric (e.g. Netflix, App Downloads, Reddit)..."
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
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-2">
          {/* Quick Category Jump */}
          {!query && (
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Suggested Screens
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1 px-1">
                <button
                  onClick={() => {
                    onNavigate('top-stocks');
                    onClose();
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Top Stocks Screener</div>
                    <div className="text-[10px] text-slate-400">AI scoring & rankings</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    onNavigate('app-downloads');
                    onClose();
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">Netflix - App Downloads</div>
                    <div className="text-[10px] text-slate-400">Alternative data deep dive</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            {query ? `Matching Stocks (${filteredStocks.length})` : 'Popular Stocks'}
          </div>

          <div className="space-y-1">
            {filteredStocks.slice(0, 8).map((stock) => (
              <button
                key={stock.id}
                onClick={() => {
                  if (onSelectStock) onSelectStock(stock);
                  else onNavigate('app-downloads');
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
                    style={{ backgroundColor: stock.color || '#6366F1' }}
                  >
                    {stock.initial || stock.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {stock.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                        {stock.symbol}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">{stock.industry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-[10px] font-semibold ${
                        stock.priceChange >= 0 ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {stock.priceChange >= 0 ? `+${stock.priceChange}%` : `${stock.priceChange}%`}
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      stock.rating === 'BUY'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : stock.rating === 'SELL'
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                        : 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                    }`}
                  >
                    {stock.rating}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>
              </button>
            ))}

            {filteredStocks.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-400">
                No matching ticker or metric found for "{query}".
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>AltIndex Machine Learning & Alternative Signals</span>
          <span className="flex items-center gap-1">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border text-[10px]">Enter</kbd> to select
          </span>
        </div>
      </div>
    </div>
  );
};
