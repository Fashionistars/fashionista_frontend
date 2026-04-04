import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { PasswordResetConfirmForm } from "@/features/auth/components/PasswordResetConfirmForm";

export const metadata: Metadata = {
  title: "Set New Password — FASHIONISTAR",
  description: "Create a new password for your FASHIONISTAR account.",
  robots: { index: false, follow: false },
};

/**
 * /password-recovery/[uidb64]/[token]
 *
 * Activated from the "Reset Password" email magic link.
 * The email contains a URL like:
 *   https://fashionistar.com/password-recovery/MTU/abc-def-token/
 *
 * uidb64 = base64-encoded user PK
 * token  = Django one-time HMAC token (expires after use or timeout)
 *
 * POSTs to: /api/v1/password/reset-confirm/<uidb64>/<token>/
 */
export default async function PasswordRecoveryPage({
  params,
}: {
  params: Promise<{ uidb64: string; token: string }>;
}) {
  const { uidb64, token } = await params;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-white to-secondary p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card p-8 animate-in fade-in-0 duration-300">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold font-satoshi text-foreground">
              Create New Password
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your reset link is valid. Choose a strong password below.
            </p>
          </div>

          {/* ── Form ───────────────────────────────────────────────────── */}
          <PasswordResetConfirmForm mode="email" uidb64={uidb64} token={token} />

          {/* ── Footer ─────────────────────────────────────────────────── */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Link expired?{" "}
            <Link href="/forgot-password" className="text-primary hover:underline font-medium">
              Request a new reset link
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
