import React, { useState } from 'react';
import { NIFTY_OPTION_CHAIN } from '../../services/marketData';
import {
  Layers,
  Calendar,
  Info,
  TrendingUp,
  TrendingDown,
  ArrowUpDown
} from 'lucide-react';

export const OptionChainPage = ({ onTradeOption }) => {
  const [expiryDate, setExpiryDate] = useState('26-SEP-2024');

  return (
    <div className="space-y-4 max-w-7xl mx-auto animate-in fade-in duration-150">
      {/* Header with Spot & Expiry */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono">
              NIFTY 50 Option Chain
            </h1>
            <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              Spot: 24,852.15
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            PCR: <strong className="text-slate-700 dark:text-slate-300">1.18</strong> (Bullish) • Max Pain: <strong className="text-slate-700 dark:text-slate-300">24,850</strong>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Expiry Date:</span>
          <select
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 font-mono font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="26-SEP-2024">26-SEP-2024 (Weekly)</option>
            <option value="03-OCT-2024">03-OCT-2024 (Weekly)</option>
            <option value="31-OCT-2024">31-OCT-2024 (Monthly)</option>
          </select>
        </div>
      </div>

      {/* Option Chain Table */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <th colSpan="3" className="py-2.5 px-3 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-r border-slate-200 dark:border-slate-800">
                  CALL OPTIONS (CE)
                </th>
                <th className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                  STRIKE
                </th>
                <th colSpan="3" className="py-2.5 px-3 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 border-l border-slate-200 dark:border-slate-800">
                  PUT OPTIONS (PE)
                </th>
              </tr>
              <tr className="border-b border-slate-200/80 dark:border-slate-800 text-[10px] text-slate-400">
                <th className="py-2 px-3 text-left">OI (Contracts)</th>
                <th className="py-2 px-3 text-right">LTP (₹)</th>
                <th className="py-2 px-3 text-right border-r border-slate-200 dark:border-slate-800">Chg</th>
                <th className="py-2 px-4 bg-slate-50 dark:bg-slate-900 font-bold text-slate-800 dark:text-slate-200">Price</th>
                <th className="py-2 px-3 text-left border-l border-slate-200 dark:border-slate-800">LTP (₹)</th>
                <th className="py-2 px-3 text-left">Chg</th>
                <th className="py-2 px-3 text-right">OI (Contracts)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {NIFTY_OPTION_CHAIN.map((row) => (
                <tr
                  key={row.strike}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${
                    row.isAtm ? 'bg-amber-50/40 dark:bg-amber-950/20 font-bold' : ''
                  }`}
                >
                  {/* CALLS */}
                  <td className="py-2.5 px-3 text-left text-slate-500">{row.callOi}</td>
                  <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                    ₹{row.callLtp.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-right text-emerald-500 border-r border-slate-200 dark:border-slate-800">
                    {row.callChange}
                  </td>

                  {/* STRIKE */}
                  <td className="py-2.5 px-4 bg-slate-50 dark:bg-slate-900 font-black text-slate-900 dark:text-white">
                    {row.strike}
                    {row.isAtm && (
                      <span className="block text-[8px] text-amber-600 font-bold uppercase">ATM</span>
                    )}
                  </td>

                  {/* PUTS */}
                  <td className="py-2.5 px-3 text-left font-bold text-rose-600 border-l border-slate-200 dark:border-slate-800">
                    ₹{row.putLtp.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 text-left text-rose-500">
                    {row.putChange}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-500">{row.putOi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
