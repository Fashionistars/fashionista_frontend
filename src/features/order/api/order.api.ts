/**
 * @file order.api.ts
 * @description Order domain API client — Fashionistar frontend.
 * Reads use `apiAsync` (Ky → Ninja); writes use `apiSync` (Axios → DRF).
 */
import { apiAsync } from "@/core/api/client.async";
import { apiSync } from "@/core/api/client.sync";
import { unwrapApiData } from "@/core/api/response";
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

type NinjaListEnvelope = {
  count?: number;
  data?: unknown[];
  results?: unknown[];
  next?: string | null;
  previous?: string | null;
};

function normalizeNinjaOrderList(payload: unknown): PaginatedOrderList {
  const unwrapped = unwrapApiData<NinjaListEnvelope | unknown[]>(payload);
  if (Array.isArray(unwrapped)) {
    return {
      count: unwrapped.length,
      next: null,
      previous: null,
      results: unwrapped as PaginatedOrderList["results"],
    };
  }
  const rows = Array.isArray(unwrapped?.data)
    ? unwrapped.data
    : Array.isArray(unwrapped?.results)
      ? unwrapped.results
      : [];
  return {
    count: unwrapped?.count ?? rows.length,
    next: unwrapped?.next ?? null,
    previous: unwrapped?.previous ?? null,
    results: rows as PaginatedOrderList["results"],
  };
}

// ── CLIENT ────────────────────────────────────────────────────────────────────

/** Fetch paginated order list (client — own orders only). */
export async function fetchClientOrders(page = 1): Promise<PaginatedOrderList> {
  const data = await apiAsync.get("orders/", {
    searchParams: { page, limit: 50 },
  }).json();
  return parseOrderResponse(
    PaginatedOrderListSchema,
    normalizeNinjaOrderList(data),
    "fetchClientOrders",
  ) as PaginatedOrderList;
}

/** Fetch single order detail (client — owner only). */
export async function fetchOrderDetail(orderId: string): Promise<OrderDetail> {
  const data = await apiAsync.get(`orders/${orderId}/`).json();
  return parseOrderResponse(
    OrderDetailSchema,
    unwrapApiData(data),
    "fetchOrderDetail",
  ) as OrderDetail;
}

/** Cancel an order (client — owner, allowed statuses only). */
export async function cancelOrder(
  orderId: string,
  input: CancelOrderInput,
): Promise<OrderDetail> {
  const { data } = await apiSync.post<unknown>(`${BASE}/${orderId}/cancel/`, input);
  return parseOrderResponse(OrderDetailSchema, data, "cancelOrder") as OrderDetail;
}

/** Confirm delivery and trigger escrow release (client — owner). */
export async function confirmDelivery(orderId: string): Promise<OrderDetail> {
  const { data } = await apiSync.post<unknown>(
    `${BASE}/${orderId}/confirm-delivery/`,
  );
  return parseOrderResponse(OrderDetailSchema, data, "confirmDelivery") as OrderDetail;
}

// ── VENDOR ────────────────────────────────────────────────────────────────────

/** Fetch vendor's order list. */
export async function fetchVendorOrders(page = 1): Promise<PaginatedOrderList> {
  const data = await apiAsync.get("orders/vendor/", {
    searchParams: { page, limit: 50 },
  }).json();
  return parseOrderResponse(
    PaginatedOrderListSchema,
    normalizeNinjaOrderList(data),
    "fetchVendorOrders",
  ) as PaginatedOrderList;
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
  return parseOrderResponse(
    OrderDetailSchema,
    data,
    "updateVendorProductionStatus",
  ) as OrderDetail;
}

// ── ADMIN ─────────────────────────────────────────────────────────────────────

/** Fetch all orders (admin). */
export async function fetchAdminOrders(page = 1): Promise<PaginatedOrderList> {
  const data = await apiAsync.get("orders/admin/", {
    searchParams: { page, limit: 100 },
  }).json();
  return parseOrderResponse(
    PaginatedOrderListSchema,
    normalizeNinjaOrderList(data),
    "fetchAdminOrders",
  ) as PaginatedOrderList;
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
  return parseOrderResponse(
    OrderDetailSchema,
    data,
    "updateAdminDeliveryStatus",
  ) as OrderDetail;
}
