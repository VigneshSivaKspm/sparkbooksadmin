import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { monthlyRevenue } from "../data/mockData";

const userGrowth = [
  { month: "Apr", users: 28000 },
  { month: "May", users: 30200 },
  { month: "Jun", users: 31800 },
  { month: "Jul", users: 34100 },
  { month: "Aug", users: 37500 },
  { month: "Sep", users: 36200 },
  { month: "Oct", users: 39800 },
  { month: "Nov", users: 40100 },
  { month: "Dec", users: 42300 },
  { month: "Jan", users: 44200 },
  { month: "Feb", users: 46100 },
  { month: "Mar", users: 48291 },
];

const genreSales = [
  { genre: "Fiction", books: 42180 },
  { genre: "Science", books: 18340 },
  { genre: "Business", books: 14220 },
  { genre: "Self-Help", books: 12900 },
  { genre: "Children", books: 9810 },
  { genre: "History", books: 8420 },
];

const sellerPerf = [
  { name: "Desert Library", sales: 11870 },
  { name: "Riya's Reads", sales: 8240 },
  { name: "BookNest EU", sales: 5110 },
  { name: "Libros MX", sales: 3200 },
];

const CustomTooltip = ({ active, payload, label, prefix = "" }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-navy-700 border border-navy-500 rounded-lg px-3 py-2 text-xs">
        <div className="text-slate-400 mb-1">{label}</div>
        <div className="text-slate-100 font-medium">
          {prefix}
          {payload[0].value?.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

const kpis = [
  {
    label: "Monthly Active Users",
    value: "21,430",
    delta: "↑ 14.2%",
    up: true,
  },
  { label: "Avg Order Value", value: "$16.40", delta: "↑ 3.1%", up: true },
  { label: "Conversion Rate", value: "3.8%", delta: "↑ 0.4%", up: true },
  { label: "Return Rate", value: "1.2%", delta: "↑ 0.1%", up: false },
];

export default function AnalyticsPage() {
  return (
    <div>
      <div className="page-title">Analytics</div>
      <div className="page-sub">
        Platform-wide performance metrics and growth insights
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {kpis.map((k) => (
          <div key={k.label} className="metric-card">
            <div className="text-xs text-slate-400 font-medium mb-2">
              {k.label}
            </div>
            <div className="text-2xl font-semibold text-slate-100">
              {k.value}
            </div>
            <div
              className={`text-xs mt-1.5 ${k.up ? "text-green-400" : "text-red-400"}`}
            >
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue & User growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="chart-card">
          <div className="flex items-center justify-between mb-4">
            <div className="chart-title mb-0">Revenue Growth</div>
            <span className="text-xs text-slate-500">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f7cff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4f7cff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3348" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#8a93a8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `$${v / 1000}K`}
                tick={{ fill: "#8a93a8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip prefix="$" />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4f7cff"
                fill="url(#revGrad)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="flex items-center justify-between mb-4">
            <div className="chart-title mb-0">User Growth</div>
            <span className="text-xs text-slate-500">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={userGrowth}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3348" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#8a93a8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${v / 1000}K`}
                tick={{ fill: "#8a93a8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#2dd4bf"
                fill="url(#userGrad)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Genre & Seller perf */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-card">
          <div className="chart-title">Book Sales by Genre</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={genreSales} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3348" />
              <XAxis
                dataKey="genre"
                tick={{ fill: "#8a93a8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#8a93a8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="books" fill="#a78bfa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Top Seller Performance</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sellerPerf} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3348" />
              <XAxis
                type="number"
                tickFormatter={(v) => `$${v / 1000}K`}
                tick={{ fill: "#8a93a8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#8a93a8", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={100}
              />
              <Tooltip content={<CustomTooltip prefix="$" />} />
              <Bar dataKey="sales" fill="#2dd4bf" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
