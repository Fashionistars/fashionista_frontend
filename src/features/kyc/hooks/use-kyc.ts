"use client";

/**
 * @file use-kyc.ts
 * @description TanStack Query hooks for KYC status and submission.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchKycStatus, submitKyc } from "../api/kyc.api";

export const kycKeys = {
  all: ["kyc"] as const,
  status: () => [...kycKeys.all, "status"] as const,
};

export function useKycStatus() {
  return useQuery({
    queryKey: kycKeys.status(),
    queryFn: fetchKycStatus,
    retry: false,
    staleTime: 60_000,
  });
}

export function useSubmitKyc() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitKyc,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: kycKeys.all }),
  });
}
