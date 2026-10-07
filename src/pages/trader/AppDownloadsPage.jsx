import React, { useState } from 'react';
import {
  Smartphone,
  TrendingUp,
  TrendingDown,
  Info,
  Calendar,
  Layers,
  ChevronDown,
  ExternalLink,
  Plus,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { NETFLIX_APP_DOWNLOADS, TOP_STOCKS_DATA } from '../../services/altIndexData';

export const AppDownloadsPage = ({ onOpenManageMetrics }) => {
  const [timeframe, setTimeframe] = useState('1Y');
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedStock, setSelectedStock] = useState('NFLX');

  const data = NETFLIX_APP_DOWNLOADS;
  const chartPoints = data.chartPoints;

  // SVG Chart calculation
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 20;
  const paddingY = 30;

  const minVal = Math.min(...chartPoints.map((p) => p.downloads)) * 0.95;
  const maxVal = Math.max(...chartPoints.map((p) => p.downloads)) * 1.05;

  const points = chartPoints.map((pt, i) => {
    const x =
      paddingX +
      (i / (chartPoints.length - 1)) * (svgWidth - paddingX * 2);
    const y =
      svgHeight -
      paddingY -
      ((pt.downloads - minVal) / (maxVal - minVal)) *
        (svgHeight - paddingY * 2);
    return { x, y, ...pt };
  });

  // Construct smooth bezier path
  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header matching Screen 5 & 8 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-rose-600/20 shrink-0">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Netflix - App Downloads
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                Alt Dataset
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              <span>{data.ticker}</span>
              <span>•</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">${data.currentPrice}</span>
              <span className="text-emerald-500 font-semibold">{data.priceChange}</span>
            </div>
          </div>
        </div>

        {/* Timeframe pill tabs */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs self-start sm:self-auto">
          {['1M', '3M', '6M', '1Y', 'ALL'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Row: Hero Chart Card + Similar Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left & Center (2 Columns): App Download Hero & Interactive Area Chart */}
        <div className="lg:col-span-2 alt-card p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Estimated Monthly Downloads
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {data.headlineDownloads}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200/60 dark:border-slate-700">
                    {data.yearChange}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                    {data.monthChange}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-medium">
              Data aggregated across iOS App Store & Google Play
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="relative pt-4">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-56 sm:h-64 overflow-visible"
            >
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
                  <stop offset="50%" stopColor="#6366F1" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Background Grid Lines */}
              <line
                x1={paddingX}
                y1={svgHeight - paddingY}
                x2={svgWidth - paddingX}
                y2={svgHeight - paddingY}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="1"
              />
              <line
                x1={paddingX}
                y1={svgHeight / 2}
                x2={svgWidth - paddingX}
                y2={svgHeight / 2}
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800/60"
                strokeDasharray="4 4"
                strokeWidth="1"
              />
              <line
                x1={paddingX}
                y1={paddingY}
                x2={svgWidth - paddingX}
                y2={paddingY}
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800/60"
                strokeDasharray="4 4"
                strokeWidth="1"
              />

              {/* Filled Area */}
              <path d={areaD} fill="url(#purpleGradient)" />

              {/* Main Stroke Line */}
              <path
                d={pathD}
                fill="none"
                stroke="#6366F1"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Interactive Data Points */}
              {points.map((pt, idx) => (
                <g key={idx} className="cursor-pointer">
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={hoveredPoint?.label === pt.label ? 6 : 3.5}
                    className={`transition-all ${
                      hoveredPoint?.label === pt.label
                        ? 'fill-indigo-600 stroke-white stroke-2 shadow-lg'
                        : 'fill-indigo-500 hover:fill-indigo-600'
                    }`}
                    onMouseEnter={() => setHoveredPoint(pt)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              ))}

              {/* X Axis Labels */}
              <text x={paddingX} y={svgHeight - 8} fill="#94a3b8" fontSize="10" textAnchor="start">
                Nov 2022
              </text>
              <text x={svgWidth * 0.25} y={svgHeight - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">
                Jan 2023
              </text>
              <text x={svgWidth * 0.5} y={svgHeight - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">
                Mar 2023
              </text>
              <text x={svgWidth * 0.75} y={svgHeight - 8} fill="#94a3b8" fontSize="10" textAnchor="middle">
                May 2023
              </text>
              <text x={svgWidth - paddingX} y={svgHeight - 8} fill="#94a3b8" fontSize="10" textAnchor="end">
                Jun 2023
              </text>
            </svg>

            {/* Interactive Floating Tooltip */}
            {hoveredPoint && (
              <div
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl z-20 whitespace-nowrap border border-slate-700"
                style={{
                  left: `${(hoveredPoint.x / svgWidth) * 100}%`,
                  top: `${(hoveredPoint.y / svgHeight) * 100 - 10}%`
                }}
              >
                <div className="font-bold">{hoveredPoint.downloads.toLocaleString()} downloads</div>
                <div className="text-[10px] text-indigo-300">{hoveredPoint.label}</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: "Similar Companies" Card matching Screenshot */}
        <div className="alt-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Similar Companies</h2>
            <span className="text-[11px] font-semibold text-slate-400">App Download</span>
          </div>

          <div className="space-y-3">
            {data.similarCompanies.map((comp) => (
              <div
                key={comp.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs"
                    style={{ backgroundColor: comp.color }}
                  >
                    {comp.initial}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {comp.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">{comp.symbol}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {comp.downloads}
                  </div>
                  <div
                    className={`text-[10px] font-semibold ${
                      comp.isPositive ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {comp.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
            <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              Compare Full Peer Group →
            </button>
          </div>
        </div>
      </div>

      {/* Middle Row: Month Over Month Table + Two Informative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Month Over Month Table */}
        <div className="alt-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Month Over Month
            </h3>
            <span className="text-[10px] text-slate-400">Monthly Run-rate</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {data.monthOverMonth.map((m, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400 font-medium">{m.month}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-800 dark:text-slate-100">{m.downloads}</span>
                  <span
                    className={`text-[11px] font-semibold w-12 text-right ${
                      m.isPositive === true
                        ? 'text-emerald-500'
                        : m.isPositive === false
                        ? 'text-rose-500'
                        : 'text-slate-400'
                    }`}
                  >
                    {m.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: How Many People Are Downloading Netflix's Mobile Apps? */}
        <div className="alt-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
              <Smartphone className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              How Many People Are Downloading Netflix's Mobile Apps?
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            An estimated 257,892 people downloaded Netflix's mobile app in the past 30 days. This
            trend represents an acceleration of +4.2% month-over-month. Mobile installs provide a
            strong leading indicator of subsequent paid subscriber additions and engagement retention
            in international expansion territories.
          </p>
        </div>

        {/* Card 3: Analyzing App Downloads: How Is Netflix Performing Compared To Its Industry Peers? */}
        <div className="alt-card p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              Analyzing App Downloads: How Is Netflix Performing Compared To Its Industry Peers?
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Netflix maintains the highest organic search conversion velocity among streaming peers,
            outpacing Disney+ in mobile daily active users by 18.4%. AltIndex machine learning
            models assign an overall 88/100 alternative signal score based on steady download volume
            and churn containment.
          </p>
        </div>
      </div>

      {/* Bottom Section: "Your Metrics" matching Screenshot */}
      <div className="alt-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Your Metrics</h2>
            <p className="text-[11px] text-slate-400">
              Key fundamental & quantitative trading ratios tracked for NFLX
            </p>
          </div>
          <button
            onClick={onOpenManageMetrics}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Metrics</span>
          </button>
        </div>

        {/* 12-item Metrics Grid matching screenshot */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {data.metrics.map((metric) => (
            <div
              key={metric.id}
              className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="text-[10px] text-slate-400 uppercase font-semibold truncate leading-tight">
                {metric.label}
              </div>
              <div
                className={`text-sm font-black tracking-tight ${
                  metric.isPositive === true
                    ? 'text-emerald-500'
                    : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
