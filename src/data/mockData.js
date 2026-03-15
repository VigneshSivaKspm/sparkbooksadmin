export const metrics = {
  totalUsers: 48291,
  totalSellers: 3847,
  totalBooks: 127450,
  totalOrders: 9214,
  totalRevenue: 284000,
  pendingSellers: 4,
  pendingOrders: 312,
  commissionEarned: 42800,
};

export const monthlyRevenue = [
  { month: "Apr", revenue: 18200 },
  { month: "May", revenue: 22400 },
  { month: "Jun", revenue: 19800 },
  { month: "Jul", revenue: 25100 },
  { month: "Aug", revenue: 28400 },
  { month: "Sep", revenue: 24700 },
  { month: "Oct", revenue: 31200 },
  { month: "Nov", revenue: 29800 },
  { month: "Dec", revenue: 35600 },
  { month: "Jan", revenue: 38100 },
  { month: "Feb", revenue: 41200 },
  { month: "Mar", revenue: 47900 },
];

export const sellerGrowth = [
  { month: "Oct", sellers: 2980 },
  { month: "Nov", sellers: 3120 },
  { month: "Dec", sellers: 3310 },
  { month: "Jan", sellers: 3510 },
  { month: "Feb", sellers: 3690 },
  { month: "Mar", sellers: 3847 },
];

export const revenueByCategory = [
  { name: "Fiction", value: 42, color: "#4f7cff" },
  { name: "Science", value: 18, color: "#2dd4bf" },
  { name: "Business", value: 15, color: "#a78bfa" },
  { name: "Self-Help", value: 13, color: "#f59e0b" },
  { name: "Other", value: 12, color: "#5a6278" },
];

export const orderTrend = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  orders: Math.floor(180 + Math.sin(i * 0.4) * 60 + i * 3),
}));

export const sellers = [
  { id: "SLR-001", name: "Riya Sharma", shop: "Riya's Reads", email: "riya@email.com", books: 142, sales: 8240, commission: 824, status: "Active" },
  { id: "SLR-002", name: "Mihail Kovac", shop: "BookNest EU", email: "mkovac@email.com", books: 89, sales: 5110, commission: 511, status: "Active" },
  { id: "SLR-003", name: "Tanvir Ahmed", shop: "PageTurners BD", email: "tanvir@email.com", books: 0, sales: 0, commission: 0, status: "Pending" },
  { id: "SLR-004", name: "Yuki Lee", shop: "Yuki Books JP", email: "yuki@email.com", books: 0, sales: 0, commission: 0, status: "Pending" },
  { id: "SLR-005", name: "Fatima Omar", shop: "Desert Library", email: "fatima@email.com", books: 203, sales: 11870, commission: 1187, status: "Active" },
  { id: "SLR-006", name: "Carlos Reyes", shop: "Libros MX", email: "carlos@email.com", books: 74, sales: 3200, commission: 320, status: "Suspended" },
];

export const users = [
  { id: "USR-10482", name: "Aarav Rao", email: "aarav@gmail.com", registered: "Jan 12, 2025", orders: 14, status: "Active" },
  { id: "USR-10481", name: "Sofia Martinez", email: "sofia@gmail.com", registered: "Feb 3, 2025", orders: 7, status: "Active" },
  { id: "USR-10480", name: "James Kim", email: "jkim@gmail.com", registered: "Nov 8, 2024", orders: 23, status: "Active" },
  { id: "USR-10479", name: "Nora Patel", email: "nora@gmail.com", registered: "Oct 20, 2024", orders: 3, status: "Suspended" },
  { id: "USR-10478", name: "Leo Chen", email: "leo@gmail.com", registered: "Sep 5, 2024", orders: 41, status: "Active" },
  { id: "USR-10477", name: "Amara Diallo", email: "amara@gmail.com", registered: "Aug 14, 2024", orders: 12, status: "Active" },
];

export const books = [
  { id: "BK-4421", title: "The Midnight Library", author: "Matt Haig", seller: "Riya's Reads", price: 14.99, stock: 87, category: "Fiction", rating: 4.7, status: "Active" },
  { id: "BK-4420", title: "Atomic Habits", author: "James Clear", seller: "Desert Library", price: 18.00, stock: 204, category: "Self-Help", rating: 4.9, status: "Active" },
  { id: "BK-4419", title: "Dune", author: "Frank Herbert", seller: "BookNest EU", price: 12.49, stock: 55, category: "Fiction", rating: 4.8, status: "Active" },
  { id: "BK-4418", title: "Fourth Wing", author: "Rebecca Yarros", seller: "Riya's Reads", price: 22.99, stock: 120, category: "Fiction", rating: 4.6, status: "Pending Review" },
  { id: "BK-4417", title: "The Alchemist", author: "Paulo Coelho", seller: "Desert Library", price: 9.99, stock: 312, category: "Fiction", rating: 4.5, status: "Active" },
  { id: "BK-4416", title: "Sapiens", author: "Yuval Noah Harari", seller: "BookNest EU", price: 16.99, stock: 88, category: "Science", rating: 4.7, status: "Active" },
];

export const orders = [
  { id: "#BV-9214", customer: "Aarav Rao", seller: "Riya's Reads", book: "The Midnight Library", amount: 14.99, payment: "Paid", status: "Delivered", date: "Mar 15" },
  { id: "#BV-9213", customer: "Sofia Martinez", seller: "Desert Library", book: "Atomic Habits", amount: 18.00, payment: "Paid", status: "Processing", date: "Mar 15" },
  { id: "#BV-9212", customer: "James Kim", seller: "BookNest EU", book: "Dune", amount: 12.49, payment: "Paid", status: "Shipped", date: "Mar 14" },
  { id: "#BV-9211", customer: "Nora Patel", seller: "Riya's Reads", book: "Fourth Wing", amount: 22.99, payment: "Pending", status: "Cancelled", date: "Mar 14" },
  { id: "#BV-9210", customer: "Leo Chen", seller: "Desert Library", book: "The Alchemist", amount: 9.99, payment: "Paid", status: "Delivered", date: "Mar 13" },
  { id: "#BV-9209", customer: "Amara Diallo", seller: "BookNest EU", book: "Sapiens", amount: 16.99, payment: "Paid", status: "Shipped", date: "Mar 13" },
];

export const reviews = [
  { id: "RVW-8841", book: "Atomic Habits", user: "Aarav Rao", rating: 5, comment: "Changed my life completely.", status: "Approved" },
  { id: "RVW-8840", book: "Dune", user: "Sofia Martinez", rating: 4, comment: "Slow start but worth it.", status: "Pending" },
  { id: "RVW-8839", book: "Fourth Wing", user: "James Kim", rating: 2, comment: "Shipping was terrible.", status: "Flagged" },
  { id: "RVW-8838", book: "The Alchemist", user: "Leo Chen", rating: 5, comment: "A timeless masterpiece.", status: "Approved" },
  { id: "RVW-8837", book: "Sapiens", user: "Nora Patel", rating: 3, comment: "Interesting but very long.", status: "Pending" },
];

export const categories = [
  { icon: "📖", name: "Fiction", books: 42180, description: "Novels, short stories, and imaginative works" },
  { icon: "🧪", name: "Science", books: 18340, description: "Physics, biology, chemistry, and more" },
  { icon: "💼", name: "Business", books: 14220, description: "Finance, management, entrepreneurship" },
  { icon: "🧘", name: "Self-Help", books: 12900, description: "Personal development and wellness" },
  { icon: "👶", name: "Children", books: 9810, description: "Books for young readers" },
  { icon: "🏛️", name: "History", books: 8420, description: "Historical events and biographies" },
];

export const admins = [
  { name: "Super Admin", email: "admin@bookvault.com", role: "Super Admin", permissions: "Full Access" },
  { name: "Maria Ortiz", email: "maria@bookvault.com", role: "Moderator", permissions: "Reviews, Users" },
  { name: "Dev Kumar", email: "dev@bookvault.com", role: "Admin", permissions: "Books, Orders, Sellers" },
];

export const logs = [
  { timestamp: "2026-03-15 09:42:11", actor: "Super Admin", type: "Admin", action: "Updated global commission to 10%", ip: "203.0.113.1" },
  { timestamp: "2026-03-15 09:30:04", actor: "Super Admin", type: "Login", action: "Successful login from Chennai, IN", ip: "203.0.113.1" },
  { timestamp: "2026-03-15 08:17:55", actor: "Riya Sharma", type: "Seller", action: "Listed new book: Fourth Wing", ip: "198.51.100.4" },
  { timestamp: "2026-03-14 22:05:33", actor: "Unknown", type: "Security", action: "Failed login attempt — 3 retries", ip: "192.0.2.88" },
  { timestamp: "2026-03-14 18:44:20", actor: "Maria Ortiz", type: "Moderation", action: "Deleted flagged review RVW-8839", ip: "198.51.100.9" },
  { timestamp: "2026-03-14 14:22:10", actor: "Aarav Rao", type: "User", action: "Placed order #BV-9214", ip: "203.0.113.44" },
];
