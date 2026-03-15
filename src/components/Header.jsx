import { Search, Bell, Settings, Sun, Moon } from "lucide-react";

const pageLabels = {
  dashboard: "Dashboard", analytics: "Analytics", reports: "Reports",
  sellers: "Seller Management", users: "User Management", books: "Book Management",
  orders: "Order Management", commission: "Commission", categories: "Categories",
  reviews: "Reviews & Ratings", notifications: "Notifications",
  settings: "Platform Settings", admins: "Admin Management", logs: "System Logs",
};

export default function Header({ currentPage, darkMode, onToggleDark, onNavigate }) {
  return (
    <div className="h-13 bg-navy-800 border-b border-navy-500 flex items-center gap-3 px-5 flex-shrink-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        <span>BookVault</span>
        <span className="text-slate-600">›</span>
        <span className="text-slate-200 font-medium">{pageLabels[currentPage] || currentPage}</span>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-xs ml-4">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search users, orders, books…"
          className="w-full bg-navy-700 border border-navy-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-brand transition-colors"
        />
      </div>

      {/* Right */}
      <div className="ml-auto flex items-center gap-2">
        {/* Dark toggle */}
        <div className="flex bg-navy-700 border border-navy-500 rounded-xl p-0.5 gap-0.5">
          <button
            onClick={onToggleDark}
            className={`p-1.5 rounded-lg transition-all ${darkMode ? "bg-brand text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Moon size={13} />
          </button>
          <button
            onClick={onToggleDark}
            className={`p-1.5 rounded-lg transition-all ${!darkMode ? "bg-brand text-white" : "text-slate-400 hover:text-slate-200"}`}
          >
            <Sun size={13} />
          </button>
        </div>

        {/* Bell */}
        <div
          className="w-8 h-8 bg-navy-700 border border-navy-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-navy-600 cursor-pointer transition-all relative"
          onClick={() => onNavigate("notifications")}
        >
          <Bell size={14} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-navy-800" />
        </div>

        {/* Settings */}
        <div
          className="w-8 h-8 bg-navy-700 border border-navy-500 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-navy-600 cursor-pointer transition-all"
          onClick={() => onNavigate("settings")}
        >
          <Settings size={14} />
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          SA
        </div>
      </div>
    </div>
  );
}
