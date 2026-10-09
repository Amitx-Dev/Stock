import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-indigo-500 flex items-center justify-center text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white">TradeNest</span>
            </Link>

            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              TradeNest is India's next-generation technology-driven retail trading and investment platform. Built for traders who prioritize execution speed, advanced charting, and ultra-low brokerage.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Products</h4>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-white transition-colors">Stocks & Delivery</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Futures & Options</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Direct Mutual Funds</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Initial Public Offerings (IPO)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">ETFs & Indices</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Sovereign Gold Bonds</a></li>
            </ul>
          </div>

          {/* Company & Knowledge */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#why-us" className="hover:text-white transition-colors">About TradeNest</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Brokerage & Charges</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Trading Engine Tech</a></li>
              <li><a href="#markets" className="hover:text-white transition-colors">Market Pulse & News</a></li>
              <li><Link to="/login?role=admin" className="text-brand-400 hover:text-brand-300 transition-colors">Admin Portal</Link></li>
              <li><Link to="/login?role=trader" className="text-brand-400 hover:text-brand-300 transition-colors">Trader Terminal</Link></li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Support & Help</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-white transition-colors">Help Center & FAQ</a></li>
              <li><a href="mailto:support@tradenest.fintech.in" className="hover:text-white transition-colors">support@tradenest.fintech.in</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Investor Charter</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Grievance Redressal</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Regulatory & Risk Disclaimer (Fintech Standard) */}
        <div className="pt-8 border-t border-slate-800 space-y-3 text-[11px] leading-relaxed text-slate-500">
          <p>
            <strong className="text-slate-400">Risk Disclosure on Derivatives:</strong> 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses. On an average, loss makers registered net trading loss close to ₹50,000. Over and above the net trading losses, those who incurred losses also incurred an additional 28% of net trading losses as transaction costs. Those making net trading profits also incurred between 15% to 50% of such profits as transaction costs. Source: SEBI study.
          </p>
          <p>
            <strong className="text-slate-400">Regulatory Disclaimer:</strong> TradeNest Securities Private Limited. SEBI Registration No.: INZ000000000 (NSE, BSE, MCX). CDSL Depository Participant ID: 12080000. Regd. Office: Financial District, BKC, Mumbai 400051. Investments in securities market are subject to market risks, read all the related documents carefully before investing. Brokerage will not exceed the SEBI prescribed limit.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} TradeNest Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern fintech precision & Upstox inspired aesthetics.
          </p>
        </div>

      </div>
    </footer>
  );
};
