import React, { useState } from 'react';
import {
  MessageSquare,
  Sparkles,
  TrendingUp,
  Filter,
  ChevronDown,
  ArrowUpRight,
  Flame,
  BarChart2
} from 'lucide-react';
import { REDDIT_STOCKS_DATA } from '../../services/altIndexData';

export const RedditMentionsPage = ({ onSelectStock }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industry');

  const industries = [
    'All Industry',
    'Technology',
    'Consumer Tech',
    'Healthcare',
    'Real Estate',
    'Enterprise Tech',
    'Automotive / EV'
  ];

  const filteredStocks = REDDIT_STOCKS_DATA.filter((s) => {
    if (selectedIndustry === 'All Industry') return true;
    return s.industry.includes(selectedIndustry);
  });

  return (
    <div className="max-w-2xl mx-auto py-4 sm:py-8 space-y-6 animate-in fade-in duration-200">
      {/* Centered Card matching Screen 2 */}
      <div className="alt-card p-6 sm:p-8 space-y-6 shadow-md">
        {/* Header Section matching Screen 2 */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 text-xs font-bold">
            <Flame className="w-3.5 h-3.5" />
            <span>Retail Sentiment Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Top Stocks - Reddit Mentions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg mx-auto">
            By analyzing the most frequently mentioned tickers on Reddit, we can get an early indicator of what is catching the retail investor crowd's attention. AltIndex NLP models filter spam, bot farms, and sentiment velocity.
          </p>
        </div>

        {/* Section Heading with "All Industry" dropdown matching Screen 2 */}
        <div className="flex items-center justify-between pt-2">
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            Most Popular Stocks Available Now
          </h2>

          <div className="relative">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 pr-7 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400 focus:outline-none cursor-pointer shadow-2xs"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Table matching Screen 2 */}
        <div className="border border-slate-200/80 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-right">Reddit Mentions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredStocks.map((stock) => (
                <tr
                  key={stock.id}
                  onClick={() => onSelectStock && onSelectStock(stock)}
                  className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 cursor-pointer transition-colors group"
                >
                  {/* Company with Logo Icon */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs shrink-0"
                        style={{ backgroundColor: stock.color }}
                      >
                        {stock.initial}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {stock.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {stock.symbol} • {stock.industry}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    ${stock.price.toFixed(2)}
                  </td>

                  {/* Reddit Mentions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                      <span>{stock.mentions}</span>
                      <span className="text-[11px] font-semibold text-emerald-500">
                        ({stock.change})
                      </span>
                    </div>
                    {/* Bullish sentiment meter */}
                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-0.5">
                      <span>{stock.bullish}% Bullish</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sentiment insight card */}
        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center justify-between text-xs text-indigo-900 dark:text-indigo-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Reddit comment volume for top 10 tickers increased by +24.8% in the past 24h</span>
          </div>
          <span className="text-[10px] font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-bold">
            r/wallstreetbets + r/stocks
          </span>
        </div>
      </div>
    </div>
  );
};
