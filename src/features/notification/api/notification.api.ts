/**
 * @file notification.api.ts + schemas + hooks combined
 * @description Full notification slice implementation.
 */
import { z } from "zod";
import { apiSync } from "@/core/api/client.sync";
import type { Notification, PaginatedNotifications, MarkReadResponse } from "./notification.types";

// ─── Schemas ───────────────────────────────────────────────────────────────

const NotificationSchema = z.object({
  id: z.string().uuid(),
  notification_type: z.string(),
  channel: z.enum(["in_app", "email", "push"]),
  title: z.string(),
  message: z.string(),
  action_url: z.string().url().nullable(),
  is_read: z.boolean(),
  created_at: z.string().datetime({ offset: true }),
});

export const PaginatedNotificationsSchema = z.object({
  count: z.number().int().min(0),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(NotificationSchema),
  unread_count: z.number().int().min(0),
});

// ─── API Functions ─────────────────────────────────────────────────────────

export async function fetchNotifications(page = 1): Promise<PaginatedNotifications> {
  const { data } = await apiSync.get<PaginatedNotifications>(
    `/notifications/?page=${page}`,
  );
  return data;
}

export async function markNotificationRead(notifId: string): Promise<void> {
  await apiSync.patch(`/notifications/${notifId}/read/`);
}

export async function markAllNotificationsRead(): Promise<MarkReadResponse> {
  const { data } = await apiSync.post<MarkReadResponse>(
    "/notifications/mark-all-read/",
  );
  return data;
}
