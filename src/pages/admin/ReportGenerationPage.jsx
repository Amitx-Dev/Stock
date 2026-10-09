import React, { useState } from 'react';
import { reportTypes, mockReportDatasets } from '../../data/mockReports';
import { useToast } from '../../context/ToastContext';
import { FileText, Download, Calendar, Filter, CheckCircle2, ArrowRight } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ReportGenerationPage = () => {
  const [selectedType, setSelectedType] = useState('financial');
  const [dateRange, setDateRange] = useState('7d');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(true);
  const { showToast } = useToast();

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
      showToast('Report generated successfully', 'success');
    }, 600);
  };

  const handleDownload = (format) => {
    showToast(`Downloading ${format.toUpperCase()} report...`, 'info');
    setTimeout(() => {
      showToast(`Report downloaded successfully in ${format.toUpperCase()} format`, 'success');
    }, 800);
  };

  const currentDataset = mockReportDatasets[selectedType] || [];
  const currentMeta = reportTypes.find((r) => r.id === selectedType);

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
          Regulatory & Operational Report Generation
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Generate audit-ready financial ledgers, clearing turnovers, client onboarding telemetry, and system availability reports.
        </p>
      </div>

      {/* Control Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Report Type Selector */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Select Report Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      selectedType === type.id
                        ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/40 ring-2 ring-brand-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {type.name}
                      </span>
                      {selectedType === type.id && (
                        <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {type.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Time Period & Date Range
              </label>
              <div className="space-y-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500"
                >
                  <option value="1d">Today (Current Trading Session)</option>
                  <option value="7d">Last 7 Days (Weekly Settlement)</option>
                  <option value="30d">Last 30 Days (Monthly Ledger)</option>
                  <option value="90d">Current Quarter (Q3 FY26)</option>
                  <option value="custom">Custom Date Range</option>
                </select>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/60 dark:border-slate-700 text-xs text-slate-500">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-600" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Selected Interval</span>
                  </div>
                  <span>03 Oct 2025 - 09 Oct 2025 (5 Exchange Trading Days)</span>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs shadow-md shadow-brand-700/20 transition-all flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Report...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Generate Report Preview</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>

      {/* Preview Table & Download Actions */}
      {reportGenerated && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-soft space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Preview: {currentMeta?.name}
                </h3>
                <Badge variant="brand" size="sm">Audit Ready</Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Showing computed aggregations for compliance period {dateRange.toUpperCase()}.
              </p>
            </div>

            {/* Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDownload('csv')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download CSV</span>
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* Dynamic Dataset Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  {Object.keys(currentDataset[0] || {}).map((colKey) => (
                    <th key={colKey} className="py-3 px-4">
                      {colKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {currentDataset.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} className="py-3.5 px-4 font-mono">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex justify-between items-center text-[11px] text-slate-400">
            <span>Generated at: {new Date().toLocaleTimeString()} IST</span>
            <span>Cryptographic Hash: SHA256: 7f83b1657ff1fc53...</span>
          </div>
        </div>
      )}

    </div>
  );
};
