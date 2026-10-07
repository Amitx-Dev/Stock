import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { useMarket } from '../../context/MarketContext';
import { CreateAlertModal } from '../../components/trader/CreateAlertModal';
import { Bell, Plus, Trash2, ArrowUpRight, ArrowDownRight, AlertTriangle, CheckCircle } from 'lucide-react';

export const AlertsPage = () => {
  const { alerts, deleteAlert } = useTrading();
  const { stocks } = useMarket();
  const [showModal, setShowModal] = useState(false);

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const triggeredAlerts = alerts.filter(a => a.status === 'TRIGGERED');

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="fintech-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-extrabold text-white">Target Price Alerts & Triggers</h2>
          </div>
          <p className="text-xs text-slate-400">
            Set conditional target price alerts to stay ahead of market swings.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Alert</span>
        </button>
      </div>

      {/* Triggered Alerts Notification Banner (if any) */}
      {triggeredAlerts.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Triggered Alerts ({triggeredAlerts.length})</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
            {triggeredAlerts.map(alert => (
              <div key={alert.id} className="p-3 rounded-lg bg-slate-900 border border-amber-600/40 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-sm">{alert.symbol}</div>
                  <div className="text-[11px] text-amber-300 font-mono">
                    Reached {alert.condition} ${alert.targetPrice.toFixed(2)}
                  </div>
                </div>
                <button
                  onClick={() => deleteAlert(alert.id)}
                  className="p-1 text-slate-400 hover:text-rose-400"
                  title="Dismiss alert"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Alerts Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Active Surveillance Watch ({activeAlerts.length})
        </h3>

        {activeAlerts.length === 0 ? (
          <div className="fintech-card p-12 text-center text-slate-500 text-xs">
            No active price alerts set. Click "Create New Alert" to watch any stock target price.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAlerts.map((alert) => {
              const stock = stocks.find(s => s.symbol === alert.symbol || s.id === alert.stockId);
              const currentPrice = stock ? stock.currentPrice : alert.targetPrice;
              const isAbove = alert.condition === 'ABOVE';

              return (
                <div key={alert.id} className="fintech-card p-4 flex flex-col justify-between space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white">{alert.symbol}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            isAbove
                              ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                              : 'bg-rose-950/80 text-rose-400 border-rose-800'
                          }`}
                        >
                          {isAbove ? '▲ RISES ABOVE' : '▼ DROPS BELOW'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Current: <span className="font-mono text-white font-bold">${currentPrice.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteAlert(alert.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Target Threshold:</span>
                    <span className="font-mono font-black text-cyan-400 text-sm">
                      ${alert.targetPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <CreateAlertModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
