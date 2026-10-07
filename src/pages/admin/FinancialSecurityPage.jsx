import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { SecurityIncidentList } from '../../components/admin/SecurityIncidentList';
import { useTrading } from '../../context/TradingContext';
import { ShieldCheck, Lock, Key, Clock, ShieldAlert, Check } from 'lucide-react';

export const FinancialSecurityPage = () => {
  const [securitySettings, setSecuritySettings] = useState({
    enforce2FA: true,
    sessionTimeout: '30m',
    strictPasswordPolicy: true,
    ipWhitelisting: false,
    auditLogging: true,
    maxLoginAttempts: 5
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useTrading();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, logsData] = await Promise.all([
          api.getSecuritySettings(),
          api.getSecurityLogs()
        ]);
        if (settingsData) setSecuritySettings(settingsData);
        if (logsData) setLogs(logsData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleToggle = async (key) => {
    const updated = {
      ...securitySettings,
      [key]: !securitySettings[key]
    };
    setSecuritySettings(updated);
    try {
      await api.updateSecuritySettings(updated);
      showToast(`Security policy updated: ${key} is now ${updated[key] ? 'ENABLED' : 'DISABLED'}`, 'info');
    } catch {
      showToast('Failed to update security settings', 'error');
    }
  };

  const handleChange = async (key, val) => {
    const updated = {
      ...securitySettings,
      [key]: val
    };
    setSecuritySettings(updated);
    try {
      await api.updateSecuritySettings(updated);
      showToast(`Security parameter updated: ${key} = ${val}`, 'info');
    } catch {
      showToast('Failed to update parameter', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black tracking-tight text-white">Financial Data Security & Compliance</h2>
        <p className="text-xs text-slate-400">
          Enforce cryptographic authentication standards, session limits, and inspect intrusion detection logs.
        </p>
      </div>

      {/* Security Policies Panel */}
      <div className="fintech-card p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Active Security Configuration & Policies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2FA Enforce */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span>Enforce Two-Factor Authentication (2FA)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Require TOTP authentication token on sensitive trades and withdrawals.
              </p>
            </div>
            <button
              onClick={() => handleToggle('enforce2FA')}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                securitySettings.enforce2FA ? 'bg-cyan-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  securitySettings.enforce2FA ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Strict Password Policy */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Strict Password Complexity Policy</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Mandate minimum 8 characters, special symbols, and periodic 90-day resets.
              </p>
            </div>
            <button
              onClick={() => handleToggle('strictPasswordPolicy')}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                securitySettings.strictPasswordPolicy ? 'bg-cyan-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  securitySettings.strictPasswordPolicy ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Session Timeout */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inactivity Session Timeout</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Automatically disconnect idle trader workstations to avoid unauthorized access.
              </p>
            </div>
            <select
              value={securitySettings.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="15m">15 Minutes</option>
              <option value="30m">30 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="4h">4 Hours</option>
            </select>
          </div>

          {/* Audit Logging */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Immutable Audit Logging</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Log every trade submission, IP footprint, and authentication attempt.
              </p>
            </div>
            <button
              onClick={() => handleToggle('auditLogging')}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                securitySettings.auditLogging ? 'bg-cyan-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Security Incidents Audit Logs */}
      <SecurityIncidentList logs={logs} />
    </div>
  );
};
