import { z } from "zod";

const IdSchema = z.union([z.string(), z.number()]).transform(String);
const NullableStringSchema = z.string().nullable();

export const CatalogCategorySchema = z.object({
  id: IdSchema,
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  image: NullableStringSchema,
  image_url: z.string(),
  cloudinary_url: NullableStringSchema,
  active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CatalogBrandSchema = z.object({
  id: IdSchema,
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().transform((value) => value ?? ""),
  image: NullableStringSchema,
  image_url: z.string(),
  cloudinary_url: NullableStringSchema,
  active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CatalogCollectionSchema = z.object({
  id: IdSchema,
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  sub_title: z.string().nullable().transform((value) => value ?? ""),
  description: z.string().nullable().transform((value) => value ?? ""),
  image: NullableStringSchema,
  image_url: z.string(),
  cloudinary_url: NullableStringSchema,
  background_image: NullableStringSchema,
  background_image_url: z.string(),
  background_cloudinary_url: NullableStringSchema,
  created_at: z.string(),
  updated_at: z.string(),
});

export const CatalogBlogPostSchema = z.object({
  id: IdSchema,
  author: IdSchema.nullable(),
  author_name: z.string().default("Fashionistar Editorial"),
  category: IdSchema.nullable(),
  category_name: z.string().nullable().transform((value) => value ?? ""),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable().transform((value) => value ?? ""),
  content: z.string(),
  featured_image: NullableStringSchema,
  featured_image_cloudinary_url: NullableStringSchema,
  image_url: z.string(),
  status: z.enum(["draft", "review", "published", "archived"]),
  tags: z.array(z.string()).default([]),
  seo_title: z.string().nullable().transform((value) => value ?? ""),
  seo_description: z.string().nullable().transform((value) => value ?? ""),
  is_featured: z.boolean(),
  published_at: z.string().nullable(),
  view_count: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CatalogCategoryListSchema = z.array(CatalogCategorySchema);
export const CatalogBrandListSchema = z.array(CatalogBrandSchema);
export const CatalogCollectionListSchema = z.array(CatalogCollectionSchema);
export const CatalogBlogPostListSchema = z.array(CatalogBlogPostSchema);
