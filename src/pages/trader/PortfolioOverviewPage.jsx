import React, { useState } from 'react';
import {
  mockHoldings,
  portfolioSummary,
  portfolioTimeline,
  sectorAllocations
} from '../../data/mockHoldings';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import { Badge } from '../../components/common/Badge';
import { useTheme } from '../../context/ThemeContext';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Wallet,
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Download
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PortfolioOverviewPage = () => {
  const [selectedRange, setSelectedRange] = useState('1D');
  const { isDark } = useTheme();

  const gridColor = isDark ? '#334155' : '#f1f5f9';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#1e293b' : '#e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 20px -2px rgba(0,0,0,0.15)',
    color: isDark ? '#f8fafc' : '#0f172a',
    fontSize: '12px'
  };

  const chartPoints = portfolioTimeline[selectedRange] || portfolioTimeline['1D'];

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Portfolio Overview & Holdings
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Demat holdings, real-time returns, day gainers, and asset allocation breakdown.
          </p>
        </div>
        <Link
          to="/trader/trading"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Stocks to Portfolio</span>
        </Link>
      </div>

      {/* KPI Cards: Total Invested, Current Value, Day P&L, Overall P&L */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invested"
          value={`₹${portfolioSummary.totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          subtitle="Capital deployed in equity"
          icon={Wallet}
        />
        <StatCard
          title="Current Value"
          value={`₹${portfolioSummary.currentValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          subtitle="Real-time mark-to-market"
          icon={TrendingUp}
          iconBg="bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
        />
        <StatCard
          title="Today's P&L"
          value={`+₹${portfolioSummary.dayPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          change={`+${portfolioSummary.dayPnlPercent}%`}
          isPositive={true}
          subtitle="Intraday equity change"
          icon={ArrowUpRight}
          iconBg="bg-emerald-50 text-trade-green dark:bg-emerald-950/60 dark:text-emerald-300"
        />
        <StatCard
          title="Overall P&L"
          value={`+₹${portfolioSummary.overallPnl.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          change={`+${portfolioSummary.overallPnlPercent}%`}
          isPositive={true}
          subtitle="Net return on invested"
          icon={PieIcon}
          iconBg="bg-emerald-50 text-trade-green dark:bg-emerald-950/60 dark:text-emerald-300"
        />
      </div>

      {/* Charts Row: Performance Timeline & Sector Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Performance Line Chart */}
        <div className="lg:col-span-8">
          <ChartCard
            title="Portfolio Valuation Trend"
            subtitle="Historical portfolio valuation over time"
            actions={
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['1D', '1W', '1M', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setSelectedRange(range)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      selectedRange === range
                        ? 'bg-brand-700 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            }
          >
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartPoints} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="time" stroke={textColor} fontSize={11} tickLine={false} />
                  <YAxis
                    stroke={textColor}
                    fontSize={11}
                    tickLine={false}
                    domain={['dataMin - 1000', 'dataMax + 1000']}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${v.toLocaleString()}`, 'Portfolio']} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#5F259F"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#5F259F' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Sector Allocation Donut Chart */}
        <div className="lg:col-span-4">
          <ChartCard
            title="Sector Allocation"
            subtitle="Concentration of equity capital"
          >
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocations}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sectorAllocations.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${v.toLocaleString()}`, 'Amount']} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(val) => <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

      </div>

      {/* Holdings Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Individual Holdings ({mockHoldings.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Available in CDSL Demat depository. Click stock to open trading terminal.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Available Margin: ₹{portfolioSummary.availableMargin.toLocaleString()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Instrument</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4 text-right">Avg Price</th>
                <th className="py-3 px-4 text-right">LTP (₹)</th>
                <th className="py-3 px-4 text-right">Invested</th>
                <th className="py-3 px-4 text-right">Current Value</th>
                <th className="py-3 px-4 text-right">P&L (%)</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              {mockHoldings.map((h) => {
                const isProfitable = h.pnl >= 0;
                return (
                  <tr key={h.symbol} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4 font-sans">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center">
                          {h.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{h.symbol}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{h.sector}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-slate-800 dark:text-slate-200">
                      {h.qty}
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-400">
                      ₹{h.avgPrice.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                      ₹{h.ltp.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-400">
                      ₹{h.invested.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                      ₹{h.current.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                          isProfitable
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-trade-green'
                            : 'bg-rose-50 dark:bg-rose-950/50 text-trade-red'
                        }`}
                      >
                        {isProfitable ? '+' : ''}
                        ₹{h.pnl.toFixed(2)} ({isProfitable ? '+' : ''}{h.pnlPercent}%)
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-sans">
                      <Link
                        to="/trader/trading"
                        className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                      >
                        Trade
                      </Link>
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
