import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Load environment variables
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = process.env.API_PORT || 5174;

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Validate Firebase config
if (!firebaseConfig.projectId) {
  console.error(
    "ERROR: Firebase configuration is incomplete. Please set environment variables.",
  );
  process.exit(1);
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5175", // Frontend
      "http://localhost:5176", // Backend admin dashboard
      "http://localhost:3000",
      "http://127.0.0.1:5175",
      "http://127.0.0.1:5176",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
});

// ============ HEALTH CHECK ============
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// ============ USERS ENDPOINTS ============
app.get("/api/users", async (req, res) => {
  try {
    const q = query(collection(db, "users"));
    const snapshot = await getDocs(q);
    const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/users/:userId", async (req, res) => {
  try {
    const userDoc = await getDoc(doc(db, "users", req.params.userId));
    if (!userDoc.exists()) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ success: true, data: { id: userDoc.id, ...userDoc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, email, role, avatar } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Name and email required" });
    }
    const docRef = await addDoc(collection(db, "users"), {
      name,
      email,
      role: role || "customer",
      avatar: avatar || name.charAt(0).toUpperCase(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch("/api/users/:userId", async (req, res) => {
  try {
    const userRef = doc(db, "users", req.params.userId);
    await updateDoc(userRef, {
      ...req.body,
      updatedAt: new Date(),
    });
    res.json({ success: true, message: "User updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete("/api/users/:userId", async (req, res) => {
  try {
    await deleteDoc(doc(db, "users", req.params.userId));
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ BOOKS ENDPOINTS ============
app.get("/api/books", async (req, res) => {
  try {
    const { category, seller, limit: pageSize = 100 } = req.query;
    let q = collection(db, "books");
    const constraints = [];

    if (category) {
      constraints.push(where("category", "==", category));
    }
    if (seller) {
      constraints.push(where("seller", "==", seller));
    }

    q = query(q, ...constraints, limit(parseInt(pageSize)));
    const snapshot = await getDocs(q);
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: books });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/books/:bookId", async (req, res) => {
  try {
    const bookDoc = await getDoc(doc(db, "books", req.params.bookId));
    if (!bookDoc.exists()) {
      return res.status(404).json({ success: false, error: "Book not found" });
    }
    res.json({ success: true, data: { id: bookDoc.id, ...bookDoc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/books", async (req, res) => {
  try {
    const { title, author, category, price, seller } = req.body;
    if (!title || !author || !price || !seller) {
      return res
        .status(400)
        .json({ success: false, error: "Required fields missing" });
    }
    const docRef = await addDoc(collection(db, "books"), {
      title,
      author,
      category: category || "General",
      price: parseFloat(price),
      seller,
      stock: req.body.stock || 0,
      description: req.body.description || "",
      coverImage: req.body.coverImage || "",
      rating: 0,
      reviews: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch("/api/books/:bookId", async (req, res) => {
  try {
    const bookRef = doc(db, "books", req.params.bookId);
    await updateDoc(bookRef, {
      ...req.body,
      updatedAt: new Date(),
    });
    res.json({ success: true, message: "Book updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete("/api/books/:bookId", async (req, res) => {
  try {
    await deleteDoc(doc(db, "books", req.params.bookId));
    res.json({ success: true, message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ ORDERS ENDPOINTS ============
app.get("/api/orders", async (req, res) => {
  try {
    const { userId, sellerId, status } = req.query;
    let q = collection(db, "orders");
    const constraints = [];

    if (userId) {
      constraints.push(where("userId", "==", userId));
    }
    if (status) {
      constraints.push(where("status", "==", status));
    }

    q = query(q, ...constraints, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/orders/:orderId", async (req, res) => {
  try {
    const orderDoc = await getDoc(doc(db, "orders", req.params.orderId));
    if (!orderDoc.exists()) {
      return res.status(404).json({ success: false, error: "Order not found" });
    }
    res.json({ success: true, data: { id: orderDoc.id, ...orderDoc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    if (!userId || !items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "User ID and items required" });
    }
    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      items,
      totalAmount: parseFloat(totalAmount),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch("/api/orders/:orderId", async (req, res) => {
  try {
    const orderRef = doc(db, "orders", req.params.orderId);
    await updateDoc(orderRef, {
      ...req.body,
      updatedAt: new Date(),
    });
    res.json({ success: true, message: "Order updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ CATEGORIES ENDPOINTS ============
app.get("/api/categories", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "categories"));
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/categories", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, error: "Category name required" });
    }
    const docRef = await addDoc(collection(db, "categories"), {
      name,
      description: description || "",
      createdAt: new Date(),
    });
    res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ REVIEWS ENDPOINTS ============
app.get("/api/reviews/:bookId", async (req, res) => {
  try {
    const q = query(
      collection(db, "reviews"),
      where("bookId", "==", req.params.bookId),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    const reviews = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;
    if (!bookId || !userId || !rating) {
      return res.status(400).json({
        success: false,
        error: "Book ID, user ID, and rating required",
      });
    }
    const docRef = await addDoc(collection(db, "reviews"), {
      bookId,
      userId,
      rating: parseInt(rating),
      comment: comment || "",
      createdAt: new Date(),
    });
    res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ WISHLIST ENDPOINTS ============
app.get("/api/wishlist/:userId", async (req, res) => {
  try {
    const wishlistDoc = await getDoc(doc(db, "wishlists", req.params.userId));
    if (!wishlistDoc.exists()) {
      return res.json({ success: true, data: [] });
    }
    res.json({ success: true, data: wishlistDoc.data().items || [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/wishlist/:userId/add/:bookId", async (req, res) => {
  try {
    const wishlistRef = doc(db, "wishlists", req.params.userId);
    const wishlistDoc = await getDoc(wishlistRef);
    let items = wishlistDoc.exists() ? wishlistDoc.data().items || [] : [];

    if (!items.includes(req.params.bookId)) {
      items.push(req.params.bookId);
      if (wishlistDoc.exists()) {
        await updateDoc(wishlistRef, { items });
      } else {
        await addDoc(collection(db, "wishlists"), {
          items,
          userId: req.params.userId,
        });
      }
    }
    res.json({ success: true, message: "Book added to wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/wishlist/:userId/remove/:bookId", async (req, res) => {
  try {
    const wishlistRef = doc(db, "wishlists", req.params.userId);
    const wishlistDoc = await getDoc(wishlistRef);

    if (wishlistDoc.exists()) {
      let items = wishlistDoc.data().items || [];
      items = items.filter((id) => id !== req.params.bookId);
      await updateDoc(wishlistRef, { items });
    }
    res.json({ success: true, message: "Book removed from wishlist" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ SELLERS ENDPOINTS ============
app.get("/api/sellers", async (req, res) => {
  try {
    const { status } = req.query;
    let q = collection(db, "sellers");
    const constraints = [];

    if (status) {
      constraints.push(where("status", "==", status));
    }

    q = query(q, ...constraints);
    const snapshot = await getDocs(q);
    const sellers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: sellers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/sellers/:sellerId", async (req, res) => {
  try {
    const sellerDoc = await getDoc(doc(db, "sellers", req.params.sellerId));
    if (!sellerDoc.exists()) {
      return res
        .status(404)
        .json({ success: false, error: "Seller not found" });
    }
    res.json({
      success: true,
      data: { id: sellerDoc.id, ...sellerDoc.data() },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/sellers", async (req, res) => {
  try {
    const { name, email, businessName } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, error: "Name and email required" });
    }
    const docRef = await addDoc(collection(db, "sellers"), {
      name,
      email,
      businessName: businessName || "",
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch("/api/sellers/:sellerId", async (req, res) => {
  try {
    const sellerRef = doc(db, "sellers", req.params.sellerId);
    await updateDoc(sellerRef, {
      ...req.body,
      updatedAt: new Date(),
    });
    res.json({ success: true, message: "Seller updated" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ SELLER APPROVAL ENDPOINTS ============
app.get("/api/sellers/status/pending", async (req, res) => {
  try {
    const q = query(
      collection(db, "sellers"),
      where("status", "==", "pending"),
      orderBy("createdAt", "desc"),
    );
    const snapshot = await getDocs(q);
    const sellers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: sellers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/sellers/:sellerId/approve", async (req, res) => {
  try {
    const sellerRef = doc(db, "sellers", req.params.sellerId);
    await updateDoc(sellerRef, {
      status: "approved",
      approvedAt: new Date(),
      updatedAt: new Date(),
    });
    res.json({ success: true, message: "Seller approved" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/api/sellers/:sellerId/reject", async (req, res) => {
  try {
    const { reason } = req.body;
    const sellerRef = doc(db, "sellers", req.params.sellerId);
    await updateDoc(sellerRef, {
      status: "rejected",
      rejectionReason: reason || "No reason provided",
      rejectedAt: new Date(),
      updatedAt: new Date(),
    });
    res.json({ success: true, message: "Seller rejected" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ DASHBOARD METRICS ============
app.get("/api/metrics", async (req, res) => {
  try {
    const [usersSnap, sellersSnap, booksSnap, ordersSnap] = await Promise.all([
      getDocs(collection(db, "users")),
      getDocs(collection(db, "sellers")),
      getDocs(collection(db, "books")),
      getDocs(collection(db, "orders")),
    ]);

    const totalUsers = usersSnap.size;
    const totalSellers = sellersSnap.size;
    const totalBooks = booksSnap.size;
    const totalOrders = ordersSnap.size;
    const totalRevenue = ordersSnap.docs.reduce(
      (sum, doc) => sum + (doc.data().totalAmount || 0),
      0,
    );

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSellers,
        totalBooks,
        totalOrders,
        totalRevenue,
        activeNow: Math.floor(Math.random() * 100), // Placeholder
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ============ Start Server ============
app.listen(PORT, () => {
  console.log(`✅ API Server running on http://localhost:${PORT}`);
  console.log(`📚 SparkBooks Backend API Ready`);
  console.log(`🔗 CORS enabled for: localhost:5175, localhost:5176`);
});
