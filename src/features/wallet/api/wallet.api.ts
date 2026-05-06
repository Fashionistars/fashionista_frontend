/**
 * @file wallet.api.ts
 * @description Wallet API client.
 *
 * Endpoint Routing:
 *  - DRF sync  → /v1/wallet/  (reads + PIN writes, CustomJSONRenderer)
 *  - Ninja async → /ninja/wallet/  (dashboard snapshot, future real-time)
 */
import { apiSync } from "@/core/api/client.sync";
import { apiAsync } from "@/core/api/client.async";
import { unwrapApiData } from "@/core/api/response";
import {
  WalletDashboardSchema,
  WalletSchema,
  parseWalletResponse,
} from "../schemas/wallet.schemas";
import type {
  ChangePinPayload,
  PinPayload,
  WalletAccount,
  WalletDashboardData,
} from "../types/wallet.types";

// ─── DRF Sync Endpoints ───────────────────────────────────────────────────────

export async function fetchWallet(): Promise<WalletAccount> {
  const { data } = await apiSync.get<unknown>("/v1/wallet/me/");
  return parseWalletResponse(
    WalletSchema,
    unwrapApiData(data),
    "fetchWallet",
  ) as WalletAccount;
}

export async function setWalletPin(payload: PinPayload): Promise<WalletAccount> {
  const { data } = await apiSync.post<unknown>("/v1/wallet/pin/set/", payload);
  return parseWalletResponse(
    WalletSchema,
    unwrapApiData(data),
    "setWalletPin",
  ) as WalletAccount;
}

export async function verifyWalletPin(payload: PinPayload): Promise<{ valid: boolean }> {
  const { data } = await apiSync.post<unknown>("/v1/wallet/pin/verify/", payload);
  return unwrapApiData<{ valid: boolean }>(data);
}

export async function changeWalletPin(payload: ChangePinPayload): Promise<WalletAccount> {
  const { data } = await apiSync.post<unknown>("/v1/wallet/pin/change/", payload);
  return parseWalletResponse(
    WalletSchema,
    unwrapApiData(data),
    "changeWalletPin",
  ) as WalletAccount;
}

// ─── Ninja Async Endpoints ────────────────────────────────────────────────────

/**
 * GET /ninja/wallet/dashboard/
 * Returns: WalletDashboardData (balance + hold stats) from Wallet.aget_full_dashboard_data()
 */
export async function getNinjaWalletDashboard(): Promise<WalletDashboardData> {
  const data = await apiAsync.get("ninja/wallet/dashboard/").json<unknown>();
  return parseWalletResponse(
    WalletDashboardSchema,
    data,
    "getNinjaWalletDashboard",
  ) as WalletDashboardData;
}

