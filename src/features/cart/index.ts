/**
 * @file index.ts
 * @description Public API for the `features/cart` canonical FSD slice.
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  Cart,
  CartItem,
  CartProductRef,
  CheckoutSession,
  CheckoutQuote,
  AppliedCoupon,
  AddCartItemInput,
  UpdateCartItemInput,
  ApplyCouponInput,
  PrepareCheckoutInput,
  SubmitCheckoutInput,
  SubmitCheckoutResponse,
} from "./types/cart.types";

// ── Schemas ────────────────────────────────────────────────────────────────
export {
  CartSchema,
  CartItemSchema,
  CheckoutSessionSchema,
  CheckoutQuoteSchema,
} from "./schemas/cart.schemas";

// ── API ────────────────────────────────────────────────────────────────────
export {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  applyCoupon,
  removeCoupon,
  prepareCheckout,
  submitCheckout,
} from "./api/cart.api";

// ── TanStack Query Hooks ───────────────────────────────────────────────────
export {
  cartKeys,
  useCart,
  useAddCartItem,
  useUpdateCartItem,
  useRemoveCartItem,
  useApplyCoupon,
  useRemoveCoupon,
  usePrepareCheckout,
  useSubmitCheckout,
} from "./hooks/use-cart";

// ── Zustand Stores ─────────────────────────────────────────────────────────
export { useCartStore } from "./store/cart.store";
