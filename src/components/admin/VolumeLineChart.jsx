import React, { useState } from 'react';

export const VolumeLineChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const dataPoints = [
    { time: '09:30 AM', volume: 185000, trades: 142 },
    { time: '10:30 AM', volume: 340000, trades: 265 },
    { time: '11:30 AM', volume: 290000, trades: 210 },
    { time: '12:30 PM', volume: 210000, trades: 160 },
    { time: '01:30 PM', volume: 310000, trades: 245 },
    { time: '02:30 PM', volume: 460000, trades: 380 },
    { time: '03:30 PM', volume: 520000, trades: 430 }
  ];

  const maxVolume = 600000;
  const height = 200;
  const width = 500;
  const paddingX = 40;
  const paddingY = 25;

  const points = dataPoints.map((d, i) => {
    const x = paddingX + (i / (dataPoints.length - 1)) * (width - paddingX * 2);
    const y = height - paddingY - (d.volume / maxVolume) * (height - paddingY * 2);
    return { ...d, x, y };
  });

  const linePath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const areaPath = `${linePath} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  return (
    <div className="fintech-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Intraday Trade Volume Over Time
          </h4>
          <span className="text-[11px] text-slate-500">Gross transaction turnover ($) by trading session hour</span>
        </div>
        <div className="text-right">
          <span className="text-xs font-black text-cyan-400 font-mono">$2,315,000</span>
          <span className="text-[10px] text-slate-400 block">Total Today</span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 overflow-visible">
          <defs>
            <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = height - paddingY - ratio * (height - paddingY * 2);
            return (
              <g key={ratio}>
                <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="#1f2937" strokeDasharray="3 3" />
                <text x={paddingX - 8} y={y + 3} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
                  ${((ratio * maxVolume) / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {/* Area and Line */}
          <path d={areaPath} fill="url(#volGrad)" />
          <path d={linePath} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Interactive Data Points */}
          {points.map((p, idx) => (
            <g key={idx} className="cursor-pointer">
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint === idx ? 6 : 4}
                fill={hoveredPoint === idx ? '#38bdf8' : '#0891b2'}
                stroke="#0f172a"
                strokeWidth="2"
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
              <text x={p.x} y={height - 6} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
                {p.time.split(' ')[0]}
              </text>
            </g>
          ))}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="absolute -top-3 z-10 p-2 rounded-lg bg-slate-950 border border-cyan-500/60 text-xs shadow-xl pointer-events-none transform -translate-x-1/2"
            style={{ left: `${(points[hoveredPoint].x / width) * 100}%` }}
          >
            <div className="font-bold text-white text-[11px]">{points[hoveredPoint].time}</div>
            <div className="text-cyan-400 font-mono font-bold">
              ${points[hoveredPoint].volume.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400">
              {points[hoveredPoint].trades} executions
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
