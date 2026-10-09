import React, { useState } from 'react';
import { topGainers, topLosers, mostActive } from '../../data/mockStocks';
import { TrendingUp, TrendingDown, Activity, ArrowUpRight, ArrowDownRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MarketSnapshot = () => {
  const [activeTab, setActiveTab] = useState('gainers');

  return (
    <section id="markets" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
              Live Market Intelligence
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
              Market Snapshot
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
              Real-time movers across NSE Nifty 50 and BSE indices.
            </p>
          </div>

          {/* Snapshot Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('gainers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'gainers'
                  ? 'bg-white dark:bg-slate-900 text-trade-green shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-trade-green" />
              <span>Top Gainers</span>
            </button>
            <button
              onClick={() => setActiveTab('losers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'losers'
                  ? 'bg-white dark:bg-slate-900 text-trade-red shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <TrendingDown className="w-4 h-4 text-trade-red" />
              <span>Top Losers</span>
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'active'
                  ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4 text-brand-600" />
              <span>Most Active</span>
            </button>
          </div>
        </div>

        {/* Mini Table Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-4 px-6">Company / Stock</th>
                  <th className="py-4 px-6 text-right">LTP (₹)</th>
                  {activeTab !== 'active' ? (
                    <>
                      <th className="py-4 px-6 text-right">Change (₹)</th>
                      <th className="py-4 px-6 text-right">% Change</th>
                    </>
                  ) : (
                    <>
                      <th className="py-4 px-6 text-right">Volume</th>
                      <th className="py-4 px-6 text-right">Turnover</th>
                    </>
                  )}
                  <th className="py-4 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {(activeTab === 'gainers' ? topGainers : activeTab === 'losers' ? topLosers : mostActive).map((stock) => (
                  <tr
                    key={stock.symbol}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {stock.symbol}
                          </p>
                          <p className="text-xs text-slate-400">{stock.name}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right font-mono font-bold text-slate-900 dark:text-white">
                      ₹{stock.price.toFixed(2)}
                    </td>

                    {activeTab !== 'active' ? (
                      <>
                        <td
                          className={`py-4 px-6 text-right font-mono font-semibold ${
                            activeTab === 'gainers' ? 'text-trade-green' : 'text-trade-red'
                          }`}
                        >
                          {activeTab === 'gainers' ? `+₹${stock.change.toFixed(2)}` : `-₹${Math.abs(stock.change).toFixed(2)}`}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                              activeTab === 'gainers'
                                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-trade-green'
                                : 'bg-rose-50 dark:bg-rose-950/50 text-trade-red'
                            }`}
                          >
                            {activeTab === 'gainers' ? (
                              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                            ) : (
                              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                            )}
                            {activeTab === 'gainers' ? '+' : ''}
                            {stock.changePercent}%
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-6 text-right font-mono text-slate-700 dark:text-slate-300">
                          {stock.volume}
                        </td>
                        <td className="py-4 px-6 text-right font-mono font-semibold text-brand-700 dark:text-brand-300">
                          {stock.turnover}
                        </td>
                      </>
                    )}

                    <td className="py-4 px-6 text-center">
                      <Link
                        to="/login?role=trader"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/60 dark:hover:bg-brand-900/80 text-brand-700 dark:text-brand-300 text-xs font-bold transition-colors"
                      >
                        <span>Trade</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
