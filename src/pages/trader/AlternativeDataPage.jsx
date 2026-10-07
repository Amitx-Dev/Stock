import React from 'react';
import {
  TrendingUp,
  Briefcase,
  Globe,
  Star,
  Award,
  DollarSign,
  Flame,
  Users,
  Landmark,
  Sparkles,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import { TOP_STOCKS_DATA } from '../../services/altIndexData';

export const AlternativeDataPage = ({ category, onSelectStock }) => {
  const categoryConfigs = {
    'price-prediction': {
      title: 'Price Prediction Models',
      icon: TrendingUp,
      subtitle: 'Monte Carlo simulation & neural network price trajectory forecasts across 30-day and 90-day forward horizons.',
      stat1: { label: 'Active Neural Models', value: '142 Ensemble Engines' },
      stat2: { label: 'Directional Accuracy', value: '78.4% Out-of-sample' },
      stat3: { label: 'Avg Alpha Generation', value: '+14.2% Annually' },
      topLeaderLabel: 'Highest Predicted 30-Day Growth',
      dataKey: 'aiScore'
    },
    'job-post': {
      title: 'Job Postings & Hiring Velocity',
      icon: Briefcase,
      subtitle: 'Tracking job openings, recruiter velocity, and layoffs across corporate career portals as leading revenue indicators.',
      stat1: { label: 'Companies Monitored', value: '3,840 Tickers' },
      stat2: { label: 'Monthly Post Additions', value: '+12.4% Net Hiring' },
      stat3: { label: 'AI & Engineering Demand', value: '44% of Openings' },
      topLeaderLabel: 'Fastest Engineering Headcount Hiring',
      dataKey: 'aiScore'
    },
    'sentiment': {
      title: 'Sentiment Intelligence',
      icon: Flame,
      subtitle: 'Natural language analysis across Twitter, Reddit, Discord, and financial news communities in real-time.',
      stat1: { label: 'Data Points Analyzed', value: '89.4M Comments Daily' },
      stat2: { label: 'Retail Momentum Score', value: '+18.2% Bullish' },
      stat3: { label: 'Spam Filtering Ratio', value: '96.8% Clean Signals' },
      topLeaderLabel: 'Top Positive Retail Sentiment',
      dataKey: 'sentiment'
    },
    'webpage-traffic': {
      title: 'Webpage Traffic & Digital Footprint',
      icon: Globe,
      subtitle: 'Global unique visitor trends, bounce rates, and checkout cart conversion signals scraped from telecom & DNS panels.',
      stat1: { label: 'Monthly Domain Visits', value: '1.2B Visitors Tracked' },
      stat2: { label: 'E-commerce Conversion', value: '3.42% Benchmark' },
      stat3: { label: 'Mobile vs Desktop', value: '68% Mobile Share' },
      topLeaderLabel: 'Highest Digital Traffic Momentum',
      dataKey: 'aiScore'
    },
    'customer-reviews': {
      title: 'Customer Reviews & App Store Ratings',
      icon: Star,
      subtitle: 'Sentiment scoring from App Store, Google Play, Trustpilot, and Amazon product reviews.',
      stat1: { label: 'App Reviews Ingested', value: '4.8M App Reviews' },
      stat2: { label: 'Average Consumer Rating', value: '4.4 / 5.0 Stars' },
      stat3: { label: 'Negative Churn Alerts', value: '18 Active Warnings' },
      topLeaderLabel: 'Highest Customer Net Promoter Score',
      dataKey: 'sentiment'
    },
    'employee-rating': {
      title: 'Employee Rating & Glassdoor Culture',
      icon: Award,
      subtitle: 'Internal corporate morale, CEO approval ratings, and senior management outlook from Glassdoor and Indeed.',
      stat1: { label: 'Employee Reviews Processed', value: '620,000+ Reviews' },
      stat2: { label: 'Culture Divergence Index', value: '91.2% Correlation' },
      stat3: { label: 'Executive Approval Avg', value: '82% CEO Approval' },
      topLeaderLabel: 'Top Glassdoor Rated Workplaces',
      dataKey: 'aiScore'
    },
    'google-ads': {
      title: 'Google Ad Spend & SEM Velocity',
      icon: DollarSign,
      subtitle: 'Estimated paid search advertising budgets, target keyword bids, and competitive PPC auction coverage.',
      stat1: { label: 'Monitored Keywords', value: '14.5M Search Terms' },
      stat2: { label: 'Average CPC Shift', value: '+4.1% MoM Change' },
      stat3: { label: 'Direct Acquisition Spend', value: '$840M Estimated' },
      topLeaderLabel: 'Largest Digital Marketing Expansion',
      dataKey: 'aiScore'
    },
    'google-trends': {
      title: 'Google Trends & Search Volume',
      icon: Flame,
      subtitle: 'Search query frequency spikes indicating sudden product popularity, consumer awareness, and brand breakout moments.',
      stat1: { label: 'Search Query Index', value: '120 Regional Markets' },
      stat2: { label: 'Viral Breakout Velocity', value: '+340% Peak Query' },
      stat3: { label: 'Lead Time to Revenue', value: '4 to 6 Weeks' },
      topLeaderLabel: 'Strongest Google Search Breakout',
      dataKey: 'sentiment'
    },
    'linkedin': {
      title: 'LinkedIn Headcount & Retention',
      icon: Users,
      subtitle: 'Net employee growth, median tenure length, and talent migration between competitor firms.',
      stat1: { label: 'Profiles Indexed', value: '18.4M Corporate Profiles' },
      stat2: { label: 'Quarterly Headcount Delta', value: '+2.8% Average' },
      stat3: { label: 'Executive Retention', value: '94.2% Stability' },
      topLeaderLabel: 'Fastest Growing Tech Headcount',
      dataKey: 'aiScore'
    },
    'lobbying': {
      title: 'Lobbying Spend & Government Filings',
      icon: Landmark,
      subtitle: 'Senate Office of Public Records disclosures, government contract awards, and federal agency regulatory outlays.',
      stat1: { label: 'Federal Filings Scanned', value: '100% Disclosure Sync' },
      stat2: { label: 'Total Capitol Hill Outlay', value: '$148M Annualized' },
      stat3: { label: 'Regulatory Risk Score', value: 'Low / Managed' },
      topLeaderLabel: 'Active Policy Engagements',
      dataKey: 'aiScore'
    }
  };

  const config = categoryConfigs[category] || categoryConfigs['price-prediction'];
  const Icon = config.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Icon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {config.title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
            {config.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            Live Stream Connected
          </span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="alt-card p-5 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {config.stat1.label}
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {config.stat1.value}
          </div>
        </div>

        <div className="alt-card p-5 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {config.stat2.label}
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            {config.stat2.value}
          </div>
        </div>

        <div className="alt-card p-5 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {config.stat3.label}
          </div>
          <div className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
            {config.stat3.value}
          </div>
        </div>
      </div>

      {/* Leaderboard Table for this category */}
      <div className="alt-card p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {config.topLeaderLabel}
            </h2>
            <p className="text-[11px] text-slate-400">Ranked by AltIndex alternative signal momentum</p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {TOP_STOCKS_DATA.slice(0, 8).map((stock, idx) => (
            <div
              key={stock.id}
              onClick={() => onSelectStock && onSelectStock(stock)}
              className="py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 rounded-xl px-2 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 text-center font-bold text-slate-400">{idx + 1}</span>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs text-white shadow-xs"
                  style={{ backgroundColor: stock.color }}
                >
                  {stock.initial}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{stock.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{stock.symbol} • {stock.industry}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold text-slate-900 dark:text-slate-100">${stock.price.toFixed(2)}</div>
                  <div className={`text-[10px] font-semibold ${stock.priceChange >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stock.priceChange >= 0 ? `+${stock.priceChange}%` : `${stock.priceChange}%`}
                  </div>
                </div>

                <div className="w-24 text-right">
                  <div className="font-extrabold text-sm text-indigo-600 dark:text-indigo-400">
                    {stock.aiScore}/100
                  </div>
                  <div className="text-[10px] text-slate-400">Signal Confidence</div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
