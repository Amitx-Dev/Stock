import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion = () => {
  const faqs = [
    {
      q: 'How long does it take to open a free demat account with TradeNest?',
      a: 'Opening an account takes less than 5 minutes. All you need is your Aadhaar-linked mobile number, PAN card, and a bank account statement for e-KYC. Your account is typically activated on the same business day.'
    },
    {
      q: 'Are there any hidden charges on Equity Delivery or Mutual Funds?',
      a: 'None whatsoever. TradeNest offers 100% ₹0 brokerage on all Equity Delivery investments and direct mutual fund SIPs forever. Only mandatory regulatory and statutory charges (STT, GST, Stamp Duty) are passed through at actuals.'
    },
    {
      q: 'What is the brokerage for Intraday and F&O (Futures & Options)?',
      a: 'We charge a flat ₹20 or 0.05% (whichever is lower) per executed order across all Equity Intraday, Currency, and Commodity derivatives.'
    },
    {
      q: 'Can I transfer existing shares from other brokerages to TradeNest?',
      a: 'Yes! You can transfer your existing holdings seamlessly via CDSL Easiest or offline DIS slips. Our dedicated onboarding concierge team will assist you throughout the process.'
    },
    {
      q: 'How secure is my money and stock holdings?',
      a: 'Your shares are held securely in your own depository participant (DP) account with CDSL/NSDL, not with TradeNest. Even in the unlikely event of broker insolvency, your assets remain 100% safe in your name.'
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950 px-3 py-1 rounded-full border border-brand-200 dark:border-brand-800">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm">
            Everything you need to know about our trading accounts, costs, and policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-brand-700 dark:hover:text-brand-300"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
