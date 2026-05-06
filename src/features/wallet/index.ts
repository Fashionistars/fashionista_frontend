/**
 * @file index.ts
 * @description Public API for the `features/wallet` canonical FSD slice.
 *
 * Dual-Engine Strategy:
 *  - DRF (sync)   → /v1/wallet/ (wallet read, PIN set/verify/change)
 *  - Ninja (async) → /ninja/wallet/ (balance + hold stats dashboard)
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  WalletAccount,
  WalletDashboardData,
  PinPayload,
  ChangePinPayload,
} from "./types/wallet.types";

// ── Schemas ────────────────────────────────────────────────────────────────
export {
  WalletSchema,
  WalletDashboardSchema,
  parseWalletResponse,
} from "./schemas/wallet.schemas";

// ── API ────────────────────────────────────────────────────────────────────
export {
  fetchWallet,
  setWalletPin,
  verifyWalletPin,
  changeWalletPin,
  // Ninja async endpoint
  getNinjaWalletDashboard,
} from "./api/wallet.api";

// ── TanStack Query Hooks ───────────────────────────────────────────────────
export {
  walletKeys,
  // DRF sync reads + mutations
  useWallet,
  useSetWalletPin,
  useVerifyWalletPin,
  useChangeWalletPin,
  // Ninja async read
  useWalletDashboard,
} from "./hooks/use-wallet";

// ── Components ─────────────────────────────────────────────────────────────
export * from "./components/WalletOverviewView";
