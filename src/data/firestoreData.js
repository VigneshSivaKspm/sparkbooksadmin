import {
  sellersService,
  usersService,
  booksService,
  ordersService,
  categoriesService,
} from "../services/firestoreService";

/**
 * Generate metrics from Firestore data
 * Falls back to mock data if Firebase is not configured
 */
export const generateMetrics = async () => {
  try {
    const [sellers, users, books, orders] = await Promise.all([
      sellersService.getAll(),
      usersService.getAll(),
      booksService.getAll(),
      ordersService.getAll(),
    ]);

    const activeSellers = sellers.filter((s) => s.status === "Active").length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
    const pendingSellers = sellers.filter((s) => s.status === "Pending").length;
    const pendingOrders = orders.filter(
      (o) => o.status === "Processing" || o.status === "Pending",
    ).length;

    return {
      totalUsers: users.length,
      totalSellers: activeSellers,
      totalBooks: books.length,
      totalOrders: orders.length,
      totalRevenue,
      pendingSellers,
      pendingOrders,
      commissionEarned: (totalRevenue * 0.1) | 0, // 10% commission
    };
  } catch (error) {
    console.warn(
      "Failed to generate metrics from Firestore, using defaults:",
      error,
    );
    return {
      totalUsers: 0,
      totalSellers: 0,
      totalBooks: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingSellers: 0,
      pendingOrders: 0,
      commissionEarned: 0,
    };
  }
};

/**
 * Generate monthly revenue from orders
 */
export const generateMonthlyRevenue = async () => {
  try {
    const orders = await ordersService.getAll();
    const monthlyData = {};

    orders.forEach((order) => {
      if (!order.date) return;
      const date = new Date(
        order.date?.seconds ? order.date.seconds * 1000 : order.date,
      );
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        date,
      );
      monthlyData[month] = (monthlyData[month] || 0) + (order.amount || 0);
    });

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      month,
      revenue: monthlyData[month] || 0,
    }));
  } catch (error) {
    console.warn("Failed to generate monthly revenue:", error);
    return [];
  }
};

/**
 * Generate seller growth data
 */
export const generateSellerGrowth = async () => {
  try {
    const sellers = await sellersService.getAll();
    const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    // Simplified: return data based on current seller count distributed across months
    return months.map((month, idx) => ({
      month,
      sellers: Math.max(
        100,
        Math.floor((sellers.length * (idx + 1)) / months.length),
      ),
    }));
  } catch (error) {
    console.warn("Failed to generate seller growth:", error);
    return [];
  }
};

/**
 * Generate revenue by category
 */
export const generateRevenueByCategory = async () => {
  try {
    const [books, orders] = await Promise.all([
      booksService.getAll(),
      ordersService.getAll(),
    ]);

    const categoryRevenue = {};
    orders.forEach((order) => {
      const book = books.find((b) => b.id === order.bookId);
      if (book) {
        const category = book.category || "Other";
        categoryRevenue[category] =
          (categoryRevenue[category] || 0) + (order.amount || 0);
      }
    });

    const colors = ["#4f7cff", "#2dd4bf", "#a78bfa", "#f59e0b", "#5a6278"];
    return Object.entries(categoryRevenue)
      .map(([name, value], idx) => ({
        name,
        value,
        color: colors[idx % colors.length],
      }))
      .sort((a, b) => b.value - a.value);
  } catch (error) {
    console.warn("Failed to generate category revenue:", error);
    return [];
  }
};

/**
 * Generate order trend (last 30 days)
 */
export const generateOrderTrend = async () => {
  try {
    const orders = await ordersService.getAll();
    const today = new Date();
    const trendData = {};

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const day = date.getDate();
      trendData[day] = 0;
    }

    orders.forEach((order) => {
      if (!order.date) return;
      const date = new Date(
        order.date?.seconds ? order.date.seconds * 1000 : order.date,
      );
      const day = date.getDate();
      const isSameMonth = date.getMonth() === today.getMonth();
      if (isSameMonth && trendData.hasOwnProperty(day)) {
        trendData[day]++;
      }
    });

    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      orders: trendData[i + 1] || 0,
    }));
  } catch (error) {
    console.warn("Failed to generate order trend:", error);
    return Array.from({ length: 30 }, (_, i) => ({ day: i + 1, orders: 0 }));
  }
};

/**
 * Get default categories
 */
export const getDefaultCategories = () => [
  {
    icon: "📖",
    name: "Fiction",
    books: 0,
    description: "Novels, short stories, and imaginative works",
  },
  {
    icon: "🧪",
    name: "Science",
    books: 0,
    description: "Physics, biology, chemistry, and more",
  },
  {
    icon: "💼",
    name: "Business",
    books: 0,
    description: "Finance, management, entrepreneurship",
  },
  {
    icon: "🧘",
    name: "Self-Help",
    books: 0,
    description: "Personal development and wellness",
  },
  {
    icon: "👶",
    name: "Children",
    books: 0,
    description: "Books for young readers",
  },
  {
    icon: "🏛️",
    name: "History",
    books: 0,
    description: "Historical events and biographies",
  },
];
