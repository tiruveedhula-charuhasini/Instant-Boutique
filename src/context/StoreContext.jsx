"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // ─── Hydrate from localStorage once ──────────────────────────────────────────
  useEffect(() => {
    try {
      const savedWishlist       = localStorage.getItem("boutique_wishlist");
      const savedRecentlyViewed = localStorage.getItem("boutique_recently_viewed");
      const savedCart           = localStorage.getItem("boutique_cart");

      if (savedWishlist)       setWishlist(JSON.parse(savedWishlist));
      if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed));
      if (savedCart)           setCart(JSON.parse(savedCart));
    } catch (e) {
      console.error("Failed to load local state", e);
    }
  }, []);

  // ─── Persist to localStorage on change ───────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("boutique_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("boutique_recently_viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("boutique_cart", JSON.stringify(cart));
  }, [cart]);

  // ─── Wishlist ─────────────────────────────────────────────────────────────────
  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback((productId) => {
    return wishlist.some((p) => p.id === productId);
  }, [wishlist]);

  // ─── Recently Viewed ──────────────────────────────────────────────────────────
  const addRecentlyViewed = useCallback((product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  // ─── Quick View ───────────────────────────────────────────────────────────────
  const openQuickView  = useCallback((product) => setQuickViewProduct(product), []);
  const closeQuickView = useCallback(() => setQuickViewProduct(null), []);

  // ─── Cart ─────────────────────────────────────────────────────────────────────
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;
      if (item.quantity <= 1) return prev.filter((i) => i.id !== productId);
      return prev.map((i) =>
        i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const isInCart = useCallback(
    (productId) => cart.some((item) => item.id === productId),
    [cart]
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        // Recently Viewed
        recentlyViewed,
        addRecentlyViewed,
        // Quick View
        quickViewProduct,
        openQuickView,
        closeQuickView,
        // Cart
        cart,
        cartCount,
        cartTotal,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
