import React, { useState } from 'react';
import { initialSecuritySettings, initialSecurityIncidents } from '../../data/mockSecurity';
import { Badge } from '../../components/common/Badge';
import { DataTable } from '../../components/common/DataTable';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, Lock, Key, AlertTriangle, Clock, Globe, Fingerprint, ShieldAlert, Check } from 'lucide-react';

export const FinancialSecurityPage = () => {
  const [settings, setSettings] = useState(initialSecuritySettings);
  const [incidents, setIncidents] = useState(initialSecurityIncidents);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Security settings updated successfully', 'success');
    }, 400);
  };

  const incidentColumns = [
    {
      header: 'Timestamp',
      key: 'time',
      sortable: true,
      render: (row) => <span className="font-mono text-xs text-slate-500">{row.time}</span>
    },
    {
      header: 'Incident Type',
      key: 'type',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-slate-900 dark:text-white text-xs">{row.type}</span>
      )
    },
    {
      header: 'Source IP',
      key: 'sourceIp',
      render: (row) => <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{row.sourceIp}</span>
    },
    {
      header: 'Target Resource',
      key: 'target',
      render: (row) => <span className="font-mono text-xs text-slate-500 truncate max-w-xs">{row.target}</span>
    },
    {
      header: 'Severity',
      key: 'severity',
      sortable: true,
      render: (row) => {
        let variant = 'low';
        if (row.severity === 'High') variant = 'high';
        if (row.severity === 'Medium') variant = 'medium';
        return <Badge variant={variant} size="sm">{row.severity}</Badge>;
      }
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (row) => {
        let variant = 'default';
        if (row.status === 'Blocked') variant = 'danger';
        if (row.status === 'Resolved') variant = 'success';
        if (row.status === 'Throttled') variant = 'warning';
        return <Badge variant={variant} size="sm">{row.status}</Badge>;
      }
    },
    {
      header: 'Action Taken',
      key: 'actionTaken',
      render: (row) => <span className="text-xs text-slate-500">{row.actionTaken}</span>
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Financial Data Security & Threat Center
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure financial data encryption parameters, two-factor authentication enforcement, and audit security incident telemetry.
        </p>
      </div>

      {/* Security Health Score Banner */}
      <div className="bg-gradient-to-r from-brand-900 to-indigo-900 rounded-2xl p-6 text-white shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">Overall Platform Security Score</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Grade A+
              </span>
            </div>
            <p className="text-xs text-brand-200 mt-1 max-w-xl">
              Compliance with SEBI cybersecurity guidelines and ISO 27001 data protection standards. All TLS 1.3 certificates and vault keys are active.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center px-4 py-2 bg-white/10 rounded-xl border border-white/10">
            <p className="text-2xl font-black text-white font-mono">98/100</p>
            <p className="text-[10px] text-brand-200 uppercase font-semibold">Security Index</p>
          </div>
        </div>
      </div>

      {/* Security Settings Form Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Data Security & Access Controls
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Toggle policy enforcement rules for platform sessions and database encryption.
            </p>
          </div>
          <button
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span>Save Security Settings</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
          {/* Toggle 1: 2FA */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-brand-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">2FA Enforcement</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Require TOTP or SMS OTP verification for all trader and admin logins.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('twoFactorEnforced')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.twoFactorEnforced ? 'bg-brand-700' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.twoFactorEnforced ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 2: Encryption at Rest */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-brand-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Data Encryption at Rest (AES-256)</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Encrypt order logs, transaction records, and user bank details with HSM keys.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('dataEncryptionAtRest')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.dataEncryptionAtRest ? 'bg-brand-700' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.dataEncryptionAtRest ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 3: IP Whitelisting */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Admin IP Whitelisting</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Restrict administrative console access exclusively to pre-approved corporate VPN ranges.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('ipWhitelistingEnabled')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.ipWhitelistingEnabled ? 'bg-brand-700' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.ipWhitelistingEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle 4: Strict Password Policy */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Strict Password & Rotation Policy</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Minimum 10 characters with mandatory special characters and 90-day expiry cycle.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('strictPasswordPolicy')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.strictPasswordPolicy ? 'bg-brand-700' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.strictPasswordPolicy ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Timeout input */}
          <div className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex items-center justify-between">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Idle Session Timeout</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automatically disconnect inactive terminals to prevent unauthorized physical terminal access.
              </p>
            </div>
            <select
              value={settings.sessionTimeoutMinutes}
              onChange={(e) => setSettings({ ...settings, sessionTimeoutMinutes: Number(e.target.value) })}
              className="text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value={5}>5 Minutes</option>
              <option value={15}>15 Minutes</option>
              <option value={30}>30 Minutes</option>
              <option value={60}>60 Minutes</option>
            </select>
          </div>

          {/* Biometrics Toggle */}
          <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850">
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-brand-600" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Biometric Mobile Login (FIDO2)</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Allow FaceID and fingerprint hardware keys on supported mobile/desktop devices.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle('biometricAllowed')}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                settings.biometricAllowed ? 'bg-brand-700' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.biometricAllowed ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

        </div>
      </div>

      {/* Recent Security Incidents Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Security Incidents
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time threat monitoring and automated Web Application Firewall (WAF) actions.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400 font-mono">
            Last audit scan: 2 mins ago
          </span>
        </div>

        <DataTable
          columns={incidentColumns}
          data={incidents}
          searchKey="type"
          searchPlaceholder="Search incidents..."
          filterKey="severity"
          filterLabel="Severity"
          filterOptions={[
            { label: 'High', value: 'High' },
            { label: 'Medium', value: 'Medium' },
            { label: 'Low', value: 'Low' }
          ]}
          itemsPerPage={5}
          emptyMessage="No incidents recorded in the current audit window."
        />
      </div>

    </div>
  );
};
