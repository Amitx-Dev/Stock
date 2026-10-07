import React, { useState, useEffect } from 'react';
import { useTrading } from '../../context/TradingContext';
import { useMarket } from '../../context/MarketContext';
import {
  PRO_STOCKS,
  calculateCharges
} from '../../services/marketData';
import {
  Search,
  TrendingUp,
  TrendingDown,
  BarChart2,
  LineChart,
  Layers,
  Info,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  DollarSign,
  Maximize2,
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

export const TradingTerminal = () => {
  const { wallet, executeTrade, showToast } = useTrading();

  // Selected Stock
  const [selectedStock, setSelectedStock] = useState(PRO_STOCKS[0]);
  const [watchlistTab, setWatchlistTab] = useState('All');
  const [watchlistQuery, setWatchlistQuery] = useState('');

  // Chart Controls
  const [chartType, setChartType] = useState('candles'); // 'candles' or 'line'
  const [timeframe, setTimeframe] = useState('1D');
  const [showVolume, setShowVolume] = useState(true);
  const [showEma, setShowEma] = useState(true);
  const [hoveredCandle, setHoveredCandle] = useState(null);
  const [bottomTab, setBottomTab] = useState('depth'); // 'depth', 'fundamentals', 'performance'

  // Order Pad State
  const [orderAction, setOrderAction] = useState('BUY'); // 'BUY' or 'SELL'
  const [productType, setProductType] = useState('CNC'); // 'CNC' (Delivery) or 'MIS' (Intraday 5x)
  const [orderType, setOrderType] = useState('Market'); // 'Market', 'Limit', 'SL'
  const [quantity, setQuantity] = useState(10);
  const [limitPrice, setLimitPrice] = useState(PRO_STOCKS[0].currentPrice);
  const [triggerPrice, setTriggerPrice] = useState((PRO_STOCKS[0].currentPrice * 0.98).toFixed(2));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync price when stock changes
  useEffect(() => {
    setLimitPrice(selectedStock.currentPrice);
    setTriggerPrice((selectedStock.currentPrice * 0.98).toFixed(2));
  }, [selectedStock]);

  // Real margin & regulatory charges calculation (Groww style)
  const effectivePrice = orderType === 'Market' ? selectedStock.currentPrice : parseFloat(limitPrice) || selectedStock.currentPrice;
  const charges = calculateCharges(orderAction, productType, effectivePrice, quantity);
  const isBalanceSufficient = wallet.cashBalance >= charges.requiredMargin;

  // Handle Trade Execution
  const handlePlaceOrder = async () => {
    if (quantity <= 0) {
      showToast('Quantity must be greater than 0', 'error');
      return;
    }
    if (orderAction === 'BUY' && !isBalanceSufficient) {
      showToast('Insufficient margin available in wallet. Please add funds.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await executeTrade({
        stockId: selectedStock.id,
        symbol: selectedStock.symbol,
        type: orderAction,
        quantity: Number(quantity),
        pricePerShare: effectivePrice,
        product: productType,
        orderType
      });
    } catch (err) {
      // toast handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter watchlist
  const filteredWatchlist = PRO_STOCKS.filter((stock) => {
    const matchQuery =
      stock.symbol.toLowerCase().includes(watchlistQuery.toLowerCase()) ||
      stock.companyName.toLowerCase().includes(watchlistQuery.toLowerCase());
    if (watchlistTab === 'Tech') return matchQuery && stock.sector.includes('Tech');
    if (watchlistTab === 'Banking') return matchQuery && stock.sector.includes('Bank');
    if (watchlistTab === 'Auto') return matchQuery && stock.sector.includes('Auto');
    return matchQuery;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[calc(100vh-130px)] animate-in fade-in duration-150">
      {/* ======================================================== */}
      {/* 1. LEFT PANEL: WATCHLIST (Groww / Upstox Pro Watchlist) */}
      {/* ======================================================== */}
      <div className="lg:col-span-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-2xs">
        {/* Watchlist Header & Tabs */}
        <div className="p-3 border-b border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Watchlist
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {filteredWatchlist.length} Scrips
            </span>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[11px]">
            {['All', 'Banking', 'Tech', 'Auto'].map((tab) => (
              <button
                key={tab}
                onClick={() => setWatchlistTab(tab)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  watchlistTab === tab
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-200/60 dark:border-emerald-800/60'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Watchlist Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={watchlistQuery}
              onChange={(e) => setWatchlistQuery(e.target.value)}
              placeholder="Search scrip (e.g. TCS, HDFC)..."
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Watchlist Items Scrollable List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredWatchlist.map((stock) => {
            const isSelected = selectedStock.id === stock.id;
            const isGain = stock.change >= 0;

            return (
              <div
                key={stock.id}
                onClick={() => setSelectedStock(stock)}
                className={`group px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors relative ${
                  isSelected
                    ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-l-3 border-emerald-500'
                    : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                        {stock.symbol}
                      </span>
                      <span className="text-[9px] px-1 py-0.2 rounded font-mono bg-slate-100 dark:bg-slate-800 text-slate-400">
                        {stock.exchange}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                      {stock.companyName}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                      ₹{stock.currentPrice.toFixed(2)}
                    </div>
                    <div
                      className={`text-[10px] font-semibold font-mono ${
                        isGain ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isGain ? '+' : ''}
                      {stock.change.toFixed(2)} ({isGain ? '+' : ''}
                      {stock.changePercent}%)
                    </div>
                  </div>
                </div>

                {/* Instant Buy / Sell Quick Buttons on Hover (Upstox Pro feature) */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1 bg-white/95 dark:bg-slate-900/95 p-1 rounded-md shadow-xs border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStock(stock);
                      setOrderAction('BUY');
                    }}
                    className="w-6 h-6 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center justify-center transition-colors"
                    title="Quick Buy"
                  >
                    B
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStock(stock);
                      setOrderAction('SELL');
                    }}
                    className="w-6 h-6 rounded bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center justify-center transition-colors"
                    title="Quick Sell"
                  >
                    S
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CENTER PANEL: PRO CHART & MARKET DEPTH (Groww Style)  */}
      {/* ======================================================== */}
      <div className="lg:col-span-6 flex flex-col gap-3">
        {/* Scrip Header Bar */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {selectedStock.symbol}
                </h1>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                  {selectedStock.exchange}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {selectedStock.companyName}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                Sector: {selectedStock.sector} • Lot Size: {selectedStock.lotSize}
              </div>
            </div>

            <div className="flex items-baseline gap-3 text-right">
              <div>
                <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                  ₹{selectedStock.currentPrice.toFixed(2)}
                </div>
                <div
                  className={`text-xs font-bold font-mono ${
                    selectedStock.change >= 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {selectedStock.change >= 0 ? '+' : ''}
                  {selectedStock.change.toFixed(2)} ({selectedStock.change >= 0 ? '+' : ''}
                  {selectedStock.changePercent}%)
                </div>
              </div>
            </div>
          </div>

          {/* Day & 52-Week Range Meters (Groww staple) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px]">
            <div>
              <div className="flex justify-between text-slate-400 text-[10px] mb-1">
                <span>Today's Low: <strong>₹{selectedStock.dayLow.toFixed(2)}</strong></span>
                <span>Today's High: <strong>₹{selectedStock.dayHigh.toFixed(2)}</strong></span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        ((selectedStock.currentPrice - selectedStock.dayLow) /
                          (selectedStock.dayHigh - selectedStock.dayLow)) *
                          100
                      )
                    )}%`
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-400 text-[10px] mb-1">
                <span>52W Low: <strong>₹{selectedStock.fiftyTwoWeekLow.toFixed(2)}</strong></span>
                <span>52W High: <strong>₹{selectedStock.fiftyTwoWeekHigh.toFixed(2)}</strong></span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        ((selectedStock.currentPrice - selectedStock.fiftyTwoWeekLow) /
                          (selectedStock.fiftyTwoWeekHigh - selectedStock.fiftyTwoWeekLow)) *
                          100
                      )
                    )}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pro Interactive Chart Canvas */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs space-y-3">
          {/* Chart Header Bar: Timeframes & Type switchers */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
            {/* Timeframe Buttons */}
            <div className="flex items-center gap-1">
              {['1m', '5m', '15m', '1D', '1W', '1M', '1Y'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    timeframe === tf
                      ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Chart Style Switcher */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <button
                onClick={() => setChartType('candles')}
                className={`p-1.5 rounded transition-colors ${
                  chartType === 'candles'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                    : 'hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Candlestick Chart"
              >
                <BarChart2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`p-1.5 rounded transition-colors ${
                  chartType === 'line'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                    : 'hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Line Chart"
              >
                <LineChart className="w-3.5 h-3.5" />
              </button>

              <span className="h-3 w-px bg-slate-200 dark:border-slate-800" />

              <button
                onClick={() => setShowEma(!showEma)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                  showEma
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-400'
                }`}
              >
                EMA 20/50
              </button>
            </div>
          </div>

          {/* Hovered Candle OHLC Banner */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 bg-slate-50 dark:bg-slate-900/60 px-2.5 py-1 rounded-lg">
            <span>
              O: <strong className="text-slate-800 dark:text-slate-200">{hoveredCandle ? hoveredCandle.open.toFixed(2) : selectedStock.dayOpen.toFixed(2)}</strong>
            </span>
            <span>
              H: <strong className="text-slate-800 dark:text-slate-200">{hoveredCandle ? hoveredCandle.high.toFixed(2) : selectedStock.dayHigh.toFixed(2)}</strong>
            </span>
            <span>
              L: <strong className="text-slate-800 dark:text-slate-200">{hoveredCandle ? hoveredCandle.low.toFixed(2) : selectedStock.dayLow.toFixed(2)}</strong>
            </span>
            <span>
              C: <strong className="text-slate-800 dark:text-slate-200">{hoveredCandle ? hoveredCandle.close.toFixed(2) : selectedStock.currentPrice.toFixed(2)}</strong>
            </span>
            <span className="hidden sm:inline">
              Vol: <strong className="text-slate-800 dark:text-slate-200">{hoveredCandle ? (hoveredCandle.volume / 1000).toFixed(0) + 'K' : selectedStock.volumeFormatted}</strong>
            </span>
          </div>

          {/* SVG Chart Rendering */}
          <div className="relative h-56 sm:h-64 w-full">
            <svg viewBox="0 0 600 240" className="w-full h-full select-none overflow-visible">
              <defs>
                <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="50" x2="580" y2="50" stroke="currentColor" className="text-slate-100 dark:text-slate-800/60" strokeDasharray="3 3" />
              <line x1="20" y1="110" x2="580" y2="110" stroke="currentColor" className="text-slate-100 dark:text-slate-800/60" strokeDasharray="3 3" />
              <line x1="20" y1="170" x2="580" y2="170" stroke="currentColor" className="text-slate-100 dark:text-slate-800/60" strokeDasharray="3 3" />

              {/* Candlestick Visualization */}
              {chartType === 'candles' ? (
                selectedStock.candles.map((candle, idx) => {
                  const x = 50 + idx * 75;
                  const minPrice = selectedStock.dayLow * 0.995;
                  const maxPrice = selectedStock.dayHigh * 1.005;
                  const scaleY = (p) => 180 - ((p - minPrice) / (maxPrice - minPrice)) * 140;

                  const yHigh = scaleY(candle.high);
                  const yLow = scaleY(candle.low);
                  const yOpen = scaleY(candle.open);
                  const yClose = scaleY(candle.close);
                  const isGreen = candle.close >= candle.open;
                  const candleTop = Math.min(yOpen, yClose);
                  const candleHeight = Math.max(3, Math.abs(yClose - yOpen));

                  return (
                    <g
                      key={candle.time}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredCandle(candle)}
                      onMouseLeave={() => setHoveredCandle(null)}
                    >
                      {/* Wick Line */}
                      <line
                        x1={x}
                        y1={yHigh}
                        x2={x}
                        y2={yLow}
                        stroke={isGreen ? '#10B981' : '#EF4444'}
                        strokeWidth="1.5"
                      />
                      {/* Body Rect */}
                      <rect
                        x={x - 12}
                        y={candleTop}
                        width="24"
                        height={candleHeight}
                        fill={isGreen ? '#10B981' : '#EF4444'}
                        rx="1"
                      />
                      {/* Volume Bar underneath */}
                      <rect
                        x={x - 10}
                        y={230 - (candle.volume / 3500000) * 40}
                        width="20"
                        height={(candle.volume / 3500000) * 40}
                        fill={isGreen ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)'}
                      />
                      {/* Time text */}
                      <text x={x} y="238" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                        {candle.time}
                      </text>
                    </g>
                  );
                })
              ) : (
                /* Line chart fallback */
                <path
                  d={`M 50 140 Q 150 90, 250 120 T 400 80 T 550 70`}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Bottom Tabbed Analytics: Market Depth & Fundamentals */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 text-xs font-bold">
            <button
              onClick={() => setBottomTab('depth')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                bottomTab === 'depth'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Market Depth (Level 2)
            </button>
            <button
              onClick={() => setBottomTab('fundamentals')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                bottomTab === 'fundamentals'
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              Key Fundamentals
            </button>
          </div>

          {/* Level 2 Market Depth (5 Bid vs 5 Ask) */}
          {bottomTab === 'depth' && (
            <div className="space-y-2 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                {/* BID SIDE */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 pb-1 font-bold">
                    <span>BID PRICE</span>
                    <span>ORDERS</span>
                    <span>QTY</span>
                  </div>
                  <div className="space-y-1">
                    {selectedStock.depth.bids.map((b, i) => (
                      <div key={i} className="flex justify-between relative py-0.5 px-1 rounded overflow-hidden">
                        <div
                          className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 pointer-events-none"
                          style={{ width: `${(b.qty / 50000) * 100}%` }}
                        />
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          ₹{b.price.toFixed(2)}
                        </span>
                        <span className="text-slate-400 text-[11px]">{b.orders}</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {b.qty.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 pt-1 flex justify-between border-t border-slate-100 dark:border-slate-800 mt-1">
                    <span>Total Bid Quantity</span>
                    <span className="text-emerald-600 font-bold">{selectedStock.depth.buyTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* ASK SIDE */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 pb-1 font-bold">
                    <span>ASK PRICE</span>
                    <span>ORDERS</span>
                    <span>QTY</span>
                  </div>
                  <div className="space-y-1">
                    {selectedStock.depth.asks.map((a, i) => (
                      <div key={i} className="flex justify-between relative py-0.5 px-1 rounded overflow-hidden">
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-rose-500/10 pointer-events-none"
                          style={{ width: `${(a.qty / 50000) * 100}%` }}
                        />
                        <span className="font-bold text-rose-600 dark:text-rose-400">
                          ₹{a.price.toFixed(2)}
                        </span>
                        <span className="text-slate-400 text-[11px]">{a.orders}</span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          {a.qty.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 pt-1 flex justify-between border-t border-slate-100 dark:border-slate-800 mt-1">
                    <span>Total Ask Quantity</span>
                    <span className="text-rose-600 font-bold">{selectedStock.depth.sellTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fundamentals Tab */}
          {bottomTab === 'fundamentals' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">Market Cap</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedStock.marketCap}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">P/E Ratio</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedStock.peRatio}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">P/B Ratio</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedStock.pbRatio}</div>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">Div. Yield</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{selectedStock.dividendYield}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. RIGHT PANEL: PRO ORDER PAD (Groww / Upstox Order Window)*/}
      {/* ======================================================== */}
      <div className="lg:col-span-3 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between shadow-2xs space-y-4">
        <div className="space-y-4">
          {/* BUY / SELL Switch */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold">
            <button
              onClick={() => setOrderAction('BUY')}
              className={`py-2 rounded-lg transition-all ${
                orderAction === 'BUY'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => setOrderAction('SELL')}
              className={`py-2 rounded-lg transition-all ${
                orderAction === 'SELL'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              SELL
            </button>
          </div>

          {/* Product Type (Delivery vs Intraday MIS with 5x leverage) */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Product Type
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setProductType('CNC')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  productType === 'CNC'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div>Delivery (CNC)</div>
                <div className="text-[10px] text-slate-400 font-normal">Long term investment</div>
              </button>

              <button
                onClick={() => setProductType('MIS')}
                className={`p-2 rounded-xl border text-left transition-all ${
                  productType === 'MIS'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Intraday (MIS)</span>
                  <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-bold">5x</span>
                </div>
                <div className="text-[10px] text-slate-400 font-normal">Auto square-off</div>
              </button>
            </div>
          </div>

          {/* Order Type: Market vs Limit */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Order Type
            </label>
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-semibold">
              {['Market', 'Limit', 'SL'].map((ot) => (
                <button
                  key={ot}
                  onClick={() => setOrderType(ot)}
                  className={`flex-1 py-1 rounded-md text-center transition-all ${
                    orderType === ot
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {ot}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1 font-semibold text-slate-700 dark:text-slate-300">
              <span>Quantity (Shares)</span>
              <span className="text-[10px] text-slate-400 font-mono">Lot: 1</span>
            </div>
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 5))}
                className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center bg-transparent text-sm font-bold font-mono text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 5)}
                className="p-2.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Quantity Chips */}
            <div className="flex items-center gap-1.5 mt-1.5 text-[10px]">
              {[10, 25, 50, 100].map((q) => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={`px-2 py-0.5 rounded border ${
                    quantity === q
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold'
                      : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:border-slate-400'
                  }`}
                >
                  +{q}
                </button>
              ))}
            </div>
          </div>

          {/* Limit Price Input (if not Market) */}
          {orderType !== 'Market' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Limit Price (₹)
              </label>
              <input
                type="number"
                step="0.05"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {/* Trigger Price for SL orders */}
          {orderType === 'SL' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Stop-Loss Trigger Price (₹)
              </label>
              <input
                type="number"
                step="0.05"
                value={triggerPrice}
                onChange={(e) => setTriggerPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}
        </div>

        {/* Financial Summary & Order Action Button */}
        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="space-y-1 text-[11px] font-mono">
            <div className="flex justify-between text-slate-500">
              <span>Order Value:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ₹{charges.turnover.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Brokerage & Taxes:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                ₹{charges.totalCharges.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-1 border-t border-dashed border-slate-200 dark:border-slate-700">
              <span>Margin Required:</span>
              <span className={isBalanceSufficient ? 'text-emerald-600' : 'text-rose-600'}>
                ₹{charges.requiredMargin.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Available Margin:</span>
              <span>₹{wallet.cashBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 ${
              orderAction === 'BUY'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/25'
            }`}
          >
            {isSubmitting ? (
              <span>Executing Order...</span>
            ) : (
              <span>
                {orderAction} {selectedStock.symbol}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
