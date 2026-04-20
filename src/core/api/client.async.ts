/**
 * ASYNC API CLIENT — Ky + Django Ninja
 *
 * Used for: AI Measurement, Search, Analytics, Streaming, High-concurrency ops
 * Base URL: NEXT_PUBLIC_API_V2_URL (e.g. .../api/v1/ninja)
 *
 * Features:
 *  - 60s timeout for AI/streaming operations
 *  - Auto-retry: 3x on 408, 429, 500-504 with exponential backoff
 *  - Bearer token injection before each request
 *  - ngrok-skip-browser-warning header in development
 */
import ky, { type KyInstance } from "ky";
import { readAccessToken } from "@/features/auth/lib/auth-session.client";
import { v4 as uuidv4 } from "uuid";

// ── Async Client Instance ─────────────────────────────────────────────────────
export const apiAsync: KyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_V2_URL,
  timeout: 60_000, // 60s for AI / streaming ops
  credentials: "include",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },

  // ── Auto-Retry Logic ─────────────────────────────────────────────────────
  retry: {
    limit: 3,
    methods: ["get", "post", "put", "patch"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    backoffLimit: 5000,
  },

  hooks: {
    // ── Before Request: inject auth token + ngrok header ──────────────────
    beforeRequest: [
      (request) => {
        // Inject JWT Bearer token
        const token = readAccessToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }

        // Skip ngrok browser warning page in development
        if (process.env.NODE_ENV === "development") {
          request.headers.set("ngrok-skip-browser-warning", "true");
        }
        // Inject Idempotency-Key for write operations
        const method = request.method.toUpperCase();
        if (["POST", "PUT", "PATCH"].includes(method)) {
          if (!request.headers.has("X-Idempotency-Key") && !request.headers.has("x-idempotency-key")) {
            request.headers.set("X-Idempotency-Key", uuidv4());
          }
        }
      },
    ],

    // ── Before Retry: log retry attempt ───────────────────────────────────
    beforeRetry: [
      ({ request, retryCount }) => {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[apiAsync] Retry #${retryCount} for ${request.url}`);
        }
      },
    ],

    // ── After Response: normalize errors ─────────────────────────────────
    afterResponse: [
      async (_request, _options, response) => {
        if (!response.ok) {
          // Log server errors in development
          if (process.env.NODE_ENV === "development") {
            const body = await response.clone().text();
            console.error(
              `[apiAsync] ${response.status} ${response.url}\n${body}`,
            );
          }
        }
        return response;
      },
    ],
  },
});

export default apiAsync;
