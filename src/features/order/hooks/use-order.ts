/**
 * @file use-order.ts
 * @description TanStack Query v5 hooks for the Order domain.
 */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchClientOrders,
  fetchOrderDetail,
  cancelOrder,
  confirmDelivery,
  fetchVendorOrders,
  updateVendorProductionStatus,
  fetchAdminOrders,
  updateAdminDeliveryStatus,
} from "../api/order.api";
import type {
  CancelOrderInput,
  VendorProductionStatusInput,
  AdminDeliveryStatusInput,
} from "../types/order.types";

export const orderKeys = {
  all: ["order"] as const,
  clientLists: () => [...orderKeys.all, "client", "list"] as const,
  clientList: (page: number) => [...orderKeys.clientLists(), page] as const,
  detail: (id: string) => [...orderKeys.all, "detail", id] as const,
  vendorLists: () => [...orderKeys.all, "vendor", "list"] as const,
  vendorList: (page: number) => [...orderKeys.vendorLists(), page] as const,
  adminLists: () => [...orderKeys.all, "admin", "list"] as const,
  adminList: (page: number) => [...orderKeys.adminLists(), page] as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT HOOKS
// ─────────────────────────────────────────────────────────────────────────────

export function useClientOrders(page = 1) {
  return useQuery({
    queryKey: orderKeys.clientList(page),
    queryFn: () => fetchClientOrders(page),
    staleTime: 30_000,
  });
}

export function useOrderDetail(orderId: string) {
  return useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => fetchOrderDetail(orderId),
    staleTime: 30_000,
    enabled: !!orderId,
  });
}

export function useCancelOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, input }: { orderId: string; input: CancelOrderInput }) =>
      cancelOrder(orderId, input),
    onSuccess: (order) => {
      void qc.setQueryData(orderKeys.detail(order.id), order);
      void qc.invalidateQueries({ queryKey: orderKeys.clientLists() });
      toast.success("Order cancelled successfully.");
    },
    onError: () => {
      toast.error("Could not cancel order. Please contact support.");
    },
  });
}

export function useConfirmDelivery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => confirmDelivery(orderId),
    onSuccess: (order) => {
      void qc.setQueryData(orderKeys.detail(order.id), order);
      void qc.invalidateQueries({ queryKey: orderKeys.clientLists() });
      toast.success("Delivery confirmed! Payment released to vendor.");
    },
    onError: () => {
      toast.error("Could not confirm delivery.");
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// VENDOR HOOKS
// ─────────────────────────────────────────────────────────────────────────────

export function useVendorOrders(page = 1) {
  return useQuery({
    queryKey: orderKeys.vendorList(page),
    queryFn: () => fetchVendorOrders(page),
    staleTime: 30_000,
  });
}

export function useUpdateVendorProductionStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      input,
    }: {
      orderId: string;
      input: VendorProductionStatusInput;
    }) => updateVendorProductionStatus(orderId, input),
    onSuccess: (order) => {
      void qc.setQueryData(orderKeys.detail(order.id), order);
      void qc.invalidateQueries({ queryKey: orderKeys.vendorLists() });
      toast.success("Order status updated.");
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN HOOKS
// ─────────────────────────────────────────────────────────────────────────────

export function useAdminOrders(page = 1) {
  return useQuery({
    queryKey: orderKeys.adminList(page),
    queryFn: () => fetchAdminOrders(page),
    staleTime: 30_000,
  });
}

export function useUpdateAdminDeliveryStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      orderId,
      input,
    }: {
      orderId: string;
      input: AdminDeliveryStatusInput;
    }) => updateAdminDeliveryStatus(orderId, input),
    onSuccess: (order) => {
      void qc.setQueryData(orderKeys.detail(order.id), order);
      void qc.invalidateQueries({ queryKey: orderKeys.adminLists() });
      toast.success("Delivery status updated.");
    },
  });
}
