import React, { useState } from 'react';
import { useTrading } from '../../context/TradingContext';
import { useMarket } from '../../context/MarketContext';
import { StatCard } from '../../components/common/StatCard';
import { PortfolioTable } from '../../components/trader/PortfolioTable';
import { HoldingsPieChart } from '../../components/trader/HoldingsPieChart';
import { TradeModal } from '../../components/trader/TradeModal';
import { DollarSign, TrendingUp, PieChart as PieIcon, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const PortfolioPage = ({ onExploreStocks }) => {
  const { portfolio, portfolioSummary, wallet } = useTrading();
  const { stocks } = useMarket();
  const [selectedTrade, setSelectedTrade] = useState(null);

  const { totalInvested, currentValue, totalProfitLoss, totalProfitLossPercent } = portfolioSummary;
  const isProfit = totalProfitLoss >= 0;

  const handleTradeAction = (holdingItem, type) => {
    const stock = stocks.find(s => s.id === holdingItem.stockId || s.symbol === holdingItem.symbol);
    if (stock) {
      setSelectedTrade({ stock, type });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Portfolio Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Invested"
          value={`$${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subValue="Principal Capital"
          icon={DollarSign}
        />
        <StatCard
          title="Current Valuation"
          value={`$${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subValue="Live Market Value"
          icon={TrendingUp}
        />
        <StatCard
          title="Total Returns (P/L)"
          value={`${isProfit ? '+' : ''}$${totalProfitLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          trend={`${isProfit ? '+' : ''}${totalProfitLossPercent.toFixed(2)}%`}
          isPositive={isProfit}
          icon={PieIcon}
        />
        <StatCard
          title="Liquid Cash Balance"
          value={`$${wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          subValue="Ready to Deploy"
          icon={Wallet}
        />
      </div>

      {/* Asset Allocation Chart & Diversification */}
      <HoldingsPieChart holdings={portfolio} />

      {/* Portfolio Holdings Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Stock Holdings Breakdown
            </h3>
            <span className="text-xs text-slate-400">
              Live updates linked with simulated market tick feed
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {portfolio.length} Positions Active
          </span>
        </div>

        <PortfolioTable
          holdings={portfolio}
          onTradeAction={handleTradeAction}
          onExploreClick={onExploreStocks}
        />
      </div>

      {/* Trade Modal */}
      {selectedTrade && (
        <TradeModal
          isOpen={!!selectedTrade}
          onClose={() => setSelectedTrade(null)}
          stock={selectedTrade.stock}
          initialType={selectedTrade.type}
        />
      )}
    </div>
  );
};
