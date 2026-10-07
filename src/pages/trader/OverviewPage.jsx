import React from 'react';
import {
  TrendingUp,
  Sparkles,
  Smartphone,
  Flame,
  Bell,
  Layers,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Globe,
  Award
} from 'lucide-react';
import {
  TOP_STOCKS_DATA,
  REDDIT_STOCKS_DATA,
  STOCK_ALERTS_DATA,
  NETFLIX_APP_DOWNLOADS
} from '../../services/altIndexData';

export const OverviewPage = ({ onNavigate, onSelectStock }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Hero Welcome Banner */}
      <div className="alt-card p-6 sm:p-8 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden shadow-lg shadow-indigo-600/15">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alternative Data & AI Stock Screener</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Institutional Intelligence with Real-time Alternative Data
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-xl">
            Track web traffic, mobile app downloads, Glassdoor employee sentiment, and Reddit mention spikes before Wall Street earnings releases.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => onNavigate('top-stocks')}
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <span>Explore AI Screener</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('app-downloads')}
              className="px-4 py-2.5 rounded-xl bg-indigo-500/40 hover:bg-indigo-500/60 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>Netflix Deep Dive</span>
            </button>
            <button
              onClick={() => onNavigate('build-portfolio')}
              className="px-4 py-2.5 rounded-xl bg-indigo-500/40 hover:bg-indigo-500/60 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>Build Portfolio</span>
            </button>
          </div>
        </div>

        {/* Ambient background glow shapes */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-purple-500/20 to-transparent pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      </div>

      {/* Screen Gallery Navigation Grid */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span>Explore Platform Modules (Reference Screens)</span>
          <span className="w-2 h-2 rounded-full bg-indigo-500" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Top Stocks Screener */}
          <div
            onClick={() => onNavigate('top-stocks')}
            className="alt-card-hover p-5 cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                Screen 6 & 7
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Top Stocks AI Screener
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Predictive scoring (0-100), BUY/HOLD/SELL ratings, industry breakdown for Twitter, Apple, Google & more.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>Open Screener</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Netflix App Downloads */}
          <div
            onClick={() => onNavigate('app-downloads')}
            className="alt-card-hover p-5 cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                Screen 5 & 8
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Netflix - App Downloads
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                257,892 downloads timeline chart, Similar Companies peer comparison, and 12-item metrics grid.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>View Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Reddit Mentions */}
          <div
            onClick={() => onNavigate('reddit-mentions')}
            className="alt-card-hover p-5 cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                Screen 2
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Reddit Mentions Tracker
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Retail sentiment velocity, QuidelOrtho, Match, Lennid, Eventbrite social volume signals.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>View Sentiment</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Top Stock Alerts */}
          <div
            onClick={() => onNavigate('alerts')}
            className="alt-card-hover p-5 cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Bell className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                Screen 3
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Top Stock Alerts - July 30
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Live manager alerts: Robert Anderson (Google +16.8%), Jackson Ahmed (Dropbox -28.9%).
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>View Alerts Feed</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Build Portfolio */}
          <div
            onClick={() => onNavigate('build-portfolio')}
            className="alt-card-hover p-5 cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                Screen 1
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Build Your Portfolio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Machine learning watchlist optimization with QuidelOrtho, Match, Lennid, Eventbrite, Google.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>Launch Builder</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: User Settings */}
          <div
            onClick={() => onNavigate('settings')}
            className="alt-card-hover p-5 cursor-pointer space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                Screen 4
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                User Settings & Profile
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                Alex Smith fund manager settings, notification subscription feeds, password & upgrade.
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span>Edit Profile</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Preview: Top Screener Stocks + Live Anomaly Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Top AI Screener Stocks Preview */}
        <div className="alt-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Top AI Scored Equities
              </h2>
              <p className="text-[11px] text-slate-400">Calculated from 1,200+ alternative signals</p>
            </div>
            <button
              onClick={() => onNavigate('top-stocks')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Full Screener →
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {TOP_STOCKS_DATA.slice(0, 5).map((stock) => (
              <div
                key={stock.id}
                onClick={() => onSelectStock && onSelectStock(stock)}
                className="py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl px-2 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs shrink-0"
                    style={{ backgroundColor: stock.color }}
                  >
                    {stock.initial}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-slate-100">{stock.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{stock.symbol} • {stock.industry}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-slate-100">${stock.price.toFixed(2)}</div>
                    <div className={`text-[10px] font-semibold ${stock.priceChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {stock.priceChange >= 0 ? `+${stock.priceChange}%` : `${stock.priceChange}%`}
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      stock.rating === 'BUY'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                    }`}
                  >
                    {stock.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Live Alerts Feed Preview */}
        <div className="alt-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Recent Anomaly Alerts (July 30)
              </h2>
              <p className="text-[11px] text-slate-400">Triggered by institutional sentiment shifts</p>
            </div>
            <button
              onClick={() => onNavigate('alerts')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              All Alerts →
            </button>
          </div>

          <div className="space-y-3">
            {STOCK_ALERTS_DATA.map((alert) => (
              <div
                key={alert.id}
                onClick={() => onNavigate('alerts')}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={alert.traderAvatar}
                    alt={alert.traderName}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {alert.stockName}
                    </div>
                    <div className="text-[10px] text-slate-400">{alert.action}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      alert.isPositive
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
                    }`}
                  >
                    {alert.changePercent}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1">{alert.timeframe.split(',')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
