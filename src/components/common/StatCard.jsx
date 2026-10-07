import React from 'react';

export const StatCard = ({ title, value, subValue, trend, isPositive, icon: Icon, badgeText }) => {
  return (
    <div className="fintech-card p-5 relative overflow-hidden transition-all duration-200 hover:border-slate-700">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-800/80 text-cyan-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-black tracking-tight text-white">{value}</div>
        {(subValue || trend) && (
          <div className="mt-1 flex items-center gap-2 text-xs font-medium">
            {trend && (
              <span className={`flex items-center font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isPositive ? '▲ +' : '▼ '}{trend}
              </span>
            )}
            {subValue && <span className="text-slate-400">{subValue}</span>}
          </div>
        )}
      </div>

      {badgeText && (
        <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
          {badgeText}
        </span>
      )}
    </div>
  );
};
