import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  Settings,
  Activity,
  FileText,
  TrendingUp,
  PieChart,
  Radio,
  History,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from './Badge';

export const Sidebar = ({ role = 'trader', collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const adminNav = [
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Financial Security', path: '/admin/security', icon: ShieldCheck },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
    { name: 'Trade Activity', path: '/admin/activity', icon: Activity },
    { name: 'Report Generation', path: '/admin/reports', icon: FileText },
  ];

  const traderNav = [
    { name: 'Stock Trading', path: '/trader/trading', icon: TrendingUp },
    { name: 'Portfolio Overview', path: '/trader/portfolio', icon: PieChart },
    { name: 'Market Updates', path: '/trader/market', icon: Radio },
    { name: 'Trade History', path: '/trader/history', icon: History },
    { name: 'Alerts & Notices', path: '/trader/alerts', icon: Bell },
  ];

  const items = role === 'admin' ? adminNav : traderNav;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-indigo-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-brand-700/20">
              <TrendingUp className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-brand-700 dark:text-brand-300">
                  TradeNest
                </span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {role === 'admin' ? 'Super Admin' : 'Trader Terminal'}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle sidebar collapse"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/70 dark:text-brand-300 font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  } ${collapsed ? 'justify-center px-2' : ''}`
                }
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Section & Logout */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        {!collapsed && currentUser && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-brand-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {currentUser.avatar || 'TN'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {currentUser.name}
                </p>
                <Badge variant={role === 'admin' ? 'admin' : 'trader'} size="sm">
                  {role === 'admin' ? 'Admin' : 'Trader'}
                </Badge>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Sign out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 bottom-0 left-0 z-30 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
};
