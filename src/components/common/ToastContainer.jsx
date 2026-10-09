import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let bgColor = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100';
        let icon = <CheckCircle2 className="w-5 h-5 text-trade-green shrink-0" />;

        if (toast.type === 'error') {
          bgColor = 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-900 text-red-900 dark:text-red-200';
          icon = <XCircle className="w-5 h-5 text-trade-red shrink-0" />;
        } else if (toast.type === 'warning') {
          bgColor = 'bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200';
          icon = <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />;
        } else if (toast.type === 'info') {
          bgColor = 'bg-brand-50 dark:bg-brand-950/80 border-brand-200 dark:border-brand-900 text-brand-900 dark:text-brand-200';
          icon = <Info className="w-5 h-5 text-brand-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg transition-all duration-300 transform translate-y-0 ${bgColor}`}
          >
            <div className="flex items-center gap-3">
              {icon}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-lg"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
