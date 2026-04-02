import { useState, useEffect } from "react";

/**
 * Generic hook for fetching data from Firestore
 */
export const useFirestoreData = (fetchFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

/**
 * Hook for selling data from a service
 */
export const useFirestoreCollection = (service, filter = null) => {
  const fetchFn = async () => {
    if (filter) {
      return await service.getWhere(
        filter.field,
        filter.operator,
        filter.value,
      );
    }
    return await service.getAll();
  };

  return useFirestoreData(fetchFn);
};

/**
 * Hook for sellers data
 */
export const useSellers = (filter = null) => {
  const { sellersService } = require("../services/firestoreService");
  return useFirestoreCollection(sellersService, filter);
};

/**
 * Hook for users data
 */
export const useUsers = (filter = null) => {
  const { usersService } = require("../services/firestoreService");
  return useFirestoreCollection(usersService, filter);
};

/**
 * Hook for books data
 */
export const useBooks = (filter = null) => {
  const { booksService } = require("../services/firestoreService");
  return useFirestoreCollection(booksService, filter);
};

/**
 * Hook for orders data
 */
export const useOrders = (filter = null) => {
  const { ordersService } = require("../services/firestoreService");
  return useFirestoreCollection(ordersService, filter);
};

/**
 * Hook for reviews data
 */
export const useReviews = (filter = null) => {
  const { reviewsService } = require("../services/firestoreService");
  return useFirestoreCollection(reviewsService, filter);
};

/**
 * Hook for categories data
 */
export const useCategories = () => {
  const { categoriesService } = require("../services/firestoreService");
  return useFirestoreCollection(categoriesService);
};

/**
 * Hook for logs data
 */
export const useLogs = () => {
  const { logsService } = require("../services/firestoreService");
  return useFirestoreData(() => logsService.getRecentLogs());
};

/**
 * Hook for analytics metrics
 */
export const useMetrics = () => {
  const { analyticsService } = require("../services/firestoreService");
  return useFirestoreData(() => analyticsService.getMetrics());
};

/**
 * Hook for search functionality
 */
export const useSearch = (service, initialQuery = "") => {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setSearching(true);
        const searchResults = (await service.searchSellers)
          ? service.searchSellers(query)
          : (await service.searchUsers)
            ? service.searchUsers(query)
            : (await service.searchBooks)
              ? service.searchBooks(query)
              : (await service.searchOrders)
                ? service.searchOrders(query)
                : [];
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setSearching(false);
      }
    };

    performSearch();
  }, [query, service]);

  return { query, setQuery, results, searching };
};
