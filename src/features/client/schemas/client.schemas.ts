import { z } from "zod";

export const ClientAddressSchema = z.object({
  id: z.string().uuid(),
  label: z.string(),
  full_name: z.string(),
  phone: z.string(),
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
  is_default: z.boolean(),
});

export const ClientProfileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  user_email: z.string(),
  bio: z.string(),
  default_shipping_address: z.string(),
  state: z.string(),
  country: z.string(),
  preferred_size: z.string(),
  style_preferences: z.array(z.string()),
  favourite_colours: z.array(z.string()),
  total_orders: z.number(),
  total_spent_ngn: z.number(),
  is_profile_complete: z.boolean(),
  email_notifications_enabled: z.boolean(),
  sms_notifications_enabled: z.boolean(),
  addresses: z.array(ClientAddressSchema),
});

export const ClientDashboardSchema = z.object({
  profile: z.object({
    id: z.string(),
    bio: z.string(),
    preferred_size: z.string(),
    style_preferences: z.array(z.string()),
    favourite_colours: z.array(z.string()),
    country: z.string(),
    state: z.string(),
    is_profile_complete: z.boolean(),
  }),
  analytics: z.object({
    total_orders: z.number(),
    total_spent_ngn: z.number(),
    saved_addresses: z.number(),
  }),
  ai_recommendations: z.array(z.unknown()),
});

export const ClientProfileUpdateSchema = z.object({
  bio: z.string().max(500).optional(),
  default_shipping_address: z.string().optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  preferred_size: z.string().optional(),
  style_preferences: z.array(z.string()).optional(),
  favourite_colours: z.array(z.string()).optional(),
  email_notifications_enabled: z.boolean().optional(),
  sms_notifications_enabled: z.boolean().optional(),
});

export type ClientAddressInput = z.infer<typeof ClientAddressSchema>;
export type ClientProfileInput = z.infer<typeof ClientProfileSchema>;
export type ClientDashboardInput = z.infer<typeof ClientDashboardSchema>;
export type ClientProfileUpdateInput = z.infer<typeof ClientProfileUpdateSchema>;
