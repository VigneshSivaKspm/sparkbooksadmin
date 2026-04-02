# SparkBooks Admin Dashboard - Firebase Backend

A modern, real-time admin dashboard for managing a book marketplace platform, powered by Firebase Firestore.

## 🚀 Features

- **Real-time Data Sync** - All data synchronized with Firebase Firestore
- **Multi-collection Management** - Sellers, users, books, orders, reviews, categories
- **Advanced Analytics** - Revenue tracking, user growth, category insights
- **Admin Controls** - Role-based admin management and system logs
- **Responsive UI** - Beautiful dark-themed dashboard with Tailwind CSS
- **Charts & Visualizations** - Interactive Recharts for data visualization
- **Search & Filter** - Advanced search and filtering across all collections

## 📦 What's Changed

This project has been completely migrated from mock data to Firebase Firestore:

### ✅ Removed

- All static mock data files (replaced with real-time Firestore)
- Hardcoded data fixtures

### ✨ Added

- **Firebase Configuration** (`src/config/firebase.js`)
- **Firestore Services** (`src/services/firestoreService.js`)
  - Generic CRUD operations
  - Collection-specific services
  - Advanced querying capabilities

- **Firestore Data Helpers** (`src/data/firestoreData.js`)
  - Dynamic metrics generation
  - Analytics data aggregation
  - Category management

- **Custom React Hooks** (`src/hooks/useFirestore.js`)
  - `useFirestoreData` - Generic data fetching
  - `useFirestoreCollection` - Collection data with filtering
  - `useSellers`, `useUsers`, `useBooks`, etc. - Specific collection hooks
  - `useSearch` - Real-time search functionality

### 🔄 Updated Pages

All pages now have Firebase integration:

- **DashboardPage** - Real-time metrics and recent orders
- **SellersPage** - Seller management with Firestore
- **UsersPage** - User management with Firestore
- **BooksPage** - Book listings from Firestore
- **OrdersPage** - Order management with dynamic stats
- **ReviewsPage** - Review moderation
- **CategoriesPage** - Category management
- **LogsPage** - System activity logs
- **AdminsPage** - Admin account management
- **AnalyticsPage** - Real-time analytics
- **ReportsPage** - Export functionality
- **CommissionPage** - Commission tracking
- **NotificationsPage** - Notification management
- **SettingsPage** - Platform settings

## 🏗️ Architecture

```
src/
├── config/
│   └── firebase.js                 # Firebase initialization
├── services/
│   └── firestoreService.js        # Database operations
├── data/
│   ├── mockData.js                # (Deprecated - for reference)
│   └── firestoreData.js           # Data generation & helpers
├── hooks/
│   ├── useToast.jsx               # Toast notifications
│   └── useFirestore.js            # Firestore React hooks
├── pages/
│   ├── DashboardPage.jsx
│   ├── SellersPage.jsx
│   ├── UsersPage.jsx
│   ├── BooksPage.jsx
│   ├── OrdersPage.jsx
│   ├── ReviewsPage.jsx
│   ├── CategoriesPage.jsx
│   ├── LogsPage.jsx
│   ├── AdminsPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── ReportsPage.jsx
│   ├── CommissionPage.jsx
│   ├── NotificationsPage.jsx
│   ├── SettingsPage.jsx
│   └── (other pages...)
├── components/
│   ├── Sidebar.jsx
│   ├── Header.jsx
│   ├── MetricCard.jsx
│   ├── Badge.jsx
│   ├── Avatar.jsx
│   └── (other components...)
└── App.jsx
```

## 🔐 Firestore Collections

### sellers

```
{
  id: string
  name: string
  shop: string
  email: string
  books: number
  sales: number
  commission: number
  status: "Active" | "Pending" | "Suspended"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### users

```
{
  id: string
  name: string
  email: string
  registered: string
  orders: number
  status: "Active" | "Suspended"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### books

```
{
  id: string
  title: string
  author: string
  seller: string
  price: number
  stock: number
  category: string
  rating: number
  status: "Active" | "Pending Review"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### orders

```
{
  id: string
  customer: string
  seller: string
  bookId: string
  book: string
  amount: number
  payment: "Paid" | "Pending"
  status: "Delivered" | "Processing" | "Cancelled"
  date: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

### reviews

```
{
  id: string
  book: string
  bookId: string
  user: string
  rating: number (1-5)
  comment: string
  status: "Approved" | "Pending" | "Flagged"
  createdAt: timestamp
  updatedAt: timestamp
}
```

### categories

```
{
  icon: string (emoji)
  name: string
  books: number
  description: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

### admins

```
{
  name: string
  email: string
  role: "Super Admin" | "Admin" | "Moderator"
  permissions: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

### logs

```
{
  timestamp: string
  actor: string
  type: string
  action: string
  ip: string
  createdAt: timestamp
}
```

## 🚀 Getting Started

### 1. Setup Firebase Project

Follow the [Firebase Setup Guide](./FIREBASE_SETUP.md) for detailed instructions.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create `.env.local`:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Populate Sample Data

```bash
npm run init-firebase
```

(Add this script to package.json if not present)

### 5. Start Development Server

```bash
npm run dev
```

## 📚 Usage Examples

### Fetching Data

```javascript
import { sellersService } from "@/services/firestoreService";

// Get all sellers
const sellers = await sellersService.getAll();

// Get active sellers only
const activeSellers = await sellersService.getByStatus("Active");

// Search sellers
const results = await sellersService.searchSellers("Riya");
```

### Creating Data

```javascript
import { booksService } from "@/services/firestoreService";

const newBook = await booksService.create({
  title: "New Book",
  author: "Author Name",
  seller: "Seller Name",
  price: 19.99,
  stock: 100,
  category: "Fiction",
  rating: 0,
  status: "Active",
});
```

### Updating Data

```javascript
await sellersService.update(sellerId, {
  status: "Active",
  books: 150,
});
```

### Deleting Data

```javascript
await reviewsService.delete(reviewId);
```

### Using React Hooks

```javascript
import { useSellers } from "@/hooks/useFirestore";

function MyComponent() {
  const { data: sellers, loading, error, refetch } = useSellers();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {sellers.map((seller) => (
        <div key={seller.id}>{seller.name}</div>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

## 🔒 Security

For production deployment:

1. Update Firestore security rules to restrict access
2. Enable Firebase Authentication
3. Implement proper authorization checks
4. Use environment variables for sensitive data
5. Enable Cloud Firestore backups

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for security rules examples.

## 📊 Available Services

All services are available in `src/services/firestoreService.js`:

| Service             | Collection | Methods                                                               |
| ------------------- | ---------- | --------------------------------------------------------------------- |
| `sellersService`    | sellers    | getAll, getById, getByStatus, searchSellers, create, update, delete   |
| `usersService`      | users      | getAll, getById, getByStatus, searchUsers, create, update, delete     |
| `booksService`      | books      | getAll, getById, getByCategory, getByStatus, searchBooks, getLowStock |
| `ordersService`     | orders     | getAll, getById, getByStatus, getByPaymentStatus, searchOrders        |
| `reviewsService`    | reviews    | getAll, getById, getByStatus, getByBook, getFlagged                   |
| `categoriesService` | categories | getAll, getById, create, update, delete                               |
| `logsService`       | logs       | getAll, getRecentLogs, logAction                                      |
| `analyticsService`  | analytics  | getMetrics, updateMetrics                                             |
| `adminsService`     | admins     | getAll, getById, create, update, delete                               |

## 🛠️ Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 📦 Dependencies

- **firebase** - Firebase SDK for Firestore
- **react** - UI framework
- **react-dom** - React DOM
- **recharts** - Charts and visualizations
- **lucide-react** - Icons
- **tailwindcss** - Utility-first CSS framework

## 📝 License

Private project

## 🤝 Contributing

When adding new pages or features:

1. Create corresponding Firestore collection if needed
2. Add service class in `firestoreService.js`
3. Create custom hook in `useFirestore.js`
4. Import and use in page component
5. Add loading and error states
6. Update this README with collection schema

## 📞 Support

For Firebase issues, refer to:

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)

For dashboard development:

- Check existing page implementations for patterns
- Use TypeScript for type safety (recommended)
- Follow the established component structure

## ✨ Next Steps

Consider implementing:

- [ ] Firebase Authentication with login
- [ ] Real-time listeners with `onSnapshot`
- [ ] File uploads to Cloud Storage
- [ ] Cloud Functions for complex operations
- [ ] Firestore triggers for automated workflows
- [ ] Analytics tracking
- [ ] Email notifications via Cloud Functions

---

**Happy coding! 🚀**
