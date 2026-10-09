import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from 'lucide-react';

export const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: 'Dr. Arjun Rampal',
      role: 'Full-time Derivatives Trader',
      city: 'Mumbai',
      avatar: 'AR',
      rating: 5,
      content: 'TradeNest has hands down the fastest order execution speed in India. During volatile expiry sessions, orders fill in 1ms without lag. The TradingView integration is sheer perfection.'
    },
    {
      id: 2,
      name: 'Meera Chawla',
      role: 'Long-term Equity Investor',
      city: 'Bengaluru',
      avatar: 'MC',
      rating: 5,
      content: 'Zero brokerage on equity delivery along with direct mutual funds saved me over ₹45,000 in transaction costs this year alone. Clean UI and effortless portfolio rebalancing!'
    },
    {
      id: 3,
      name: 'Rishabh Sethi',
      role: 'Algo Trader & Quant',
      city: 'Delhi NCR',
      avatar: 'RS',
      rating: 5,
      content: 'The security features like strict 2FA, biometric authorization, and clean API responsiveness gave me total confidence in deploying larger capital. Truly the gold standard.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? reviews.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === reviews.length - 1 ? 0 : c + 1));
  };

  const current = reviews[currentIndex];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Loved by traders across India.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
            Read authentic experiences from both active retail day traders and disciplined wealth creators.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-soft p-8 sm:p-12 relative">
          <Quote className="w-12 h-12 text-brand-200 dark:text-brand-900/40 absolute top-6 right-8 pointer-events-none" />

          {/* Stars */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          {/* Review text */}
          <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-medium mb-8">
            "{current.content}"
          </p>

          {/* User info & Navigation buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-700 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-brand-700/20">
                {current.avatar}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {current.name}
                  </h4>
                  <ShieldCheck className="w-4 h-4 text-trade-green" />
                </div>
                <p className="text-xs text-slate-400">
                  {current.role} • {current.city}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-slate-400 px-1">
                {currentIndex + 1} / {reviews.length}
              </span>
              <button
                onClick={next}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
