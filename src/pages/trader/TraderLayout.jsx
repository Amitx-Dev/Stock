import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../../components/common/Sidebar';
import { TopBar } from '../../components/common/TopBar';

export const TraderLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const titleMap = {
    '/trader/trading': 'Trading Terminal',
    '/trader/portfolio': 'Portfolio & Holdings',
    '/trader/market': 'Live Market Pulse & Feeds',
    '/trader/history': 'Trade Execution History',
    '/trader/alerts': 'Price Alerts & Notification Center',
  };

  const currentTitle = titleMap[location.pathname] || 'Trader Workspace';

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <div className="flex-1 flex">
        {/* Sidebar */}
        <Sidebar
          role="trader"
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            collapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          <TopBar setMobileOpen={setMobileOpen} title={currentTitle} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
