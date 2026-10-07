import React, { useState } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  CheckSquare,
  Square,
  TrendingUp,
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { TOP_STOCKS_DATA } from '../../services/altIndexData';

export const TopStocksPage = ({ onSelectStock }) => {
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [selectedIds, setSelectedIds] = useState(['twtr', 'aapl']);
  const [sortField, setSortField] = useState('aiScore');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');

  const industries = [
    'All Industries',
    'Social Media',
    'Consumer Technology',
    'Real Estate Tech',
    'Enterprise Software',
    'Internet & Search',
    'Communications',
    'Retail & Apparel',
    'Entertainment & Streaming',
    'Healthcare Diagnostics'
  ];

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredStocks.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStocks.map((s) => s.id));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter stocks
  const filteredStocks = TOP_STOCKS_DATA.filter((stock) => {
    const matchesIndustry =
      selectedIndustry === 'All Industries' || stock.industry.includes(selectedIndustry);
    const matchesRating =
      ratingFilter === 'ALL' || stock.rating === ratingFilter;
    const matchesSearch =
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesRating && matchesSearch;
  }).sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'priceChange') {
      aVal = a.priceChange;
      bVal = b.priceChange;
    }
    return sortDirection === 'asc' ? (aVal > bVal ? 1 : -1) : aVal < bVal ? 1 : -1;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header matching Screen 6 & 7 */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Top Stocks
          </h1>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            AI Screener
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-4xl leading-relaxed">
          Our AI Stock screener and alternative data is used to calculate a stock's overall
          expected performance potential. A score is built by analyzing thousands of
          alternative data points, including fundamental and alternative indicators. The
          predictive measure assigns a score from 0 to 100, representing the stock's
          performance and potential.
        </p>
      </div>

      {/* Filter Row matching Screenshot */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Industry dropdown */}
          <div className="relative">
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2 pr-8 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs cursor-pointer"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Rating filter pills */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700/60 text-xs">
            {['ALL', 'BUY', 'HOLD', 'SELL'].map((rat) => (
              <button
                key={rat}
                onClick={() => setRatingFilter(rat)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  ratingFilter === rat
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {rat}
              </button>
            ))}
          </div>
        </div>

        {/* Search in table */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter stocks..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          />
        </div>
      </div>

      {/* Main Table matching Screen 6 & 7 */}
      <div className="alt-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 w-12 text-center">
                  <button
                    onClick={toggleSelectAll}
                    className="text-slate-400 hover:text-indigo-600 focus:outline-none"
                    title="Select All"
                  >
                    {selectedIds.length === filteredStocks.length && filteredStocks.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-white select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Stock Name</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-white select-none text-right sm:text-left"
                >
                  <div className="flex items-center gap-1.5 justify-end sm:justify-start">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('marketCap')}
                  className="py-3 px-4 hidden md:table-cell cursor-pointer hover:text-slate-800 dark:hover:text-white select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Market Cap</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('aiScore')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-800 dark:hover:text-white select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>AI Score</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredStocks.map((stock) => {
                const isSelected = selectedIds.includes(stock.id);

                return (
                  <tr
                    key={stock.id}
                    onClick={() => onSelectStock && onSelectStock(stock)}
                    className={`hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 cursor-pointer transition-colors group ${
                      isSelected ? 'bg-indigo-50/20 dark:bg-indigo-950/10' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td
                      className="py-3 px-4 text-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(stock.id);
                      }}
                    >
                      <button className="text-slate-400 hover:text-indigo-600 focus:outline-none">
                        {isSelected ? (
                          <CheckSquare className="w-4 h-4 text-indigo-600" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                    </td>

                    {/* Stock Name with Icon */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs shrink-0"
                          style={{ backgroundColor: stock.color || '#6366F1' }}
                        >
                          {stock.initial}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                            <span>{stock.name}</span>
                            <span className="text-[10px] font-mono text-slate-400 font-semibold">
                              {stock.symbol}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 hidden sm:block">
                            {stock.industry}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price and % Change */}
                    <td className="py-3 px-4 text-right sm:text-left">
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] font-semibold ${
                          stock.priceChange >= 0
                            ? 'text-emerald-500'
                            : 'text-rose-500'
                        }`}
                      >
                        {stock.priceChange >= 0
                          ? `+${stock.priceChange}%`
                          : `${stock.priceChange}%`}
                      </div>
                    </td>

                    {/* Market Cap */}
                    <td className="py-3 px-4 hidden md:table-cell font-medium text-slate-600 dark:text-slate-300">
                      {stock.marketCap}
                    </td>

                    {/* AI Score */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                          {stock.aiScore}
                        </span>
                        <span
                          className={`text-[11px] font-semibold ${
                            stock.scoreChange > 0
                              ? 'text-emerald-500'
                              : stock.scoreChange < 0
                              ? 'text-rose-500'
                              : 'text-slate-400'
                          }`}
                        >
                          {stock.scoreChange > 0
                            ? `+${stock.scoreChange}%`
                            : stock.scoreChange < 0
                            ? `${stock.scoreChange}%`
                            : `0%`}
                        </span>
                      </div>
                      {/* Subtle score bar */}
                      <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                          style={{ width: `${stock.aiScore}%` }}
                        />
                      </div>
                    </td>

                    {/* Rating Badge */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wide ${
                          stock.rating === 'BUY'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60'
                            : stock.rating === 'SELL'
                            ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60'
                            : 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60'
                        }`}
                      >
                        {stock.rating}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer info */}
        <div className="px-4 py-3 bg-slate-50/60 dark:bg-slate-900/60 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Showing {filteredStocks.length} of {TOP_STOCKS_DATA.length} stocks
          </span>
          <span className="text-[11px] text-slate-400">
            Click any row to open alternative data & app download details
          </span>
        </div>
      </div>
    </div>
  );
};
