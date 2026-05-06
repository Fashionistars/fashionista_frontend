/**
 * @file kyc.api.ts
 * @description KYC API client. The backend KYC URLs are scaffolded.
 *
 * Endpoint Routing:
 *  - DRF sync  → /v1/kyc/ (status, submit — CustomJSONRenderer)
 *  - Ninja async → /kyc/ through apiAsync prefix /api/v1/ninja
 */
import { apiSync } from "@/core/api/client.sync";
import { apiAsync } from "@/core/api/client.async";
import { unwrapApiData } from "@/core/api/response";
import {
  KycSubmissionSchema,
  NinjaKycStatusSchema,
  NinjaKycWithDocumentsSchema,
  parseKycResponse,
} from "../schemas/kyc.schemas";
import type {
  KycSubmission,
  KycSubmitInput,
  NinjaKycStatusSummary,
  NinjaKycWithDocuments,
} from "../types/kyc.types";

// ─── DRF Sync Endpoints ───────────────────────────────────────────────────────

export async function fetchKycStatus(): Promise<KycSubmission | null> {
  const { data } = await apiSync.get<unknown>("/v1/kyc/status/");
  const payload = unwrapApiData<unknown>(data);
  if (!payload) return null;
  return parseKycResponse(KycSubmissionSchema, payload, "fetchKycStatus") as KycSubmission;
}

export async function submitKyc(input: KycSubmitInput): Promise<KycSubmission> {
  const { data } = await apiSync.post<unknown>("/v1/kyc/submit/", input);
  return parseKycResponse(
    KycSubmissionSchema,
    unwrapApiData(data),
    "submitKyc",
  ) as KycSubmission;
}

// ─── Ninja Async Endpoints ────────────────────────────────────────────────────

/**
 * GET /api/v1/ninja/kyc/status/
 * Returns: NinjaKycStatusSummary (status + document_count + timestamps)
 * Delegates to KycSubmission.aget_status_summary()
 */
export async function getNinjaKycStatus(): Promise<NinjaKycStatusSummary> {
  const envelope = await apiAsync
    .get("kyc/status/")
    .json<{ status: string; data: unknown }>();
  return parseKycResponse(
    NinjaKycStatusSchema,
    envelope?.data ?? envelope,
    "getNinjaKycStatus",
  ) as NinjaKycStatusSummary;
}

/**
 * GET /api/v1/ninja/kyc/documents/
 * Returns: NinjaKycWithDocuments (submission + all document records)
 * Delegates to KycSubmission.aget_with_documents()
 */
export async function getNinjaKycDocuments(): Promise<NinjaKycWithDocuments> {
  const envelope = await apiAsync
    .get("kyc/documents/")
    .json<{ status: string; data: unknown }>();
  return parseKycResponse(
    NinjaKycWithDocumentsSchema,
    envelope?.data ?? envelope,
    "getNinjaKycDocuments",
  ) as NinjaKycWithDocuments;
}
