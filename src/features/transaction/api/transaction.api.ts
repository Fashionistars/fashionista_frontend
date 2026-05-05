/**
 * @file transaction.api.ts
 * @description Transaction read/write API client.
 */
import { apiSync } from "@/core/api/client.sync";
import { unwrapApiData } from "@/core/api/response";
import {
  PaginatedTransactionsSchema,
  TransactionSummarySchema,
  parseTransactionResponse,
} from "../schemas/transaction.schemas";
import type {
  PaginatedTransactions,
  TransactionSummary,
} from "../types/transaction.types";

function normalizeList(payload: unknown): PaginatedTransactions {
  const data = unwrapApiData<unknown>(payload);
  if (Array.isArray(data)) {
    return { count: data.length, next: null, previous: null, results: data as never[] };
  }
  if (data && typeof data === "object" && "results" in data) {
    const envelope = data as PaginatedTransactions;
    return envelope;
  }
  return { count: 0, next: null, previous: null, results: [] };
}

export async function fetchTransactions(page = 1): Promise<PaginatedTransactions> {
  const { data } = await apiSync.get<unknown>("/v1/transactions/", {
    params: { page },
  });
  return parseTransactionResponse(
    PaginatedTransactionsSchema,
    normalizeList(data),
    "fetchTransactions",
  ) as PaginatedTransactions;
}

export async function fetchTransactionSummary(): Promise<TransactionSummary> {
  const { data } = await apiSync.get<unknown>("/v1/transactions/summary/");
  return parseTransactionResponse(
    TransactionSummarySchema,
    unwrapApiData(data),
    "fetchTransactionSummary",
  ) as TransactionSummary;
}
