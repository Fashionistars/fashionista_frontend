/**
 * @file index.ts
 * @description Public API for the `features/product` canonical FSD slice.
 *
 * Import rule: external code MUST import from this index, never from
 * internal paths. This enforces slice boundary isolation.
 *
 * @example
 *   import { useProducts, useProductDetail, useProductStore, useProductFilters } from "@/features/product";
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  ProductListItem,
  ProductDetail,
  ProductReview,
  ProductVariant,
  ProductGalleryMedia,
  WishlistItem,
  Coupon,
  CreateProductInput,
  CreateReviewInput,
  ToggleWishlistResponse,
  PaginatedProductList,
  PaginatedReviews,
  ProductStatus,
  ProductCondition,
} from "./types/product.types";

// ── Schemas ────────────────────────────────────────────────────────────────
export {
  ProductListItemSchema,
  ProductDetailSchema,
  ProductReviewSchema,
  PaginatedProductListSchema,
  parseApiResponse,
} from "./schemas/product.schemas";

// ── API (raw — prefer hooks) ───────────────────────────────────────────────
export {
  fetchProducts,
  fetchProductDetail,
  fetchFeaturedProducts,
  fetchProductReviews,
  fetchWishlist,
  toggleWishlist,
  createProduct,
  updateProduct,
  createProductReview,
} from "./api/product.api";

// ── TanStack Query Hooks ───────────────────────────────────────────────────
export {
  productKeys,
  useProducts,
  useProductDetail,
  useFeaturedProducts,
  useProductReviews,
  useWishlist,
  useToggleWishlist,
  useCreateProduct,
  useUpdateProduct,
  useCreateReview,
  useVendorCoupons,
  useCreateCoupon,
} from "./hooks/use-product";

// ── URL State Hooks ────────────────────────────────────────────────────────
export { useProductFilters } from "./hooks/use-product-filters";

// ── Zustand UI Store ───────────────────────────────────────────────────────
export { useProductStore } from "./store/product.store";

// ── Components ─────────────────────────────────────────────────────────────
export { default as ReviewCard } from "./components/ReviewCard";
export { default as ReviewScroll } from "./components/ReviewScroll";
export { default as WishlistTableCell } from "./components/WishlistTableCell";
export { default as ProductCard } from "./components/ProductCard";
export { default as ProductCardSkeleton, ProductGridSkeleton } from "./components/ProductCardSkeleton";
export { default as ProductGrid } from "./components/ProductGrid";

