import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield, TrendingUp, RefreshCw } from 'lucide-react';
import { api } from '../../services/api';

export const DemoToolbar = () => {
  const { user, switchDemoRole } = useAuth();

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-300">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
          COLLEGE DEMO MODE
        </span>
        <span className="hidden sm:inline text-slate-400">
          Switch roles instantly:
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => switchDemoRole('ADMIN')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
            user?.role === 'ADMIN'
              ? 'bg-purple-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          title="Login as Administrator"
        >
          <Shield className="w-3.5 h-3.5 text-purple-300" />
          <span>Admin Portal</span>
        </button>

        <button
          onClick={() => switchDemoRole('TRADER')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
            user?.role === 'TRADER'
              ? 'bg-cyan-600 text-white shadow-sm'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          title="Login as Trader"
        >
          <TrendingUp className="w-3.5 h-3.5 text-cyan-300" />
          <span>Trader Portal</span>
        </button>

        <button
          onClick={() => {
            if (window.confirm('Reset all mock storage data back to original defaults?')) {
              api.resetAllData();
            }
          }}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          title="Reset sample data"
        >
          <RefreshCw className="w-3 h-3" />
          <span className="hidden md:inline">Reset Data</span>
        </button>
      </div>
    </div>
  );
};
