import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi, orderApi, productApi } from "../services/api";
import { normalizeProducts } from "../utils/productUtils";

const TOKEN_KEY = "grocery_auth_token";
const USER_KEY = "grocery_auth_user";

const AppContext = createContext(null);

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [user, setUser] = useState(() => getStoredUser());
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  const saveAuth = useCallback((nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  }, []);

  const clearAuth = useCallback(() => {
    setToken("");
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const refreshProducts = useCallback(async () => {
    setProductsLoading(true);
    try {
      const response = await productApi.list("?limit=500&sortBy=createdAt&sortOrder=asc");
      const fetchedProducts = normalizeProducts(response.products || []);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Unable to fetch products from backend. Using local fallback.", error);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  useEffect(() => {
    const syncAuth = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await authApi.me(token);
        setUser(response.user);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      } catch (error) {
        clearAuth();
      } finally {
        setAuthLoading(false);
      }
    };

    syncAuth();
  }, [token, clearAuth]);

  const login = useCallback(async (credentials) => {
    const response = await authApi.login(credentials);
    saveAuth(response.token, response.user);
    return response;
  }, [saveAuth]);

  const signup = useCallback(async (payload) => {
    const response = await authApi.register(payload);
    // Don't saveAuth yet, user needs to verify email
    return response;
  }, []);

  const verifyEmail = useCallback(async (payload) => {
    const response = await authApi.verifyEmail(payload);
    saveAuth(response.token, response.user);
    return response;
  }, [saveAuth]);

  const resendVerification = useCallback(async (payload) => {
    return authApi.resendVerification(payload);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const subscribeToPass = useCallback(async () => {
    if (!token) throw new Error("Login required to subscribe");
    const response = await authApi.subscribe(token);
    setUser(response.user);
    localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    return response;
  }, [token]);

  const placeOrder = useCallback(async (payload) => {
    if (!token) {
      throw new Error("Login required to place an order");
    }
    return orderApi.create(payload, token);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isLoggedIn: Boolean(token),
      isAdmin: user?.role === "admin",
      isSubscribed: Boolean(user?.isSubscribed),
      authLoading,
      products,
      productsLoading,
      refreshProducts,
      login,
      signup,
      verifyEmail,
      resendVerification,
      logout,
      placeOrder,
      subscribeToPass,
    }),
    [
      token,
      user,
      authLoading,
      products,
      productsLoading,
      refreshProducts,
      login,
      signup,
      logout,
      placeOrder,
      subscribeToPass,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
