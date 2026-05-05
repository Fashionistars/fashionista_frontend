"use client";

/**
 * @file use-payment.ts
 * @description TanStack Query hooks for payment flows.
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTransferRecipient,
  fetchBanks,
  initializePayment,
  verifyPayment,
} from "../api/payment.api";

export const paymentKeys = {
  all: ["payment"] as const,
  banks: () => [...paymentKeys.all, "banks"] as const,
  verify: (reference: string) => [...paymentKeys.all, "verify", reference] as const,
};

export function useBanks() {
  return useQuery({
    queryKey: paymentKeys.banks(),
    queryFn: fetchBanks,
    staleTime: 10 * 60_000,
  });
}

export function useInitializePayment() {
  return useMutation({ mutationFn: initializePayment });
}

export function useVerifyPayment(reference: string) {
  return useQuery({
    queryKey: paymentKeys.verify(reference),
    queryFn: () => verifyPayment(reference),
    enabled: Boolean(reference),
    staleTime: 30_000,
  });
}

export function useCreateTransferRecipient() {
  return useMutation({ mutationFn: createTransferRecipient });
}
