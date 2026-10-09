import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, ArrowRight, Zap, CheckCircle2, TrendingUp, BarChart2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const HeroSection = () => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    showToast('Redirecting to secure account verification...', 'info');
    navigate(`/login?phone=${phone}&role=trader`);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-brand-50/50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Form */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100/80 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-xs font-semibold text-brand-800 dark:text-brand-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>Next-Gen Trading Platform • Upstox Inspired Fintech</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Invest smarter, <br />
              <span className="bg-gradient-to-r from-brand-700 via-indigo-600 to-purple-600 dark:from-brand-400 dark:to-indigo-300 bg-clip-text text-transparent">
                trade faster.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Cut through market noise with millisecond order execution, pro charts, and flat ₹20 brokerage. Trusted by over 1 Crore active Indian traders.
            </p>

            {/* Mobile Input & CTA */}
            <form onSubmit={handleGetStarted} className="max-w-md mx-auto lg:mx-0 space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-card focus-within:border-brand-600 transition-all">
                <div className="flex items-center pl-3 pr-2 text-slate-500 font-semibold text-sm">
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, ''));
                    if (error) setError('');
                  }}
                  className="w-full px-2 py-3 text-sm bg-transparent border-0 focus:outline-none text-slate-900 dark:text-white font-medium placeholder-slate-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-700 hover:bg-brand-800 active:scale-95 text-white font-semibold text-sm shadow-md shadow-brand-700/30 flex items-center justify-center gap-2 transition-all whitespace-nowrap"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <p className="text-xs text-trade-red font-medium text-left pl-2">{error}</p>
              )}

              <p className="text-xs text-slate-400 dark:text-slate-500 text-left pl-2">
                ₹0 Account Opening • Paperless KYC in 5 Minutes
              </p>
            </form>

            {/* Trust points */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-trade-green" />
                ₹0 AMC for 1st Year
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-trade-green" />
                SEBI Reg. Broker
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-trade-green" />
                256-Bit Data Encryption
              </span>
            </div>
          </div>

          {/* Right Column: Trading Dashboard Mockup Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Background gradient frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-3xl blur-md opacity-30 group-hover:opacity-100 transition duration-1000"></div>

              {/* Mockup Card */}
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
                
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center font-bold text-brand-700 dark:text-brand-300 text-sm">
                      RE
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        RELIANCE IND.
                      </h4>
                      <p className="text-[11px] text-slate-400">NSE • Equity Delivery</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                      ₹2,985.50
                    </p>
                    <p className="text-xs font-semibold text-trade-green flex items-center justify-end">
                      +₹34.20 (+1.16%)
                    </p>
                  </div>
                </div>

                {/* Mini SVG Candlestick / Area Graphic */}
                <div className="my-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Live Chart 1D</span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-trade-green">
                      <span className="w-2 h-2 rounded-full bg-trade-green animate-ping"></span>
                      Market Open
                    </span>
                  </div>

                  {/* SVG Chart visual */}
                  <svg viewBox="0 0 400 130" className="w-full h-28 overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5F259F" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#5F259F" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Fill */}
                    <path
                      d="M 0 110 Q 50 85, 100 95 T 200 65 T 300 45 T 400 20 L 400 130 L 0 130 Z"
                      fill="url(#chartGradient)"
                    />
                    {/* Line */}
                    <path
                      d="M 0 110 Q 50 85, 100 95 T 200 65 T 300 45 T 400 20"
                      fill="none"
                      stroke="#5F259F"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    {/* Pulsing point at latest price */}
                    <circle cx="400" cy="20" r="5" fill="#5F259F" className="animate-pulse" />
                    <circle cx="400" cy="20" r="10" fill="#5F259F" opacity="0.3" />
                  </svg>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 font-mono">
                    <span>09:15</span>
                    <span>11:30</span>
                    <span>13:30</span>
                    <span>15:30</span>
                  </div>
                </div>

                {/* Floating Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                      Portfolio P&L Today
                    </p>
                    <p className="text-sm font-extrabold text-trade-green font-mono mt-0.5">
                      +₹3,240.50
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/50 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-brand-800 dark:text-brand-300">
                      Execution Latency
                    </p>
                    <p className="text-sm font-extrabold text-brand-700 dark:text-brand-300 font-mono mt-0.5">
                      1.2 ms
                    </p>
                  </div>
                </div>

                {/* Floating Action Pill */}
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl bg-trade-green text-white font-bold text-xs shadow-md shadow-emerald-500/20 hover:brightness-105 transition-all">
                    BUY (NSE)
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-trade-red text-white font-bold text-xs shadow-md shadow-rose-500/20 hover:brightness-105 transition-all">
                    SELL (NSE)
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
