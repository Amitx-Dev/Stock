import React from 'react';

export const TopTradedBarChart = () => {
  const topStocks = [
    { symbol: 'NVDA', company: 'NVIDIA Corp.', volumeM: 92.1, color: '#10b981', trades: 1420 },
    { symbol: 'TSLA', company: 'Tesla Inc.', volumeM: 65.1, color: '#06b6d4', trades: 1105 },
    { symbol: 'AAPL', company: 'Apple Inc.', volumeM: 48.3, color: '#3b82f6', trades: 890 },
    { symbol: 'AMZN', company: 'Amazon.com', volumeM: 31.5, color: '#8b5cf6', trades: 640 },
    { symbol: 'MSFT', company: 'Microsoft', volumeM: 21.9, color: '#f59e0b', trades: 430 }
  ];

  const maxVolume = 100;

  return (
    <div className="fintech-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Most Traded Equities by Volume
          </h4>
          <span className="text-[11px] text-slate-500">Ranking of top equities traded on platform today</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
          Top 5
        </span>
      </div>

      <div className="space-y-3.5">
        {topStocks.map((item) => {
          const widthPercent = (item.volumeM / maxVolume) * 100;

          return (
            <div key={item.symbol} className="group">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white">{item.symbol}</span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">{item.company}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400 text-[11px]">{item.trades} orders</span>
                  <span className="font-bold text-white">{item.volumeM}M shares</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500 group-hover:brightness-125"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
