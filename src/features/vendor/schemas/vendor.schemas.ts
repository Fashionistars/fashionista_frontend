import { z } from "zod";

export const VendorSetupStateSchema = z.object({
  current_step: z.number(),
  profile_complete: z.boolean(),
  bank_details: z.boolean(),
  id_verified: z.boolean(),
  first_product: z.boolean(),
  onboarding_done: z.boolean(),
  completion_percentage: z.number(),
});

export const VendorProfileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  user_email: z.string(),
  store_name: z.string(),
  store_slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  logo_url: z.string(),
  cover_url: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  instagram_url: z.string(),
  tiktok_url: z.string(),
  twitter_url: z.string(),
  website_url: z.string(),
  total_products: z.number(),
  total_sales: z.number(),
  total_revenue: z.number(),
  average_rating: z.number(),
  review_count: z.number(),
  is_verified: z.boolean(),
  is_active: z.boolean(),
  is_featured: z.boolean(),
  setup_state: VendorSetupStateSchema.optional(),
});

export const VendorDashboardSchema = z.object({
  profile: z.object({
    id: z.string(),
    store_name: z.string(),
    store_slug: z.string(),
    tagline: z.string(),
    logo_url: z.string(),
    cover_url: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    is_verified: z.boolean(),
    is_active: z.boolean(),
    is_featured: z.boolean(),
  }),
  analytics: z.object({
    total_products: z.number(),
    total_sales: z.number(),
    total_revenue: z.number(),
    average_rating: z.number(),
    review_count: z.number(),
  }),
  setup_state: VendorSetupStateSchema,
  recent_activity: z.array(z.unknown()),
});

export const VendorSetupSchema = z.object({
  store_name: z.string().min(1),
  description: z.string().min(1),
  tagline: z.string().optional(),
  logo_url: z.string().url().optional().or(z.literal("")),
  cover_url: z.string().url().optional().or(z.literal("")),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z.string().optional(),
  instagram_url: z.string().url().optional().or(z.literal("")),
  tiktok_url: z.string().url().optional().or(z.literal("")),
  twitter_url: z.string().url().optional().or(z.literal("")),
  website_url: z.string().url().optional().or(z.literal("")),
});

export const VendorPayoutSchema = z.object({
  bank_name: z.string().min(1),
  bank_code: z.string().optional(),
  account_name: z.string().min(1),
  account_number: z.string().min(1),
  paystack_recipient_code: z.string().optional(),
});

export type VendorSetupStateInput = z.infer<typeof VendorSetupStateSchema>;
export type VendorProfileInput = z.infer<typeof VendorProfileSchema>;
export type VendorDashboardInput = z.infer<typeof VendorDashboardSchema>;
export type VendorSetupInput = z.infer<typeof VendorSetupSchema>;
export type VendorPayoutInput = z.infer<typeof VendorPayoutSchema>;
