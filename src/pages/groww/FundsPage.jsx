import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import {
  Wallet,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Building,
  Smartphone,
  CreditCard,
  History
} from 'lucide-react';

export const FundsPage = () => {
  const { wallet, depositCash, showToast } = useTrading();
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'withdraw'
  const [amount, setAmount] = useState('10000');
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [upiId, setUpiId] = useState('alex@okaxis');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0) {
      showToast('Enter a valid amount', 'error');
      return;
    }
    setIsProcessing(true);
    setTimeout(async () => {
      await depositCash(val);
      setIsProcessing(false);
      showToast(`₹${val.toLocaleString()} added instantly via ${paymentMode}!`, 'success');
    }, 600);
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    showToast('Withdrawal request submitted. Funds will reflect in bank account in 24 hrs.', 'info');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-150">
      {/* 1. Account Funds Summary (Groww Funds Screen) */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Available Trading Margin
            </div>
            <div className="text-3xl font-black font-mono text-slate-900 dark:text-white mt-1">
              ₹{wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'add'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Money</span>
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'withdraw'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[11px] font-sans">Used Margin:</span>
            <div className="font-bold text-slate-800 dark:text-slate-200">₹0.00</div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-sans">Withdrawable Cash:</span>
            <div className="font-bold text-emerald-600">
              ₹{wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <span className="text-slate-400 text-[11px] font-sans">Linked Bank Account:</span>
            <div className="font-bold font-sans text-slate-800 dark:text-slate-200 flex items-center gap-1">
              <span>HDFC Bank •••• 4019</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Add Money or Withdraw Card */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-4">
        {activeTab === 'add' ? (
          <form onSubmit={handleDeposit} className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Add Money to Trading Account
            </h2>

            {/* Quick Amount Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-base">
                  ₹
                </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono font-bold text-lg text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 mt-2">
                {['1000', '5000', '10000', '25000', '50000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 hover:border-emerald-500"
                  >
                    +₹{parseInt(amt).toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                Payment Option
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'UPI', label: 'UPI (Instant)', desc: 'GPay, PhonePe, Paytm', icon: Smartphone },
                  { id: 'NetBanking', label: 'Net Banking', desc: 'All Major Banks', icon: Building },
                  { id: 'NEFT', label: 'NEFT / RTGS', desc: 'Direct Transfer', icon: CreditCard }
                ].map((mode) => {
                  const Icon = mode.icon;
                  const isSelected = paymentMode === mode.id;

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPaymentMode(mode.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-emerald-500" />
                        <span>{mode.label}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">{mode.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? 'Processing Payment...' : `Add ₹${parseFloat(amount || 0).toLocaleString()} via ${paymentMode}`}
            </button>
          </form>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Withdraw Funds to Bank Account
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                defaultValue="10000"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono font-bold text-base text-slate-900 dark:text-white focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Maximum withdrawable: ₹{wallet.cashBalance.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Destination: HDFC Bank A/c No: •••• 4019
              </div>
              <div className="text-slate-400 text-[11px]">
                IFSC: HDFC0000128 • Account Holder: Alex Morgan
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all"
            >
              Confirm Withdrawal
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
