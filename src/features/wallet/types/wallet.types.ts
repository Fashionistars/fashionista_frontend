/**
 * @file wallet.types.ts
 * @description Wallet feature contracts shared by client and vendor dashboards.
 *
 * Versioning:
 *  - v1: DRF sync balance, PIN mutations
 *  - v2: Ninja async dashboard (WalletDashboardData, WalletHoldStats)
 */

export type WalletOwnerType =
  | "client"
  | "vendor"
  | "support"
  | "editor"
  | "moderator"
  | "admin"
  | "company";

export type WalletStatus = "active" | "inactive" | "frozen" | "suspended" | "closed";

// ─── DRF Sync Types ──────────────────────────────────────────────────────────

export interface WalletAccount {
  id: string;
  owner_type: WalletOwnerType;
  name: string;
  account_number: string;
  account_name: string;
  bank_name: string;
  provider: string;
  balance: string;
  available_balance: string;
  pending_balance: string;
  escrow_balance: string;
  status: WalletStatus;
  has_pin: boolean;
  currency: string | { code?: string; symbol?: string };
}

export interface PinPayload {
  pin: string;
}

export interface ChangePinPayload {
  current_pin: string;
  new_pin: string;
}

// ─── Ninja Async Dashboard Types ─────────────────────────────────────────────

export interface WalletHoldStats {
  active_holds_count: number;
  total_held_amount: string;
}

export interface WalletBalanceSnapshot {
  id?: string;
  name?: string;
  account_number?: string;
  account_name?: string;
  bank_name?: string;
  provider?: string;
  balance: string;
  available_balance: string;
  pending_balance: string;
  escrow_balance: string;
  status: WalletStatus;
  has_pin: boolean;
  currency_code: string;
  currency_symbol?: string;
}

export interface WalletDashboardData extends WalletBalanceSnapshot, WalletHoldStats {}

