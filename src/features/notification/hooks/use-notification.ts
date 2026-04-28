/**
 * @file use-notification.ts
 * @description TanStack Query hooks for the Notification domain.
 */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../api/notification.api";

export const notificationKeys = {
  all: ["notification"] as const,
  list: (page: number) => [...notificationKeys.all, "list", page] as const,
} as const;

/** Hook: paginated notification list. */
export function useNotifications(page = 1) {
  return useQuery({
    queryKey: notificationKeys.list(page),
    queryFn: () => fetchNotifications(page),
    staleTime: 15_000,          // Re-fetch every 15s for near-real-time feel
    refetchInterval: 30_000,    // Poll every 30s when window is active
  });
}

/** Hook: derived unread count (from first page query). */
export function useUnreadNotificationCount() {
  const { data } = useNotifications(1);
  return data?.unread_count ?? 0;
}

/** Mutation: mark a single notification as read. */
export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => markNotificationRead(id),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}

/** Mutation: mark ALL notifications as read. */
export function useMarkAllNotificationsRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: markAllNotificationsRead,
    onSuccess: (res) => {
      void qc.invalidateQueries({ queryKey: notificationKeys.all });
      if (res.marked > 0) {
        toast.success(`${res.marked} notifications marked as read.`);
      }
    },
  });
}
