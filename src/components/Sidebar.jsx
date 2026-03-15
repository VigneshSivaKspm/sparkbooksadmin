import {
  LayoutDashboard, Store, Users, BookOpen, Package,
  DollarSign, Tag, Star, BarChart2, FileText,
  Bell, Settings, ShieldCheck, ScrollText, LogOut,
  ChevronLeft, ChevronRight
} from "lucide-react";

const navItems = [
  { section: "OVERVIEW" },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart2 },
  { id: "reports", label: "Reports", icon: FileText },
  { section: "MANAGEMENT" },
  { id: "sellers", label: "Seller Management", icon: Store, badge: 4 },
  { id: "users", label: "User Management", icon: Users },
  { id: "books", label: "Book Management", icon: BookOpen },
  { id: "orders", label: "Order Management", icon: Package },
  { id: "commission", label: "Commission", icon: DollarSign },
  { section: "CONTENT" },
  { id: "categories", label: "Categories", icon: Tag },
  { id: "reviews", label: "Reviews & Ratings", icon: Star },
  { id: "notifications", label: "Notifications", icon: Bell },
  { section: "SYSTEM" },
  { id: "settings", label: "Platform Settings", icon: Settings },
  { id: "admins", label: "Admin Management", icon: ShieldCheck },
  { id: "logs", label: "System Logs", icon: ScrollText },
];

export default function Sidebar({ currentPage, onNavigate, collapsed, onToggle }) {
  return (
    <div
      className={`${
        collapsed ? "w-14" : "w-56"
      } flex-shrink-0 bg-navy-800 border-r border-navy-500 flex flex-col transition-all duration-200`}
    >
      {/* Logo */}
      <div className="h-13 flex items-center gap-3 px-4 py-3.5 border-b border-navy-500">
        <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          B
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-slate-100 font-semibold text-sm leading-none">BookVault</div>
            <div className="text-slate-500 text-xs mt-0.5">Super Admin</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navItems.map((item, i) => {
          if (item.section) {
            if (collapsed) return null;
            return (
              <div key={i} className="px-2 pt-4 pb-1 text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                {item.section}
              </div>
            );
          }
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`nav-item ${currentPage === item.id ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`}
              title={collapsed ? item.label : ""}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span className="flex-1">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-navy-500 space-y-1">
        <div
          className="nav-item text-red-400 hover:text-red-300 hover:bg-red-500/10"
          onClick={() => alert("Logout clicked")}
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </div>
        <div
          className="flex items-center gap-2 px-2 py-2 text-slate-500 hover:text-slate-300 cursor-pointer rounded-lg hover:bg-navy-700 transition-all text-xs"
          onClick={onToggle}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          {!collapsed && <span>Collapse</span>}
        </div>
      </div>
    </div>
  );
}
