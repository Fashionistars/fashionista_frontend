/**
 * @file product.types.ts
 * @description Canonical TypeScript types for the Fashionistar Product domain.
 *
 * These types mirror the backend DRF serializer response shapes exactly.
 * All types are parsed/validated by the Zod schemas in `schemas/product.schemas.ts`
 * before being consumed by hooks or components.
 *
 * Source of truth: `apps/product/serializers/product_serializers.py` FOR DRF SYNC API ENDPOINTS AND `apps/product/schema/product_schemas.py` FOR DJANGO-NINJA ASYNC API SCHEMAS
 */

// ─────────────────────────────────────────────────────────────────────────────
// ENUM LITERALS
// ─────────────────────────────────────────────────────────────────────────────

export type ProductStatus = "draft" | "pending" | "published" | "archived" | "rejected";
export type ProductCondition = "new" | "used" | "refurbished";
export type CouponType = "percentage" | "fixed" | "free_shipping";
export type MediaType = "image" | "video";

// ─────────────────────────────────────────────────────────────────────────────
// NESTED REFERENCE TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
}

export interface ProductVendor {
  id: string;
  store_name: string;
  slug: string;
  avatar_url: string | null;
}

export interface ProductSize {
  id: string;
  name: string;
  abbreviation: string;
  sort_order: number;
}

export interface ProductColor {
  id: string;
  name: string;
  hex_code: string;
}

export interface ProductTag {
  id: string;
  name: string;
  slug: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY MEDIA
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductGalleryMedia {
  id: string;
  image_url: string;           // Cloudinary secure_url
  media_type: MediaType;
  alt_text: string;
  ordering: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT VARIANT
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  sku: string;
  size: ProductSize | null;
  color: ProductColor | null;
  price_override: string | null;  // Decimal string e.g. "25000.00"
  stock: number;
  is_active: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT REVIEW
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductReview {
  id: string;
  reviewer_name: string;
  reviewer_avatar: string | null;
  rating: number;               // 1-5
  comment: string;
  vendor_reply: string | null;
  helpful_count: number;
  is_verified_purchase: boolean;
  created_at: string;           // ISO 8601
}

// ─────────────────────────────────────────────────────────────────────────────
// COUPON
// ─────────────────────────────────────────────────────────────────────────────

export interface Coupon {
  id: string;
  code: string;
  coupon_type: CouponType;
  discount_value: string;       // Decimal string
  min_order_amount: string;
  max_uses: number | null;
  uses_count: number;
  valid_from: string;
  valid_until: string | null;
  is_active: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT LIST ITEM (lightweight — for cards/grids)
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductListItem {
  id: string;
  slug: string;
  title: string;
  sku: string;
  cover_image_url: string | null;  // Cloudinary secure_url
  price: string;                   // Decimal string
  old_price: string | null;
  currency?: string;               // "NGN"
  average_rating: number;
  review_count: number;
  requires_measurement: boolean;
  status: ProductStatus;
  is_featured: boolean;
  vendor: ProductVendor;
  category: ProductCategory;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DETAIL (full — for product page)
// ─────────────────────────────────────────────────────────────────────────────

export interface ProductDetail extends ProductListItem {
  description: string;
  condition: ProductCondition;
  weight_kg: string | null;
  brand: ProductBrand | null;
  tags: ProductTag[];
  sizes: ProductSize[];
  colors: ProductColor[];
  gallery: ProductGalleryMedia[];
  variants: ProductVariant[];
  specifications: Array<{ label: string; value: string }>;
  faqs: Array<{ question: string; answer: string }>;
  commission_rate: string;
  stock_count: number;
  views_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// WISHLIST
// ─────────────────────────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  product: ProductListItem;
  created_at: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATED RESPONSE ENVELOPE
// ─────────────────────────────────────────────────────────────────────────────

export interface PaginatedProductList {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductListItem[];
}

export interface PaginatedReviews {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductReview[];
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM INPUT TYPES (client → backend POST/PATCH)
// ─────────────────────────────────────────────────────────────────────────────

export interface CreateProductInput {
  title: string;
  description: string;
  price: string;
  old_price?: string;
  currency?: string;
  category_id: string;
  brand_id?: string;
  condition: ProductCondition;
  requires_measurement: boolean;
  stock_count: number;
  weight_kg?: string;
  tag_ids?: string[];
}

export interface CreateReviewInput {
  rating: number;
  comment: string;
}

export interface ToggleWishlistResponse {
  added: boolean;       // true = added, false = removed
  wishlisted: boolean;
}
