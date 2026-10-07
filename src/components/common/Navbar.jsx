import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTrading } from '../../context/TradingContext';
import {
  Activity,
  Sun,
  Moon,
  Wallet,
  Bell,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ShieldAlert,
  Plus
} from 'lucide-react';
import { DepositModal } from '../trader/DepositModal';

export const Navbar = ({ onToggleSidebar, activeTab, setActiveTab }) => {
  const { user, logout, isTrader } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { wallet, unreadAlertsCount } = useTrading();
  const [showDepositModal, setShowDepositModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          {/* Left: Mobile hamburger & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-black tracking-tight text-white">
                  Trade<span className="text-cyan-400">Nova</span>
                </span>
                <span className="block text-[10px] text-slate-400 -mt-1 font-mono uppercase tracking-widest">
                  Fintech Platform
                </span>
              </div>
            </div>

            {/* Market Status Pill */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-800 text-[11px] text-emerald-400 font-medium ml-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Market Live</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wallet Cash Balance (Trader only) */}
            {isTrader && (
              <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-1.5 shadow-inner">
                <Wallet className="w-4 h-4 text-cyan-400 hidden sm:inline" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold leading-none">
                    Cash Balance
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400 leading-tight">
                    ${wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                </div>
                <button
                  onClick={() => setShowDepositModal(true)}
                  className="p-1 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
                  title="Deposit Funds"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Notification Bell (Trader alerts) */}
            {isTrader && (
              <button
                onClick={() => setActiveTab && setActiveTab('alerts')}
                className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Price Alerts"
              >
                <Bell className="w-5 h-5" />
                {unreadAlertsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadAlertsCount}
                  </span>
                )}
              </button>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-300" />}
            </button>

            {/* User Profile Info */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs uppercase">
                {user?.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <div className="font-semibold text-white leading-tight">{user?.name}</div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">{user?.role}</div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors ml-1"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Deposit Cash Modal */}
      {showDepositModal && (
        <DepositModal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} />
      )}
    </>
  );
};
