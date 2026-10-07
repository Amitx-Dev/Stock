import React, { useState } from 'react';
import { AltIndexLogo } from './AltIndexLogo';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Search,
  Moon,
  Sun,
  Bell,
  ChevronDown,
  Menu,
  X,
  User,
  Settings,
  Shield,
  LogOut,
  CheckCircle2,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { USER_PROFILE, STOCK_ALERTS_DATA } from '../../services/altIndexData';

export const AltIndexNavbar = ({
  onToggleSidebar,
  onOpenSearch,
  activeTab,
  onSelectTab
}) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const displayUser = user || USER_PROFILE;

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="flex items-center justify-between px-4 lg:px-6 h-16 max-w-full">
        {/* Left: Mobile hamburger & AltIndex Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-1 focus:outline-none"
          >
            <AltIndexLogo />
          </button>
        </div>

        {/* Center: Search Stock/Coin bar matching screenshot */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/70 hover:bg-slate-200/70 dark:hover:bg-slate-800 border border-transparent dark:border-slate-700/60 text-slate-400 dark:text-slate-400 transition-all text-xs group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              <span className="font-normal text-slate-500 dark:text-slate-400">
                Search Stock/Coin
              </span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400 font-semibold shadow-2xs">
                ⌘ K
              </kbd>
            </div>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Dark / Light Mode Toggle (Moon/Sun) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-12 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
                setProfileDropdownOpen(false);
              }}
              className="relative p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Alerts & Signals</span>
                  <button
                    onClick={() => {
                      onSelectTab('alerts');
                      setNotifDropdownOpen(false);
                    }}
                    className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto">
                  {STOCK_ALERTS_DATA.map((alt) => (
                    <button
                      key={alt.id}
                      onClick={() => {
                        onSelectTab('alerts');
                        setNotifDropdownOpen(false);
                      }}
                      className="w-full p-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex items-start gap-2.5"
                    >
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alt.isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <div>
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {alt.stockName} <span className={alt.isPositive ? 'text-emerald-500' : 'text-rose-500'}>({alt.changePercent})</span>
                        </div>
                        <div className="text-[11px] text-slate-400">{alt.action}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Info matching screenshot */}
          <div className="relative pl-1">
            <button
              onClick={() => {
                setProfileDropdownOpen(!profileDropdownOpen);
                setNotifDropdownOpen(false);
              }}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors group"
            >
              <img
                src={displayUser.avatar || USER_PROFILE.avatar}
                alt={displayUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20 shadow-xs"
              />
              <div className="hidden lg:block text-left text-xs leading-none">
                <div className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {displayUser.name}
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-400 mt-1 font-medium">
                  {displayUser.role || 'Fund Manager'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-100">{displayUser.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{displayUser.email}</div>
                  <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <Sparkles className="w-3 h-3" />
                    {displayUser.role || 'Fund Manager'}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onSelectTab('settings');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    User Settings
                  </button>
                  <button
                    onClick={() => {
                      onSelectTab('build-portfolio');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    Build Portfolio
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
