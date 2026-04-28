/**
 * @file product.api.ts
 * @description Product domain API client layer for Fashionistar frontend.
 *
 * Routing strategy:
 *  - `apiSync` (Axios → DRF) for: vendor CRUD, review create, wishlist toggle,
 *    coupon management, any write operation.
 *  - `apiAsync` (Ky → Ninja) for: public product feed, featured products,
 *    top-rated async reads (high concurrency, concurrent aggregation).
 *
 * All responses are parsed via Zod schemas before returning.
 * URL base: `apiSync.defaults.baseURL` = NEXT_PUBLIC_API_V1_URL
 */
import { apiSync } from "@/core/api/client.sync";
import { apiAsync } from "@/core/api/client.async";
import {
  parseApiResponse,
  PaginatedProductListSchema,
  ProductDetailSchema,
  ProductListItemSchema,
  PaginatedReviewsSchema,
  ProductReviewSchema,
  WishlistItemSchema,
  CouponSchema,
  ToggleWishlistResponseSchema,
} from "../schemas/product.schemas";
import type {
  PaginatedProductList,
  ProductDetail,
  ProductListItem,
  PaginatedReviews,
  ProductReview,
  WishlistItem,
  Coupon,
  CreateProductInput,
  CreateReviewInput,
  ToggleWishlistResponse,
} from "../types/product.types";

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC PRODUCT READS  (apiAsync → Ninja /api/v1/ninja/products/)
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch paginated product listing (public). */
export async function fetchProducts(params?: {
  page?: number;
  category?: string;
  brand?: string;
  search?: string;
  ordering?: string;
  is_featured?: boolean;
}): Promise<PaginatedProductList> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.category) searchParams.set("category", params.category);
  if (params?.brand) searchParams.set("brand", params.brand);
  if (params?.search) searchParams.set("search", params.search);
  if (params?.ordering) searchParams.set("ordering", params.ordering);
  if (params?.is_featured) searchParams.set("is_featured", "true");

  const raw = await apiAsync
    .get(`products/${searchParams.toString() ? `?${searchParams}` : ""}`)
    .json();

  return parseApiResponse(PaginatedProductListSchema, raw, "fetchProducts");
}

/** Fetch single product detail by slug (public). */
export async function fetchProductDetail(slug: string): Promise<ProductDetail> {
  const raw = await apiAsync.get(`products/${slug}/`).json();
  return parseApiResponse(ProductDetailSchema, raw, "fetchProductDetail");
}

/** Fetch featured products (public). */
export async function fetchFeaturedProducts(): Promise<ProductListItem[]> {
  const raw = await apiAsync.get("products/featured/").json<{ results: unknown[] }>();
  return (raw.results ?? []).map((item) =>
    parseApiResponse(ProductListItemSchema, item, "fetchFeaturedProducts"),
  );
}

/** Fetch product reviews (public, paginated). */
export async function fetchProductReviews(
  slug: string,
  page = 1,
): Promise<PaginatedReviews> {
  const raw = await apiAsync.get(`products/${slug}/reviews/?page=${page}`).json();
  return parseApiResponse(PaginatedReviewsSchema, raw, "fetchProductReviews");
}

// ─────────────────────────────────────────────────────────────────────────────
// VENDOR PRODUCT WRITES  (apiSync → DRF /api/v1/products/)
// ─────────────────────────────────────────────────────────────────────────────

/** Create a new product (vendor only). */
export async function createProduct(
  input: CreateProductInput,
): Promise<ProductDetail> {
  const { data } = await apiSync.post<ProductDetail>(
    "/products/vendor/",
    input,
  );
  return parseApiResponse(ProductDetailSchema, data, "createProduct");
}

/** Update an existing product (vendor — owner only). */
export async function updateProduct(
  slug: string,
  input: Partial<CreateProductInput>,
): Promise<ProductDetail> {
  const { data } = await apiSync.patch<ProductDetail>(
    `/products/vendor/${slug}/`,
    input,
  );
  return parseApiResponse(ProductDetailSchema, data, "updateProduct");
}

/** Soft-delete a product (vendor — owner only). */
export async function deleteProduct(slug: string): Promise<void> {
  await apiSync.delete(`/products/vendor/${slug}/`);
}

// ─────────────────────────────────────────────────────────────────────────────
// REVIEW  (apiSync → DRF)
// ─────────────────────────────────────────────────────────────────────────────

/** Submit a product review (client — verified purchase). */
export async function createProductReview(
  slug: string,
  input: CreateReviewInput,
): Promise<ProductReview> {
  const { data } = await apiSync.post<ProductReview>(
    `/products/${slug}/reviews/`,
    input,
  );
  return parseApiResponse(ProductReviewSchema, data, "createProductReview");
}

// ─────────────────────────────────────────────────────────────────────────────
// WISHLIST  (apiSync → DRF)
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch authenticated client's wishlist. */
export async function fetchWishlist(): Promise<WishlistItem[]> {
  const { data } = await apiSync.get<{ results: unknown[] }>("/products/wishlist/");
  return (data.results ?? []).map((item) =>
    parseApiResponse(WishlistItemSchema, item, "fetchWishlist"),
  );
}

/** Toggle wishlist add/remove for a product. */
export async function toggleWishlist(
  slug: string,
): Promise<ToggleWishlistResponse> {
  const { data } = await apiSync.post<ToggleWishlistResponse>(
    `/products/wishlist/${slug}/toggle/`,
  );
  return parseApiResponse(
    ToggleWishlistResponseSchema,
    data,
    "toggleWishlist",
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COUPON  (apiSync → DRF — vendor management)
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch vendor's own coupons. */
export async function fetchVendorCoupons(): Promise<Coupon[]> {
  const { data } = await apiSync.get<{ results: unknown[] }>("/products/coupons/");
  return (data.results ?? []).map((item) =>
    parseApiResponse(CouponSchema, item, "fetchVendorCoupons"),
  );
}

/** Create a coupon (vendor only). */
export async function createCoupon(
  input: Omit<Coupon, "id" | "uses_count">,
): Promise<Coupon> {
  const { data } = await apiSync.post<Coupon>("/products/coupons/", input);
  return parseApiResponse(CouponSchema, data, "createCoupon");
}
