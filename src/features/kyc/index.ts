/**
 * @file index.ts
 * @description Public API for the `features/kyc` canonical FSD slice.
 *
 * Dual-Engine Strategy:
 *  - DRF (sync)   → /v1/kyc/ (submission mutation)
 *  - Ninja (async) → /ninja/kyc/ (status polling + documents view)
 */

// ── Types ──────────────────────────────────────────────────────────────────
export type {
  KycStatus,
  KycDocumentType,
  KycSubmission,
  KycDocument,
  KycSubmitInput,
  NinjaKycStatusSummary,
  NinjaKycWithDocuments,
} from "./types/kyc.types";

// ── Schemas ────────────────────────────────────────────────────────────────
export {
  KycSubmissionSchema,
  KycDocumentSchema,
  NinjaKycStatusSchema,
  NinjaKycWithDocumentsSchema,
  parseKycResponse,
} from "./schemas/kyc.schemas";

// ── API ────────────────────────────────────────────────────────────────────
export {
  fetchKycStatus,
  submitKyc,
  getNinjaKycStatus,
  getNinjaKycDocuments,
} from "./api/kyc.api";

// ── TanStack Query Hooks ───────────────────────────────────────────────────
export {
  kycKeys,
  useKycStatus,
  useSubmitKyc,
  useNinjaKycStatus,
  useNinjaKycDocuments,
} from "./hooks/use-kyc";

// ── Components ─────────────────────────────────────────────────────────────
export { KycStatusView } from "./components/KycStatusView";
