/**
 * @file builder/schemas/index.ts
 * @description Zod validation schemas and canonical TypeScript types for the
 * Product Builder wizard (multi-step vendor product creation flow).
 *
 * Naming convention:
 *   - *Schema  → Zod schema (used for server-action validation)
 *   - *Type    → TS type inferred from the Zod schema
 *
 * All types marked with `// global` are intentionally kept local here;
 * the global ambient declarations (`NewProductType`, `NewProductFieldTypes`,
 * `FormSchema`) referenced by legacy builder components are re-exported so
 * the components receive proper typings without requiring global augmentation.
 */

import { z } from "zod";

// ─── Step 1: Basic Information ───────────────────────────────────────────────

export const BasicInformationSchema = z.object({
  image_1: z.any().optional(),
  title: z.string().min(3, "Product title must be at least 3 characters"),
  description: z.string().min(10, "Product description must be at least 10 characters"),
});

export type BasicInformationType = z.infer<typeof BasicInformationSchema>;

// ─── Step 2: Prices ──────────────────────────────────────────────────────────

export const PricesSchema = z.object({
  sales_price: z.string().min(1, "Sales price is required"),
  regular_price: z.string().min(1, "Regular price is required"),
  shipping_amount: z.string().default("1000"),
  stock_qty: z.string().min(1, "Stock quantity is required"),
  tag: z.string().optional(),
  total_price: z.string().default("2000"),
});

export type PricesType = z.infer<typeof PricesSchema>;

// ─── Step 3: Category ────────────────────────────────────────────────────────

export const CategorySchema = z.object({
  category: z.string().min(1, "Category is required"),
  brands: z.string().optional(),
});

export type CategoryType = z.infer<typeof CategorySchema>;

// ─── Step 4: Gallery ─────────────────────────────────────────────────────────

export const GallerySchema = z.object({
  image_2: z.any().optional(),
  image_3: z.any().optional(),
  image_4: z.any().optional(),
  video: z.any().optional(),
});

export type GalleryType = z.infer<typeof GallerySchema>;

// ─── Step 5: Specification ───────────────────────────────────────────────────

export const SpecificationSchema = z.object({
  specification: z.object({
    title: z.string().min(1, "Specification title is required"),
    content: z.string().min(1, "Specification content is required"),
  }),
});

export type SpecificationType = z.infer<typeof SpecificationSchema>;

// ─── Step 6: Sizes ───────────────────────────────────────────────────────────

export const SizesSchema = z.object({
  sizes: z.object({
    size: z.string().min(1, "Size label is required"),
    price: z.string().min(1, "Size price is required"),
  }),
});

export type SizesType = z.infer<typeof SizesSchema>;

// ─── Step 7: Colors ──────────────────────────────────────────────────────────

export const ColorsSchema = z.object({
  colors: z.object({
    name: z.string().min(1, "Color name is required"),
    image: z.any().optional(),
    code: z.string().optional(),
  }),
});

export type ColorsType = z.infer<typeof ColorsSchema>;

// ─── Full Form Schema (union of all steps) ───────────────────────────────────
/**
 * FormSchema — the complete product wizard schema used by MultiStep's
 * `useForm<z.infer<typeof FormSchema>>` hook.
 */
export const FormSchema = BasicInformationSchema.merge(PricesSchema)
  .merge(CategorySchema)
  .merge(GallerySchema)
  .merge(SpecificationSchema)
  .merge(SizesSchema)
  .merge(ColorsSchema);

export type FormSchemaType = z.infer<typeof FormSchema>;

// ─── Canonical builder types (used across builder components) ─────────────────

/**
 * NewProductType — the shape of the global product draft held in
 * `NewProductContext` / localStorage.
 */
export type NewProductType = {
  image_1: File;
  title: string;
  description: string;
  sales_price: string;
  regular_price: string;
  shipping_amount: string;
  stock_qty: string;
  tag: string;
  total_price: string;
  category: string;
  brands: string;
  image_2: File;
  image_3: File;
  image_4: File;
  video: File;
  specification: {
    title: string;
    content: string;
  };
  sizes: {
    size: string;
    price: string;
  };
  colors: {
    name: string;
    image: File;
    code: string;
  };
};

/**
 * NewProductFieldTypes — a partial-friendly alias so individual step
 * components can type their `updateNewProductField` parameter.
 */
export type NewProductFieldTypes = Partial<NewProductType>;
