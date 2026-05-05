/**
 * @file payment.schemas.ts
 * @description Zod schemas for payment provider responses.
 */
import { z } from "zod";

export const PaymentIntentSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  provider: z.literal("paystack").optional().default("paystack"),
  purpose: z.enum([
    "wallet_topup",
    "order_payment",
    "measurement_fee",
    "vendor_service",
    "advertisement_fee",
  ]),
  amount: z.union([z.string(), z.number()]).transform(String),
  currency: z.string().optional().default("NGN"),
  status: z.enum(["pending", "initialized", "succeeded", "failed", "cancelled"]),
  reference: z.string(),
  authorization_url: z.string().optional().default(""),
  access_code: z.string().optional().default(""),
  order_id: z.string().optional().default(""),
  created_at: z.string().optional(),
});

export const BankOptionSchema = z.object({
  name: z.string(),
  code: z.string(),
  country: z.string().optional(),
});

export function parsePaymentResponse<T>(schema: z.ZodType<T>, data: unknown, ctx: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const message = `[Zod/Payment] Schema mismatch in ${ctx}: ${result.error.message}`;
    if (process.env.NODE_ENV === "development") {
      console.error(message, result.error.flatten(), data);
      throw new Error(message);
    }
    console.error(message);
    return data as T;
  }
  return result.data;
}
