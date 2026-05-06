/**
 * @file index.ts
 * @description Public API for the `features/payment` canonical FSD slice.
 *
 * Dual-Engine Strategy:
 *  - DRF (sync)   → /v1/payment/ (initialize, verify, banks, transfer recipient)
 *  - Ninja (async) → /ninja/payments/ (dashboard, summary, history)
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  PaymentIntent,
  PaymentSummary,
  PaymentDashboard,
  NinjaPaymentHistory,
  BankOption,
  InitializePaymentInput,
  TransferRecipientInput,
} from "./types/payment.types";

// ── Schemas ────────────────────────────────────────────────────────────────
export {
  PaymentIntentSchema,
  PaymentSummarySchema,
  PaymentDashboardSchema,
  NinjaPaymentHistorySchema,
  BankOptionSchema,
  parsePaymentResponse,
} from "./schemas/payment.schemas";

// ── API ────────────────────────────────────────────────────────────────────
export {
  initializePayment,
  verifyPayment,
  fetchBanks,
  createTransferRecipient,
  getNinjaPaymentDashboard,
  getNinjaPaymentSummary,
  getNinjaPaymentHistory,
} from "./api/payment.api";

// ── TanStack Query Hooks ───────────────────────────────────────────────────
export {
  paymentKeys,
  useInitializePayment,
  useVerifyPayment,
  useBanks,
  useCreateTransferRecipient,
  useNinjaPaymentDashboard,
  useNinjaPaymentSummary,
  useNinjaPaymentHistory,
} from "./hooks/use-payment";

// ── Components ─────────────────────────────────────────────────────────────
export { PaymentOverviewView } from "./components/PaymentOverviewView";
