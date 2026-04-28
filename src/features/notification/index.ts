/**
 * @file index.ts
 * @description Public API for the `features/notification` canonical FSD slice.
 */
export type {
  Notification,
  PaginatedNotifications,
  MarkReadResponse,
  NotificationType,
  NotificationChannel,
} from "./types/notification.types";

export {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "./api/notification.api";

export {
  notificationKeys,
  useNotifications,
  useUnreadNotificationCount,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "./hooks/use-notification";
