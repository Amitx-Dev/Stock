import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useTrading } from '../../context/TradingContext';
import { Wallet, DollarSign, Check } from 'lucide-react';

export const DepositModal = ({ isOpen, onClose }) => {
  const { depositCash, wallet } = useTrading();
  const [amount, setAmount] = useState('5000');
  const [submitting, setSubmitting] = useState(false);

  const presets = [1000, 5000, 10000, 25000];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) return;

    setSubmitting(true);
    try {
      await depositCash(val);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deposit Funds to Wallet">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
          <span className="text-xs text-slate-400">Current Balance:</span>
          <span className="text-sm font-bold text-emerald-400">
            ${wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
            Select Quick Amount
          </label>
          <div className="grid grid-cols-4 gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset.toString())}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  amount === preset.toString()
                    ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                +${(preset / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            Or Enter Custom Amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
            <input
              type="number"
              min="10"
              max="500000"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-8 pr-4 text-white text-sm focus:border-cyan-500 focus:outline-none"
              placeholder="e.g. 5000"
              required
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting || !amount || parseFloat(amount) <= 0}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{submitting ? 'Processing...' : 'Confirm Deposit'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
