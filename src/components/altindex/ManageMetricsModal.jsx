import React, { useState } from 'react';
import { X, Check, Plus, Sliders } from 'lucide-react';
import { NETFLIX_APP_DOWNLOADS } from '../../services/altIndexData';

export const ManageMetricsModal = ({ isOpen, onClose }) => {
  const [activeMetrics, setActiveMetrics] = useState(
    NETFLIX_APP_DOWNLOADS.metrics.map((m) => m.id)
  );

  if (!isOpen) return null;

  const allAvailableMetrics = [
    { id: '2y-ret', label: '2-Yr return (vs S&P)' },
    { id: 'mkt-cap', label: 'Market Capitalization' },
    { id: 'p-to-b', label: 'Price to Book' },
    { id: 'rsi', label: 'RSI (14)' },
    { id: 'pe-ltm', label: 'P/E (LTM 10-Yr Growth)' },
    { id: 'p-to-cf', label: 'Price to Cash Flow' },
    { id: 'oper-res', label: 'Oper. Res Q4 22' },
    { id: 'net-profit', label: 'Net Profit Q4 22' },
    { id: 'beta', label: '2-Yr Beta' },
    { id: 'ps-ratio', label: 'P/S Ratio' },
    { id: 'mfi', label: 'Money Flow Index (MFI)' },
    { id: 'macd', label: 'MACD & Signal Line' },
    { id: 'div-yield', label: 'Forward Dividend Yield' },
    { id: 'free-cf', label: 'Free Cash Flow Margin' },
    { id: 'ebitda', label: 'EV / EBITDA Multiplier' }
  ];

  const toggleMetric = (id) => {
    setActiveMetrics((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Manage Dashboard Metrics
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Customize which fundamental and alternative metrics appear in your "Your Metrics" summary panel for Netflix and peer stocks.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto p-1">
          {allAvailableMetrics.map((metric) => {
            const isSelected = activeMetrics.includes(metric.id);

            return (
              <button
                key={metric.id}
                onClick={() => toggleMetric(metric.id)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="truncate">{metric.label}</span>
                <div
                  className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ml-2 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'border border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20"
          >
            Apply Changes ({activeMetrics.length})
          </button>
        </div>
      </div>
    </div>
  );
};
