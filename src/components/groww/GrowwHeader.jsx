import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTrading } from '../../context/TradingContext';
import {
  TrendingUp,
  Search,
  Wallet,
  Plus,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  ChevronDown,
  Layers,
  BarChart2,
  PieChart,
  Clock,
  Compass,
  Zap,
  LogOut,
  Sliders,
  DollarSign
} from 'lucide-react';
import { MARKET_INDICES } from '../../services/marketData';

export const GrowwHeader = ({ activeTab, onSelectTab, onOpenSearch, onOpenAddMoney }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { wallet, unreadAlertsCount } = useTrading();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'terminal', label: 'Terminal', icon: BarChart2, badge: 'PRO' },
    { id: 'holdings', label: 'Holdings', icon: PieChart },
    { id: 'positions', label: 'Positions', icon: Zap },
    { id: 'orders', label: 'Orders', icon: Clock },
    { id: 'option-chain', label: 'F&O', icon: Layers },
    { id: 'funds', label: 'Funds', icon: Wallet }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-[#0E131F] border-b border-slate-200 dark:border-slate-800 transition-colors shadow-2xs">
      {/* 1. Top Market Indices Ticker Bar (Upstox / Groww Pro standard) */}
      <div className="bg-slate-50 dark:bg-[#0A0E17] border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-1 text-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-max gap-6 max-w-7xl mx-auto">
          {/* Live Market Clock & Status */}
          <div className="flex items-center gap-2 pr-3 border-r border-slate-200 dark:border-slate-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wide uppercase font-mono">
              NSE/BSE LIVE
            </span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">09:15 - 15:30 IST</span>
          </div>

          {/* Indices Tickers */}
          <div className="flex items-center gap-5 flex-1">
            {MARKET_INDICES.map((idx) => (
              <div key={idx.symbol} className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="font-bold text-slate-700 dark:text-slate-300">{idx.symbol}</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`font-semibold ${
                    idx.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {idx.isPositive ? '+' : ''}
                  {idx.change.toFixed(2)} ({idx.isPositive ? '+' : ''}
                  {idx.changePercent}%)
                </span>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono">
            <span>Server Latency: <strong className="text-emerald-500">12ms</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="px-4 lg:px-6 h-14 flex items-center justify-between gap-4 max-w-7xl mx-auto">
        {/* Left: Brand Logo & Primary Nav Tabs */}
        <div className="flex items-center gap-6">
          {/* Logo styled like Groww / Upstox */}
          <div
            onClick={() => onSelectTab('explore')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
                <span>Groww</span>
                <span className="text-emerald-500 font-black">Trade</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1 py-0.2 rounded font-mono font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center / Search bar like Groww */}
        <div className="flex-1 max-w-sm hidden lg:block">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 hover:bg-slate-200/60 dark:hover:bg-slate-800 border border-transparent dark:border-slate-700 text-slate-400 text-xs transition-colors"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 dark:text-slate-400 font-normal">
                Search stocks, F&O, indices (e.g. Reliance, Nifty)...
              </span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-mono text-slate-400 font-semibold shadow-2xs">
              /
            </kbd>
          </button>
        </div>

        {/* Right: Wallet Balance, Theme Toggle, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search on mobile */}
          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wallet Balance Chip with + Add Funds button (Groww style) */}
          <div className="flex items-center gap-2 pl-2.5 pr-1 py-1 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
            <div className="text-left leading-tight hidden sm:block">
              <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                Trading Balance
              </div>
              <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                ₹{wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
            <button
              onClick={onOpenAddMoney}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all"
              title="Add Funds via UPI"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Money</span>
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-300 dark:border-emerald-800">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-[#111827] rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in duration-100">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{user?.name || 'Alex Morgan'}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">{user?.email || 'alex@growwtrade.in'}</div>
                  <div className="mt-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                    KYC Verified • Demat: 120816000
                  </div>
                </div>

                <div className="py-1 text-xs">
                  <button
                    onClick={() => {
                      onSelectTab('holdings');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <PieChart className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Holdings & P&L</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectTab('funds');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <Wallet className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bank & Mandate Settings</span>
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
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
