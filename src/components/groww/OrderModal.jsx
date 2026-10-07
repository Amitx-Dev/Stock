import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { calculateCharges } from '../../services/marketData';
import { X, Plus, Minus, Info, CheckCircle2 } from 'lucide-react';

export const OrderModal = ({ isOpen, onClose, stock, initialType = 'BUY' }) => {
  const { wallet, executeTrade, showToast } = useTrading();

  const [orderAction, setOrderAction] = useState(initialType);
  const [productType, setProductType] = useState('CNC');
  const [orderType, setOrderType] = useState('Market');
  const [quantity, setQuantity] = useState(10);
  const [limitPrice, setLimitPrice] = useState(stock ? stock.currentPrice : 1000);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (stock) {
      setLimitPrice(stock.currentPrice);
      setOrderAction(initialType);
    }
  }, [stock, initialType]);

  if (!isOpen || !stock) return null;

  const effectivePrice = orderType === 'Market' ? stock.currentPrice : parseFloat(limitPrice) || stock.currentPrice;
  const charges = calculateCharges(orderAction, productType, effectivePrice, quantity);
  const isBalanceSufficient = wallet.cashBalance >= charges.requiredMargin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      showToast('Quantity must be greater than 0', 'error');
      return;
    }
    if (orderAction === 'BUY' && !isBalanceSufficient) {
      showToast('Insufficient margin available in wallet. Please add funds.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await executeTrade({
        stockId: stock.id,
        symbol: stock.symbol,
        type: orderAction,
        quantity: Number(quantity),
        pricePerShare: effectivePrice,
        product: productType,
        orderType
      });
      onClose();
    } catch (err) {
      // toast in context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        className="w-full max-w-md bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold font-mono text-base text-slate-900 dark:text-white">
                {stock.symbol}
              </span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                {stock.exchange || 'NSE'}
              </span>
              <span className="text-xs text-slate-400">{stock.companyName}</span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-0.5">
              ₹{stock.currentPrice.toFixed(2)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {/* BUY / SELL Switch */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">
            <button
              type="button"
              onClick={() => setOrderAction('BUY')}
              className={`py-2 rounded-lg transition-all ${
                orderAction === 'BUY'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              BUY
            </button>
            <button
              type="button"
              onClick={() => setOrderAction('SELL')}
              className={`py-2 rounded-lg transition-all ${
                orderAction === 'SELL'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              SELL
            </button>
          </div>

          {/* Delivery vs Intraday */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setProductType('CNC')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                productType === 'CNC'
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div>Delivery (CNC)</div>
              <div className="text-[10px] text-slate-400 font-normal">Holding in Demat</div>
            </button>

            <button
              type="button"
              onClick={() => setProductType('MIS')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                productType === 'MIS'
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Intraday (MIS)</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-100 text-indigo-700 font-bold">5x</span>
              </div>
              <div className="text-[10px] text-slate-400 font-normal">Auto square-off</div>
            </button>
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Quantity (Shares)
            </label>
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 5))}
                className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center bg-transparent text-sm font-bold font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 5)}
                className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Margin & Fee calculations */}
          <div className="space-y-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 font-mono text-[11px]">
            <div className="flex justify-between text-slate-500">
              <span>Required Margin:</span>
              <span className={`font-bold ${isBalanceSufficient ? 'text-emerald-600' : 'text-rose-600'}`}>
                ₹{charges.requiredMargin.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-slate-400 text-[10px]">
              <span>Available Margin:</span>
              <span>₹{wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
              orderAction === 'BUY'
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-rose-600 hover:bg-rose-500'
            }`}
          >
            {isSubmitting ? 'Placing Order...' : `${orderAction} ${stock.symbol}`}
          </button>
        </form>
      </div>
    </div>
  );
};
