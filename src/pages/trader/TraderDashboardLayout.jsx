import React, { useState } from 'react';
import { GrowwHeader } from '../../components/groww/GrowwHeader';
import { TradingTerminal } from './../groww/TradingTerminal';
import { ExploreMarketPage } from './../groww/ExploreMarketPage';
import { HoldingsPortfolioPage } from './../groww/HoldingsPortfolioPage';
import { OrdersPage } from './../groww/OrdersPage';
import { OptionChainPage } from './../groww/OptionChainPage';
import { FundsPage } from './../groww/FundsPage';
import { GrowwSearchModal } from '../../components/groww/GrowwSearchModal';
import { OrderModal } from '../../components/groww/OrderModal';
import { ToastContainer } from '../../components/common/Toast';
import { PRO_STOCKS } from '../../services/marketData';

export const TraderDashboardLayout = () => {
  // Default to 'terminal' for instant Pro Trading Terminal view!
  const [activeTab, setActiveTab] = useState('terminal');
  const [searchOpen, setSearchOpen] = useState(false);
  const [orderModalStock, setOrderModalStock] = useState(null);
  const [orderModalType, setOrderModalType] = useState('BUY');

  // Global search trigger
  window.openGrowwSearch = () => setSearchOpen(true);

  const handleSelectStock = (stock) => {
    setActiveTab('terminal');
  };

  const handleOpenTrade = (stock, type = 'BUY') => {
    setOrderModalStock(stock);
    setOrderModalType(type);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] dark:bg-[#0B0F17] flex flex-col transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Groww / Upstox Top Navigation Header */}
      <GrowwHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAddMoney={() => setActiveTab('funds')}
      />

      {/* Main Content Area */}
      <main className="flex-1 p-3 sm:p-5 max-w-7xl mx-auto w-full transition-all">
        {activeTab === 'explore' && (
          <ExploreMarketPage
            onSelectStock={handleSelectStock}
            onTradeStock={handleOpenTrade}
          />
        )}

        {activeTab === 'terminal' && (
          <TradingTerminal />
        )}

        {activeTab === 'holdings' && (
          <HoldingsPortfolioPage
            onSelectStock={handleSelectStock}
            onTradeStock={handleOpenTrade}
          />
        )}

        {activeTab === 'positions' && (
          <HoldingsPortfolioPage
            onSelectStock={handleSelectStock}
            onTradeStock={handleOpenTrade}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersPage />
        )}

        {activeTab === 'option-chain' && (
          <OptionChainPage onTradeOption={handleOpenTrade} />
        )}

        {activeTab === 'funds' && (
          <FundsPage />
        )}
      </main>

      {/* Global Interactive Modals */}
      <GrowwSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectStock={handleSelectStock}
        onTradeStock={handleOpenTrade}
      />

      {orderModalStock && (
        <OrderModal
          isOpen={!!orderModalStock}
          onClose={() => setOrderModalStock(null)}
          stock={orderModalStock}
          initialType={orderModalType}
        />
      )}

      <ToastContainer />
    </div>
  );
};
