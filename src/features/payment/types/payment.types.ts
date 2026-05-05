/**
 * @file payment.types.ts
 * @description Payment provider contracts for Fashionistar.
 */

export type PaymentPurpose =
  | "wallet_topup"
  | "order_payment"
  | "measurement_fee"
  | "vendor_service"
  | "advertisement_fee";

export type PaymentIntentStatus =
  | "pending"
  | "initialized"
  | "succeeded"
  | "failed"
  | "cancelled";

export interface PaymentIntent {
  id: string;
  provider: "paystack";
  purpose: PaymentPurpose;
  amount: string;
  currency: string;
  status: PaymentIntentStatus;
  reference: string;
  authorization_url: string;
  access_code: string;
  order_id: string;
  created_at?: string;
}

export interface InitializePaymentInput {
  amount: string;
  purpose: PaymentPurpose;
  email?: string;
  order_id?: string;
  metadata?: Record<string, unknown>;
}

export interface BankOption {
  name: string;
  code: string;
  country?: string;
}

export interface TransferRecipientInput {
  account_number: string;
  bank_code: string;
  account_name?: string;
}
