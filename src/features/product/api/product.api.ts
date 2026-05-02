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
  buildSearchParams,
  unwrapApiData,
  unwrapResults,
} from "@/core/api/response";
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
  page_size?: number;
  category?: string;
  brand?: string;
  collection?: string;
  search?: string;
  ordering?: string;
  is_featured?: boolean;
}): Promise<PaginatedProductList> {
  const searchParams = buildSearchParams({
    page: params?.page,
    page_size: params?.page_size,
    category: params?.category,
    brand: params?.brand,
    search: params?.search,
    ordering: params?.ordering,
    is_featured: params?.is_featured,
  });

  const raw = await apiAsync
    .get(`products/${searchParams ? `?${searchParams}` : ""}`)
    .json();

  return parseApiResponse(
    PaginatedProductListSchema,
    unwrapApiData(raw),
    "fetchProducts",
  );
}

/** Fetch single product detail by slug (public). */
export async function fetchProductDetail(slug: string): Promise<ProductDetail> {
  const raw = await apiAsync.get(`products/${slug}/`).json();
  return parseApiResponse(
    ProductDetailSchema,
    unwrapApiData(raw),
    "fetchProductDetail",
  );
}

/** Fetch featured products (public). */
export async function fetchFeaturedProducts(): Promise<ProductListItem[]> {
  const raw = await apiAsync.get("products/featured/").json();
  return unwrapResults(raw).map((item) =>
    parseApiResponse(ProductListItemSchema, item, "fetchFeaturedProducts"),
  );
}

/** Fetch product reviews (public, paginated). */
export async function fetchProductReviews(
  slug: string,
  page = 1,
): Promise<PaginatedReviews> {
  const raw = await apiAsync.get(`products/${slug}/reviews/?page=${page}`).json();
  return parseApiResponse(
    PaginatedReviewsSchema,
    unwrapApiData(raw),
    "fetchProductReviews",
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VENDOR PRODUCT WRITES  (apiSync → DRF product write routes)
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
// WISHLIST  (apiAsync → Ninja reads, apiSync → DRF writes)
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch authenticated client's wishlist. */
export async function fetchWishlist(): Promise<WishlistItem[]> {
  const raw = await apiAsync.get("products/wishlist/").json();
  return unwrapResults(raw).map((item) =>
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
// COUPON  (apiAsync → Ninja reads, apiSync → DRF writes)
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch vendor's own coupons. */
export async function fetchVendorCoupons(): Promise<Coupon[]> {
  const raw = await apiAsync.get("products/coupons/").json();
  return unwrapResults(raw).map((item) =>
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
