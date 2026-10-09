import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BrokerageComparison = () => {
  const comparisonRows = [
    { feature: 'Equity Delivery Brokerage', tradenest: '₹0 (Free)', discount: '₹20 or 0.05%', fullService: '0.50% (₹500 per Lakh)' },
    { feature: 'Equity Intraday Brokerage', tradenest: 'Flat ₹20 / order', discount: 'Flat ₹20 / order', fullService: '0.05% (₹50 per Lakh)' },
    { feature: 'Futures & Options Brokerage', tradenest: 'Flat ₹20 / order', discount: 'Flat ₹20 / order', fullService: '₹50 to ₹100 / order' },
    { feature: 'Direct Mutual Funds', tradenest: '₹0 Commission', discount: '₹0 Commission', fullService: '1.0% to 1.5% Regular Cut' },
    { feature: 'Account Opening Charges', tradenest: '₹0 (100% Free)', discount: '₹200 - ₹300', fullService: '₹500 - ₹1,000' },
    { feature: 'Annual Maintenance (1st Yr)', tradenest: '₹0 Free', discount: '₹300 / yr', fullService: '₹600 - ₹1,200 / yr' },
    { feature: 'Pro Charting & Screeners', tradenest: 'Included Free', discount: 'Paid Add-ons', fullService: 'Basic Only' },
    { feature: 'Call & Trade Charges', tradenest: '₹20 / call', discount: '₹50 / call', fullService: 'Free (high brokerage)' },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
            Unbeatable Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Simple, honest pricing with zero surprises.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base">
            See how much you save with TradeNest compared to traditional and other discount brokerages.
          </p>
        </div>

        {/* Pricing Table Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-soft overflow-hidden max-w-5xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase tracking-wider">
                  <th className="py-5 px-6 font-bold text-slate-500 dark:text-slate-400 w-2/5">
                    Service / Feature
                  </th>
                  <th className="py-5 px-6 font-extrabold text-white bg-brand-700 text-center w-1/5 relative">
                    <div className="flex flex-col items-center">
                      <span className="text-sm">TradeNest</span>
                      <span className="text-[10px] font-medium bg-brand-800/80 px-2 py-0.5 rounded-full mt-1">Recommended</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-300 text-center w-1/5">
                    Other Discount
                  </th>
                  <th className="py-5 px-6 font-semibold text-slate-600 dark:text-slate-300 text-center w-1/5">
                    Traditional Brokers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={row.feature}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-brand-700 dark:text-brand-300 bg-brand-50/40 dark:bg-brand-950/20">
                      {row.tradenest}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-600 dark:text-slate-400">
                      {row.discount}
                    </td>
                    <td className="py-4 px-6 text-center text-slate-500 dark:text-slate-400">
                      {row.fullService}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
              * Statutory levies like STT, GST, Exchange turnover & stamp duty are charged as per regulatory guidelines.
            </p>
            <Link
              to="/login?role=trader"
              className="px-6 py-2.5 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all shrink-0"
            >
              Start Trading at ₹0 Brokerage
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
