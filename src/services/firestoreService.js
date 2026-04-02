import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  QueryConstraint,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Generic collection service for CRUD operations
 */
class FirestoreService {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collectionRef = collection(db, collectionName);
  }

  /**
   * Get all documents with optional filtering and pagination
   */
  async getAll(constraints = [], pageSize = 100) {
    try {
      const q = query(this.collectionRef, ...constraints.slice(0, pageSize));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(`Error fetching ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Get a single document by ID
   */
  async getById(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
      }
      return null;
    } catch (error) {
      console.error(`Error fetching ${this.collectionName} by ID:`, error);
      throw error;
    }
  }

  /**
   * Get documents matching criteria
   */
  async getWhere(field, operator, value) {
    try {
      const q = query(this.collectionRef, where(field, operator, value));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(`Error querying ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Create a new document
   */
  async create(data) {
    try {
      const docRef = await addDoc(this.collectionRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return {
        id: docRef.id,
        ...data,
      };
    } catch (error) {
      console.error(`Error creating ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Update an existing document
   */
  async update(id, data) {
    try {
      const docRef = doc(this.collectionRef, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now(),
      });
      return {
        id,
        ...data,
      };
    } catch (error) {
      console.error(`Error updating ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Delete a document
   */
  async delete(id) {
    try {
      const docRef = doc(this.collectionRef, id);
      await deleteDoc(docRef);
      return { success: true, id };
    } catch (error) {
      console.error(`Error deleting ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Batch create documents
   */
  async createBatch(dataArray) {
    try {
      const results = [];
      for (const data of dataArray) {
        const docRef = await addDoc(this.collectionRef, {
          ...data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        results.push({
          id: docRef.id,
          ...data,
        });
      }
      return results;
    } catch (error) {
      console.error(`Error batch creating ${this.collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Count documents matching criteria
   */
  async count(field, operator, value) {
    try {
      const q = query(this.collectionRef, where(field, operator, value));
      const snapshot = await getDocs(q);
      return snapshot.size;
    } catch (error) {
      console.error(`Error counting ${this.collectionName}:`, error);
      throw error;
    }
  }
}

/**
 * Sellers Service
 */
export class SellersService extends FirestoreService {
  constructor() {
    super("sellers");
  }

  async getByStatus(status) {
    return this.getWhere("status", "==", status);
  }

  async searchSellers(searchTerm) {
    const allSellers = await this.getAll();
    return allSellers.filter(
      (s) =>
        s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.shop?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
}

/**
 * Users Service
 */
export class UsersService extends FirestoreService {
  constructor() {
    super("users");
  }

  async getByStatus(status) {
    return this.getWhere("status", "==", status);
  }

  async searchUsers(searchTerm) {
    const allUsers = await this.getAll();
    return allUsers.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
}

/**
 * Books Service
 */
export class BooksService extends FirestoreService {
  constructor() {
    super("books");
  }

  async getByCategory(category) {
    return this.getWhere("category", "==", category);
  }

  async getByStatus(status) {
    return this.getWhere("status", "==", status);
  }

  async searchBooks(searchTerm) {
    const allBooks = await this.getAll();
    return allBooks.filter(
      (b) =>
        b.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.seller?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  async getLowStock(threshold = 50) {
    const allBooks = await this.getAll();
    return allBooks.filter((b) => b.stock < threshold);
  }
}

/**
 * Orders Service
 */
export class OrdersService extends FirestoreService {
  constructor() {
    super("orders");
  }

  async getByStatus(status) {
    return this.getWhere("status", "==", status);
  }

  async getByPaymentStatus(paymentStatus) {
    return this.getWhere("payment", "==", paymentStatus);
  }

  async searchOrders(searchTerm) {
    const allOrders = await this.getAll();
    return allOrders.filter(
      (o) =>
        o.id?.includes(searchTerm) ||
        o.customer?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
}

/**
 * Reviews Service
 */
export class ReviewsService extends FirestoreService {
  constructor() {
    super("reviews");
  }

  async getByStatus(status) {
    return this.getWhere("status", "==", status);
  }

  async getByBook(bookId) {
    return this.getWhere("bookId", "==", bookId);
  }

  async getFlagged() {
    return this.getWhere("status", "==", "Flagged");
  }
}

/**
 * Categories Service
 */
export class CategoriesService extends FirestoreService {
  constructor() {
    super("categories");
  }
}

/**
 * Logs Service
 */
export class LogsService extends FirestoreService {
  constructor() {
    super("logs");
  }

  async getRecentLogs(limitCount = 100) {
    try {
      const q = query(
        this.collectionRef,
        orderBy("createdAt", "desc"),
        limit(limitCount),
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error fetching logs:", error);
      return [];
    }
  }

  async logAction(user, action, details) {
    return this.create({
      user,
      action,
      details,
      timestamp: Timestamp.now(),
    });
  }
}

/**
 * Analytics Service
 */
export class AnalyticsService extends FirestoreService {
  constructor() {
    super("analytics");
  }

  async getMetrics() {
    try {
      const metrics = await this.getAll();
      return metrics.length > 0 ? metrics[0] : null;
    } catch (error) {
      console.error("Error fetching metrics:", error);
      return null;
    }
  }

  async updateMetrics(data) {
    try {
      const metrics = await this.getAll();
      if (metrics.length > 0) {
        return this.update(metrics[0].id, data);
      } else {
        return this.create(data);
      }
    } catch (error) {
      console.error("Error updating metrics:", error);
      throw error;
    }
  }
}

/**
 * Notifications Service
 */
export class NotificationsService extends FirestoreService {
  constructor() {
    super("notifications");
  }

  async getById(userId) {
    return this.getWhere("userId", "==", userId);
  }

  async getUnread(userId) {
    const userNotifications = await this.getById(userId);
    return userNotifications.filter((n) => !n.read);
  }

  async markAsRead(id) {
    return this.update(id, { read: true });
  }
}

/**
 * Admins Service
 */
export class AdminsService extends FirestoreService {
  constructor() {
    super("admins");
  }
}

// Export singleton instances
export const sellersService = new SellersService();
export const usersService = new UsersService();
export const booksService = new BooksService();
export const ordersService = new OrdersService();
export const reviewsService = new ReviewsService();
export const categoriesService = new CategoriesService();
export const logsService = new LogsService();
export const analyticsService = new AnalyticsService();
export const notificationsService = new NotificationsService();
export const adminsService = new AdminsService();
