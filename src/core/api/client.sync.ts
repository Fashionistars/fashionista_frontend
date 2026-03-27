/**
 * SYNC API CLIENT — Axios + Django DRF
 *
 * Used for: Auth, Orders, Payments, Sessions, CRUD operations
 * Base URL: NEXT_PUBLIC_API_V1_URL (e.g. https://hydrographically-tawdrier.ngrok-free.dev/api)
 *
 * Features:
 *  - JWT Bearer token injection from Zustand auth store
 *  - Automatic token refresh on 401 (with subscriber queue for concurrent requests)
 *  - Circuit breaker (auto-opens after 5 consecutive failures)
 *  - Sonner toast error on all failures with X-Trace-ID header
 *  - ngrok-skip-browser-warning header injected in development
 */
import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

// ── Circuit Breaker State ─────────────────────────────────────────────────────
let circuitOpen = false;
let consecutiveFailures = 0;
const CIRCUIT_THRESHOLD = 5;
const CIRCUIT_RESET_MS = 30_000; // 30 seconds

// ── Token Refresh Queue ───────────────────────────────────────────────────────
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// ── Axios Instance ────────────────────────────────────────────────────────────
export const apiSync: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_V1_URL,
  timeout: 15_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Request Interceptor ───────────────────────────────────────────────────────
apiSync.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Circuit breaker guard
    if (circuitOpen) {
      return Promise.reject(
        new Error("API circuit breaker is open. Too many consecutive failures.")
      ) as never;
    }

    // Inject auth token from sessionStorage (avoiding SSR issues)
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("fashionistar-auth");
        if (stored) {
          const parsed = JSON.parse(stored);
          const token = parsed?.state?.accessToken;
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch {
        // sessionStorage might not be available in all contexts
      }
    }

    // Skip ngrok browser warning page in development
    if (process.env.NODE_ENV === "development" && config.headers) {
      config.headers["ngrok-skip-browser-warning"] = "true";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────────────────
apiSync.interceptors.response.use(
  (response) => {
    // Reset circuit breaker on success
    consecutiveFailures = 0;
    if (circuitOpen) circuitOpen = false;
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // ── 401: Auto Token Refresh ──────────────────────────────────────────────
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue this request until refresh completes
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiSync(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_V1_URL}/v1/auth/token/refresh/`,
          {},
          {
            withCredentials: true,
            headers: { "ngrok-skip-browser-warning": "true" },
          }
        );

        const newToken: string = data.access;

        // Update Zustand store
        if (typeof window !== "undefined") {
          try {
            const stored = sessionStorage.getItem("fashionistar-auth");
            if (stored) {
              const parsed = JSON.parse(stored);
              if (parsed?.state) {
                parsed.state.accessToken = newToken;
                parsed.state.isAuthenticated = true;
                sessionStorage.setItem("fashionistar-auth", JSON.stringify(parsed));
              }
            }
          } catch {
            // ignore
          }
        }

        onRefreshed(newToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiSync(originalRequest);
      } catch (refreshError) {
        // Refresh failed — force logout
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("fashionistar-auth");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── Circuit Breaker Logic ────────────────────────────────────────────────
    consecutiveFailures++;
    if (consecutiveFailures >= CIRCUIT_THRESHOLD) {
      circuitOpen = true;
      setTimeout(() => {
        circuitOpen = false;
        consecutiveFailures = 0;
      }, CIRCUIT_RESET_MS);
    }

    // ── Global Error Toast ───────────────────────────────────────────────────
    if (typeof window !== "undefined") {
      const traceId = (error.response?.headers as Record<string, string>)?.["x-trace-id"];
      const responseData = error.response?.data as
        | { detail?: string; message?: string; error?: string }
        | undefined;
      const message =
        responseData?.detail ||
        responseData?.message ||
        responseData?.error ||
        error.message ||
        "An unexpected error occurred";

      const isNetworkError = !error.response;
      if (isNetworkError) {
        toast.error("Network Error", {
          description: "Cannot reach the backend. Check your connection.",
        });
      } else if (error.response?.status !== 401) {
        // Don't show toast on 401 (handled by refresh logic)
        toast.error(`Request Failed (${error.response?.status})`, {
          description: traceId ? `${message} — Trace: ${traceId}` : message,
          duration: 5000,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiSync;
