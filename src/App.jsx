import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ToastProvider } from "./hooks/useToast";

import DashboardPage from "./pages/DashboardPage";
import SellersPage from "./pages/SellersPage";
import UsersPage from "./pages/UsersPage";
import BooksPage from "./pages/BooksPage";
import OrdersPage from "./pages/OrdersPage";
import CommissionPage from "./pages/CommissionPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CategoriesPage from "./pages/CategoriesPage";
import ReviewsPage from "./pages/ReviewsPage";
import ReportsPage from "./pages/ReportsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminsPage from "./pages/AdminsPage";
import LogsPage from "./pages/LogsPage";

const pages = {
  dashboard: DashboardPage,
  sellers: SellersPage,
  users: UsersPage,
  books: BooksPage,
  orders: OrdersPage,
  commission: CommissionPage,
  analytics: AnalyticsPage,
  categories: CategoriesPage,
  reviews: ReviewsPage,
  reports: ReportsPage,
  notifications: NotificationsPage,
  settings: SettingsPage,
  admins: AdminsPage,
  logs: LogsPage,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const PageComponent = pages[currentPage] || DashboardPage;

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-navy-900 font-sans">
        <Sidebar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            currentPage={currentPage}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(!darkMode)}
            onNavigate={setCurrentPage}
          />
          <main className="flex-1 overflow-y-auto p-5 bg-navy-900">
            <PageComponent onNavigate={setCurrentPage} />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
