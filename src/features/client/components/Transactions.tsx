/**
 * @file client/components/Transactions.tsx
 * @description Re-export of the canonical Transactions component.
 * The canonical implementation lives in @/features/account/components/Transactions.
 * Use `showWalletDashboard={true}` to render the full wallet UI with withdrawal form + FAQ.
 */
export { default } from "@/features/account/components/Transactions";
export type { TransactionsProps, Transaction } from "@/features/account/components/Transactions";
