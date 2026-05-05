/**
 * @file kyc.api.ts
 * @description KYC API client. The backend KYC URLs are scaffolded, so callers
 * should handle 404s gracefully until the routes are mounted.
 */
import { apiSync } from "@/core/api/client.sync";
import { unwrapApiData } from "@/core/api/response";
import { KycSubmissionSchema, parseKycResponse } from "../schemas/kyc.schemas";
import type { KycSubmission, KycSubmitInput } from "../types/kyc.types";

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
