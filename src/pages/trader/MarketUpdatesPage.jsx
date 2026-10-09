import React, { useState, useEffect } from 'react';
import { initialNews, simulatedNewsFlash } from '../../data/mockNews';
import { useToast } from '../../context/ToastContext';
import { Radio, Filter, Bookmark, Check, Sparkles, TrendingUp, Bell, Clock, Globe } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const MarketUpdatesPage = () => {
  const [news, setNews] = useState(initialNews);
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedType, setSelectedType] = useState('ALL');
  const [onlyWatchlist, setOnlyWatchlist] = useState(false);
  const [isLiveActive, setIsLiveActive] = useState(true);
  const { showToast } = useToast();

  const sectors = ['ALL', 'Banking', 'Auto', 'IT', 'Energy', 'Telecom', 'Consumer Tech'];
  const types = ['ALL', 'Policy', 'Corporate', 'Market Watch', 'Macro', 'Regulation', 'Industry'];

  // Simulate real-time news injection every 8 seconds if live active
  useEffect(() => {
    if (!isLiveActive) return;

    let flashIdx = 0;
    const interval = setInterval(() => {
      if (flashIdx < simulatedNewsFlash.length) {
        const item = simulatedNewsFlash[flashIdx];
        const newNewsItem = {
          id: `NW-${Date.now()}`,
          headline: item.headline,
          summary: `High-frequency intelligence update regarding ${item.sector}. Market sentiment trending ${item.impact}.`,
          source: item.source,
          time: 'Just now',
          sector: item.sector,
          type: item.type,
          impact: item.impact,
          sentimentScore: 0.90
        };

        setNews((prev) => [newNewsItem, ...prev]);
        showToast(`Flash Update: ${item.headline.slice(0, 40)}...`, 'info', 2500);
        flashIdx++;
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isLiveActive, showToast]);

  const handleSavePreferences = () => {
    showToast('Market feed preferences saved successfully', 'success');
  };

  // Filtered news items
  const filteredNews = news.filter((item) => {
    if (selectedSector !== 'ALL' && item.sector !== selectedSector) return false;
    if (selectedType !== 'ALL' && item.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Market Pulse & Live Wire Feed
            </h2>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-trade-green dark:bg-emerald-950/70 dark:text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-trade-green animate-ping" />
              LIVE STREAM
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time corporate disclosures, SEBI policy updates, and macroeconomic indicators.
          </p>
        </div>

        <button
          onClick={handleSavePreferences}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all self-start sm:self-auto"
        >
          <Bookmark className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>

      {/* Preference Filter Chips Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-soft space-y-4">
        
        {/* Sector Chips */}
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Filter by Sector:
          </span>
          <div className="flex flex-wrap gap-2">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedSector === sec
                    ? 'bg-brand-700 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        {/* News Type Chips */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Filter by News Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedType === t
                      ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900'
                      : 'border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                isLiveActive
                  ? 'border-emerald-300 bg-emerald-50 text-trade-green dark:bg-emerald-950/50'
                  : 'border-slate-300 bg-slate-100 text-slate-500'
              }`}
            >
              {isLiveActive ? 'Live Stream: Active' : 'Live Stream: Paused'}
            </button>
          </div>
        </div>

      </div>

      {/* Feed Cards List */}
      <div className="space-y-4">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-soft hover:shadow-card transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" size="sm">{item.sector}</Badge>
                  <span className="text-xs font-semibold text-slate-400">
                    {item.type}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
                    {item.source}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{item.time}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                {item.headline}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.summary}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-trade-green">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Market Sentiment: {item.impact}
                </span>

                <button
                  onClick={() => showToast('News article bookmarked to watchlist', 'success')}
                  className="text-slate-400 hover:text-brand-600 transition-colors text-xs font-semibold flex items-center gap-1"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Bookmark</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200/80 dark:border-slate-800 text-slate-400 text-sm">
            No market news matching the active sector or type filters.
          </div>
        )}
      </div>

    </div>
  );
};
