/**
 * @file use-product.ts
 * @description TanStack Query v5 hooks for the Product domain.
 *
 * Server state ownership:
 *  - Product listings, detail, reviews, wishlist → TanStack Query
 *  - UI-only state (wishlist drawer open, filter panel) → Zustand product.store
 *  - URL filters / search / page → Nuqs (use in page components, not here)
 *
 * Cache key convention: ["product", ...discriminators]
 */
"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchProducts,
  fetchProductDetail,
  fetchFeaturedProducts,
  fetchProductReviews,
  fetchWishlist,
  toggleWishlist,
  createProduct,
  updateProduct,
  createProductReview,
  createCoupon,
  fetchVendorCoupons,
} from "../api/product.api";
import type {
  PaginatedProductList,
  ProductDetail,
  ProductListItem,
  CreateProductInput,
  CreateReviewInput,
} from "../types/product.types";

// ─────────────────────────────────────────────────────────────────────────────
// QUERY KEY FACTORY
// ─────────────────────────────────────────────────────────────────────────────

export const productKeys = {
  all: ["product"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (params: object) => [...productKeys.lists(), params] as const,
  detail: (slug: string) => [...productKeys.all, "detail", slug] as const,
  featured: () => [...productKeys.all, "featured"] as const,
  reviews: (slug: string, page: number) =>
    [...productKeys.all, "reviews", slug, page] as const,
  wishlist: () => [...productKeys.all, "wishlist"] as const,
  coupons: () => [...productKeys.all, "coupons"] as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC READ HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/** Hook: paginated product list with optional filters. */
export function useProducts(
  params?: Parameters<typeof fetchProducts>[0],
  options?: Partial<UseQueryOptions<PaginatedProductList>>,
) {
  return useQuery<PaginatedProductList>({
    queryKey: productKeys.list(params ?? {}),
    queryFn: () => fetchProducts(params),
    staleTime: 60_000, // 1 minute
    ...options,
  });
}

/** Hook: single product detail by slug. */
export function useProductDetail(
  slug: string,
  options?: Partial<UseQueryOptions<ProductDetail>>,
) {
  return useQuery<ProductDetail>({
    queryKey: productKeys.detail(slug),
    queryFn: () => fetchProductDetail(slug),
    staleTime: 120_000, // 2 minutes
    enabled: !!slug,
    ...options,
  });
}

/** Hook: featured product grid. */
export function useFeaturedProducts() {
  return useQuery<ProductListItem[]>({
    queryKey: productKeys.featured(),
    queryFn: fetchFeaturedProducts,
    staleTime: 300_000, // 5 minutes — changes infrequently
  });
}

/** Hook: product reviews (paginated). */
export function useProductReviews(slug: string, page = 1) {
  return useQuery({
    queryKey: productKeys.reviews(slug, page),
    queryFn: () => fetchProductReviews(slug, page),
    staleTime: 60_000,
    enabled: !!slug,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// WISHLIST HOOKS
// ─────────────────────────────────────────────────────────────────────────────

/** Hook: fetch current user's wishlist. */
export function useWishlist() {
  return useQuery({
    queryKey: productKeys.wishlist(),
    queryFn: fetchWishlist,
    staleTime: 60_000,
  });
}

/** Mutation: toggle wishlist (add/remove) with optimistic update. */
export function useToggleWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleWishlist,
    onSuccess: (res, slug) => {
      // Invalidate wishlist so it refetches
      void qc.invalidateQueries({ queryKey: productKeys.wishlist() });
      // Invalidate specific product detail to update its wishlist state
      void qc.invalidateQueries({ queryKey: productKeys.detail(slug) });
      toast.success(res.added ? "Added to wishlist" : "Removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to update wishlist. Please try again.");
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// VENDOR WRITE MUTATIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Mutation: create a new product (vendor). */
export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateProductInput) => createProduct(input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success("Product created successfully!");
    },
    onError: () => {
      toast.error("Failed to create product. Please check your input.");
    },
  });
}

/** Mutation: update a product (vendor — owner). */
export function useUpdateProduct(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreateProductInput>) => updateProduct(slug, input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: productKeys.detail(slug) });
      void qc.invalidateQueries({ queryKey: productKeys.lists() });
      toast.success("Product updated!");
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW MUTATION
// ─────────────────────────────────────────────────────────────────────────────

/** Mutation: submit a product review (client). */
export function useCreateReview(slug: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateReviewInput) => createProductReview(slug, input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: productKeys.reviews(slug, 1) });
      void qc.invalidateQueries({ queryKey: productKeys.detail(slug) });
      toast.success("Review submitted!");
    },
    onError: () => {
      toast.error("Failed to submit review.");
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// COUPON HOOKS (VENDOR)
// ─────────────────────────────────────────────────────────────────────────────

/** Hook: fetch vendor's coupons. */
export function useVendorCoupons() {
  return useQuery({
    queryKey: productKeys.coupons(),
    queryFn: fetchVendorCoupons,
  });
}

/** Mutation: create coupon (vendor). */
export function useCreateCoupon() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: productKeys.coupons() });
      toast.success("Coupon created!");
    },
  });
}
