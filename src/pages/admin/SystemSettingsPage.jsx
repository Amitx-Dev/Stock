import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useTrading } from '../../context/TradingContext';
import { Sliders, Check, RotateCcw, AlertTriangle } from 'lucide-react';

export const SystemSettingsPage = () => {
  const [settings, setSettings] = useState({
    marketOpenTime: '09:15',
    marketCloseTime: '15:30',
    maxTradeLimit: 100000,
    circuitBreakerPercent: 10,
    brokerageFeePercent: 0.1,
    maintenanceMode: false
  });
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useTrading();

  useEffect(() => {
    const load = async () => {
      const data = await api.getSystemSettings();
      if (data) setSettings(data);
    };
    load();
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.updateSystemSettings(settings);
      showToast('System configuration settings saved successfully!', 'success');
    } catch {
      showToast('Failed to save settings', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black tracking-tight text-white">System Settings & Controls</h2>
        <p className="text-xs text-slate-400">
          Configure trading parameters, market hours, risk caps, and maintenance states.
        </p>
      </div>

      <div className="fintech-card p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Market Open Time */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Market Opening Time (EST / IST)
              </label>
              <input
                type="time"
                value={settings.marketOpenTime}
                onChange={(e) => handleChange('marketOpenTime', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>

            {/* Market Close Time */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Market Closing Time (EST / IST)
              </label>
              <input
                type="time"
                value={settings.marketCloseTime}
                onChange={(e) => handleChange('marketCloseTime', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                required
              />
            </div>

            {/* Max Trade Limit */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Max Single Trade Size Limit ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-500 font-bold text-xs">$</span>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={settings.maxTradeLimit}
                  onChange={(e) => handleChange('maxTradeLimit', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-8 pr-3 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Circuit Breaker % */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Intraday Circuit Breaker Threshold (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="2"
                  max="50"
                  value={settings.circuitBreakerPercent}
                  onChange={(e) => handleChange('circuitBreakerPercent', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs font-mono focus:border-cyan-500 focus:outline-none"
                  required
                />
                <span className="absolute right-3 top-2.5 text-slate-500 font-bold text-xs">%</span>
              </div>
            </div>
          </div>

          {/* Maintenance Mode Toggle */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Platform Scheduled Maintenance Mode</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Temporarily suspends trading execution for scheduled database migrations or server upgrades.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleChange('maintenanceMode', !settings.maintenanceMode)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                settings.maintenanceMode ? 'bg-amber-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-lg shadow-cyan-600/25 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{submitting ? 'Saving Configuration...' : 'Save Configuration'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
