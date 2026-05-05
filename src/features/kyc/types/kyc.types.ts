/**
 * @file kyc.types.ts
 * @description KYC feature contracts for client/vendor/admin dashboards.
 */

export type KycStatus = "pending" | "in_review" | "approved" | "rejected" | "resubmit";

export type KycDocumentType =
  | "nin"
  | "passport"
  | "drivers_license"
  | "voters_card"
  | "selfie"
  | "cac_cert"
  | "utility_bill";

export interface KycSubmission {
  id: string;
  status: KycStatus;
  provider_reference: string;
  review_notes: string;
  submitted_at: string;
  reviewed_at: string | null;
  updated_at: string;
}

export interface KycDocument {
  id: string;
  document_type: KycDocumentType;
  secure_url: string;
  uploaded_at: string;
}

export interface KycSubmitInput {
  provider_reference?: string;
  metadata?: Record<string, unknown>;
}
