/**
 * @file cart.api.ts
 * @description Cart domain API client — Fashionistar frontend.
 *
 * All cart writes use `apiSync` (Axios → DRF) for strict transaction boundaries.
 * No Ninja async reads for cart — it's always user-specific session state.
 */
import { apiSync } from "@/core/api/client.sync";
import {
  parseCartResponse,
  CartSchema,
  CartItemSchema,
  CheckoutSessionSchema,
  SubmitCheckoutResponseSchema,
} from "../schemas/cart.schemas";
import type {
  Cart,
  CartItem,
  CheckoutSession,
  SubmitCheckoutResponse,
  AddCartItemInput,
  UpdateCartItemInput,
  ApplyCouponInput,
  PrepareCheckoutInput,
  SubmitCheckoutInput,
} from "../types/cart.types";

const BASE = "/cart";

// ── CART ─────────────────────────────────────────────────────────────────────

/** Fetch or create the current user's cart. */
export async function fetchCart(): Promise<Cart> {
  const { data } = await apiSync.get<unknown>(`${BASE}/`);
  return parseCartResponse(CartSchema, data, "fetchCart");
}

/** Add a product/variant to the cart. */
export async function addCartItem(input: AddCartItemInput): Promise<CartItem> {
  const { data } = await apiSync.post<unknown>(`${BASE}/items/`, input);
  return parseCartResponse(CartItemSchema, data, "addCartItem");
}

/** Update quantity of a cart item. */
export async function updateCartItem(
  itemId: string,
  input: UpdateCartItemInput,
): Promise<CartItem> {
  const { data } = await apiSync.patch<unknown>(`${BASE}/items/${itemId}/`, input);
  return parseCartResponse(CartItemSchema, data, "updateCartItem");
}

/** Remove a cart item. */
export async function removeCartItem(itemId: string): Promise<void> {
  await apiSync.delete(`${BASE}/items/${itemId}/`);
}

// ── COUPON ───────────────────────────────────────────────────────────────────

/** Apply a coupon code to the cart. Returns updated cart. */
export async function applyCoupon(input: ApplyCouponInput): Promise<Cart> {
  const { data } = await apiSync.post<unknown>(`${BASE}/coupon/apply/`, input);
  return parseCartResponse(CartSchema, data, "applyCoupon");
}

/** Remove the currently applied coupon. Returns updated cart. */
export async function removeCoupon(): Promise<Cart> {
  const { data } = await apiSync.delete<unknown>(`${BASE}/coupon/remove/`);
  return parseCartResponse(CartSchema, data, "removeCoupon");
}

// ── CHECKOUT ──────────────────────────────────────────────────────────────────

/**
 * Prepare a checkout session — validates cart, builds quote, checks measurement gate.
 * Returns a `CheckoutSession` with status `prepared` and a full `CheckoutQuote`.
 */
export async function prepareCheckout(
  input: PrepareCheckoutInput,
): Promise<CheckoutSession> {
  const { data } = await apiSync.post<unknown>(`${BASE}/checkout/prepare/`, input);
  return parseCartResponse(CheckoutSessionSchema, data, "prepareCheckout");
}

/**
 * Submit checkout — atomic order creation behind idempotency key.
 * On network retry, the same key returns the existing order without duplication.
 *
 * @param input.idempotency_key - UUID generated client-side before submission
 */
export async function submitCheckout(
  input: SubmitCheckoutInput,
): Promise<SubmitCheckoutResponse> {
  const { data } = await apiSync.post<unknown>(
    `${BASE}/checkout/submit/`,
    input,
    {
      // Explicit idempotency key header (apiSync also auto-injects but we
      // want the client-generated session key, not a random one per retry)
      headers: { "X-Idempotency-Key": input.idempotency_key },
    },
  );
  return parseCartResponse(
    SubmitCheckoutResponseSchema,
    data,
    "submitCheckout",
  );
}
