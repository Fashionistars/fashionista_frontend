import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Sign Up — FASHIONISTAR",
  description:
    "Join FASHIONISTAR AI — Africa's premier AI-powered fashion platform. Get personalized size recommendations and exclusive collections.",
  robots: { index: false, follow: false },
};

/**
 * Canonical sign-up page — /auth/sign-up
 * Enterprise URL naming convention (Stripe / Vercel / Shopify standard).
 * The legacy /register and /signup routes redirect here permanently.
 */
export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-white to-secondary p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-bon-foyage text-primary tracking-wide mb-1">
              FASHIONISTAR
            </h1>
            <p className="text-muted-foreground text-sm">
              Create your account to get started
            </p>
          </div>

          <RegisterForm />

          {/* Footer links */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
