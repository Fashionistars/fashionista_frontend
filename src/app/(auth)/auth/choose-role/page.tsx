import type { Metadata } from "next";
import Link from "next/link";
import { Store, ShoppingBag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account — FASHIONISTAR",
  description:
    "Join FASHIONISTAR AI — choose whether you're a Client shopper or a Vendor selling fashion.",
  robots: { index: false, follow: false },
};

/**
 * /auth/choose-role — Role selection page (Phase 7)
 *
 * Users MUST choose Client or Vendor before reaching the registration form.
 * This is the canonical entry point for all "Register" / "Sign Up" links.
 *
 * Design: Two prominent cards — Vendor and Client — matching the Figma design.
 * Mobile-first, responsive.
 */
export default function ChooseRolePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-cream via-white to-secondary p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card p-8 animate-in fade-in-0 duration-300">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-bon-foyage text-primary tracking-wide mb-1">
              FASHIONISTAR
            </h1>
            <p className="text-muted-foreground text-sm">
              Sign Up — choose your account type to get started
            </p>
          </div>

          <p className="text-xs text-center text-muted-foreground mb-6 uppercase tracking-widest font-medium">
            I am a…
          </p>

          {/* Role cards */}
          <div className="space-y-4">
            {/* Vendor */}
            <Link
              href="/auth/sign-up?role=vendor"
              id="choose-role-vendor"
              className="
                group flex items-center gap-5 p-5 rounded-2xl
                border-2 border-border bg-muted/20
                hover:border-primary hover:bg-primary/5
                transition-all duration-200 cursor-pointer
                hover:shadow-md active:scale-[0.99]
              "
            >
              <div className="
                w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors shrink-0
              ">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-base">Vendor</p>
                <p className="text-sm text-muted-foreground leading-snug">
                  Upload your work and fashion collections
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>

            {/* Client */}
            <Link
              href="/auth/sign-up?role=client"
              id="choose-role-client"
              className="
                group flex items-center gap-5 p-5 rounded-2xl
                border-2 border-border bg-muted/20
                hover:border-primary hover:bg-primary/5
                transition-all duration-200 cursor-pointer
                hover:shadow-md active:scale-[0.99]
              "
            >
              <div className="
                w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors shrink-0
              ">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-base">Client</p>
                <p className="text-sm text-muted-foreground leading-snug">
                  Get your designed and tailored dress
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
