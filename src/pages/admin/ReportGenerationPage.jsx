import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { FileText, Download, Printer, CheckCircle, RefreshCw, BarChart } from 'lucide-react';

export const ReportGenerationPage = () => {
  const [reportType, setReportType] = useState('daily_summary');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (type) => {
    setLoading(true);
    setReportType(type);
    try {
      const data = await api.generateReport(type);
      setReportData(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport('daily_summary');
  }, []);

  const exportCSV = () => {
    if (!reportData || !reportData.data) return;
    const sample = reportData.data[0];
    const keys = Object.keys(sample);
    const headers = keys.join(',');
    const rows = reportData.data.map(obj => keys.map(k => `"${obj[k] !== undefined ? obj[k] : ''}"`).join(','));
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${reportType}_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-white">Financial & Compliance Reports</h2>
          <p className="text-xs text-slate-400">
            Generate standardized audit summaries, participant activity reports, and fee turnover reconciliations.
          </p>
        </div>

        {/* Action Buttons for Export */}
        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            disabled={!reportData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-cyan-600/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Report Type Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => fetchReport('daily_summary')}
          className={`p-4 rounded-xl border text-left transition-all ${
            reportType === 'daily_summary'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <div className="font-extrabold text-sm mb-1 text-white">Daily Trading Summary</div>
          <div className="text-[11px] text-slate-400">Overall order volume, top active equities, and trade count.</div>
        </button>

        <button
          onClick={() => fetchReport('user_activity')}
          className={`p-4 rounded-xl border text-left transition-all ${
            reportType === 'user_activity'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <div className="font-extrabold text-sm mb-1 text-white">User Activity & Compliance</div>
          <div className="text-[11px] text-slate-400">Registered trader states, active accounts, and administrative logs.</div>
        </button>

        <button
          onClick={() => fetchReport('revenue')}
          className={`p-4 rounded-xl border text-left transition-all ${
            reportType === 'revenue'
              ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/40'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <div className="font-extrabold text-sm mb-1 text-white">Platform Brokerage & Revenue</div>
          <div className="text-[11px] text-slate-400">Trading fee commission collections and turnover audit.</div>
        </button>
      </div>

      {/* Generated Report Display */}
      {loading ? (
        <div className="fintech-card p-12 text-center text-slate-400 text-xs">
          Generating cryptographic report output...
        </div>
      ) : reportData ? (
        <div className="fintech-card overflow-hidden">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-extrabold text-white">{reportData.title}</h3>
              </div>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                Generated: {reportData.generatedAt} | System Clearance: Level 1
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
              AUDITED
            </span>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-800 border-b border-slate-800 bg-slate-900/50">
            {reportData.metrics?.map((m, idx) => (
              <div key={idx} className="p-4">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">{m.label}</span>
                <span className="text-lg font-black text-white mt-1 block">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Report Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  {reportData.data && reportData.data.length > 0 &&
                    Object.keys(reportData.data[0]).map((col) => (
                      <th key={col} className="py-3 px-4 capitalize">
                        {col.replace(/([A-Z])/g, ' $1')}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {reportData.data?.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 font-mono text-slate-300 text-[11px]">
                        {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};
