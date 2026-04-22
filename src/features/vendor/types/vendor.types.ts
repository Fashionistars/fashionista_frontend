export type VendorOnboardingStatus =
  | "not_started"
  | "draft"
  | "submitted"
  | "active"
  | "restricted";

export interface VendorSetupState {
  current_step: number;
  profile_complete: boolean;
  bank_details: boolean;
  id_verified: boolean;
  first_product: boolean;
  onboarding_done: boolean;
  completion_percentage: number;
}

export interface VendorProfile {
  id: string;
  user_id: string;
  user_email: string;
  store_name: string;
  store_slug: string;
  tagline: string;
  description: string;
  logo_url: string;
  cover_url: string;
  city: string;
  state: string;
  country: string;
  instagram_url: string;
  tiktok_url: string;
  twitter_url: string;
  website_url: string;
  total_products: number;
  total_sales: number;
  total_revenue: number;
  average_rating: number;
  review_count: number;
  is_verified: boolean;
  is_active: boolean;
  is_featured: boolean;
  setup_state?: VendorSetupState;
}

export interface VendorDashboard {
  profile: {
    id: string;
    store_name: string;
    store_slug: string;
    tagline: string;
    logo_url: string;
    cover_url: string;
    city: string;
    state: string;
    country: string;
    is_verified: boolean;
    is_active: boolean;
    is_featured: boolean;
  };
  analytics: {
    total_products: number;
    total_sales: number;
    total_revenue: number;
    average_rating: number;
    review_count: number;
  };
  setup_state: VendorSetupState;
  recent_activity: unknown[];
}

export interface VendorSetupPayload {
  store_name: string;
  description: string;
  tagline?: string;
  logo_url?: string;
  cover_url?: string;
  city: string;
  state: string;
  country?: string;
  instagram_url?: string;
  tiktok_url?: string;
  twitter_url?: string;
  website_url?: string;
}

export interface VendorPayoutPayload {
  bank_name: string;
  bank_code?: string;
  account_name: string;
  account_number: string;
  paystack_recipient_code?: string;
}
