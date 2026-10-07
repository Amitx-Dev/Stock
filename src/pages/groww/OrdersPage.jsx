import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Filter
} from 'lucide-react';

export const OrdersPage = () => {
  const { trades, showToast } = useTrading();
  const [activeTab, setActiveTab] = useState('executed'); // 'executed', 'open', 'gtt'

  // Realistic sample trades if none exist
  const defaultExecutedTrades = [
    {
      id: 'ORD-8921045',
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries Ltd.',
      exchange: 'NSE',
      type: 'BUY',
      product: 'CNC',
      quantity: 15,
      pricePerShare: 2912.00,
      totalAmount: 43680.00,
      status: 'FILLED',
      timestamp: 'Today, 10:14:22'
    },
    {
      id: 'ORD-8920194',
      symbol: 'TCS',
      companyName: 'Tata Consultancy Services',
      exchange: 'NSE',
      type: 'BUY',
      product: 'CNC',
      quantity: 5,
      pricePerShare: 3915.00,
      totalAmount: 19575.00,
      status: 'FILLED',
      timestamp: 'Today, 09:35:10'
    },
    {
      id: 'ORD-8919420',
      symbol: 'TATAMOTORS',
      companyName: 'Tata Motors Limited',
      exchange: 'NSE',
      type: 'SELL',
      product: 'MIS',
      quantity: 50,
      pricePerShare: 968.00,
      totalAmount: 48400.00,
      status: 'FILLED',
      timestamp: 'Yesterday, 14:48:02'
    }
  ];

  const executedList = trades && trades.length > 0 ? trades : defaultExecutedTrades;

  const openOrders = [
    {
      id: 'ORD-8929941',
      symbol: 'INFY',
      exchange: 'NSE',
      type: 'BUY',
      product: 'CNC',
      quantity: 20,
      limitPrice: 1890.00,
      currentPrice: 1918.40,
      status: 'OPEN',
      placedAt: 'Today, 11:05:14'
    }
  ];

  return (
    <div className="space-y-5 max-w-7xl mx-auto animate-in fade-in duration-150">
      {/* Orders Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('executed')}
            className={`px-4 py-1.5 rounded-lg transition-colors ${
              activeTab === 'executed'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Executed ({executedList.length})
          </button>
          <button
            onClick={() => setActiveTab('open')}
            className={`px-4 py-1.5 rounded-lg transition-colors ${
              activeTab === 'open'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Open Orders ({openOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('gtt')}
            className={`px-4 py-1.5 rounded-lg transition-colors ${
              activeTab === 'gtt'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-2xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            GTT Triggers (0)
          </button>
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Settlement Cycle: <strong>T+1 Rolling</strong>
        </span>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs">
        {activeTab === 'executed' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-sans">Time / Order ID</th>
                  <th className="py-3 px-4 font-sans">Type</th>
                  <th className="py-3 px-4 font-sans">Instrument</th>
                  <th className="py-3 px-4 text-right">Qty</th>
                  <th className="py-3 px-4 text-right">Avg. Price</th>
                  <th className="py-3 px-4 text-right">Total Turnover</th>
                  <th className="py-3 px-4 text-center font-sans">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
                {executedList.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{t.timestamp || 'Today'}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{t.id || `ORD-${idx + 100}`}</div>
                    </td>

                    <td className="py-3.5 px-4 font-sans">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.type === 'BUY'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {t.type} {t.product || 'CNC'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-sans font-bold">
                      {t.symbol} <span className="text-[10px] font-normal text-slate-400">NSE</span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold">{t.quantity}</td>

                    <td className="py-3.5 px-4 text-right">
                      ₹{t.pricePerShare ? t.pricePerShare.toFixed(2) : '0.00'}
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold">
                      ₹{(t.totalAmount || t.quantity * t.pricePerShare).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-4 text-center font-sans">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>COMPLETED</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'open' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="py-3 px-4 font-sans">Placed At</th>
                  <th className="py-3 px-4 font-sans">Type</th>
                  <th className="py-3 px-4 font-sans">Instrument</th>
                  <th className="py-3 px-4 text-right">Qty</th>
                  <th className="py-3 px-4 text-right">Limit Price</th>
                  <th className="py-3 px-4 text-right">LTP</th>
                  <th className="py-3 px-4 text-center font-sans">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
                {openOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-sans text-slate-400">{o.placedAt}</td>
                    <td className="py-3.5 px-4 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        BUY {o.product}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-sans font-bold">{o.symbol}</td>
                    <td className="py-3.5 px-4 text-right font-bold">{o.quantity}</td>
                    <td className="py-3.5 px-4 text-right font-bold text-indigo-600">₹{o.limitPrice.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-right">₹{o.currentPrice.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-center font-sans">
                      <button
                        onClick={() => showToast('Order cancelled', 'info')}
                        className="px-2 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 text-[11px] font-bold"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'gtt' && (
          <div className="p-12 text-center text-xs text-slate-400 space-y-2">
            <div>No active Good-Till-Triggered (GTT) orders.</div>
            <div className="text-[11px] text-slate-500">
              Set target and stop-loss triggers that remain active for up to 1 year on NSE.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
