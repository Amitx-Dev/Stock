import React, { useState } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useTrading } from '../../context/TradingContext';
import { StockCard } from '../../components/trader/StockCard';
import { TradeModal } from '../../components/trader/TradeModal';
import { DepositModal } from '../../components/trader/DepositModal';
import { Sparkline } from '../../components/common/Sparkline';
import {
  Search,
  LayoutGrid,
  List,
  Wallet,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  Star
} from 'lucide-react';

export const StockTradingPage = () => {
  const { stocks, loading, watchlist, toggleWatchlist, priceTicks } = useMarket();
  const { wallet } = useTrading();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [activeTradeStock, setActiveTradeStock] = useState(null);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Extract unique sectors
  const sectors = ['ALL', ...new Set(stocks.map(s => s.sector))];

  const filteredStocks = stocks.filter(s => {
    const matchesSearch =
      s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || s.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      {/* Top Wallet Cash Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-slate-400">
            Simulated Trading Account
          </span>
          <div className="flex items-baseline gap-3 mt-1">
            <span className="text-3xl font-black text-white">
              ${wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded-full">
              Instant Buying Power
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero brokerage fees on equity orders. Real-time market execution.
          </p>
        </div>

        <button
          onClick={() => setShowDepositModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Deposit Cash</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="fintech-card p-4 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by stock ticker or company name..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-end md:self-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                selectedSector === sec
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {sec === 'ALL' ? 'All Equities' : sec}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Catalog */}
      {filteredStocks.length === 0 ? (
        <div className="fintech-card p-12 text-center text-slate-500 text-xs">
          No stocks found matching your search.
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.id}
              stock={stock}
              onTradeClick={(s) => setActiveTradeStock(s)}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="fintech-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Watch</th>
                  <th className="py-3.5 px-4">Symbol / Company</th>
                  <th className="py-3.5 px-4 text-right">Price</th>
                  <th className="py-3.5 px-4 text-right">Today's %</th>
                  <th className="py-3.5 px-4 text-right">24h Range</th>
                  <th className="py-3.5 px-4 text-center">Trend</th>
                  <th className="py-3.5 px-4 text-right">Volume</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {filteredStocks.map((stock) => {
                  const isPositive = stock.changePercent >= 0;
                  const isWatch = watchlist.includes(stock.symbol);
                  const tick = priceTicks[stock.id];

                  return (
                    <tr
                      key={stock.id}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        tick === 'gain' ? 'bg-emerald-950/20' : tick === 'loss' ? 'bg-rose-950/20' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleWatchlist(stock.symbol)}
                          className={isWatch ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm">{stock.symbol}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{stock.companyName}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white text-sm">
                        ${stock.currentPrice.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold">
                        <span className={`inline-flex items-center ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {isPositive ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400 text-[11px]">
                        ${stock.dayLow.toFixed(1)} - ${stock.dayHigh.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <Sparkline data={stock.sparkline} isPositive={isPositive} width={80} height={28} />
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-slate-400">
                        {(stock.volume / 1000000).toFixed(1)}M
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setActiveTradeStock(stock)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          Trade
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trade Modal */}
      {activeTradeStock && (
        <TradeModal
          isOpen={!!activeTradeStock}
          onClose={() => setActiveTradeStock(null)}
          stock={activeTradeStock}
          initialType="BUY"
        />
      )}

      {/* Deposit Cash Modal */}
      {showDepositModal && (
        <DepositModal
          isOpen={showDepositModal}
          onClose={() => setShowDepositModal(false)}
        />
      )}
    </div>
  );
};
