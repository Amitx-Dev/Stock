import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTrading } from '../../context/TradingContext';
import {
  Users,
  ShieldCheck,
  Sliders,
  BarChart3,
  FileText,
  TrendingUp,
  PieChart,
  Radio,
  History,
  Bell,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose, activeTab, onSelectTab }) => {
  const { isAdmin } = useAuth();
  const { unreadAlertsCount } = useTrading();

  const adminNavItems = [
    { id: 'users', label: 'User Management', icon: Users, description: 'Manage accounts & permissions' },
    { id: 'security', label: 'Financial Security', icon: ShieldCheck, description: '2FA & incident monitoring' },
    { id: 'settings', label: 'System Settings', icon: Sliders, description: 'Trading rules & controls' },
    { id: 'activity', label: 'Trade Activity', icon: BarChart3, description: 'Volume charts & audit log' },
    { id: 'reports', label: 'Report Generation', icon: FileText, description: 'Daily summaries & CSV export' }
  ];

  const traderNavItems = [
    { id: 'trading', label: 'Stock Trading', icon: TrendingUp, description: 'Live market & quick orders' },
    { id: 'portfolio', label: 'Portfolio Overview', icon: PieChart, description: 'Holdings & allocation chart' },
    { id: 'market', label: 'Market Updates', icon: Radio, description: 'Live simulated price ticker' },
    { id: 'history', label: 'Trade History', icon: History, description: 'Complete order executions' },
    { id: 'alerts', label: 'Price Alerts', icon: Bell, description: 'Target price triggers', badge: unreadAlertsCount }
  ];

  const navItems = isAdmin ? adminNavItems : traderNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
              {isAdmin ? 'ADMIN CONTROL' : 'TRADER WORKSPACE'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/10 text-cyan-400 border border-cyan-500/30 shadow-md shadow-cyan-950/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.label}</span>
                    {item.badge > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 truncate block font-normal">
                    {item.description}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom System Status Widget */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-400 font-medium text-[11px]">Backend API</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                ACTIVE
              </span>
            </div>
            <div className="text-[11px] text-slate-500 leading-relaxed">
              Java JDBC + MySQL Architecture Ready
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
