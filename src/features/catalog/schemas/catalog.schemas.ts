import { z } from "zod";

export const CatalogCategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  image: z.string().nullable(),
  image_url: z.string(),
  cloudinary_url: z.string().nullable(),
  active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CatalogBrandSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  image_url: z.string(),
  cloudinary_url: z.string().nullable(),
  active: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CatalogCollectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  slug: z.string(),
  sub_title: z.string(),
  description: z.string(),
  image: z.string().nullable(),
  image_url: z.string(),
  cloudinary_url: z.string().nullable(),
  background_image: z.string().nullable(),
  background_image_url: z.string(),
  background_cloudinary_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const CatalogCategoryListSchema = z.array(CatalogCategorySchema);
export const CatalogBrandListSchema = z.array(CatalogBrandSchema);
export const CatalogCollectionListSchema = z.array(CatalogCollectionSchema);
