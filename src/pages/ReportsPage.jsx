import { useToast } from "../hooks/useToast";

const reports = [
  { icon: "📈", title: "Sales Report", desc: "Total sales, revenue breakdown, and order stats by period", formats: ["PDF", "Excel", "CSV"] },
  { icon: "🏪", title: "Seller Performance", desc: "Per-seller sales, ratings, commissions, and growth trends", formats: ["PDF", "Excel", "CSV"] },
  { icon: "👥", title: "User Activity", desc: "Registrations, sessions, and purchase behavior analysis", formats: ["PDF", "Excel", "CSV"] },
  { icon: "💰", title: "Revenue Report", desc: "Monthly revenue, commissions, payouts, and forecasts", formats: ["PDF", "Excel", "CSV"] },
  { icon: "📚", title: "Inventory Report", desc: "Book listings, stock levels, and category distribution", formats: ["PDF", "Excel", "CSV"] },
  { icon: "⭐", title: "Reviews Report", desc: "Rating distributions, flagged content, and moderation logs", formats: ["PDF", "CSV"] },
];

const fmtColor = { PDF: "text-red-400 border-red-500/30 hover:bg-red-500/10", Excel: "text-green-400 border-green-500/30 hover:bg-green-500/10", CSV: "text-brand border-brand/30 hover:bg-brand/10" };

export default function ReportsPage() {
  const toast = useToast();
  return (
    <div>
      <div className="page-title">Reports</div>
      <div className="page-sub">Export platform data reports in multiple formats</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((r) => (
          <div key={r.title} className="section-card hover:border-navy-400 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{r.icon}</span>
              <div>
                <div className="text-sm font-semibold text-slate-200">{r.title}</div>
                <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{r.desc}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {r.formats.map((f) => (
                <button
                  key={f}
                  className={`text-xs px-3 py-1.5 rounded-lg border bg-transparent cursor-pointer font-medium transition-colors ${fmtColor[f]}`}
                  onClick={() => toast(`${r.title} — ${f} report is downloading…`)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section-card mt-6">
        <div className="text-sm font-semibold text-slate-200 mb-3">Custom Date Range Export</div>
        <div className="flex gap-3 flex-wrap items-end">
          <div>
            <label className="text-xs text-slate-400 block mb-1">From</label>
            <input type="date" className="form-input" defaultValue="2026-01-01" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">To</label>
            <input type="date" className="form-input" defaultValue="2026-03-15" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Report Type</label>
            <select className="form-select">
              <option>Sales Report</option>
              <option>Revenue Report</option>
              <option>User Activity</option>
              <option>Seller Performance</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Format</label>
            <select className="form-select">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
          <button className="btn-primary" onClick={() => toast("Custom report export started!")}>
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
