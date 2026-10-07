import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { VolumeLineChart } from '../../components/admin/VolumeLineChart';
import { TopTradedBarChart } from '../../components/admin/TopTradedBarChart';
import { Activity, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export const TradeActivityPage = () => {
  const [allTrades, setAllTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrades = async () => {
    try {
      const data = await api.getTrades(null); // null retrieves across all users
      setAllTrades(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">Platform Trade Surveillance & Activity</h2>
          <p className="text-xs text-slate-400">
            Real-time trade order execution monitor, volume trends, and security audit log.
          </p>
        </div>
        <button
          onClick={fetchTrades}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Feed</span>
        </button>
      </div>

      {/* Visual Analytics Grid: Line Chart + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VolumeLineChart />
        <TopTradedBarChart />
      </div>

      {/* Real-time Platform Trades Table */}
      <div className="fintech-card overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Global Platform Orders (All Participants)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {allTrades.length} Recorded Transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Participant</th>
                <th className="py-3.5 px-4">Asset / Stock</th>
                <th className="py-3.5 px-4">Order Type</th>
                <th className="py-3.5 px-4 text-right">Shares</th>
                <th className="py-3.5 px-4 text-right">Price</th>
                <th className="py-3.5 px-4 text-right">Total Consideration</th>
                <th className="py-3.5 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {allTrades.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No trade executions recorded on the exchange.
                  </td>
                </tr>
              ) : (
                allTrades.map((t) => {
                  const isBuy = t.type === 'BUY';
                  return (
                    <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        #{t.id}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">
                        {t.userName || `User #${t.userId}`}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-white text-sm">{t.symbol}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[120px]">{t.companyName}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black ${
                            isBuy
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold">
                        {t.quantity}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                        ${t.pricePerShare ? t.pricePerShare.toFixed(2) : '0.00'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        ${t.totalAmount ? t.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400 text-[11px]">
                        {t.timestamp}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
