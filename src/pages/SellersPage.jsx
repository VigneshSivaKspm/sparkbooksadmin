import { useState } from "react";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { sellers } from "../data/mockData";
import { useToast } from "../hooks/useToast";

export default function SellersPage() {
  const toast = useToast();
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const tabs = ["All", "Active", "Pending", "Suspended"];
  const filtered = sellers.filter(
    (s) =>
      (tab === "All" || s.status === tab) &&
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.shop.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div className="page-title">Seller Management</div>
      <div className="page-sub">Review, approve, and manage marketplace sellers</div>

      <div className="flex gap-0.5 border-b border-navy-500 mb-4">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm transition-colors -mb-px border-b-2 ${
              tab === t ? "text-brand border-brand" : "text-slate-400 border-transparent hover:text-slate-200"
            }`}
          >
            {t}
            {t === "Pending" && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">4</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <input
          className="form-input max-w-xs"
          placeholder="Search sellers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="form-select">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>
        <button className="btn-primary ml-auto" onClick={() => toast("Exporting seller list…")}>
          Export CSV
        </button>
      </div>

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Seller ID", "Seller Name", "Shop Name", "Email", "Books", "Total Sales", "Commission", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{s.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={s.name} />
                    <span className="text-sm text-slate-200">{s.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">{s.shop}</td>
                <td className="px-4 py-3 text-xs text-slate-400">{s.email}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{s.books}</td>
                <td className="px-4 py-3 text-sm text-slate-200">${s.sales.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-slate-200">${s.commission.toLocaleString()}</td>
                <td className="px-4 py-3"><Badge status={s.status} /></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {s.status === "Pending" ? (
                    <>
                      <button className="btn-action text-green-400 hover:bg-green-500/20 hover:border-green-500/40 hover:text-green-300 mr-1" onClick={() => toast(`${s.name} approved! Welcome email sent.`)}>Approve</button>
                      <button className="btn-danger" onClick={() => toast(`${s.name} rejected`)}>Reject</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-action" onClick={() => toast("Viewing seller profile…")}>Profile</button>
                      <button className="btn-action" onClick={() => toast("Viewing products…")}>Products</button>
                      <button className="btn-danger" onClick={() => toast(`${s.name} suspended`)}>Suspend</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
