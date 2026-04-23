// features/client/hooks/use-client-wallet.ts
/**
 * TanStack Query hooks for client wallet.
 * Aligned with: /api/v1/client/wallet/*
 */
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { clientApi } from "@/features/client/api/client.api";
import type { WalletTransferPayload } from "@/features/client/types/client.types";

export const clientWalletKeys = {
  balance: ["client", "wallet", "balance"] as const,
};

export function useClientWalletBalance() {
  return useQuery({
    queryKey:  clientWalletKeys.balance,
    queryFn:   clientApi.getWalletBalance,
    staleTime: 15_000,
  });
}

export function useWalletTransfer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: WalletTransferPayload) => clientApi.transferFunds(payload),
    onSuccess: () => {
      // Refresh balance after transfer
      queryClient.invalidateQueries({ queryKey: clientWalletKeys.balance });
    },
  });
}
