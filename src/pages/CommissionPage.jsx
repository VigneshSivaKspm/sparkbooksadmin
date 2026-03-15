import { useState } from "react";
import { useToast } from "../hooks/useToast";

const sellerRates = [
  { name: "Riya's Reads", rate: 8 },
  { name: "Desert Library", rate: 9 },
  { name: "BookNest EU", rate: 10 },
  { name: "Yuki Books JP", rate: 10 },
  { name: "Libros MX", rate: 7 },
];

const payoutHistory = [
  { seller: "Fatima Omar", shop: "Desert Library", amount: 1187, date: "Mar 1, 2026", status: "Paid" },
  { seller: "Riya Sharma", shop: "Riya's Reads", amount: 824, date: "Mar 1, 2026", status: "Paid" },
  { seller: "Mihail Kovac", shop: "BookNest EU", amount: 511, date: "Mar 1, 2026", status: "Paid" },
  { seller: "Carlos Reyes", shop: "Libros MX", amount: 320, date: "Mar 1, 2026", status: "Pending" },
];

export default function CommissionPage() {
  const toast = useToast();
  const [globalRate, setGlobalRate] = useState(10);
  const [minPayout, setMinPayout] = useState(50);
  const [cycle, setCycle] = useState("Monthly");
  const [rates, setRates] = useState(sellerRates);

  const updateRate = (i, val) => {
    const updated = [...rates];
    updated[i] = { ...updated[i], rate: val };
    setRates(updated);
  };

  return (
    <div>
      <div className="page-title">Commission Management</div>
      <div className="page-sub">Configure and track marketplace commission earnings</div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="metric-card">
          <div className="text-xs text-slate-400 font-medium mb-2">💎 Total Commission</div>
          <div className="text-2xl font-semibold text-slate-100">$42,810</div>
          <div className="text-xs text-green-400 mt-1.5">↑ 19.4% this month</div>
        </div>
        <div className="metric-card">
          <div className="text-xs text-slate-400 font-medium mb-2">💸 Seller Payouts</div>
          <div className="text-2xl font-semibold text-slate-100">$38,200</div>
          <div className="text-xs text-slate-400 mt-1.5">Paid out this cycle</div>
        </div>
        <div className="metric-card">
          <div className="text-xs text-slate-400 font-medium mb-2">⏳ Pending Payouts</div>
          <div className="text-2xl font-semibold text-slate-100">$4,610</div>
          <div className="text-xs text-amber-400 mt-1.5">Awaiting processing</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Global settings */}
        <div className="section-card">
          <div className="text-sm font-semibold text-slate-200 mb-4">Global Commission Settings</div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-navy-500">
              <div>
                <div className="text-sm font-medium text-slate-200">Default Commission Rate</div>
                <div className="text-xs text-slate-400 mt-0.5">Applied to all sellers unless overridden</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={globalRate}
                  onChange={(e) => setGlobalRate(e.target.value)}
                  className="form-input w-16 text-center"
                />
                <span className="text-slate-400 text-sm">%</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-navy-500">
              <div>
                <div className="text-sm font-medium text-slate-200">Minimum Payout Threshold</div>
                <div className="text-xs text-slate-400 mt-0.5">Seller must earn at least this amount</div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  value={minPayout}
                  onChange={(e) => setMinPayout(e.target.value)}
                  className="form-input w-16 text-center"
                />
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-slate-200">Payout Cycle</div>
                <div className="text-xs text-slate-400 mt-0.5">How often payouts are processed</div>
              </div>
              <select className="form-select" value={cycle} onChange={(e) => setCycle(e.target.value)}>
                <option>Monthly</option>
                <option>Bi-weekly</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn-primary" onClick={() => toast("Commission settings saved!")}>
              Save Settings
            </button>
          </div>
        </div>

        {/* Custom seller rates */}
        <div className="section-card">
          <div className="text-sm font-semibold text-slate-200 mb-4">Custom Seller Commission</div>
          <div className="space-y-1">
            {rates.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between py-2.5 border-b border-navy-500 last:border-0">
                <span className="text-sm text-slate-300">{s.name}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={s.rate}
                    onChange={(e) => updateRate(i, e.target.value)}
                    className="form-input w-14 text-center"
                  />
                  <span className="text-slate-400 text-sm">%</span>
                  <button
                    className="btn-action"
                    onClick={() => toast(`Custom rate saved for ${s.name}`)}
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payout history */}
      <div className="text-sm font-semibold text-slate-200 mb-3">Payout History</div>
      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Seller", "Shop", "Amount", "Date", "Status"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payoutHistory.map((p, i) => (
              <tr key={i} className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors">
                <td className="px-4 py-3 text-sm text-slate-200">{p.seller}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{p.shop}</td>
                <td className="px-4 py-3 text-sm text-slate-200 font-medium">${p.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{p.date}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${p.status === "Paid" ? "badge-green" : "badge-amber"}`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
