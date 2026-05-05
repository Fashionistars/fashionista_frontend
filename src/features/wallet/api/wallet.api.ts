/**
 * @file wallet.api.ts
 * @description Wallet API client. Reads and PIN writes use DRF sync endpoints
 * until the backend exposes a dedicated Ninja read surface.
 */
import { apiSync } from "@/core/api/client.sync";
import { unwrapApiData } from "@/core/api/response";
import { WalletSchema, parseWalletResponse } from "../schemas/wallet.schemas";
import type { ChangePinPayload, PinPayload, WalletAccount } from "../types/wallet.types";

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
