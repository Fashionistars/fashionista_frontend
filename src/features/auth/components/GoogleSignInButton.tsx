/**
 * GoogleSignInButton — Enterprise Google OAuth Button
 *
 * Architecture: Next.js Frontend → Backend id_token flow
 *
 * 1. User clicks → Google's OAuth popup (via @react-oauth/google useGoogleLogin)
 * 2. Google returns a credential (id_token JWT) directly to the browser
 * 3. We POST { id_token, role } to /api/v1/auth/google/ (our Django backend)
 * 4. Backend verifies the id_token with Google's public keys (google-auth library)
 * 5. Backend issues our own JWT access + refresh tokens → stored in Zustand
 *
 * This is the fastest and most secure pattern for Next.js + DRF:
 *  - No code exchange needed (no redirect URI setup complexity)
 *  - id_token verification is done server-side (private GOOGLE_CLIENT_ID)
 *  - Works for BOTH login (role ignored) and registration (role sent)
 *
 * Props:
 *   role   — 'vendor' | 'client' | undefined (for login; role comes from DB)
 *   label  — Button text (default: "Continue with Google")
 *   onSuccess — callback with LoginResponse data
 *   onError   — callback with error message
 */
"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GoogleIcon } from "@/components/shared/icons/GoogleIcon";
import { apiSync } from "@/core/api/client.sync";
import { AUTH_ENDPOINTS } from "@/core/constants/api.constants";
import { LoginResponseSchema } from "@/features/auth/schemas/auth.schemas";
import type { LoginResponse } from "@/features/auth/schemas/auth.schemas";
import { parseApiError } from "@/lib/api/parseApiError";

interface GoogleSignInButtonProps {
  /** Role for registration — omit or leave undefined for login */
  role?: "vendor" | "client";
  /** Button label */
  label?: string;
  /** Called on successful auth with the backend response */
  onSuccess: (data: LoginResponse) => void;
  /** Called on any error with the parsed error object */
  onError: (message: string) => void;
  /** Extra className */
  className?: string;
}

export function GoogleSignInButton({
  role,
  label = "Continue with Google",
  onSuccess,
  onError,
  className = "",
}: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    // ── IMPORTANT: use `credential` flow (returns id_token directly) ──────────
    // This is the "implicit flow" — Google returns the id_token straight to the
    // browser without a redirect. Fastest, no callback URL needed.
    flow: "implicit",

    onSuccess: async (__tokenResponse) => {
      // tokenResponse for implicit flow contains `access_token` (Google OAuth2 AT)
      // We must use `credential` from the credential response, OR exchange this AT
      // for userinfo. The correct approach for backend verification is to use
      // the credential (id_token) from tokenResponse.credential — but implicit
      // flow gives us an access_token not an id_token.
      //
      // ✅ CORRECT APPROACH: use `responseType: 'id_token'` via credential flow.
      // We handle this via onNonOAuthError and credential callback below.
      //
      // For the access_token approach: fetch userinfo from Google to get profile
      // then send to backend. BUT the backend expects an id_token for verify_oauth2_token.
      //
      // ✅ SOLUTION: We switch to credential-based flow using CredentialResponse.
      setLoading(false);
      onError("Please use the credential-based button above.");
    },

    onError: (err) => {
      setLoading(false);
      onError(err.error_description ?? "Google sign-in failed. Please try again.");
    },
  });

  // We don't use the implicit flow above. Instead we use Google's One Tap / credential.
  // The GoogleOAuthProvider's useGoogleLogin with flow="auth-code" gives us a `code`
  // which we can exchange. But our backend expects `id_token`.
  //
  // THE CLEANEST SOLUTION for id_token: use GoogleLogin component's credential callback.
  // We expose this via a hidden div + pass the onSuccess credential to backend.
  // This is handled by the parent via CredentialResponce.credential (which IS the id_token).
  //
  // Implementation: use the GoogleLogin component from @react-oauth/google directly.
  void googleLogin; // suppress unused warning — we use CredentialResponse below

  async function handleCredential(credentialResponse: { credential?: string }) {
    const id_token = credentialResponse.credential;
    if (!id_token) {
      onError("Google sign-in failed — no credential received.");
      return;
    }
    setLoading(true);
    try {
      const payload: Record<string, string> = { id_token };
      if (role) payload.role = role;

      const { data } = await apiSync.post(AUTH_ENDPOINTS.GOOGLE, payload);
      const parsed = LoginResponseSchema.parse(data);
      onSuccess(parsed);
    } catch (err) {
      const parsedErr = parseApiError(err);
      onError(parsedErr.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <GoogleCredentialButton
      role={role}
      label={label}
      loading={loading}
      onCredential={handleCredential}
      onError={onError}
      className={className}
    />
  );
}

// ── Inner: uses GoogleLogin component for credential (id_token) flow ──────────

import { GoogleLogin } from "@react-oauth/google";

interface GoogleCredentialButtonProps {
  role?: "vendor" | "client";
  label: string;
  loading: boolean;
  onCredential: (cr: { credential?: string }) => void;
  onError: (msg: string) => void;
  className?: string;
}

function GoogleCredentialButton({
  role: _role,
  label,
  loading,
  onCredential,
  onError,
  className,
}: GoogleCredentialButtonProps) {
  const [showFallback] = useState(false);

  // The GoogleLogin component renders Google's native button internally.
  // We wrap it in our custom styled button by positioning a transparent overlay.
  // This gives us full style control while using Google's secure credential API.

  if (loading) {
    return (
      <button
        type="button"
        disabled
        className={`
          w-full flex items-center justify-center gap-3 px-4 py-2.5
          border border-gray-200 rounded-xl text-sm font-medium
          bg-white text-gray-600 shadow-sm
          disabled:opacity-70 cursor-not-allowed
          ${className}
        `}
      >
        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        Connecting to Google…
      </button>
    );
  }

  if (showFallback) {
    return (
      <GoogleLogin
        onSuccess={onCredential}
        onError={() => onError("Google sign-in failed. Please try again.")}
        text="continue_with"
        shape="rectangular"
        size="large"
        width="400"
      />
    );
  }

  // Custom styled button — overlays GoogleLogin for credential access
  return (
    <div className={`relative w-full ${className}`}>
      {/* Our beautifully-styled visible button */}
      <div
        className="
          w-full flex items-center justify-center gap-3 px-4 py-2.5
          border border-gray-200 rounded-xl text-sm font-medium
          bg-white text-gray-700
          hover:bg-gray-50 hover:border-gray-300 hover:shadow-md
          active:scale-[0.99]
          transition-all duration-200 shadow-sm
          cursor-pointer select-none
        "
        role="button"
        aria-label={label}
      >
        <GoogleIcon />
        <span>{label}</span>
      </div>

      {/* Google's actual button — invisible, full-cover, triggers on click */}
      <div
        className="absolute inset-0 opacity-0 overflow-hidden rounded-xl"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      >
        <GoogleLogin
          onSuccess={onCredential}
          onError={() => onError("Google sign-in failed. Please try again.")}
          text="continue_with"
          shape="rectangular"
          size="large"
          width="400"
          useOneTap={false}
        />
      </div>
    </div>
  );
}
