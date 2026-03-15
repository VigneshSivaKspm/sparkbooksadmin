import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { orders } from "../data/mockData";
import { useToast } from "../hooks/useToast";

const stats = [
  { label: "Total Orders", value: "9,214", sub: "All time", color: "" },
  { label: "Pending", value: "312", sub: "Awaiting action", color: "text-amber-400" },
  { label: "Delivered", value: "8,482", sub: "Successfully fulfilled", color: "text-green-400" },
  { label: "Cancelled", value: "420", sub: "Total refunded", color: "text-red-400" },
];

export default function OrdersPage() {
  const toast = useToast();
  return (
    <div>
      <div className="page-title">Order Management</div>
      <div className="page-sub">Monitor and manage all marketplace orders</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {stats.map((s) => (
          <div key={s.label} className="section-card">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">{s.label}</div>
            <div className={`text-2xl font-semibold ${s.color || "text-slate-100"}`}>{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Order ID", "Customer", "Seller", "Book", "Amount", "Payment", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{o.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar name={o.customer} />
                    <span className="text-sm text-slate-200">{o.customer}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-300">{o.seller}</td>
                <td className="px-4 py-3 text-sm text-slate-300 max-w-[160px] truncate">{o.book}</td>
                <td className="px-4 py-3 text-sm text-slate-200">${o.amount.toFixed(2)}</td>
                <td className="px-4 py-3"><Badge status={o.payment} /></td>
                <td className="px-4 py-3"><Badge status={o.status} /></td>
                <td className="px-4 py-3 text-xs text-slate-400">{o.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="btn-action" onClick={() => toast(`Viewing ${o.id}`)}>View</button>
                  {o.status === "Cancelled"
                    ? <button className="btn-danger" onClick={() => toast(`Refund of $${o.amount} initiated`)}>Refund</button>
                    : <button className="btn-action" onClick={() => toast("Order status updated")}>Update</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
