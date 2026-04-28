/**
 * @file order.schemas.ts
 * @description Zod validation schemas for the Order domain.
 */
import { z } from "zod";

const OrderStatusSchema = z.enum([
  "pending", "confirmed", "in_production",
  "shipped", "delivered", "cancelled", "refunded", "disputed",
]);
const EscrowStatusSchema = z.enum(["held", "released", "refunded", "disputed"]);
const PaymentStatusSchema = z.enum(["unpaid", "paid", "failed", "refunded"]);

export const OrderItemSnapshotSchema = z.object({
  id: z.string().uuid(),
  product_id: z.string().uuid(),
  product_title: z.string(),
  product_sku: z.string(),
  product_cover_image_url: z.string().url().nullable(),
  vendor_id: z.string().uuid(),
  vendor_name: z.string(),
  variant_id: z.string().uuid().nullable(),
  size_label: z.string().nullable(),
  color_label: z.string().nullable(),
  quantity: z.number().int().min(1),
  unit_price: z.string(),
  line_total: z.string(),
  commission_rate: z.string(),
  currency_code: z.string(),
  requires_measurement: z.boolean(),
});

export const OrderStatusHistorySchema = z.object({
  id: z.string().uuid(),
  status: OrderStatusSchema,
  notes: z.string(),
  actor_name: z.string().nullable(),
  created_at: z.string().datetime({ offset: true }),
});

export const OrderDeliveryTrackingSchema = z.object({
  id: z.string().uuid(),
  carrier: z.string(),
  tracking_id: z.string(),
  tracking_url: z.string().url().nullable(),
  status: z.string(),
  estimated_delivery: z.string().nullable(),
  updated_at: z.string().datetime({ offset: true }),
});

export const OrderRefundRequestSchema = z.object({
  id: z.string().uuid(),
  reason: z.string(),
  amount_requested: z.string(),
  status: z.enum(["pending", "approved", "rejected", "processed"]),
  admin_notes: z.string().nullable(),
  created_at: z.string().datetime({ offset: true }),
});

export const OrderListItemSchema = z.object({
  id: z.string().uuid(),
  order_number: z.string(),
  status: OrderStatusSchema,
  payment_status: PaymentStatusSchema,
  escrow_status: EscrowStatusSchema,
  item_count: z.number().int().min(0),
  subtotal: z.string(),
  final_total: z.string(),
  currency: z.string(),
  requires_measurement: z.boolean(),
  created_at: z.string().datetime({ offset: true }),
});

export const OrderDetailSchema = OrderListItemSchema.extend({
  buyer_name: z.string(),
  buyer_email: z.string().email(),
  buyer_phone: z.string().nullable(),
  buyer_address: z.record(z.unknown()),
  items: z.array(OrderItemSnapshotSchema),
  status_history: z.array(OrderStatusHistorySchema),
  delivery_tracking: OrderDeliveryTrackingSchema.nullable(),
  refund_request: OrderRefundRequestSchema.nullable(),
  notes: z.string(),
  idempotency_key: z.string(),
  paid_at: z.string().datetime({ offset: true }).nullable(),
  delivered_at: z.string().datetime({ offset: true }).nullable(),
  cancelled_at: z.string().datetime({ offset: true }).nullable(),
  updated_at: z.string().datetime({ offset: true }),
});

export const PaginatedOrderListSchema = z.object({
  count: z.number().int().min(0),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(OrderListItemSchema),
});

/** Parse helper. */
export function parseOrderResponse<T>(schema: z.ZodType<T>, data: unknown, ctx?: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const msg = `[Zod/Order] Schema mismatch${ctx ? ` in ${ctx}` : ""}: ${result.error.message}`;
    if (process.env.NODE_ENV === "development") {
      console.error(msg, result.error.flatten(), data);
      throw new Error(msg);
    }
    console.error(msg);
    return data as T;
  }
  return result.data;
}
