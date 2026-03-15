import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";
import MetricCard from "../components/MetricCard";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import { metrics, monthlyRevenue, sellerGrowth, revenueByCategory, orderTrend, orders } from "../data/mockData";
import { useToast } from "../hooks/useToast";

const fmt = (v) => `$${(v / 1000).toFixed(0)}K`;
const CAT_COLORS = ["#4f7cff", "#2dd4bf", "#a78bfa", "#f59e0b", "#5a6278"];

const CustomTooltip = ({ active, payload, label, prefix = "" }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-navy-700 border border-navy-500 rounded-lg px-3 py-2 text-xs">
        <div className="text-slate-400 mb-1">{label}</div>
        <div className="text-slate-100 font-medium">{prefix}{payload[0].value?.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function DashboardPage({ onNavigate }) {
  const toast = useToast();
  return (
    <div>
      <div>
        <div className="page-title">Good morning, Admin 👋</div>
        <div className="page-sub">Here's what's happening on BookVault today — March 15, 2026</div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <MetricCard icon="👥" label="Total Users" value={metrics.totalUsers.toLocaleString()} delta="↑ 12.4% vs last month" deltaUp />
        <MetricCard icon="🏪" label="Total Sellers" value={metrics.totalSellers.toLocaleString()} delta="↑ 8.1% vs last month" deltaUp />
        <MetricCard icon="📚" label="Total Books" value={metrics.totalBooks.toLocaleString()} delta="↑ 5.3% vs last month" deltaUp />
        <MetricCard icon="📦" label="Total Orders" value={metrics.totalOrders.toLocaleString()} delta="↑ 18.7% vs last month" deltaUp />
        <MetricCard icon="💵" label="Total Revenue" value="$284K" delta="↑ 22.1% vs last month" deltaUp />
        <MetricCard icon="⏳" label="Pending Sellers" value={metrics.pendingSellers} delta="Needs review" />
        <MetricCard icon="📬" label="Pending Orders" value={metrics.pendingOrders} delta="Awaiting fulfillment" />
        <MetricCard icon="💎" label="Commission Earned" value="$42.8K" delta="↑ 19.4% vs last month" deltaUp />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
        <div className="chart-card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="chart-title mb-0">Monthly Revenue</div>
            <span className="text-xs text-slate-500">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyRevenue} barSize={18}>
              <XAxis dataKey="month" tick={{ fill: "#8a93a8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={fmt} tick={{ fill: "#8a93a8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip prefix="$" />} cursor={{ fill: "rgba(79,124,255,0.05)" }} />
              <Bar dataKey="revenue" fill="#4f7cff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="flex items-center justify-between mb-4">
            <div className="chart-title mb-0">By Category</div>
            <span className="text-xs text-slate-500">This month</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={revenueByCategory} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                {revenueByCategory.map((entry, i) => (
                  <Cell key={i} fill={CAT_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={(val) => `${val}%`} contentStyle={{ background: "#1e2535", border: "1px solid #2a3348", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
            {revenueByCategory.map((c, i) => (
              <div key={i} className="flex items-center gap-1 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-sm" style={{ background: CAT_COLORS[i] }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-5">
        <div className="chart-card">
          <div className="flex items-center justify-between mb-4">
            <div className="chart-title mb-0">Order Trends</div>
            <span className="text-xs text-slate-500">Last 30 days</span>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={orderTrend}>
              <defs>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill: "#8a93a8", fontSize: 10 }} axisLine={false} tickLine={false} interval={4} />
              <YAxis tick={{ fill: "#8a93a8", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="orders" stroke="#2dd4bf" fill="url(#ordersGrad)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <div className="flex items-center justify-between mb-4">
            <div className="chart-title mb-0">Seller Growth</div>
            <span className="text-xs text-slate-500">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={sellerGrowth}>
              <XAxis dataKey="month" tick={{ fill: "#8a93a8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8a93a8", fontSize: 11 }} axisLine={false} tickLine={false} domain={[2800, 4000]} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="sellers" stroke="#a78bfa" strokeWidth={2} dot={{ fill: "#a78bfa", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-semibold text-slate-200">Recent Orders</div>
        <button className="btn-primary" onClick={() => onNavigate("orders")}>View All Orders</button>
      </div>
      <div className="table-card">
        <table className="w-full">
          <thead>
            <tr className="bg-navy-700">
              {["Order ID", "Customer", "Book", "Amount", "Status", "Date", "Actions"].map((h) => (
                <th key={h} className="px-4 py-2.5 text-left text-xs text-slate-400 font-medium uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((o) => (
              <tr key={o.id} className="border-t border-navy-500 hover:bg-navy-700/40 transition-colors">
                <td className="px-4 py-2.5 font-mono text-xs text-slate-400">{o.id}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Avatar name={o.customer} />
                    <span className="text-sm text-slate-200">{o.customer}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-sm text-slate-300 max-w-[160px] truncate">{o.book}</td>
                <td className="px-4 py-2.5 text-sm text-slate-200">${o.amount.toFixed(2)}</td>
                <td className="px-4 py-2.5"><Badge status={o.status} /></td>
                <td className="px-4 py-2.5 text-xs text-slate-400">{o.date}</td>
                <td className="px-4 py-2.5">
                  <button className="btn-action" onClick={() => toast(`Viewing order ${o.id}`)}>View</button>
                  <button className="btn-action" onClick={() => toast("Status updated")}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
