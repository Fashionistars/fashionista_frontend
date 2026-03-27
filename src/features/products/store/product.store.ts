/**
 * Product Store — Zustand v5
 * Lightweight client-side product wishlist + recently viewed store.
 * Heavy product data (listings, details) lives in TanStack Query (server state).
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductState {
  wishlist: string[]; // array of product_id strings
  recentlyViewed: string[];

  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  addRecentlyViewed: (productId: string) => void;
  clearWishlist: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      wishlist: [],
      recentlyViewed: [],

      addToWishlist: (id) => {
        if (!get().wishlist.includes(id)) {
          set((s) => ({ wishlist: [...s.wishlist, id] }));
        }
      },

      removeFromWishlist: (id) =>
        set((s) => ({ wishlist: s.wishlist.filter((i) => i !== id) })),

      isWishlisted: (id) => get().wishlist.includes(id),

      addRecentlyViewed: (id) => {
        set((s) => {
          const filtered = s.recentlyViewed.filter((i) => i !== id);
          // Keep only last 20 recently viewed products
          return { recentlyViewed: [id, ...filtered].slice(0, 20) };
        });
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "fashionistar-products",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : sessionStorage
      ),
    }
  )
);
