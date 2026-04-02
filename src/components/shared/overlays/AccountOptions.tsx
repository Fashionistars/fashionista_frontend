"use client";
/**
 * AccountOptions — Navbar dropdown overlay (Phase 6)
 *
 * Dynamically shows Login or Logout based on authentication state.
 * Uses Zustand auth store — no SSR hydration issues (client component).
 *
 * When authenticated:
 *   - Shows "My Account" with user's name/email
 *   - Shows role-specific dashboard link
 *   - Shows "Sign Out" (calls auth store logout + POST /auth/logout/)
 *
 * When not authenticated:
 *   - Shows "Sign In" link (with current pathname as returnUrl)
 *   - Shows "Create Account" link to /auth/choose-role
 */
import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Radio,
  Heart,
  Settings,
  UserRoundCheck,
  LogOut,
  LogIn,
  UserPlus,
  UserRound,
  LayoutDashboard,
  Loader2,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { logout as logoutFn } from "@/features/auth/services/auth.service";

const AccountOptions = ({
  showOptions,
}: {
  showOptions: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  const { mutate: doLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutFn,
    onSettled: () => {
      // Always clear local auth state, even if logout API call fails
      clearAuth();
      toast.success("Signed out", { description: "See you soon! 👋" });
      router.push("/");
    },
  });

  const dashboardHref =
    user?.role === "vendor" || user?.role === "Vendor"
      ? "/vendor/dashboard"
      : "/client/dashboard";

  const displayName =
    user?.first_name
      ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
      : user?.email ?? user?.phone ?? "My Account";

  return (
    <div
      id="account-options-panel"
      style={{ boxShadow: "0px 4px 25px 0px #0000001A" }}
      className={`
        w-[284px] min-h-[200px] p-5 rounded-xl bg-white absolute right-0 z-50
        divide-y divide-border/50
        ${showOptions ? "flex flex-col" : "hidden"}
        animate-in fade-in-0 zoom-in-95 duration-150
      `}
    >
      {isAuthenticated ? (
        /* ── Authenticated menu ──────────────────────────────────── */
        <>
          {/* User greeting */}
          <div className="pb-3 mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <UserRound className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sm text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role ?? "Customer"} account
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-0.5 py-2">
            <Link
              id="nav-dashboard-link"
              href={dashboardHref}
              className="text-foreground font-raleway font-medium text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              href="/wishlist"
              className="text-foreground font-raleway font-medium text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
            >
              <Heart className="w-4 h-4" />
              My Wishlist
            </Link>

            <Link
              href="/"
              className="text-foreground font-raleway font-medium text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
            >
              <Radio className="w-4 h-4" />
              Order Tracking
            </Link>

            <Link
              href="/settings"
              className="text-foreground font-raleway font-medium text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>

          {/* Sign Out */}
          <div className="pt-2 mt-1">
            <button
              id="nav-logout-btn"
              onClick={() => doLogout()}
              disabled={isLoggingOut}
              className="
                w-full text-destructive font-raleway font-medium text-base
                flex items-center gap-2.5 py-2 px-2 rounded-lg
                hover:bg-destructive/5 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              {isLoggingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </>
      ) : (
        /* ── Unauthenticated menu ─────────────────────────────────── */
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground pb-3 mb-1 border-b border-border/50">
            Sign in to access your account
          </p>

          <Link
            id="nav-signin-link"
            href={`/auth/sign-in?returnUrl=${encodeURIComponent(pathname)}`}
            className="text-foreground font-raleway font-semibold text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>

          <Link
            id="nav-register-link"
            href="/auth/choose-role"
            className="text-foreground font-raleway font-medium text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </Link>

          <Link
            href="/"
            className="text-foreground font-raleway font-medium text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
          >
            <Radio className="w-4 h-4" />
            Order Tracking
          </Link>

          <Link
            href="/auth/choose-role?role=vendor"
            className="text-foreground font-raleway font-medium text-base flex items-center gap-2.5 py-2 px-2 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
          >
            <UserRoundCheck className="w-4 h-4" />
            Register as a Vendor
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccountOptions;
