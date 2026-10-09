import React from 'react';
import { IndianRupee, LineChart, Shield, Headphones, Check, Sparkles } from 'lucide-react';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: IndianRupee,
      title: 'Industry-Lowest Brokerage',
      subtitle: 'Flat ₹20 or 0.05% per trade',
      description: 'Zero hidden charges, zero account maintenance fees for your first year, and ₹0 brokerage on all Equity Delivery trades.',
      perks: ['₹0 Delivery Brokerage', 'Flat ₹20 on F&O and Intraday', 'Direct mutual funds at 0% fees']
    },
    {
      icon: LineChart,
      title: 'Advanced TradingView Engine',
      subtitle: '100+ Indicators & 1-Click Orders',
      description: 'Trade directly off real-time TradingView charts with custom Pine scripts, multi-chart layouts, and instant bracket stop-loss orders.',
      perks: ['10+ Chart Types & Depth', 'Sub-millisecond data feed', 'Option Chain with Real-Time Greeks']
    },
    {
      icon: Shield,
      title: 'Bank-Grade Financial Security',
      subtitle: '256-Bit SSL & Two-Factor Auth',
      description: 'Your assets and orders are protected with biometric authentication, dynamic OTPs, multi-tenant vault security, and ISO-certified infrastructure.',
      perks: ['SEBI Registered Broker', 'Mandatory 2FA authentication', 'Depository direct CDSL integration']
    },
    {
      icon: Headphones,
      title: '24x7 Dedicated Support',
      subtitle: 'Instant phone, chat & ticket response',
      description: 'Get round-the-clock support from dedicated trading specialists and relationship managers whenever the market moves.',
      perks: ['Average response under 2 mins', 'Dedicated Relationship Managers', 'In-depth Knowledge Base & Webinars']
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
            The TradeNest Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Why over 1 Crore traders trust TradeNest.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
            Engineered from scratch to empower modern retail investors with institutional-grade technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-700 text-white flex items-center justify-center shadow-md shadow-brand-700/20 shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {feat.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-700 dark:text-brand-300">
                      {feat.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {feat.description}
                </p>

                <div className="space-y-2.5">
                  {feat.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-trade-green flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
