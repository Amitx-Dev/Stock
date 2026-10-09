import React from 'react';
import { TrendingUp, Layers, Compass, Flame, PieChart, Landmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProductsGrid = () => {
  const products = [
    {
      id: 'stocks',
      title: 'Stocks',
      tagline: 'Equity Delivery & Intraday',
      description: 'Invest in 5000+ listed NSE & BSE companies with real-time level 3 order books and millisecond order routing.',
      fee: '₹0 on Delivery',
      icon: TrendingUp,
      color: 'from-purple-500 to-brand-700',
      badge: 'Zero Delivery Fee'
    },
    {
      id: 'mf',
      title: 'Mutual Funds',
      tagline: 'Direct Plans with 0% Commission',
      description: 'Earn up to 1.5% higher returns every year with zero distributor commission direct mutual fund schemes.',
      fee: '0% Commission',
      icon: Layers,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Smart SIP'
    },
    {
      id: 'fo',
      title: 'Futures & Options',
      tagline: 'Pro Derivatives Trading',
      description: 'Advanced option chains with live Greeks, multi-leg strategy builder, and instant margin pledging.',
      fee: '₹20/Order Flat',
      icon: Compass,
      color: 'from-brand-600 to-indigo-700',
      badge: 'Option Greek Terminal'
    },
    {
      id: 'ipo',
      title: 'IPOs',
      tagline: 'Pre-apply via UPI 2.0',
      description: 'Never miss marquee public listings. Apply seamlessly in seconds using your favorite UPI app with instant block status.',
      fee: '₹0 Application Fee',
      icon: Flame,
      color: 'from-amber-500 to-rose-600',
      badge: 'Pre-Apply Available'
    },
    {
      id: 'etf',
      title: 'ETFs',
      tagline: 'Low-cost Index Diversification',
      description: 'Track NIFTY 50, Gold, Silver, and Global Tech indices with fractional trading and instant liquidity.',
      fee: 'Low Expense Ratio',
      icon: PieChart,
      color: 'from-emerald-500 to-teal-700',
      badge: 'High Liquidity'
    },
    {
      id: 'bonds',
      title: 'Government Bonds & SGB',
      tagline: 'Fixed Income & Sovereign Gold',
      description: 'Earn regular periodic coupons backed by Sovereign guarantees and tax-free capital gains on Gold bonds.',
      fee: 'Guaranteed Returns',
      icon: Landmark,
      color: 'from-blue-500 to-cyan-700',
      badge: 'Sovereign Backed'
    }
  ];

  return (
    <section id="products" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
            Comprehensive Asset Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            One platform, infinite investment possibilities.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
            Everything you need to grow your wealth from beginner SIPs to high-frequency algorithmic derivatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => {
            const Icon = prod.icon;
            return (
              <div
                key={prod.id}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${prod.color} text-white flex items-center justify-center shadow-md shadow-brand-700/20 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {prod.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {prod.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-700 dark:text-brand-300 mt-0.5">
                    {prod.tagline}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-trade-green dark:text-emerald-400 font-mono">
                    {prod.fee}
                  </span>
                  <Link
                    to="/login?role=trader"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors"
                  >
                    <span>Trade Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
