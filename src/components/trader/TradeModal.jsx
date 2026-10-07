import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useTrading } from '../../context/TradingContext';
import { ArrowUpRight, ArrowDownRight, Wallet, Check, AlertCircle } from 'lucide-react';

export const TradeModal = ({ isOpen, onClose, stock, initialType = 'BUY' }) => {
  const { wallet, portfolio, executeTrade } = useTrading();
  const [type, setType] = useState(initialType);
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setType(initialType);
    setQuantity(1);
    setError('');
  }, [stock, initialType, isOpen]);

  if (!stock) return null;

  const currentPrice = stock.currentPrice;
  const isPositive = stock.changePercent >= 0;

  // Find how many shares user currently owns
  const userHolding = portfolio.find(p => p.stockId === stock.id || p.symbol === stock.symbol);
  const ownedShares = userHolding ? userHolding.quantity : 0;

  // Max affordable for BUY
  const maxBuyQty = Math.floor(wallet.cashBalance / currentPrice);
  const maxSellQty = ownedShares;

  const totalAmount = Number((quantity * currentPrice).toFixed(2));

  // Handle Quick Percentage
  const handleQuickPercent = (pct) => {
    if (type === 'BUY') {
      const targetQty = Math.floor((wallet.cashBalance * pct) / currentPrice);
      setQuantity(Math.max(1, targetQty));
    } else {
      const targetQty = Math.floor(ownedShares * pct);
      setQuantity(Math.max(1, targetQty));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (quantity <= 0) {
      setError('Please enter a valid quantity greater than 0.');
      return;
    }

    if (type === 'BUY' && totalAmount > wallet.cashBalance) {
      setError(`Insufficient cash balance ($${wallet.cashBalance.toFixed(2)} available).`);
      return;
    }

    if (type === 'SELL' && quantity > ownedShares) {
      setError(`You only own ${ownedShares} shares of ${stock.symbol}.`);
      return;
    }

    setSubmitting(true);
    try {
      await executeTrade({
        stockId: stock.id,
        type,
        quantity,
        pricePerShare: currentPrice
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Trade execution failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Trade ${stock.symbol}`} maxWidth="max-w-md">
      {/* Type Toggle Tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl mb-5 border border-slate-800">
        <button
          type="button"
          onClick={() => { setType('BUY'); setError(''); }}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            type === 'BUY'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          BUY {stock.symbol}
        </button>
        <button
          type="button"
          onClick={() => { setType('SELL'); setError(''); }}
          className={`py-2 rounded-lg text-xs font-bold transition-all ${
            type === 'SELL'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          SELL {stock.symbol}
        </button>
      </div>

      {/* Stock Quote Header */}
      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/60 mb-5 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-400 font-medium">Market Price</span>
          <div className="text-xl font-black text-white">${currentPrice.toFixed(2)}</div>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-medium">24h Change</span>
          <div className={`flex items-center justify-end text-xs font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
            {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quantity Controls */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase text-slate-300">Order Quantity (Shares)</label>
            <span className="text-xs text-slate-400">
              {type === 'BUY' ? (
                <>Max Buy: <span className="text-cyan-400 font-semibold">{maxBuyQty}</span></>
              ) : (
                <>Owned: <span className="text-cyan-400 font-semibold">{ownedShares}</span></>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-lg flex items-center justify-center border border-slate-700"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={type === 'BUY' ? maxBuyQty || 1 : ownedShares || 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl py-2 px-3 text-center text-white font-bold text-base focus:border-cyan-500 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setQuantity(q => q + 1)}
              className="w-10 h-10 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold text-lg flex items-center justify-center border border-slate-700"
            >
              +
            </button>
          </div>
        </div>

        {/* Quick Percentage Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[0.25, 0.5, 0.75, 1.0].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handleQuickPercent(pct)}
              className="py-1.5 text-xs font-semibold rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              {pct === 1.0 ? '100% Max' : `${pct * 100}%`}
            </button>
          ))}
        </div>

        {/* Summary Breakdown */}
        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Price Per Share:</span>
            <span className="font-mono text-slate-200">${currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Brokerage / Commission:</span>
            <span className="text-emerald-400 font-semibold">$0.00 (Zero Fee)</span>
          </div>
          <div className="flex justify-between text-slate-200 font-bold pt-2 border-t border-slate-800 text-sm">
            <span>Total {type === 'BUY' ? 'Cost' : 'Proceeds'}:</span>
            <span className={`font-mono ${type === 'BUY' ? 'text-cyan-400' : 'text-emerald-400'}`}>
              ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Available Wallet / Balance indicator */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-cyan-400" />
            <span>Available Cash:</span>
          </span>
          <span className="font-bold text-white">
            ${wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>

        {error && (
          <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting || (type === 'SELL' && ownedShares === 0)}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
              type === 'BUY'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20'
            } disabled:opacity-50`}
          >
            <Check className="w-4 h-4" />
            <span>
              {submitting
                ? 'Processing Execution...'
                : `${type} ${quantity} ${stock.symbol} Shares`}
            </span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
