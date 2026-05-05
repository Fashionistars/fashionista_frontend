"use client";

/**
 * @file use-wallet.ts
 * @description TanStack Query hooks for wallet reads and PIN operations.
 */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeWalletPin,
  fetchWallet,
  setWalletPin,
  verifyWalletPin,
} from "../api/wallet.api";

export const walletKeys = {
  all: ["wallet"] as const,
  me: () => [...walletKeys.all, "me"] as const,
};

export function useWallet() {
  return useQuery({
    queryKey: walletKeys.me(),
    queryFn: fetchWallet,
    staleTime: 15_000,
  });
}

export function useSetWalletPin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setWalletPin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: walletKeys.all }),
  });
}

export function useVerifyWalletPin() {
  return useMutation({ mutationFn: verifyWalletPin });
}

export function useChangeWalletPin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeWalletPin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: walletKeys.all }),
  });
}
