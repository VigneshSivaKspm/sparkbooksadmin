import { useState } from "react";
import Badge from "../components/Badge";
import { books } from "../data/mockData";
import { useToast } from "../hooks/useToast";

export default function BooksPage() {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-title">Book Management</div>
      <div className="page-sub">Manage all book listings on the marketplace</div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <input className="form-input max-w-xs" placeholder="Search books, authors..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="form-select">
          <option>All Categories</option>
          <option>Fiction</option>
          <option>Self-Help</option>
          <option>Science</option>
        </select>
        <select className="form-select">
          <option>All Status</option>
          <option>Active</option>
          <option>Pending Review</option>
        </select>
      </div>

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Book ID", "Title", "Author", "Seller", "Price", "Stock", "Category", "Rating", "Status", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{b.id}</td>
                <td className="px-4 py-3 text-sm text-slate-200 max-w-[180px] truncate font-medium">{b.title}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{b.author}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{b.seller}</td>
                <td className="px-4 py-3 text-sm text-slate-200">${b.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-sm text-slate-300">{b.stock}</td>
                <td className="px-4 py-3"><Badge status={b.category === "Fiction" ? "Shipped" : b.category === "Self-Help" ? "Active" : "Active"} /></td>
                <td className="px-4 py-3 text-xs text-amber-400">★ {b.rating}</td>
                <td className="px-4 py-3"><Badge status={b.status} /></td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {b.status === "Pending Review" && (
                    <button className="btn-action text-green-400 mr-1" onClick={() => toast(`${b.title} approved and listed!`)}>Approve</button>
                  )}
                  <button className="btn-action" onClick={() => toast(`${b.title} featured on homepage!`)}>Feature</button>
                  <button className="btn-danger" onClick={() => toast(`${b.title} removed from listings`)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
