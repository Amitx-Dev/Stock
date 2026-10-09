import React from 'react';
import { tickerStripData } from '../../data/mockIndices';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const MarketTicker = () => {
  // Duplicate for smooth seamless looping
  const doubleList = [...tickerStripData, ...tickerStripData];

  return (
    <div className="w-full bg-slate-100/90 dark:bg-slate-900/90 border-y border-slate-200/80 dark:border-slate-800 py-2.5 overflow-hidden select-none ticker-wrap">
      <div className="flex items-center gap-6 whitespace-nowrap animate-ticker ticker-move w-max">
        {doubleList.map((item, idx) => (
          <div
            key={`${item.symbol}-${idx}`}
            className="inline-flex items-center gap-2.5 px-3 py-1 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs shadow-xs"
          >
            <span className="font-bold text-slate-800 dark:text-slate-100">
              {item.symbol}
            </span>
            <span className="font-mono font-medium text-slate-900 dark:text-white">
              ₹{item.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
            <span
              className={`inline-flex items-center font-semibold text-[11px] ${
                item.isPositive ? 'text-trade-green' : 'text-trade-red'
              }`}
            >
              {item.isPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {item.isPositive ? '+' : ''}
              {item.changePercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
