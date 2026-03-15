import { useState } from "react";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { logs } from "../data/mockData";

export default function LogsPage() {
  const [filter, setFilter] = useState("All Events");
  const [search, setSearch] = useState("");

  const typeMap = { "All Events": null, "Admin Actions": "Admin", "Seller Actions": "Seller", "Login Attempts": "Login", "Security Events": "Security", "User Actions": "User" };

  const filtered = logs.filter((l) => {
    const typeMatch = !typeMap[filter] || l.type === typeMap[filter];
    const searchMatch = !search || l.actor.toLowerCase().includes(search.toLowerCase()) || l.action.toLowerCase().includes(search.toLowerCase());
    return typeMatch && searchMatch;
  });

  return (
    <div>
      <div className="page-title">System Logs</div>
      <div className="page-sub">Audit trail of all admin, seller, and user activities</div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          {Object.keys({ "All Events": null, "Admin Actions": "Admin", "Seller Actions": "Seller", "Login Attempts": "Login", "Security Events": "Security", "User Actions": "User" }).map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
        <input
          className="form-input max-w-xs"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="ml-auto flex gap-2 items-center">
          <span className="text-xs text-slate-400">{filtered.length} entries</span>
        </div>
      </div>

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Timestamp", "Actor", "Event Type", "Action", "IP Address"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i} className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-400 whitespace-nowrap">{l.timestamp}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {l.actor !== "Unknown" ? (
                      <>
                        <Avatar name={l.actor} />
                        <span className="text-sm text-slate-200">{l.actor}</span>
                      </>
                    ) : (
                      <span className="text-sm text-red-400 font-medium">Unknown</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3"><Badge status={l.type} /></td>
                <td className="px-4 py-3 text-sm text-slate-300 max-w-xs">{l.action}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{l.ip}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">No logs match your filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
