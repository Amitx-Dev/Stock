import React, { useState, useEffect } from 'react';
import { initialAlerts, initialNotifications } from '../../data/mockAlerts';
import { mockStocks } from '../../data/mockStocks';
import { api } from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';
import {
  Bell,
  PlusCircle,
  Trash2,
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertTriangle,
  MailOpen,
  MailCheck,
  ShieldAlert
} from 'lucide-react';

export const AlertsNotificationsPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // New alert form state
  const [newAlert, setNewAlert] = useState({
    stock: 'RELIANCE',
    condition: 'ABOVE',
    targetPrice: ''
  });

  const { showToast } = useToast();

  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (!newAlert.targetPrice || Number(newAlert.targetPrice) <= 0) {
      showToast('Please enter a valid price threshold', 'error');
      return;
    }

    const currentStock = mockStocks.find((s) => s.symbol === newAlert.stock);
    const created = {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      stock: newAlert.stock,
      condition: newAlert.condition,
      targetPrice: Number(newAlert.targetPrice),
      currentPrice: currentStock ? currentStock.price : 2000,
      status: 'ACTIVE',
      createdAt: 'Just now'
    };

    setAlerts((prev) => [created, ...prev]);
    api.createAlert({
      stock: newAlert.stock,
      condition: newAlert.condition,
      targetPrice: Number(newAlert.targetPrice)
    });
    showToast(`Price alert created for ${newAlert.stock}`, 'success');
    setIsAlertModalOpen(false);
    setNewAlert({ stock: 'RELIANCE', condition: 'ABOVE', targetPrice: '' });
  };

  const handleDeleteAlert = (id) => {
    api.deleteAlert(id);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast('Alert deleted', 'info');
  };

  const handleToggleAlert = (id) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
          showToast(`Alert status updated to ${nextStatus}`, 'info');
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'success');
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Price Alerts & Notification Center
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure automated price threshold alerts and inspect execution confirmation feeds.
          </p>
        </div>

        <button
          onClick={() => setIsAlertModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Price Alert</span>
        </button>
      </div>

      {/* Grid: Alerts (Left) & Notification Feed (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Price Alerts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-brand-600" />
                <span>Active Price Alerts ({alerts.length})</span>
              </h3>
              <span className="text-xs text-slate-400">Triggered via In-App & SMS</span>
            </div>

            <div className="space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/70 text-brand-700 dark:text-brand-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                        {alert.stock.slice(0, 2)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {alert.stock}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            alert.condition === 'ABOVE' ? 'bg-emerald-100 text-trade-green' : 'bg-rose-100 text-trade-red'
                          }`}>
                            {alert.condition} ₹{alert.targetPrice.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">
                          Current: ₹{alert.currentPrice.toFixed(2)} • Created: {alert.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleToggleAlert(alert.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-bold border transition-colors ${
                          alert.status === 'ACTIVE'
                            ? 'border-emerald-300 bg-emerald-50 text-trade-green dark:bg-emerald-950/50'
                            : alert.status === 'TRIGGERED'
                            ? 'border-purple-300 bg-purple-50 text-brand-700 dark:bg-purple-950/50'
                            : 'border-slate-300 bg-slate-100 text-slate-500'
                        }`}
                      >
                        {alert.status}
                      </button>

                      <button
                        onClick={() => handleDeleteAlert(alert.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Delete Alert"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="p-8 text-center text-xs text-slate-400">
                  No active price alerts. Click "Create Price Alert" above.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Notification Center Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Notification Stream
              </h3>
              <button
                onClick={handleMarkAllRead}
                className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-bold"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleToggleRead(n.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    !n.read
                      ? 'border-brand-200 bg-brand-50/50 dark:border-brand-900/60 dark:bg-brand-950/30'
                      : 'border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-850'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          !n.read ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
                        }`}
                      />
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {n.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {n.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 pl-4">
                    {n.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Create Alert Modal */}
      <Modal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="Set New Price Alert"
        maxWidth="max-w-md"
        description="Receive instant push notifications when price crosses target"
      >
        <form onSubmit={handleCreateAlert} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Stock Instrument
            </label>
            <select
              value={newAlert.stock}
              onChange={(e) => {
                const stk = mockStocks.find((s) => s.symbol === e.target.value);
                setNewAlert({
                  ...newAlert,
                  stock: e.target.value,
                  targetPrice: stk ? Math.round(stk.price * 1.02) : ''
                });
              }}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
            >
              {mockStocks.map((s) => (
                <option key={s.symbol} value={s.symbol}>
                  {s.symbol} (LTP: ₹{s.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Trigger Condition
              </label>
              <select
                value={newAlert.condition}
                onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-bold"
              >
                <option value="ABOVE">Crosses Above (≥)</option>
                <option value="BELOW">Crosses Below (≤)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Price (₹)
              </label>
              <input
                type="number"
                step="0.05"
                placeholder="e.g. 3050.00"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert({ ...newAlert, targetPrice: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAlertModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-brand-700 hover:bg-brand-800 text-white rounded-xl shadow-sm transition-all"
            >
              Activate Alert
            </button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
