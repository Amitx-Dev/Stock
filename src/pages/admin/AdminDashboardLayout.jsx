import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Sidebar } from '../../components/common/Sidebar';
import { UserManagementPage } from './UserManagementPage';
import { FinancialSecurityPage } from './FinancialSecurityPage';
import { SystemSettingsPage } from './SystemSettingsPage';
import { TradeActivityPage } from './TradeActivityPage';
import { ReportGenerationPage } from './ReportGenerationPage';
import { ToastContainer } from '../../components/common/Toast';

export const AdminDashboardLayout = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          {activeTab === 'users' && <UserManagementPage />}
          {activeTab === 'security' && <FinancialSecurityPage />}
          {activeTab === 'settings' && <SystemSettingsPage />}
          {activeTab === 'activity' && <TradeActivityPage />}
          {activeTab === 'reports' && <ReportGenerationPage />}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
