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
        if (typeof window !== "undefined") {
          try {
            const stored = sessionStorage.getItem("fashionistar-auth");
            if (stored) {
              const parsed = JSON.parse(stored);
              const token: string | null = parsed?.state?.accessToken ?? null;
              if (token) {
                request.headers.set("Authorization", `Bearer ${token}`);
              }
            }
          } catch {
            // sessionStorage may be unavailable
          }
        }

        // Skip ngrok browser warning page in development
        if (process.env.NODE_ENV === "development") {
          request.headers.set("ngrok-skip-browser-warning", "true");
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
              `[apiAsync] ${response.status} ${response.url}\n${body}`
            );
          }
        }
        return response;
      },
    ],
  },
});

export default apiAsync;
