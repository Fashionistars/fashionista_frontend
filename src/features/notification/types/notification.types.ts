/**
 * @file notification.types.ts
 * @description Canonical types for the Notification domain.
 * Source: `apps/notification/serializers/`
 */

export type NotificationChannel = "in_app" | "email" | "push";
export type NotificationType =
  | "order_placed"
  | "order_confirmed"
  | "order_shipped"
  | "order_delivered"
  | "order_cancelled"
  | "payment_received"
  | "escrow_released"
  | "review_posted"
  | "measurement_required"
  | "custom";

export interface Notification {
  id: string;
  notification_type: NotificationType;
  channel: NotificationChannel;
  title: string;
  message: string;
  action_url: string | null;
  is_read: boolean;
  created_at: string;
}

export interface PaginatedNotifications {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notification[];
  unread_count: number;
}

export interface MarkReadResponse {
  marked: number;   // number of notifications marked as read
}
