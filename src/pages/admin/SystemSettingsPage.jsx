import React, { useState } from 'react';
import { initialSystemSettings, initialSystemServices } from '../../data/mockSystem';
import { useToast } from '../../context/ToastContext';
import { Settings, Server, Check, RefreshCw, Cpu, Activity, Clock, ShieldAlert, Zap } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const SystemSettingsPage = () => {
  const [settings, setSettings] = useState(initialSystemSettings);
  const [services, setServices] = useState(initialSystemServices);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { showToast } = useToast();

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('System settings updated successfully', 'success');
    }, 400);
  };

  const handleRefreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('System monitor metrics refreshed', 'info');
    }, 500);
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          System Settings & Platform Monitor
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure platform runtime parameters, brokerage limits, market hours, and monitor live engine health.
        </p>
      </div>

      {/* System Status Monitor Cards */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-trade-green flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Live Microservices & Node Health
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Core matching engine, database clusters, and exchange market gateways.
              </p>
            </div>
          </div>
          
          <button
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-600' : ''}`} />
            <span>Refresh Health</span>
          </button>
        </div>

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {svc.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        svc.statusColor === 'emerald' ? 'bg-trade-green animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                    <span
                      className={`text-[11px] font-bold ${
                        svc.statusColor === 'emerald'
                          ? 'text-trade-green'
                          : 'text-amber-500'
                      }`}
                    >
                      {svc.status}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {svc.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-3 text-center text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Uptime</p>
                  <p className="font-mono font-bold text-slate-800 dark:text-slate-200">{svc.uptime}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Latency</p>
                  <p className="font-mono font-bold text-slate-800 dark:text-slate-200">{svc.latency}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Load</p>
                  <p className="font-mono font-bold text-slate-800 dark:text-slate-200">{svc.load}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Configuration Form */}
      <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Platform Configuration Parameters
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Trading hours, brokerage policies, and failover maintenance toggles.
            </p>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save System Settings</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Platform Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Platform Brand Name
            </label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => handleInputChange('platformName', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Trading Hours */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Exchange Trading Hours
            </label>
            <input
              type="text"
              value={settings.tradingHours}
              onChange={(e) => handleInputChange('tradingHours', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          {/* Brokerage % Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Intraday & F&O Brokerage Rate
            </label>
            <input
              type="text"
              value={settings.brokerageRateEquity}
              onChange={(e) => handleInputChange('brokerageRateEquity', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* Brokerage Cap Amount */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Flat Cap Per Executed Order (₹)
            </label>
            <input
              type="number"
              value={settings.brokerageFlatAmount}
              onChange={(e) => handleInputChange('brokerageFlatAmount', Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          {/* Default Currency */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Default Accounting Currency
            </label>
            <select
              value={settings.defaultCurrency}
              onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            >
              <option value="INR (₹)">INR (₹) - Indian Rupee</option>
              <option value="USD ($)">USD ($) - US Dollar</option>
            </select>
          </div>

          {/* Support Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Escalation Support Desk Email
            </label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => handleInputChange('supportEmail', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            />
          </div>

        </div>

        {/* Maintenance Mode Toggle Card */}
        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 flex items-center justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Emergency Maintenance Mode
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              When enabled, retail trader order submissions are paused and a maintenance notice is shown.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleInputChange('maintenanceMode', !settings.maintenanceMode)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
              settings.maintenanceMode ? 'bg-amber-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

      </form>

    </div>
  );
};
