import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export const SecurityIncidentList = ({ logs = [] }) => {
  return (
    <div className="fintech-card overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recent Security Incidents & Audit Logs
          </h4>
          <span className="text-[11px] text-slate-500">
            Automated intrusion detection, rate limiting & session audit trace
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          {logs.length} Logged Events
        </span>
      </div>

      <div className="divide-y divide-slate-800/60">
        {logs.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-xs">
            No active security incidents recorded in this window.
          </div>
        ) : (
          logs.map((log) => {
            let badgeClass = 'bg-slate-800 text-slate-400 border-slate-700';
            let Icon = Info;

            if (log.severity === 'CRITICAL') {
              badgeClass = 'bg-rose-950/80 text-rose-400 border-rose-800 animate-pulse';
              Icon = ShieldAlert;
            } else if (log.severity === 'HIGH') {
              badgeClass = 'bg-rose-950/60 text-rose-400 border-rose-800/80';
              Icon = AlertTriangle;
            } else if (log.severity === 'MEDIUM') {
              badgeClass = 'bg-amber-950/60 text-amber-400 border-amber-800/80';
              Icon = AlertTriangle;
            } else if (log.severity === 'LOW') {
              badgeClass = 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80';
              Icon = ShieldCheck;
            }

            return (
              <div key={log.id} className="p-4 hover:bg-slate-800/30 transition-colors flex items-start gap-3.5">
                <div className={`p-2 rounded-xl border ${badgeClass} flex-shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white leading-tight">
                      {log.event}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
                      {log.severity}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span>IP: {log.ipAddress}</span>
                    <span>•</span>
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
