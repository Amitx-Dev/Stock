import React, { useState } from 'react';
import { mockStocks } from '../../data/mockStocks';
import { api } from '../../services/api';
import { ChartCard } from '../../components/common/ChartCard';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ChevronDown
} from 'lucide-react';

export const StockTradingPage = () => {
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]); // RELIANCE default
  const [orderSide, setOrderSide] = useState('BUY'); // 'BUY' or 'SELL'
  const [orderType, setOrderType] = useState('MARKET'); // 'MARKET' or 'LIMIT'
  const [quantity, setQuantity] = useState(10);
  const [limitPrice, setLimitPrice] = useState(selectedStock.price);
  const [chartInterval, setChartInterval] = useState('1D');

  // Confirmation Modal
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { showToast } = useToast();
  const { isDark } = useTheme();

  // Sync limit price when selected stock changes
  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setLimitPrice(stock.price);
  };

  const executedPrice = orderType === 'MARKET' ? selectedStock.price : Number(limitPrice);
  const estimatedTotal = (executedPrice * (Number(quantity) || 0)).toFixed(2);
  const brokerage = 20.00;
  const netEstimated = (Number(estimatedTotal) + (orderSide === 'BUY' ? brokerage : -brokerage)).toFixed(2);

  const handleOpenConfirm = (e) => {
    e.preventDefault();
    if (!quantity || quantity <= 0) {
      showToast('Please enter a valid order quantity', 'error');
      return;
    }
    if (orderType === 'LIMIT' && (!limitPrice || limitPrice <= 0)) {
      showToast('Please specify a valid limit price', 'error');
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleExecuteTrade = () => {
    setIsSubmitting(true);
    api.createTrade({
      stock: selectedStock.symbol,
      type: orderSide,
      qty: quantity,
      price: executedPrice
    });
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmOpen(false);
      showToast('Trade executed successfully', 'success');
    }, 600);
  };

  const gridColor = isDark ? '#334155' : '#f1f5f9';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipStyle = {
    backgroundColor: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#1e293b' : '#e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 20px -2px rgba(0,0,0,0.15)',
    color: isDark ? '#f8fafc' : '#0f172a',
    fontSize: '12px'
  };

  return (
    <div className="space-y-6">
      
      {/* Top Stock Bar & Search */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Stock Select Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select
                value={selectedStock.symbol}
                onChange={(e) => {
                  const s = mockStocks.find((stk) => stk.symbol === e.target.value);
                  if (s) handleStockSelect(s);
                }}
                className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 cursor-pointer"
              >
                {mockStocks.map((s) => (
                  <option key={s.symbol} value={s.symbol}>
                    {s.symbol} - {s.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <Badge variant="brand" size="sm">NSE Equity</Badge>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Sector: {selectedStock.sector}
            </span>
          </div>

          {/* Live Price & Day Range */}
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">LTP (Real-Time)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                  ₹{selectedStock.price.toFixed(2)}
                </span>
                <span
                  className={`text-xs font-bold flex items-center ${
                    selectedStock.change >= 0 ? 'text-trade-green' : 'text-trade-red'
                  }`}
                >
                  {selectedStock.change >= 0 ? (
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  {selectedStock.change >= 0 ? '+' : ''}
                  ₹{selectedStock.change.toFixed(2)} ({selectedStock.changePercent}%)
                </span>
              </div>
            </div>

            <div className="hidden sm:block border-l border-slate-200 dark:border-slate-800 pl-6 space-y-1 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400">Day High:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  ₹{selectedStock.dayHigh.toFixed(2)}
                </span>
                <span className="text-slate-400 ml-2">Day Low:</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  ₹{selectedStock.dayLow.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>Volume: <strong className="text-slate-600 dark:text-slate-300 font-mono">{selectedStock.volume}</strong></span>
                <span>•</span>
                <span>Mkt Cap: <strong className="text-slate-600 dark:text-slate-300">{selectedStock.marketCap}</strong></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Grid: Chart & Order Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Chart & Market Depth */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Chart Card */}
          <ChartCard
            title={`${selectedStock.symbol} Intraday & Trend Chart`}
            subtitle="TradingView sub-second continuous feed"
            actions={
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {['1D', '1W', '1M', '1Y'].map((intvl) => (
                  <button
                    key={intvl}
                    onClick={() => setChartInterval(intvl)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      chartInterval === intvl
                        ? 'bg-brand-700 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {intvl}
                  </button>
                ))}
              </div>
            }
          >
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedStock.chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="stockAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selectedStock.change >= 0 ? '#00b386' : '#eb5b3c'} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={selectedStock.change >= 0 ? '#00b386' : '#eb5b3c'} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                  <XAxis dataKey="time" stroke={textColor} fontSize={11} tickLine={false} />
                  <YAxis
                    stroke={textColor}
                    fontSize={11}
                    tickLine={false}
                    domain={['dataMin - 10', 'dataMax + 10']}
                  />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`₹${v}`, 'Price']} />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={selectedStock.change >= 0 ? '#00b386' : '#eb5b3c'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#stockAreaGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Market Depth / Order Book Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-600" />
                <span>Level-2 Market Depth (Order Book)</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Live Best 5 Bids & Asks</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Bids Table (Buyers - Green) */}
              <div>
                <p className="text-xs font-bold text-trade-green mb-2 flex justify-between">
                  <span>BIDS (BUY)</span>
                  <span className="text-[11px] font-normal text-slate-400">Total Qty: 21,790</span>
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead className="text-[10px] text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="py-1 text-left">Orders</th>
                        <th className="py-1 text-right">Qty</th>
                        <th className="py-1 text-right text-trade-green">Bid Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedStock.depth.bids.map((b, idx) => (
                        <tr key={idx} className="hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20">
                          <td className="py-1.5 text-slate-400">{b.orders}</td>
                          <td className="py-1.5 text-right font-medium">{b.qty.toLocaleString()}</td>
                          <td className="py-1.5 text-right font-bold text-trade-green">₹{b.price.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Asks Table (Sellers - Red) */}
              <div>
                <p className="text-xs font-bold text-trade-red mb-2 flex justify-between">
                  <span>ASKS (SELL)</span>
                  <span className="text-[11px] font-normal text-slate-400">Total Qty: 24,080</span>
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead className="text-[10px] text-slate-400 border-b border-slate-100 dark:border-slate-800">
                      <tr>
                        <th className="py-1 text-left text-trade-red">Ask Price</th>
                        <th className="py-1 text-right">Qty</th>
                        <th className="py-1 text-right">Orders</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {selectedStock.depth.asks.map((a, idx) => (
                        <tr key={idx} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20">
                          <td className="py-1.5 text-left font-bold text-trade-red">₹{a.price.toFixed(2)}</td>
                          <td className="py-1.5 text-right font-medium">{a.qty.toLocaleString()}</td>
                          <td className="py-1.5 text-right text-slate-400">{a.orders}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Order Placement Form */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-soft sticky top-20">
            
            <form onSubmit={handleOpenConfirm} className="space-y-5">
              
              {/* Order Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Order Ticket
                </span>
                <span className="text-xs font-bold text-brand-700 dark:text-brand-300">
                  {selectedStock.symbol}
                </span>
              </div>

              {/* Buy / Sell Toggle Pill */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setOrderSide('BUY')}
                  className={`py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                    orderSide === 'BUY'
                      ? 'bg-trade-green text-white shadow-md shadow-emerald-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  BUY
                </button>
                <button
                  type="button"
                  onClick={() => setOrderSide('SELL')}
                  className={`py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                    orderSide === 'SELL'
                      ? 'bg-trade-red text-white shadow-md shadow-rose-500/25'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  SELL
                </button>
              </div>

              {/* Order Type Toggle: Market vs Limit */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('MARKET')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      orderType === 'MARKET'
                        ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Market
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('LIMIT')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      orderType === 'LIMIT'
                        ? 'border-brand-500 bg-brand-50/70 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              {/* Quantity Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Quantity (Shares)
                  </label>
                  <span className="text-[11px] text-slate-400">Lot size: 1</span>
                </div>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 text-sm font-bold font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Limit Price Input (Only for Limit orders) */}
              {orderType === 'LIMIT' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Limit Price (₹)
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">
                      LTP: ₹{selectedStock.price.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="number"
                    step="0.05"
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-bold font-mono rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              )}

              {/* Calculation Summary Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs space-y-2 font-mono">
                <div className="flex justify-between text-slate-500">
                  <span>Gross Value:</span>
                  <span className="text-slate-800 dark:text-slate-200">₹{Number(estimatedTotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Flat Brokerage:</span>
                  <span className="text-trade-green font-bold">₹{brokerage.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm">
                  <span className="text-slate-900 dark:text-white">Estimated Total:</span>
                  <span className="text-brand-700 dark:text-brand-300 font-black">
                    ₹{Number(netEstimated).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl text-white font-extrabold text-sm shadow-md transition-all active:scale-95 ${
                  orderSide === 'BUY'
                    ? 'bg-trade-green hover:bg-emerald-600 shadow-emerald-500/25'
                    : 'bg-trade-red hover:bg-rose-600 shadow-rose-500/25'
                }`}
              >
                Place {orderSide} Order
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Instant routing to NSE matching engine.
              </p>

            </form>
          </div>
        </div>

      </div>

      {/* Order Confirmation Modal */}
      <Modal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Order Execution"
        maxWidth="max-w-md"
        description="Review transaction terms before sending to exchange"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="font-bold text-sm text-slate-900 dark:text-white font-sans">{selectedStock.name}</span>
              <Badge variant={orderSide === 'BUY' ? 'buy' : 'sell'} size="sm">{orderSide}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Exchange / Symbol:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">NSE : {selectedStock.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Order Style:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{orderType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Order Quantity:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{quantity} Shares</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Execution Price:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">₹{executedPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Brokerage Fee:</span>
              <span className="text-trade-green font-bold">₹{brokerage.toFixed(2)} Flat</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-bold">
              <span className="text-slate-900 dark:text-white">Required Margin:</span>
              <span className="text-brand-700 dark:text-brand-300 font-black">₹{Number(netEstimated).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsConfirmOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleExecuteTrade}
              disabled={isSubmitting}
              className={`px-5 py-2 text-xs font-bold text-white rounded-xl shadow-sm transition-all flex items-center gap-1.5 ${
                orderSide === 'BUY' ? 'bg-trade-green hover:bg-emerald-600' : 'bg-trade-red hover:bg-rose-600'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Confirm & Place Order</span>
              )}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
