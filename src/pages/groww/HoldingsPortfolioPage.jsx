import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Plus,
  Zap,
  Layers,
  ChevronRight
} from 'lucide-react';

export const HoldingsPortfolioPage = ({ onSelectStock, onTradeStock }) => {
  const { portfolio, portfolioSummary, wallet, executeTrade } = useTrading();
  const [activeTab, setActiveTab] = useState('holdings'); // 'holdings' or 'positions'

  // Realistic fallback demo holdings if portfolio is empty
  const defaultHoldings = [
    {
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd.',
      quantity: 25,
      avgBuyPrice: 2850.00,
      currentPrice: 2942.50,
      invested: 71250.00,
      value: 73562.50,
      profitLoss: 2312.50,
      profitLossPercent: 3.25,
      dayPnl: 962.50
    },
    {
      symbol: 'TCS',
      companyName: 'Tata Consultancy Services',
      quantity: 12,
      avgBuyPrice: 3820.00,
      currentPrice: 3894.20,
      invested: 45840.00,
      value: 46730.40,
      profitLoss: 890.40,
      profitLossPercent: 1.94,
      dayPnl: -376.80
    },
    {
      symbol: 'INFY',
      companyName: 'Infosys Limited',
      quantity: 30,
      avgBuyPrice: 1840.00,
      currentPrice: 1918.40,
      invested: 55200.00,
      value: 57552.00,
      profitLoss: 2352.00,
      profitLossPercent: 4.26,
      dayPnl: 1269.00
    },
    {
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank Limited',
      quantity: 40,
      avgBuyPrice: 1620.00,
      currentPrice: 1664.80,
      invested: 64800.00,
      value: 66592.00,
      profitLoss: 1792.00,
      profitLossPercent: 2.76,
      dayPnl: 664.00
    }
  ];

  const holdingsList = portfolio && portfolio.length > 0 ? portfolio : defaultHoldings;

  const totalInvested = holdingsList.reduce((acc, h) => acc + (h.invested || h.quantity * h.avgBuyPrice), 0);
  const totalValue = holdingsList.reduce((acc, h) => acc + (h.value || h.quantity * h.currentPrice), 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;
  const dayPnl = holdingsList.reduce((acc, h) => acc + (h.dayPnl || 0), 0);

  return (
    <div className="space-y-5 max-w-7xl mx-auto animate-in fade-in duration-150">
      {/* 1. Portfolio Value Summary Card (Groww Style) */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Holdings Portfolio Value
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
              ₹{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          {/* Quick P&L Pills */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <div className="text-[10px] text-slate-400 font-sans">Total Returns</div>
              <div
                className={`font-bold ${
                  totalPnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {totalPnl >= 0 ? '+' : ''}₹{totalPnl.toFixed(2)} ({totalPnl >= 0 ? '+' : ''}
                {totalPnlPercent.toFixed(2)}%)
              </div>
            </div>

            <div className="pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-[10px] text-slate-400 font-sans">1-Day Returns</div>
              <div
                className={`font-bold ${
                  dayPnl >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {dayPnl >= 0 ? '+' : ''}₹{dayPnl.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 text-[11px]">Total Invested:</span>
            <div className="font-bold font-mono text-slate-800 dark:text-slate-200">
              ₹{totalInvested.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Current Value:</span>
            <div className="font-bold font-mono text-slate-800 dark:text-slate-200">
              ₹{totalValue.toLocaleString()}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Demat Holdings:</span>
            <div className="font-bold text-slate-800 dark:text-slate-200">{holdingsList.length} Companies</div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px]">Settlement Status:</span>
            <div className="font-bold text-emerald-600">T+1 Cleared</div>
          </div>
        </div>
      </div>

      {/* 2. Holdings Table */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              All Holdings ({holdingsList.length})
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="py-3 px-4">Instrument</th>
                <th className="py-3 px-4 text-right">Qty</th>
                <th className="py-3 px-4 text-right">Avg. Price</th>
                <th className="py-3 px-4 text-right">LTP</th>
                <th className="py-3 px-4 text-right">Current Value</th>
                <th className="py-3 px-4 text-right">Overall P&L</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono text-slate-800 dark:text-slate-200">
              {holdingsList.map((item, idx) => {
                const invested = item.invested || item.quantity * item.avgBuyPrice;
                const value = item.value || item.quantity * item.currentPrice;
                const pnl = item.profitLoss !== undefined ? item.profitLoss : value - invested;
                const pnlPercent = invested > 0 ? (pnl / invested) * 100 : 0;
                const isGain = pnl >= 0;

                return (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-bold text-slate-900 dark:text-white font-mono">
                        {item.symbol}
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        {item.companyName}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold">{item.quantity}</td>

                    <td className="py-3.5 px-4 text-right">₹{item.avgBuyPrice.toFixed(2)}</td>

                    <td className="py-3.5 px-4 text-right font-bold">
                      ₹{item.currentPrice ? item.currentPrice.toFixed(2) : item.avgBuyPrice.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold">
                      ₹{value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className={`font-bold ${isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {isGain ? '+' : ''}₹{pnl.toFixed(2)} ({isGain ? '+' : ''}
                        {pnlPercent.toFixed(2)}%)
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-sans">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onTradeStock && onTradeStock(item, 'BUY')}
                          className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 text-[11px] font-bold"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => onTradeStock && onTradeStock(item, 'SELL')}
                          className="px-2 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300 text-[11px] font-bold"
                        >
                          Exit
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
    </div>
  );
};
