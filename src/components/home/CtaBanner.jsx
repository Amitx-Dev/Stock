import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export const CtaBanner = () => {
  return (
    <section className="py-20 bg-gradient-to-tr from-brand-900 via-brand-800 to-indigo-950 text-white relative overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-200">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Start with Zero Brokerage on Equity Delivery</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to elevate your trading game?
        </h2>

        <p className="text-base sm:text-lg text-brand-100/90 max-w-2xl mx-auto leading-relaxed">
          Join over 1 Crore smart investors. Open your free Demat and Trading account today in under 5 minutes with paperless KYC.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            to="/login?role=trader"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-brand-900 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Open Free Account</span>
            <ArrowRight className="w-5 h-5 text-brand-700" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-800/80 hover:bg-brand-700/80 border border-brand-600/50 text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all flex items-center justify-center"
          >
            Login to Web Terminal
          </Link>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-brand-200/80 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Safe & Depository Backed
          </span>
          <span>•</span>
          <span>Instant Fund Transfers via UPI & Netbanking</span>
          <span>•</span>
          <span>24/7 Priority Support</span>
        </div>
      </div>
    </section>
  );
};
