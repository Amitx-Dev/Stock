import React, { useState } from 'react';

const COLORS = [
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#10b981', // emerald
  '#8b5cf6', // purple
  '#f59e0b', // amber
  '#ec4899', // pink
  '#14b8a6'  // teal
];

export const HoldingsPieChart = ({ holdings = [] }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!holdings || holdings.length === 0) {
    return (
      <div className="fintech-card p-6 flex items-center justify-center text-slate-500 text-xs h-64">
        No asset distribution data available
      </div>
    );
  }

  const totalValue = holdings.reduce((sum, h) => sum + (h.value || 0), 0) || 1;

  // Compute SVG Donut slices
  let cumulativeAngle = 0;
  const size = 200;
  const center = size / 2;
  const radius = 75;
  const strokeWidth = 26;

  const slices = holdings.map((item, idx) => {
    const fraction = (item.value || 0) / totalValue;
    const angle = fraction * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    // Convert polar to cartesian
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;
    const pathData = angle >= 359.9
      ? `M ${center},${center - radius} A ${radius},${radius} 0 1 1 ${center - 0.01},${center - radius}`
      : `M ${x1},${y1} A ${radius},${radius} 0 ${largeArcFlag} 1 ${x2},${y2}`;

    const color = COLORS[idx % COLORS.length];
    const percentage = (fraction * 100).toFixed(1);

    return {
      item,
      pathData,
      color,
      percentage,
      idx
    };
  });

  const activeItem = hoveredIdx !== null ? slices[hoveredIdx] : null;

  return (
    <div className="fintech-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Portfolio Asset Allocation
        </h4>
        <span className="text-[11px] text-slate-400 font-mono">
          {holdings.length} Assets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
        {/* SVG Donut */}
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
            {slices.map((slice) => (
              <path
                key={slice.idx}
                d={slice.pathData}
                fill="none"
                stroke={slice.color}
                strokeWidth={hoveredIdx === slice.idx ? strokeWidth + 4 : strokeWidth}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIdx(slice.idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            ))}
          </svg>

          {/* Center Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            {activeItem ? (
              <>
                <div className="text-base font-black text-white">{activeItem.item.symbol}</div>
                <div className="text-xs font-mono font-bold" style={{ color: activeItem.color }}>
                  {activeItem.percentage}%
                </div>
              </>
            ) : (
              <>
                <div className="text-[10px] text-slate-400 uppercase font-medium">Total Assets</div>
                <div className="text-sm font-black text-white font-mono">
                  ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2.5">
          {slices.map((slice) => (
            <div
              key={slice.idx}
              onMouseEnter={() => setHoveredIdx(slice.idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors text-xs ${
                hoveredIdx === slice.idx ? 'bg-slate-800' : 'hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                <span className="font-bold text-white">{slice.item.symbol}</span>
                <span className="text-[11px] text-slate-400 truncate max-w-[100px] hidden sm:inline">
                  {slice.item.companyName}
                </span>
              </div>
              <div className="text-right">
                <span className="font-mono font-bold text-white">{slice.percentage}%</span>
                <span className="text-[10px] text-slate-400 font-mono ml-2">
                  (${slice.item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
