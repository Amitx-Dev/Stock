import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketProvider } from './context/MarketContext';
import { TradingProvider } from './context/TradingContext';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { TraderDashboardLayout } from './pages/trader/TraderDashboardLayout';
import { AdminDashboardLayout } from './pages/admin/AdminDashboardLayout';
import { DemoToolbar } from './components/common/DemoToolbar';

function MainRouter() {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <DemoToolbar />
        <div className="flex-1 flex flex-col">
          {authMode === 'login' ? (
            <LoginPage onNavigateRegister={() => setAuthMode('register')} />
          ) : (
            <RegisterPage onNavigateLogin={() => setAuthMode('login')} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DemoToolbar />
      <div className="flex-1">
        {user.role === 'ADMIN' ? (
          <AdminDashboardLayout />
        ) : (
          <TraderDashboardLayout />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MarketProvider>
          <TradingProvider>
            <MainRouter />
          </TradingProvider>
        </MarketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
