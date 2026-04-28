/**
 * @file product.schemas.ts
 * @description Zod runtime validation schemas for the Product domain.
 *
 * Every backend API response is parsed through these schemas before entering
 * TanStack Query cache. Failures are thrown loudly in development and silently
 * logged in production with a fallback.
 *
 * Design rule: schema names mirror the TypeScript interface names with `Schema` suffix.
 */
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// ENUM SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

const ProductStatusSchema = z.enum(["draft", "published", "archived", "rejected"]);
const ProductConditionSchema = z.enum(["new", "used", "refurbished"]);
const CouponTypeSchema = z.enum(["percentage", "fixed", "free_shipping"]);
const MediaTypeSchema = z.enum(["image", "video"]);

// ─────────────────────────────────────────────────────────────────────────────
// NESTED SCHEMAS
// ─────────────────────────────────────────────────────────────────────────────

export const ProductCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});

export const ProductBrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  logo_url: z.string().url().nullable(),
});

export const ProductVendorSchema = z.object({
  id: z.string().uuid(),
  store_name: z.string(),
  slug: z.string(),
  avatar_url: z.string().url().nullable(),
});

export const ProductSizeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  abbreviation: z.string(),
  sort_order: z.number().int(),
});

export const ProductColorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  hex_code: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export const ProductTagSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
});

export const ProductGalleryMediaSchema = z.object({
  id: z.string().uuid(),
  image_url: z.string().url(),
  media_type: MediaTypeSchema,
  alt_text: z.string(),
  ordering: z.number().int(),
});

export const ProductVariantSchema = z.object({
  id: z.string().uuid(),
  sku: z.string(),
  size: ProductSizeSchema.nullable(),
  color: ProductColorSchema.nullable(),
  price_override: z.string().nullable(),
  stock: z.number().int().min(0),
  is_active: z.boolean(),
});

export const ProductReviewSchema = z.object({
  id: z.string().uuid(),
  reviewer_name: z.string(),
  reviewer_avatar: z.string().url().nullable(),
  rating: z.number().int().min(1).max(5),
  comment: z.string(),
  vendor_reply: z.string().nullable(),
  helpful_count: z.number().int().min(0),
  is_verified_purchase: z.boolean(),
  created_at: z.string().datetime({ offset: true }),
});

export const CouponSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  coupon_type: CouponTypeSchema,
  discount_value: z.string(),
  min_order_amount: z.string(),
  max_uses: z.number().int().nullable(),
  uses_count: z.number().int(),
  valid_from: z.string().datetime({ offset: true }),
  valid_until: z.string().datetime({ offset: true }).nullable(),
  is_active: z.boolean(),
});

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT LIST ITEM (lightweight)
// ─────────────────────────────────────────────────────────────────────────────

export const ProductListItemSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  sku: z.string(),
  cover_image_url: z.string().url().nullable(),
  price: z.string(),
  old_price: z.string().nullable(),
  currency: z.string().default("NGN"),
  average_rating: z.number().min(0).max(5),
  review_count: z.number().int().min(0),
  requires_measurement: z.boolean(),
  status: ProductStatusSchema,
  is_featured: z.boolean(),
  vendor: ProductVendorSchema,
  category: ProductCategorySchema,
});

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT DETAIL (full)
// ─────────────────────────────────────────────────────────────────────────────

export const ProductDetailSchema = ProductListItemSchema.extend({
  description: z.string(),
  condition: ProductConditionSchema,
  weight_kg: z.string().nullable(),
  brand: ProductBrandSchema.nullable(),
  tags: z.array(ProductTagSchema),
  sizes: z.array(ProductSizeSchema),
  colors: z.array(ProductColorSchema),
  gallery: z.array(ProductGalleryMediaSchema),
  variants: z.array(ProductVariantSchema),
  specifications: z.array(z.object({ label: z.string(), value: z.string() })),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  commission_rate: z.string(),
  stock_count: z.number().int().min(0),
  views_count: z.number().int().min(0),
  published_at: z.string().datetime({ offset: true }).nullable(),
  created_at: z.string().datetime({ offset: true }),
  updated_at: z.string().datetime({ offset: true }),
});

// ─────────────────────────────────────────────────────────────────────────────
// WISHLIST
// ─────────────────────────────────────────────────────────────────────────────

export const WishlistItemSchema = z.object({
  id: z.string().uuid(),
  product: ProductListItemSchema,
  created_at: z.string().datetime({ offset: true }),
});

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATED ENVELOPES
// ─────────────────────────────────────────────────────────────────────────────

export const PaginatedProductListSchema = z.object({
  count: z.number().int().min(0),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(ProductListItemSchema),
});

export const PaginatedReviewsSchema = z.object({
  count: z.number().int().min(0),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(ProductReviewSchema),
});

export const ToggleWishlistResponseSchema = z.object({
  added: z.boolean(),
  wishlisted: z.boolean(),
});

// ─────────────────────────────────────────────────────────────────────────────
// PARSE HELPER — fails loudly in dev, logs + falls back in prod
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Parse a backend response through a Zod schema.
 * Throws in development; logs error and returns `undefined` in production.
 */
export function parseApiResponse<T>(
  schema: z.ZodType<T>,
  data: unknown,
  context?: string,
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const msg = `[Zod] Schema mismatch${context ? ` in ${context}` : ""}: ${result.error.message}`;
    if (process.env.NODE_ENV === "development") {
      console.error(msg, result.error.flatten(), data);
      throw new Error(msg);
    }
    console.error(msg);
    // In production, attempt to return raw data cast — hooks handle undefined
    return data as T;
  }
  return result.data;
}
