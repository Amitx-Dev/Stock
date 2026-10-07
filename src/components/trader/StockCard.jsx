import React from 'react';
import { Sparkline } from '../common/Sparkline';
import { useMarket } from '../../context/MarketContext';
import { Star, ArrowUpRight, ArrowDownRight, ShoppingCart } from 'lucide-react';

export const StockCard = ({ stock, onTradeClick }) => {
  const { watchlist, toggleWatchlist, priceTicks } = useMarket();
  const isWatchlist = watchlist.includes(stock.symbol);
  const isPositive = stock.changePercent >= 0;
  const tick = priceTicks[stock.id];

  const flashClass = tick === 'gain'
    ? 'border-emerald-500/80 bg-emerald-950/20'
    : tick === 'loss'
    ? 'border-rose-500/80 bg-rose-950/20'
    : 'border-slate-800 bg-slate-900/90';

  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-300 shadow-md hover:shadow-cyan-950/20 hover:border-slate-700 flex flex-col justify-between ${flashClass}`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white">{stock.symbol}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              {stock.sector}
            </span>
          </div>
          <div className="text-xs text-slate-400 truncate max-w-[160px] mt-0.5">{stock.companyName}</div>
        </div>

        <button
          onClick={() => toggleWatchlist(stock.symbol)}
          className={`p-1.5 rounded-lg transition-colors ${
            isWatchlist ? 'text-amber-400 bg-amber-400/10' : 'text-slate-500 hover:text-slate-300'
          }`}
          title={isWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
        >
          <Star className="w-4 h-4 fill-current" />
        </button>
      </div>

      {/* Price & Sparkline */}
      <div className="my-3 flex items-center justify-between">
        <div>
          <div className="text-xl font-black text-white">
            ${stock.currentPrice.toFixed(2)}
          </div>
          <div className={`flex items-center text-xs font-bold mt-0.5 ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Sparkline data={stock.sparkline} isPositive={isPositive} width={100} height={36} />
        </div>
      </div>

      {/* High / Low & Quick Trade Button */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div>
          <span>24h Range: </span>
          <span className="font-mono text-slate-300">${stock.dayLow.toFixed(1)} - ${stock.dayHigh.toFixed(1)}</span>
        </div>

        <button
          onClick={() => onTradeClick(stock)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm transition-all"
        >
          <ShoppingCart className="w-3 h-3" />
          <span>Trade</span>
        </button>
      </div>
    </div>
  );
};
