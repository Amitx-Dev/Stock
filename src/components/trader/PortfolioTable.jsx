import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, ShoppingCart } from 'lucide-react';

export const PortfolioTable = ({ holdings = [], onTradeAction, onExploreClick }) => {
  if (!holdings || holdings.length === 0) {
    return (
      <div className="fintech-card p-12 text-center">
        <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-800 text-cyan-400 flex items-center justify-center mx-auto mb-3">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-white mb-1">No Active Holdings</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
          Your portfolio currently has no active stock holdings. Browse available equities to start trading.
        </p>
        {onExploreClick && (
          <button
            onClick={onExploreClick}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all"
          >
            Explore Market Stocks
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="fintech-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Asset / Company</th>
              <th className="py-3.5 px-4 text-right">Holdings (Qty)</th>
              <th className="py-3.5 px-4 text-right">Avg Buy Price</th>
              <th className="py-3.5 px-4 text-right">Current Price</th>
              <th className="py-3.5 px-4 text-right">Total Invested</th>
              <th className="py-3.5 px-4 text-right">Market Value</th>
              <th className="py-3.5 px-4 text-right">Unrealized P/L</th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {holdings.map((item) => {
              const isProfit = item.profitLoss >= 0;
              return (
                <tr key={item.stockId} className="hover:bg-slate-800/40 transition-colors">
                  {/* Symbol & Name */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white text-sm">{item.symbol}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{item.companyName}</div>
                  </td>

                  {/* Quantity */}
                  <td className="py-3.5 px-4 text-right font-mono font-semibold">
                    {item.quantity} shares
                  </td>

                  {/* Avg Buy Price */}
                  <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                    ${item.avgBuyPrice.toFixed(2)}
                  </td>

                  {/* Current Price */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    ${item.currentPrice.toFixed(2)}
                  </td>

                  {/* Total Invested */}
                  <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                    ${item.invested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Market Value */}
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                    ${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* P/L */}
                  <td className="py-3.5 px-4 text-right font-mono">
                    <div className={`font-bold flex items-center justify-end ${isProfit ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isProfit ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                      {isProfit ? '+' : ''}${item.profitLoss.toFixed(2)}
                    </div>
                    <div className={`text-[10px] font-semibold ${isProfit ? 'text-emerald-500' : 'text-rose-500'}`}>
                      ({isProfit ? '+' : ''}{item.profitLossPercent.toFixed(2)}%)
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onTradeAction(item, 'BUY')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-600/40 text-[11px] font-semibold transition-all"
                      >
                        Buy More
                      </button>
                      <button
                        onClick={() => onTradeAction(item, 'SELL')}
                        className="px-2.5 py-1 rounded-lg bg-rose-600/20 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-600/40 text-[11px] font-semibold transition-all"
                      >
                        Sell
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
