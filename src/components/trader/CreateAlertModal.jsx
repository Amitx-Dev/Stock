import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useMarket } from '../../context/MarketContext';
import { useTrading } from '../../context/TradingContext';
import { Bell, Plus, Check } from 'lucide-react';

export const CreateAlertModal = ({ isOpen, onClose, defaultStock = null }) => {
  const { stocks } = useMarket();
  const { createAlert } = useTrading();

  const [selectedStockId, setSelectedStockId] = useState(defaultStock ? defaultStock.id : (stocks[0]?.id || 1));
  const [condition, setCondition] = useState('ABOVE');
  const [targetPrice, setTargetPrice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const selectedStock = stocks.find(s => s.id === Number(selectedStockId)) || stocks[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStock || !targetPrice || parseFloat(targetPrice) <= 0) return;

    setSubmitting(true);
    try {
      await createAlert({
        stockId: selectedStock.id,
        symbol: selectedStock.symbol,
        targetPrice: parseFloat(targetPrice),
        condition
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Price Alert" maxWidth="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Stock Selection */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            Select Asset
          </label>
          <select
            value={selectedStockId}
            onChange={(e) => setSelectedStockId(Number(e.target.value))}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 px-3 text-white text-xs focus:border-cyan-500 focus:outline-none"
          >
            {stocks.map(s => (
              <option key={s.id} value={s.id}>
                {s.symbol} - {s.companyName} (${s.currentPrice.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Stock Benchmark Quote */}
        {selectedStock && (
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
            <span className="text-slate-400">Current Market Price:</span>
            <span className="font-mono font-bold text-white text-sm">
              ${selectedStock.currentPrice.toFixed(2)}
            </span>
          </div>
        )}

        {/* Condition Toggle */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            Trigger Condition
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setCondition('ABOVE')}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                condition === 'ABOVE'
                  ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              ▲ Rises Above
            </button>
            <button
              type="button"
              onClick={() => setCondition('BELOW')}
              className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                condition === 'BELOW'
                  ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              ▼ Drops Below
            </button>
          </div>
        </div>

        {/* Target Price */}
        <div>
          <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
            Target Price ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
            <input
              type="number"
              step="any"
              min="0.01"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-8 pr-4 text-white text-sm font-mono focus:border-cyan-500 focus:outline-none"
              placeholder={`e.g. ${selectedStock ? (selectedStock.currentPrice * (condition === 'ABOVE' ? 1.05 : 0.95)).toFixed(2) : '150.00'}`}
              required
            />
          </div>
        </div>

        {/* Buttons */}
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
            disabled={submitting || !targetPrice || parseFloat(targetPrice) <= 0}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{submitting ? 'Setting Alert...' : 'Set Price Alert'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
