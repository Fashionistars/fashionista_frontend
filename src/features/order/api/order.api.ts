/**
 * @file order.api.ts
 * @description Order domain API client — Fashionistar frontend.
 * All order operations use `apiSync` (Axios → DRF).
 */
import { apiSync } from "@/core/api/client.sync";
import {
  parseOrderResponse,
  PaginatedOrderListSchema,
  OrderDetailSchema,
} from "../schemas/order.schemas";
import type {
  PaginatedOrderList,
  OrderDetail,
  CancelOrderInput,
  VendorProductionStatusInput,
  AdminDeliveryStatusInput,
} from "../types/order.types";

const BASE = "/orders";

// ── CLIENT ────────────────────────────────────────────────────────────────────

/** Fetch paginated order list (client — own orders only). */
export async function fetchClientOrders(page = 1): Promise<PaginatedOrderList> {
  const { data } = await apiSync.get<unknown>(`${BASE}/?page=${page}`);
  return parseOrderResponse(PaginatedOrderListSchema, data, "fetchClientOrders");
}

/** Fetch single order detail (client — owner only). */
export async function fetchOrderDetail(orderId: string): Promise<OrderDetail> {
  const { data } = await apiSync.get<unknown>(`${BASE}/${orderId}/`);
  return parseOrderResponse(OrderDetailSchema, data, "fetchOrderDetail");
}

/** Cancel an order (client — owner, allowed statuses only). */
export async function cancelOrder(
  orderId: string,
  input: CancelOrderInput,
): Promise<OrderDetail> {
  const { data } = await apiSync.post<unknown>(`${BASE}/${orderId}/cancel/`, input);
  return parseOrderResponse(OrderDetailSchema, data, "cancelOrder");
}

/** Confirm delivery and trigger escrow release (client — owner). */
export async function confirmDelivery(orderId: string): Promise<OrderDetail> {
  const { data } = await apiSync.post<unknown>(
    `${BASE}/${orderId}/confirm-delivery/`,
  );
  return parseOrderResponse(OrderDetailSchema, data, "confirmDelivery");
}

// ── VENDOR ────────────────────────────────────────────────────────────────────

/** Fetch vendor's order list. */
export async function fetchVendorOrders(page = 1): Promise<PaginatedOrderList> {
  const { data } = await apiSync.get<unknown>(`${BASE}/vendor/?page=${page}`);
  return parseOrderResponse(PaginatedOrderListSchema, data, "fetchVendorOrders");
}

/** Update production/shipping status (vendor). */
export async function updateVendorProductionStatus(
  orderId: string,
  input: VendorProductionStatusInput,
): Promise<OrderDetail> {
  const { data } = await apiSync.patch<unknown>(
    `${BASE}/vendor/${orderId}/production-status/`,
    input,
  );
  return parseOrderResponse(OrderDetailSchema, data, "updateVendorProductionStatus");
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────

/** Fetch all orders (admin). */
export async function fetchAdminOrders(page = 1): Promise<PaginatedOrderList> {
  const { data } = await apiSync.get<unknown>(`${BASE}/admin/?page=${page}`);
  return parseOrderResponse(PaginatedOrderListSchema, data, "fetchAdminOrders");
}

/** Update delivery status (admin). */
export async function updateAdminDeliveryStatus(
  orderId: string,
  input: AdminDeliveryStatusInput,
): Promise<OrderDetail> {
  const { data } = await apiSync.patch<unknown>(
    `${BASE}/admin/${orderId}/delivery-status/`,
    input,
  );
  return parseOrderResponse(OrderDetailSchema, data, "updateAdminDeliveryStatus");
}
