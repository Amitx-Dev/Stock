import React from 'react';
import { Users, Zap, IndianRupee, Activity, ShieldCheck } from 'lucide-react';

export const StatsBand = () => {
  const stats = [
    { label: 'Active Traders', value: '1 Cr+', subtitle: 'Across 19,000+ pin codes', icon: Users },
    { label: 'Account Opening', value: '₹0', subtitle: '100% paperless onboarding', icon: IndianRupee },
    { label: 'Execution Speed', value: '1.2 ms', subtitle: 'Lightning-fast low latency', icon: Zap },
    { label: 'Brokerage Rate', value: '₹20 Flat', subtitle: 'Or 0.05% on F&O & Intraday', icon: Activity },
    { label: 'Engine Reliability', value: '99.99%', subtitle: 'High availability uptime', icon: ShieldCheck },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="flex flex-col items-center text-center p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 flex items-center justify-center mb-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {s.value}
                </h4>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                  {s.label}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {s.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
