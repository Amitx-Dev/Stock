import React from 'react';
import {
  tradesPerHourData,
  tradeVolumeTrendData,
  buySellSplitData,
  systemPerformanceData,
  activityKpis
} from '../../data/mockTradeActivity';
import { StatCard } from '../../components/common/StatCard';
import { ChartCard } from '../../components/common/ChartCard';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Activity, Users, DollarSign, AlertOctagon, TrendingUp } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const TradeActivityPage = () => {
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

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Real-Time Trade Activity Monitoring
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Live order routing throughput, turnover volume trends, order execution breakdown, and system latencies.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Trades Today"
          value={activityKpis.totalTradesToday}
          change={activityKpis.totalTradesChange}
          isPositive={true}
          icon={Activity}
        />
        <StatCard
          title="Active Users"
          value={activityKpis.activeUsers}
          change={activityKpis.activeUsersChange}
          isPositive={true}
          icon={Users}
          iconBg="bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
        />
        <StatCard
          title="Turnover Volume"
          value={activityKpis.totalVolume}
          change={activityKpis.totalVolumeChange}
          isPositive={true}
          icon={TrendingUp}
          iconBg="bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
        />
        <StatCard
          title="Failed / Rejected"
          value={activityKpis.failedOrders}
          change={activityKpis.failedOrdersRate}
          isPositive={false}
          icon={AlertOctagon}
          iconBg="bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Trades Per Hour (Bar) */}
        <ChartCard
          title="Trades Executed Per Hour"
          subtitle="Distribution across market session (09:15 - 15:30 IST)"
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tradesPerHourData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="hour" stroke={textColor} fontSize={11} tickLine={false} />
                <YAxis stroke={textColor} fontSize={11} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="trades" name="Orders Filled" fill="#5F259F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 2: Trade Volume Trend (Area/Line) */}
        <ChartCard
          title="Turnover Volume Trend (₹ Cr)"
          subtitle="Cumulative market turnover in Crores"
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={tradeVolumeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volumeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#805ad5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#805ad5" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="time" stroke={textColor} fontSize={11} tickLine={false} />
                <YAxis stroke={textColor} fontSize={11} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${v} Cr`, 'Turnover']} />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#5F259F"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#volumeGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 3: Buy vs Sell Split (Donut) */}
        <ChartCard
          title="Buy vs. Sell Orders Ratio"
          subtitle="Breakdown of executed retail and institutional flow"
        >
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={buySellSplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {buySellSplitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(val, entry) => (
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {val} ({((entry.payload.value / 163600) * 100).toFixed(1)}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Chart 4: System Performance (Latency & CPU) */}
        <ChartCard
          title="System Performance & Latency"
          subtitle="Execution Gateway Latency (ms) vs CPU Utilization (%)"
        >
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={systemPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="time" stroke={textColor} fontSize={11} tickLine={false} />
                <YAxis stroke={textColor} fontSize={11} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={36} />
                <Line
                  type="monotone"
                  dataKey="latency"
                  name="Latency (ms)"
                  stroke="#00b386"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  name="CPU Load (%)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

      </div>

    </div>
  );
};
