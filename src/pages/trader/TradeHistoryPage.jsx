import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, Calendar } from 'lucide-react';

export const TradeHistoryPage = () => {
  const { trades } = useTrading();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL'); // 'ALL', 'BUY', 'SELL'

  const filteredTrades = trades.filter((t) => {
    const matchesSearch =
      (t.symbol && t.symbol.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (t.companyName && t.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'ALL' || t.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const exportCSV = () => {
    if (!filteredTrades.length) return;
    const headers = ['Order ID', 'Stock Symbol', 'Company', 'Type', 'Quantity', 'Price Per Share', 'Total Value', 'Status', 'Timestamp'];
    const rows = filteredTrades.map(t => [
      t.id,
      t.symbol,
      `"${t.companyName || ''}"`,
      t.type,
      t.quantity,
      t.pricePerShare,
      t.totalAmount,
      t.status,
      t.timestamp
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `trade_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="fintech-card p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by symbol or company..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-700/80 rounded-xl px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-300 focus:outline-none font-medium cursor-pointer"
            >
              <option value="ALL">All Orders</option>
              <option value="BUY">BUY Orders</option>
              <option value="SELL">SELL Orders</option>
            </select>
          </div>
        </div>

        {/* Export CSV Button */}
        <button
          onClick={exportCSV}
          disabled={filteredTrades.length === 0}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs transition-all disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Trades Table */}
      <div className="fintech-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Asset / Stock</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4 text-right">Quantity</th>
                <th className="py-3.5 px-4 text-right">Execution Price</th>
                <th className="py-3.5 px-4 text-right">Total Consideration</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Date & Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {filteredTrades.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                    No trade executions found in history.
                  </td>
                </tr>
              ) : (
                filteredTrades.map((t) => {
                  const isBuy = t.type === 'BUY';

                  return (
                    <tr key={t.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                        #{t.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{t.symbol}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[130px]">{t.companyName}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            isBuy
                              ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                              : 'bg-rose-950/80 text-rose-400 border border-rose-800'
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-semibold">
                        {t.quantity} shares
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-300">
                        ${t.pricePerShare ? t.pricePerShare.toFixed(2) : '0.00'}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        ${t.totalAmount ? t.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0.00'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-800">
                          {t.status || 'FILLED'}
                        </span>
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
