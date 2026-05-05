/**
 * @file payment.api.ts
 * @description Payment API client for Paystack-backed payment flows.
 */
import { z } from "zod";
import { apiSync } from "@/core/api/client.sync";
import { unwrapApiData } from "@/core/api/response";
import {
  BankOptionSchema,
  PaymentIntentSchema,
  parsePaymentResponse,
} from "../schemas/payment.schemas";
import type {
  BankOption,
  InitializePaymentInput,
  PaymentIntent,
  TransferRecipientInput,
} from "../types/payment.types";

export async function initializePayment(input: InitializePaymentInput): Promise<PaymentIntent> {
  const { data } = await apiSync.post<unknown>("/v1/payment/paystack/initialize/", input);
  return parsePaymentResponse(
    PaymentIntentSchema,
    unwrapApiData(data),
    "initializePayment",
  ) as PaymentIntent;
}

export async function verifyPayment(reference: string): Promise<PaymentIntent> {
  const { data } = await apiSync.get<unknown>(`/v1/payment/paystack/verify/${reference}/`);
  return parsePaymentResponse(
    PaymentIntentSchema,
    unwrapApiData(data),
    "verifyPayment",
  ) as PaymentIntent;
}

export async function fetchBanks(): Promise<BankOption[]> {
  const { data } = await apiSync.get<unknown>("/v1/payment/banks/");
  const payload = unwrapApiData<unknown>(data);
  const banks = Array.isArray(payload) ? payload : [];
  return parsePaymentResponse(z.array(BankOptionSchema), banks, "fetchBanks");
}

export async function createTransferRecipient(input: TransferRecipientInput): Promise<unknown> {
  const { data } = await apiSync.post<unknown>("/v1/payment/transfer-recipient/", input);
  return unwrapApiData(data);
}
