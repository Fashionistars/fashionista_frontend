"use client";

/**
 * @file use-transactions.ts
 * @description TanStack Query hooks for transaction surfaces.
 */
import { useQuery } from "@tanstack/react-query";
import {
  fetchTransactionSummary,
  fetchTransactions,
} from "../api/transaction.api";

export const transactionKeys = {
  all: ["transaction"] as const,
  list: (page: number) => [...transactionKeys.all, "list", page] as const,
  summary: () => [...transactionKeys.all, "summary"] as const,
};

export function useTransactions(page = 1) {
  return useQuery({
    queryKey: transactionKeys.list(page),
    queryFn: () => fetchTransactions(page),
    staleTime: 30_000,
  });
}

export function useTransactionSummary() {
  return useQuery({
    queryKey: transactionKeys.summary(),
    queryFn: fetchTransactionSummary,
    staleTime: 30_000,
  });
}
