import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  Check,
  TrendingUp,
  Sliders,
  CheckCircle2,
  DollarSign,
  PieChart,
  RefreshCw
} from 'lucide-react';
import { PORTFOLIO_RECOMMENDATIONS } from '../../services/altIndexData';

export const BuildPortfolioPage = () => {
  const [selectedStocks, setSelectedStocks] = useState(
    PORTFOLIO_RECOMMENDATIONS.map((s) => s.id)
  );
  const [investmentBudget, setInvestmentBudget] = useState(50000);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildSuccess, setBuildSuccess] = useState(false);

  const toggleStock = (id) => {
    setSelectedStocks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBuildPortfolio = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      setBuildSuccess(true);
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Centered Card matching Screen 1 */}
      <div className="alt-card p-6 sm:p-8 space-y-6 shadow-md">
        {/* Header matching Screen 1 */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Portfolio Architect</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Build Your Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
            Long term growth direction: Historically, Panathena has shown strong track record with growth, and we recommend building diverse portfolio today. Below is top 5 watchlist recommended based on machine learning alternative indicators.
          </p>
        </div>

        {/* Section Title matching Screenshot */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Most Popular Stocks Available Now
            </h2>
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
              {selectedStocks.length} Selected
            </span>
          </div>

          {/* Stock List matching Screen 1 */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
            {PORTFOLIO_RECOMMENDATIONS.map((stock) => {
              const isSelected = selectedStocks.includes(stock.id);

              return (
                <div
                  key={stock.id}
                  onClick={() => toggleStock(stock.id)}
                  className={`flex items-center justify-between p-3.5 sm:p-4 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-50/10' : 'opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    {/* Checkbox indicator */}
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    {/* Stock Logo Initial */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs shrink-0"
                      style={{ backgroundColor: stock.color }}
                    >
                      {stock.initial}
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                        {stock.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {stock.symbol}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                      ${stock.price.toFixed(2)}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-500">
                      {stock.score} <span className="text-emerald-500">({stock.change})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investment Budget Quick Option */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-300">Target Capital Allocation:</span>
          <div className="flex items-center gap-2">
            {[10000, 25000, 50000, 100000].map((amt) => (
              <button
                key={amt}
                onClick={() => setInvestmentBudget(amt)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                  investmentBudget === amt
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-400'
                }`}
              >
                ${(amt / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        {/* Big Purple Button matching Screen 1 */}
        <div>
          <button
            onClick={handleBuildPortfolio}
            disabled={selectedStocks.length === 0 || isBuilding}
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isBuilding ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Optimizing Alternative Weights...</span>
              </>
            ) : (
              <span>Build Portfolio</span>
            )}
          </button>
        </div>

        {/* Success confirmation card */}
        {buildSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3 animate-in fade-in duration-150">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                Portfolio Optimized Successfully!
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
                Allocated ${investmentBudget.toLocaleString()} across {selectedStocks.length} alternative-data validated equities with expected 1Y alpha +18.4%.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
