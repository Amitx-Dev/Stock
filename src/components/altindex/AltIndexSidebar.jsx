import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  LineChart,
  Briefcase,
  Heart,
  Smartphone,
  Globe,
  Star,
  Award,
  DollarSign,
  Flame,
  Users,
  Landmark,
  Layers,
  Settings,
  LogOut,
  X,
  ChevronRight,
  ChevronDown,
  Bell,
  Sparkles
} from 'lucide-react';
import { AltIndexLogo } from './AltIndexLogo';
import { useAuth } from '../../context/AuthContext';

export const AltIndexSidebar = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  selectedCategory,
  onSelectCategory
}) => {
  const { logout } = useAuth();
  const [expandedGroups, setExpandedGroups] = useState({
    sentiment: true,
    appDownloads: true,
    alternative: true
  });

  const toggleGroup = (key) => {
    setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      screenLabel: 'Overview'
    },
    {
      id: 'top-stocks',
      label: 'Top Stocks',
      icon: TrendingUp,
      badge: 'AI Score',
      screenLabel: 'Screen 6: Top Stocks'
    },
    {
      id: 'price-prediction',
      label: 'Price Prediction',
      icon: LineChart,
      screenLabel: 'Prediction'
    },
    {
      id: 'job-post',
      label: 'Job Post',
      icon: Briefcase,
      screenLabel: 'Hiring'
    },
    {
      id: 'sentiment',
      label: 'Sentiment',
      icon: Heart,
      screenLabel: 'Screen 2: Reddit Mentions',
      hasSubitems: true,
      subitems: [
        { id: 'reddit-mentions', label: 'Reddit Mentions' },
        { id: 'twitter-sentiment', label: 'Twitter Followers' }
      ]
    },
    {
      id: 'app-downloads',
      label: 'App Download',
      icon: Smartphone,
      screenLabel: 'Screen 5: Netflix Downloads',
      hasSubitems: true,
      subitems: [
        { id: 'app-downloads', label: 'Netflix Downloads' },
        { id: 'app-ratings', label: 'App Store Rating' }
      ]
    },
    {
      id: 'webpage-traffic',
      label: 'Webpage Traffic',
      icon: Globe,
      screenLabel: 'Traffic'
    },
    {
      id: 'customer-reviews',
      label: 'Customer Reviews',
      icon: Star,
      screenLabel: 'Reviews'
    },
    {
      id: 'employee-rating',
      label: 'Employee Rating',
      icon: Award,
      screenLabel: 'Glassdoor'
    },
    {
      id: 'google-ads',
      label: 'Google Ads',
      icon: DollarSign,
      screenLabel: 'Ad Spend'
    },
    {
      id: 'google-trends',
      label: 'Google Trends',
      icon: Flame,
      screenLabel: 'Search Trends'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Employees',
      icon: Users,
      screenLabel: 'Headcount'
    },
    {
      id: 'lobbying',
      label: 'Lobbying Spend',
      icon: Landmark,
      screenLabel: 'Government'
    }
  ];

  const secondaryItems = [
    {
      id: 'build-portfolio',
      label: 'Build Portfolio',
      icon: Layers,
      highlight: true,
      screenLabel: 'Screen 1: Build Portfolio'
    },
    {
      id: 'alerts',
      label: 'Stock Alerts',
      icon: Bell,
      screenLabel: 'Screen 3: Alerts'
    },
    {
      id: 'settings',
      label: 'User Settings',
      icon: Settings,
      screenLabel: 'Screen 4: Settings'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-[#0F172A] border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col transition-all duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Header with AltIndex Branding */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200/80 dark:border-slate-800/80">
          <AltIndexLogo />
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Reference Screen Switcher Strip */}
        <div className="px-3 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/70 dark:bg-slate-900/50">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 mb-1.5">
            <span>Reference Screens</span>
            <Sparkles className="w-3 h-3 text-indigo-500" />
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px]">
            <button
              onClick={() => {
                onSelectTab('build-portfolio');
                if (onClose) onClose();
              }}
              className={`px-1.5 py-1 rounded text-center truncate transition-colors ${
                activeTab === 'build-portfolio'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700'
              }`}
              title="Screen 1: Build Your Portfolio"
            >
              1. Portfolio
            </button>
            <button
              onClick={() => {
                onSelectTab('reddit-mentions');
                if (onClose) onClose();
              }}
              className={`px-1.5 py-1 rounded text-center truncate transition-colors ${
                activeTab === 'reddit-mentions'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700'
              }`}
              title="Screen 2: Top Stocks - Reddit Mentions"
            >
              2. Reddit
            </button>
            <button
              onClick={() => {
                onSelectTab('alerts');
                if (onClose) onClose();
              }}
              className={`px-1.5 py-1 rounded text-center truncate transition-colors ${
                activeTab === 'alerts'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700'
              }`}
              title="Screen 3: Top Stock Alerts"
            >
              3. Alerts
            </button>
            <button
              onClick={() => {
                onSelectTab('settings');
                if (onClose) onClose();
              }}
              className={`px-1.5 py-1 rounded text-center truncate transition-colors ${
                activeTab === 'settings'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700'
              }`}
              title="Screen 4: User Settings"
            >
              4. Settings
            </button>
            <button
              onClick={() => {
                onSelectTab('app-downloads');
                if (onClose) onClose();
              }}
              className={`px-1.5 py-1 rounded text-center truncate transition-colors ${
                activeTab === 'app-downloads'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700'
              }`}
              title="Screen 5: Netflix - App Downloads"
            >
              5. Netflix
            </button>
            <button
              onClick={() => {
                onSelectTab('top-stocks');
                if (onClose) onClose();
              }}
              className={`px-1.5 py-1 rounded text-center truncate transition-colors ${
                activeTab === 'top-stocks'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700'
              }`}
              title="Screen 6: Top Stocks Screener"
            >
              6. Screener
            </button>
          </div>
        </div>

        {/* Navigation Links Scrollable Area */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isSubitemActive =
              item.hasSubitems && item.subitems.some((sub) => sub.id === activeTab);

            return (
              <div key={item.id} className="space-y-0.5">
                <button
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onClose && !item.hasSubitems) onClose();
                  }}
                  className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all group ${
                    isActive || isSubitemActive
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {/* Left Purple Active Indicator Bar */}
                  {(isActive || isSubitemActive) && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-500" />
                  )}

                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive || isSubitemActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                        {item.badge}
                      </span>
                    )}
                    {item.hasSubitems && (
                      <ChevronRight
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                          isActive || isSubitemActive ? 'rotate-90 text-indigo-500' : ''
                        }`}
                      />
                    )}
                  </div>
                </button>

                {/* Sub items matching Screens 7 & 8 */}
                {item.hasSubitems && (isActive || isSubitemActive) && (
                  <div className="pl-9 pr-2 py-1 space-y-1 border-l border-slate-100 dark:border-slate-800 ml-4 animate-in fade-in duration-100">
                    {item.subitems.map((sub) => {
                      const isSubActive = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            onSelectTab(sub.id);
                            if (onClose) onClose();
                          }}
                          className={`w-full text-left py-1 px-2 rounded-lg text-[11px] transition-colors ${
                            isSubActive
                              ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-indigo-950/30'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="pt-3 pb-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
              Account & Portfolio
            </div>
          </div>

          {secondaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onClose) onClose();
                }}
                className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold'
                    : item.highlight
                    ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-indigo-600 dark:bg-indigo-500" />
                )}

                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive || item.highlight
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom Logout Button matching reference */}
        <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
