/**
 * @file wallet.types.ts
 * @description Wallet feature contracts shared by client and vendor dashboards.
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
