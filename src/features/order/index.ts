/**
 * @file index.ts
 * @description Public API for the `features/order` canonical FSD slice.
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  OrderDetail,
  OrderListItem,
  OrderItemSnapshot,
  OrderStatus,
  EscrowStatus,
  PaymentStatus,
  OrderStatusHistory,
  OrderDeliveryTracking,
  OrderRefundRequest,
  PaginatedOrderList,
  CancelOrderInput,
  VendorProductionStatusInput,
  AdminDeliveryStatusInput,
} from "./types/order.types";

// ── Schemas ────────────────────────────────────────────────────────────────
export {
  OrderListItemSchema,
  OrderDetailSchema,
  PaginatedOrderListSchema,
} from "./schemas/order.schemas";

// ── API ────────────────────────────────────────────────────────────────────
export {
  fetchClientOrders,
  fetchOrderDetail,
  cancelOrder,
  confirmDelivery,
  fetchVendorOrders,
  updateVendorProductionStatus,
  fetchAdminOrders,
  updateAdminDeliveryStatus,
} from "./api/order.api";

// ── TanStack Query Hooks ───────────────────────────────────────────────────
export {
  orderKeys,
  useClientOrders,
  useOrderDetail,
  useCancelOrder,
  useConfirmDelivery,
  useVendorOrders,
  useUpdateVendorProductionStatus,
  useAdminOrders,
  useUpdateAdminDeliveryStatus,
} from "./hooks/use-order";

// ── Server Actions ─────────────────────────────────────────────────────────
export {
  getClientOrdersAction,
  getOrderDetailAction,
  trackOrderAction,
} from "./api/order.server-actions";

// ── Components ─────────────────────────────────────────────────────────────
export { OrderTable, OrderList } from "./components";

