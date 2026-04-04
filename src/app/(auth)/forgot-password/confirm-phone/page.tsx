import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import { PasswordResetConfirmForm } from "@/features/auth/components/PasswordResetConfirmForm";

export const metadata: Metadata = {
  title: "Verify SMS Code — FASHIONISTAR",
  description: "Enter your SMS verification code to reset your FASHIONISTAR account password.",
  robots: { index: false, follow: false },
};

/**
 * /forgot-password/confirm-phone
 *
 * Shown after user requests a phone-based password reset.
 * The user enters the 6-digit OTP from SMS + their new password.
 *
 * POSTs to: /api/v1/password/reset-phone-confirm/
 *   Body: { otp, password, password2 }
 *
 * The backend looks up the user via SHA-256 OTP hash index in Redis (O(1)).
 */
export default function ForgotPasswordConfirmPhonePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-white to-secondary p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card p-8 animate-in fade-in-0 duration-300">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold font-satoshi text-foreground">
              Verify SMS Code
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the 6-digit code sent to your phone and create a new password.
            </p>
          </div>

          {/* ── Form ───────────────────────────────────────────────────── */}
          <PasswordResetConfirmForm mode="phone" />

          {/* ── Footer ─────────────────────────────────────────────────── */}
          <div className="mt-6 text-center space-y-1">
            <p className="text-xs text-muted-foreground">
              Wrong number?{" "}
              <Link href="/forgot-password" className="text-primary hover:underline font-medium">
                Try email instead
              </Link>
            </p>
            <p className="text-xs text-muted-foreground">
              <Link href="/auth/sign-in" className="text-primary hover:underline font-medium">
                Back to Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
