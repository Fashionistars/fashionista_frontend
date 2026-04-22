export interface ClientAddress {
  id: string;
  label: string;
  full_name: string;
  phone: string;
  street_address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  is_default: boolean;
}

export interface ClientProfile {
  id: string;
  user_id: string;
  user_email: string;
  bio: string;
  default_shipping_address: string;
  state: string;
  country: string;
  preferred_size: string;
  style_preferences: string[];
  favourite_colours: string[];
  total_orders: number;
  total_spent_ngn: number;
  is_profile_complete: boolean;
  email_notifications_enabled: boolean;
  sms_notifications_enabled: boolean;
  addresses: ClientAddress[];
}

export interface ClientDashboardAnalytics {
  total_orders: number;
  total_spent_ngn: number;
  saved_addresses: number;
}

export interface ClientDashboard {
  profile: {
    id: string;
    bio: string;
    preferred_size: string;
    style_preferences: string[];
    favourite_colours: string[];
    country: string;
    state: string;
    is_profile_complete: boolean;
  };
  analytics: ClientDashboardAnalytics;
  ai_recommendations: unknown[];
}

export interface ClientProfileUpdatePayload {
  bio?: string;
  default_shipping_address?: string;
  state?: string;
  country?: string;
  preferred_size?: string;
  style_preferences?: string[];
  favourite_colours?: string[];
  email_notifications_enabled?: boolean;
  sms_notifications_enabled?: boolean;
}
