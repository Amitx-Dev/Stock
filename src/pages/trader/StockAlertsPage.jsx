import React, { useState } from 'react';
import {
  Bell,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
  CheckCircle,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { STOCK_ALERTS_DATA } from '../../services/altIndexData';

export const StockAlertsPage = ({ onSelectStock }) => {
  const [alerts, setAlerts] = useState(STOCK_ALERTS_DATA);
  const [filterType, setFilterType] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTicker, setNewTicker] = useState('AAPL');
  const [newTarget, setNewTarget] = useState('195.00');

  const filteredAlerts = alerts.filter((a) => {
    if (filterType === 'BULLISH') return a.isPositive;
    if (filterType === 'BEARISH') return !a.isPositive;
    return true;
  });

  const handleCreateAlert = (e) => {
    e.preventDefault();
    const newAlert = {
      id: `alt-${Date.now()}`,
      traderName: 'Alex Smith',
      traderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      stockName: `${newTicker} Alert`,
      symbol: newTicker,
      changePercent: '+8.5%',
      isPositive: true,
      timeframe: 'Today, Just now',
      triggerPrice: `$${newTarget}`,
      targetPrice: `$${(parseFloat(newTarget) * 1.1).toFixed(2)}`,
      action: 'Custom Alternative Trigger Configured'
    };
    setAlerts([newAlert, ...alerts]);
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-6 space-y-6 animate-in fade-in duration-200">
      {/* Page Header matching Screen 3 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Top Stock Alerts - July 30
            </h1>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time alternative data anomaly alerts & consensus triggers from portfolio managers
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Alert</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs w-fit">
        {['ALL', 'BULLISH', 'BEARISH'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterType(tab)}
            className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all ${
              filterType === tab
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Alerts List Cards matching Screen 3 */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="alt-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all cursor-pointer group"
          >
            {/* Left: Trader Profile + Stock Name */}
            <div className="flex items-center gap-3.5">
              <img
                src={alert.traderAvatar}
                alt={alert.traderName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
              />
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {alert.traderName}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>{alert.stockName}</span>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold">
                    {alert.symbol}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {alert.action}
                </div>
              </div>
            </div>

            {/* Right: Change % Badge + Timeframe */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black tracking-wide ${
                  alert.isPositive
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60'
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60'
                }`}
              >
                {alert.changePercent}
              </span>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{alert.timeframe}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating New Alert */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create Anomaly Alert
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  Ticker Symbol
                </label>
                <input
                  type="text"
                  value={newTicker}
                  onChange={(e) => setNewTicker(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  Target Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md shadow-indigo-600/20"
              >
                Save Alert
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
