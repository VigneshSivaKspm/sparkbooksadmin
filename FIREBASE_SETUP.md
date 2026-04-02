# Firebase Migration Guide

This admin dashboard has been completely migrated from mock data to Firebase Firestore. This guide will help you set up Firebase for this project.

## Prerequisites

- A Google account
- Firebase project (create one at https://console.firebase.google.com)
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Follow the setup wizard:
   - Project name: e.g., "SparkBooks"
   - Disable Google Analytics (optional)
   - Create project

## Step 2: Set Up Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose location (e.g., United States)
4. Start in test mode (for development only - update security rules for production)
5. Click "Enable"

## Step 3: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Under "Your apps", click "Web" (or add a new web app if needed)
3. Copy the Firebase configuration object
4. Create a `.env.local` file in your project root:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Step 4: Set Up Firestore Collections

Create the following collections in Firestore:

### Collection: `sellers`

```json
{
  "id": "SLR-001",
  "name": "Riya Sharma",
  "shop": "Riya's Reads",
  "email": "riya@email.com",
  "books": 142,
  "sales": 8240,
  "commission": 824,
  "status": "Active"
}
```

### Collection: `users`

```json
{
  "id": "USR-10482",
  "name": "Aarav Rao",
  "email": "aarav@gmail.com",
  "registered": "Jan 12, 2025",
  "orders": 14,
  "status": "Active"
}
```

### Collection: `books`

```json
{
  "id": "BK-4421",
  "title": "The Midnight Library",
  "author": "Matt Haig",
  "seller": "Riya's Reads",
  "price": 14.99,
  "stock": 87,
  "category": "Fiction",
  "rating": 4.7,
  "status": "Active"
}
```

### Collection: `orders`

```json
{
  "id": "#BV-9214",
  "customer": "Aarav Rao",
  "seller": "Riya's Reads",
  "bookId": "BK-4421",
  "book": "The Midnight Library",
  "amount": 14.99,
  "payment": "Paid",
  "status": "Delivered",
  "date": "Mar 15"
}
```

### Collection: `reviews`

```json
{
  "id": "RVW-8841",
  "book": "Atomic Habits",
  "bookId": "BK-4420",
  "user": "Aarav Rao",
  "rating": 5,
  "comment": "Changed my life completely.",
  "status": "Approved"
}
```

### Collection: `categories`

```json
{
  "name": "Fiction",
  "icon": "📖",
  "books": 42180,
  "description": "Novels, short stories, and imaginative works"
}
```

### Collection: `logs`

```json
{
  "timestamp": "2026-03-15 09:42:11",
  "actor": "Super Admin",
  "type": "Admin",
  "action": "Updated global commission to 10%",
  "ip": "203.0.113.1",
  "createdAt": Timestamp
}
```

### Collection: `admins`

```json
{
  "name": "Super Admin",
  "email": "admin@sparkbooks.com",
  "role": "Super Admin",
  "permissions": "Full Access"
}
```

## Step 5: Upload Sample Data (Optional)

You can use the `initializeSampleData.js` script to populate your database:

```bash
node scripts/initializeSampleData.js
```

Or manually add documents to Firestore through the console.

## Step 6: Install Dependencies

```bash
npm install
```

The following packages were added:

- `firebase` - Firebase SDK
- `react-firebase-hooks` - React hooks for Firebase

## Step 7: Start Development Server

```bash
npm run dev
```

## File Structure

```
src/
├── config/
│   └── firebase.js           # Firebase initialization
├── services/
│   └── firestoreService.js   # Firestore CRUD operations
├── data/
│   ├── mockData.js           # Kept for reference (deprecated)
│   └── firestoreData.js      # Firebase data generation helpers
├── hooks/
│   ├── useToast.jsx          # Toast notifications
│   └── useFirestore.js       # React hooks for Firestore
└── pages/
    ├── DashboardPage.jsx
    ├── SellersPage.jsx
    ├── UsersPage.jsx
    ├── BooksPage.jsx
    ├── OrdersPage.jsx
    ├── ReviewsPage.jsx
    ├── CategoriesPage.jsx
    ├── LogsPage.jsx
    ├── AdminsPage.jsx
    ├── AnalyticsPage.jsx
    └── ... (other pages)
```

## Available Services

### Firestore Services

All services are located in `src/services/firestoreService.js`:

- `sellersService` - Seller operations
- `usersService` - User operations
- `booksService` - Book operations
- `ordersService` - Order operations
- `reviewsService` - Review operations
- `categoriesService` - Category operations
- `logsService` - System logs
- `analyticsService` - Analytics metrics
- `notificationsService` - Notifications
- `adminsService` - Admin accounts

### Example Usage

```javascript
import { sellersService } from "../services/firestoreService";

// Get all sellers
const sellers = await sellersService.getAll();

// Get sellers by status
const activeSellers = await sellersService.getByStatus("Active");

// Create a new seller
const newSeller = await sellersService.create({
  name: "John Smith",
  shop: "John's Books",
  email: "john@example.com",
  books: 0,
  sales: 0,
  commission: 0,
  status: "Pending",
});

// Update a seller
await sellersService.update(sellerId, { status: "Active" });

// Delete a seller
await sellersService.delete(sellerId);
```

## Security Rules (Production)

For production, update your Firestore security rules to restrict access:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Require authentication
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // Admin-only collections
    match /admins/{document=**} {
      allow read, write: if request.auth.token.admin == true;
    }
  }
}
```

## Troubleshooting

### Firebase not connecting?

- Verify `.env.local` file has correct Firebase credentials
- Check that Firestore database is enabled in Firebase Console
- Ensure security rules allow read/write operations

### Collections not appearing?

- Manually create collections through Firebase Console
- Or run the sample data initialization script
- Firestore creates collections automatically when you add the first document

### CORS errors?

- This is normal for development
- Configure OAuth redirect URLs in Firebase Console → Authentication → Settings

## Next Steps

1. Set up Firebase Authentication for user login
2. Implement proper security rules for production
3. Set up Firestore backups
4. Configure Cloud Functions for server-side operations
5. Set up Cloud Storage for file uploads

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Best Practices](https://firebase.google.com/docs/firestore/best-practices)
- [React Firebase Hooks](https://github.com/CSFrequency/react-firebase-hooks)
