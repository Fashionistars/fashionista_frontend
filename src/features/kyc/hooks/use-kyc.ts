"use client";

/**
 * @file use-kyc.ts
 * @description TanStack Query hooks for the KYC FSD feature.
 *
 * Hook Tiers:
 *  - DRF mutation hooks: useSubmitKyc
 *  - DRF read hooks: useKycStatus (legacy)
 *  - Ninja async hooks: useNinjaKycStatus, useNinjaKycDocuments
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchKycStatus,
  getNinjaKycDocuments,
  getNinjaKycStatus,
  submitKyc,
} from "../api/kyc.api";
import type { KycSubmitInput } from "../types/kyc.types";

// ─── Query Key Factory ────────────────────────────────────────────────────────

export const kycKeys = {
  all: ["kyc"] as const,
  /** DRF legacy status */
  status: () => [...kycKeys.all, "status"] as const,
  /** Ninja status summary (status + document_count) */
  ninjaStatus: () => [...kycKeys.all, "ninja", "status"] as const,
  /** Ninja full documents view */
  ninjaDocuments: () => [...kycKeys.all, "ninja", "documents"] as const,
};

// ─── DRF Sync Hooks ───────────────────────────────────────────────────────────

/** DRF KYC status read (legacy — prefer useNinjaKycStatus for UI components) */
export function useKycStatus() {
  return useQuery({
    queryKey: kycKeys.status(),
    queryFn: fetchKycStatus,
    staleTime: 60_000,
  });
}

/** Submit KYC documents (DRF sync mutation) */
export function useSubmitKyc() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: KycSubmitInput) => submitKyc(input),
    onSuccess: () => {
      // Invalidate both Ninja reads so dashboard refreshes
      qc.invalidateQueries({ queryKey: kycKeys.ninjaStatus() });
      qc.invalidateQueries({ queryKey: kycKeys.ninjaDocuments() });
      qc.invalidateQueries({ queryKey: kycKeys.status() });
    },
  });
}

// ─── Ninja Async Hooks ────────────────────────────────────────────────────────

/**
 * KYC status summary from Ninja /kyc/status/
 * Returns: status, is_approved, document_count, timestamps.
 * 2 DB queries: afirst (submission) + acount (documents).
 */
export function useNinjaKycStatus() {
  return useQuery({
    queryKey: kycKeys.ninjaStatus(),
    queryFn: getNinjaKycStatus,
    staleTime: 60_000, // KYC status is semi-static
  });
}

/**
 * KYC submission + all documents from Ninja /kyc/documents/
 * Returns: full submission record + document array.
 * 2 DB queries: afirst (submission) + async for loop (documents).
 */
export function useNinjaKycDocuments() {
  return useQuery({
    queryKey: kycKeys.ninjaDocuments(),
    queryFn: getNinjaKycDocuments,
    staleTime: 60_000,
  });
}
