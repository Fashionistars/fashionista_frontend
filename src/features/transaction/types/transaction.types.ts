/**
 * @file transaction.types.ts
 * @description TypeScript contracts for the financial transaction feature.
 */

export type TransactionAudience = "client" | "vendor" | "admin";

export type TransactionStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed"
  | "cancelled"
  | "reversed"
  | "disputed";

export type TransactionDirection = "inbound" | "outbound" | "internal";

export interface TransactionRecord {
  id: string;
  reference: string;
  transaction_type: string;
  status: TransactionStatus;
  direction: TransactionDirection;
  amount: string;
  fee_amount: string;
  net_amount: string;
  description: string;
  order_id: string;
  created_at: string;
}

export interface TransactionSummary {
  inflow: string;
  outflow: string;
  net: string;
  count: number;
}

export interface PaginatedTransactions {
  count: number;
  next: string | null;
  previous: string | null;
  results: TransactionRecord[];
}
