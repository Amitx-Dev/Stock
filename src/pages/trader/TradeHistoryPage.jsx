import React, { useState } from 'react';
import { mockTradeHistory, tradePerformanceStats } from '../../data/mockTrades';
import { DataTable } from '../../components/common/DataTable';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';
import { History, Award, AlertTriangle, Download, ArrowUpRight, ArrowDownRight, CheckCircle2 } from 'lucide-react';

export const TradeHistoryPage = () => {
  const [trades, setTrades] = useState(mockTradeHistory);
  const { showToast } = useToast();

  const handleExport = () => {
    showToast('Exporting trade log CSV...', 'info');
    setTimeout(() => {
      showToast('Trade history CSV downloaded successfully', 'success');
    }, 700);
  };

  const columns = [
    {
      header: 'Trade ID & Date',
      key: 'id',
      sortable: true,
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white font-mono text-xs">{row.id}</span>
          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{row.date}</p>
        </div>
      )
    },
    {
      header: 'Instrument',
      key: 'stock',
      sortable: true,
      render: (row) => (
        <span className="font-extrabold text-brand-700 dark:text-brand-300 text-xs">
          {row.stock}
        </span>
      )
    },
    {
      header: 'Side',
      key: 'type',
      sortable: true,
      render: (row) => (
        <Badge variant={row.type === 'BUY' ? 'buy' : 'sell'} size="sm">
          {row.type}
        </Badge>
      )
    },
    {
      header: 'Qty',
      key: 'qty',
      sortable: true,
      align: 'right',
      render: (row) => <span className="font-mono font-bold text-xs">{row.qty}</span>
    },
    {
      header: 'Executed Price',
      key: 'price',
      sortable: true,
      align: 'right',
      render: (row) => <span className="font-mono text-xs">₹{row.price.toFixed(2)}</span>
    },
    {
      header: 'Gross Total',
      key: 'total',
      sortable: true,
      align: 'right',
      render: (row) => <span className="font-mono font-bold text-xs">₹{row.total.toLocaleString()}</span>
    },
    {
      header: 'Realized P&L',
      key: 'pnl',
      sortable: true,
      align: 'right',
      render: (row) => {
        const isPos = row.pnl >= 0;
        return (
          <span
            className={`font-mono text-xs font-bold inline-flex items-center ${
              isPos ? 'text-trade-green' : 'text-trade-red'
            }`}
          >
            {isPos ? '+' : ''}₹{row.pnl.toFixed(2)} ({isPos ? '+' : ''}{row.pnlPercent}%)
          </span>
        );
      }
    },
    {
      header: 'Status',
      key: 'status',
      align: 'center',
      render: (row) => <Badge variant="success" size="sm">{row.status}</Badge>
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Trade Execution History & Performance
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit trail of filled market and limit orders, realized profits, and win rate ratio.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs shadow-soft transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Trade Log (CSV)</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Win Rate Ratio"
          value={`${tradePerformanceStats.winRate}%`}
          change={`${tradePerformanceStats.profitableTrades} wins / ${tradePerformanceStats.lossTrades} losses`}
          isPositive={true}
          icon={Award}
          subtitle="42 filled trades total"
        />
        <StatCard
          title="Best Trade (Profit)"
          value={tradePerformanceStats.bestTrade.profit}
          subtitle={`${tradePerformanceStats.bestTrade.stock} on ${tradePerformanceStats.bestTrade.date}`}
          icon={ArrowUpRight}
          iconBg="bg-emerald-50 text-trade-green dark:bg-emerald-950/60 dark:text-emerald-300"
        />
        <StatCard
          title="Worst Trade (Loss)"
          value={tradePerformanceStats.worstTrade.loss}
          subtitle={`${tradePerformanceStats.worstTrade.stock} on ${tradePerformanceStats.worstTrade.date}`}
          icon={ArrowDownRight}
          iconBg="bg-rose-50 text-trade-red dark:bg-rose-950/60 dark:text-rose-300"
        />
        <StatCard
          title="Net Profit Realized"
          value={`+₹${tradePerformanceStats.totalProfitRealized.toLocaleString()}`}
          subtitle="After statutory taxes & STT"
          icon={CheckCircle2}
          iconBg="bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
        />
      </div>

      {/* Trade Log DataTable */}
      <DataTable
        columns={columns}
        data={trades}
        searchKey="stock"
        searchPlaceholder="Search trades by stock symbol..."
        filterKey="type"
        filterLabel="Side"
        filterOptions={[
          { label: 'BUY', value: 'BUY' },
          { label: 'SELL', value: 'SELL' }
        ]}
        itemsPerPage={5}
        emptyMessage="No trade logs found matching query."
      />

    </div>
  );
};
