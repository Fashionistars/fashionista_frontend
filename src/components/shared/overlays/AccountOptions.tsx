"use client";
/**
 * AccountOptions — Role-Based Navbar Dropdown Overlay
 *
 * Three fully distinct menus based on UnifiedUser.role:
 *
 *   CLIENT GROUP  → client, super_client
 *   VENDOR GROUP  → vendor, super_vendor
 *   ADMIN  GROUP  → admin, super_admin, staff, super_staff,
 *                   editor, super_editor, support, super_support,
 *                   assistant, super_assistant, moderator, super_moderator
 *
 * All icons imported from "lucide-react" — the locally installed package
 * already cloned into node_modules. No CDN, no external fetch. Future
 * lucide-react version upgrades only affect this file, nowhere else.
 *
 * Navigation strategy (FIX 3):
 *   close() uses requestAnimationFrame() so Next.js Link can process
 *   its href BEFORE React unmounts the overlay. This prevents the
 *   "URL changes but page stays" bug on unauthenticated state.
 */
import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// ── All icons from lucide-react (locally installed — production-safe) ─────────
import {
  // Shared / Auth
  LogOut,
  LogIn,
  UserPlus,
  UserRound,
  Loader2,

  // Client menu
  LayoutDashboard,
  Heart,
  ShoppingBag,
  PackageSearch,
  Settings,
  Star,

  // Vendor menu
  Store,
  BarChart3,
  Package,
  Tags,
  Wallet,
  HelpCircle,

  // Admin / Staff menu
  Shield,
  Users,
  ScrollText,
  AlertTriangle,
  Sliders,
  Database,

  // Guest panel
  Radio,
  UserRoundCheck,

  // Role badge icons
  ShieldCheck,
  Gem,
  Crown,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { logout as logoutFn } from "@/features/auth/services/auth.service";

// ── Role Groups ───────────────────────────────────────────────────────────────
const VENDOR_ROLES = new Set([
  "vendor",
  "super_vendor",
  "Vendor",           // back-compat: capitalised variant
  "Super Vendor",
]);

const ADMIN_ROLES = new Set([
  "admin",       "super_admin",
  "staff",       "super_staff",
  "editor",      "super_editor",
  "support",     "super_support",
  "assistant",   "super_assistant",
  "moderator",   "super_moderator",
  // Django is_staff users without an explicit RBAC role
  "Admin",  "Staff",  "Support",  "Moderator",  "Editor",
]);

type RoleGroup = "client" | "vendor" | "admin" | "guest";

function getRoleGroup(role?: string | null, is_staff?: boolean): RoleGroup {
  if (!role && !is_staff) return "guest";
  if (is_staff && !VENDOR_ROLES.has(role ?? "")) return "admin";
  if (ADMIN_ROLES.has(role ?? "")) return "admin";
  if (VENDOR_ROLES.has(role ?? "")) return "vendor";
  return "client";
}

// ── Shared link className ─────────────────────────────────────────────────────
const linkCls =
  "text-foreground font-raleway font-medium text-sm flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors";
const iconCls = "w-[15px] h-[15px] shrink-0";

// ── Role badge helper ─────────────────────────────────────────────────────────
function RoleBadge({
  group,
  role,
}: {
  group: RoleGroup;
  role?: string | null;
}) {
  if (group === "admin") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
        <Shield className="w-2.5 h-2.5" />
        {role ? role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Staff"}
      </span>
    );
  }
  if (group === "vendor") {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
        <Gem className="w-2.5 h-2.5" />
        {role ? role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "Vendor"}
      </span>
    );
  }
  // client / super_client
  if (role?.includes("super")) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-violet-100 text-violet-700">
        <Crown className="w-2.5 h-2.5" />
        Super Client
      </span>
    );
  }
  return null;
}

// ── Sub-menus ─────────────────────────────────────────────────────────────────

function ClientMenu({ close }: { close: () => void }) {
  return (
    <nav aria-label="Client account menu" className="flex flex-col gap-0.5 py-2">
      <Link id="nav-client-dashboard" href="/client/dashboard" onClick={close} className={linkCls}>
        <LayoutDashboard className={iconCls} />
        My Dashboard
      </Link>
      <Link id="nav-client-wishlist" href="/wishlist" onClick={close} className={linkCls}>
        <Heart className={iconCls} />
        My Wishlist
      </Link>
      <Link id="nav-client-orders" href="/client/orders" onClick={close} className={linkCls}>
        <ShoppingBag className={iconCls} />
        My Orders
      </Link>
      <Link id="nav-client-tracking" href="/client/tracking" onClick={close} className={linkCls}>
        <PackageSearch className={iconCls} />
        Track a Package
      </Link>
      <Link id="nav-client-reviews" href="/client/reviews" onClick={close} className={linkCls}>
        <Star className={iconCls} />
        My Reviews
      </Link>
      <Link id="nav-client-settings" href="/client/settings" onClick={close} className={linkCls}>
        <Settings className={iconCls} />
        Account Settings
      </Link>
    </nav>
  );
}

function VendorMenu({ close }: { close: () => void }) {
  return (
    <nav aria-label="Vendor account menu" className="flex flex-col gap-0.5 py-2">
      <Link id="nav-vendor-dashboard" href="/vendor/dashboard" onClick={close} className={linkCls}>
        <LayoutDashboard className={iconCls} />
        Vendor Dashboard
      </Link>
      <Link id="nav-vendor-shop" href="/vendor/shop" onClick={close} className={linkCls}>
        <Store className={iconCls} />
        My Shop
      </Link>
      <Link id="nav-vendor-products" href="/vendor/products" onClick={close} className={linkCls}>
        <Package className={iconCls} />
        My Products
      </Link>
      <Link id="nav-vendor-orders" href="/vendor/orders" onClick={close} className={linkCls}>
        <ShoppingBag className={iconCls} />
        Orders
      </Link>
      <Link id="nav-vendor-analytics" href="/vendor/analytics" onClick={close} className={linkCls}>
        <BarChart3 className={iconCls} />
        Sales Analytics
      </Link>
      <Link id="nav-vendor-promotions" href="/vendor/promotions" onClick={close} className={linkCls}>
        <Tags className={iconCls} />
        Promotions
      </Link>
      <Link id="nav-vendor-payouts" href="/vendor/payouts" onClick={close} className={linkCls}>
        <Wallet className={iconCls} />
        Payouts
      </Link>
      <Link id="nav-vendor-settings" href="/vendor/settings" onClick={close} className={linkCls}>
        <Settings className={iconCls} />
        Shop Settings
      </Link>
      <Link id="nav-vendor-support" href="/vendor/support" onClick={close} className={linkCls}>
        <HelpCircle className={iconCls} />
        Seller Support
      </Link>
    </nav>
  );
}

function AdminMenu({ close }: { close: () => void }) {
  return (
    <nav aria-label="Admin account menu" className="flex flex-col gap-0.5 py-2">
      <Link id="nav-admin-dashboard" href="/admin/dashboard" onClick={close} className={linkCls}>
        <LayoutDashboard className={iconCls} />
        Admin Dashboard
      </Link>
      <Link id="nav-admin-users" href="/admin/users" onClick={close} className={linkCls}>
        <Users className={iconCls} />
        Manage Users
      </Link>
      <Link id="nav-admin-audit" href="/admin/audit-logs" onClick={close} className={linkCls}>
        <ScrollText className={iconCls} />
        Audit Logs
      </Link>
      <Link id="nav-admin-reports" href="/admin/reports" onClick={close} className={linkCls}>
        <AlertTriangle className={iconCls} />
        Reports & Flags
      </Link>
      <Link id="nav-admin-config" href="/admin/config" onClick={close} className={linkCls}>
        <Sliders className={iconCls} />
        System Config
      </Link>
      <Link id="nav-admin-db" href="/admin/db" onClick={close} className={linkCls}>
        <Database className={iconCls} />
        Database Tools
      </Link>
      <Link id="nav-admin-security" href="/admin/security" onClick={close} className={linkCls}>
        <ShieldCheck className={iconCls} />
        Security Centre
      </Link>
      <Link id="nav-admin-settings" href="/admin/settings" onClick={close} className={linkCls}>
        <Settings className={iconCls} />
        Platform Settings
      </Link>
    </nav>
  );
}

function GuestPanel({
  close,
  pathname,
}: {
  close: () => void;
  pathname: string;
}) {
  return (
    <div className="flex flex-col gap-0.5 py-1">
      <p className="text-xs text-muted-foreground pb-3 mb-1 border-b border-border/50">
        Sign in to access your account
      </p>
      <Link
        id="nav-signin-link"
        href={`/auth/sign-in?returnUrl=${encodeURIComponent(pathname)}`}
        onClick={close}
        className="text-foreground font-raleway font-semibold text-sm flex items-center gap-2.5 py-2 px-2.5 rounded-lg hover:bg-muted/60 hover:text-primary transition-colors"
      >
        <LogIn className={iconCls} />
        Sign In
      </Link>
      <Link
        id="nav-register-client-link"
        href="/auth/choose-role"
        onClick={close}
        className={linkCls}
      >
        <UserPlus className={iconCls} />
        Create Account
      </Link>
      <Link
        id="nav-order-tracking-guest"
        href="/"
        onClick={close}
        className={linkCls}
      >
        <Radio className={iconCls} />
        Order Tracking
      </Link>
      <Link
        id="nav-register-vendor-link"
        href="/auth/choose-role?role=vendor"
        onClick={close}
        className={linkCls}
      >
        <UserRoundCheck className={iconCls} />
        Become a Vendor
      </Link>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

const AccountOptions = ({
  showOptions,
  onClose,
}: {
  showOptions: boolean;
  onClose?: () => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, clearAuth } = useAuthStore();

  // Guard: skip onClose on first mount — only close on subsequent route changes
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    // Route changed → close dropdown overlay (primary close mechanism)
    if (onClose) onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const { mutate: doLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: logoutFn,
    onSettled: () => {
      clearAuth();
      toast.success("Signed out", { description: "See you soon! 👋" });
      router.push("/");
    },
  });

  // Derive role group once — drives which sub-menu renders
  const roleGroup: RoleGroup = isAuthenticated
    ? getRoleGroup(user?.role, user?.is_staff)
    : "guest";

  const displayName =
    user?.first_name
      ? `${user.first_name}${user.last_name ? ` ${user.last_name}` : ""}`
      : user?.email ?? user?.phone ?? "My Account";

  // RAF-deferred close — see FIX 3 header comment above
  const close = useCallback(() => {
    requestAnimationFrame(() => {
      onClose?.();
    });
  }, [onClose]);

  // ── User header avatar icon colour per role group ─────────────────────────
  const avatarBg =
    roleGroup === "admin"
      ? "bg-rose-100"
      : roleGroup === "vendor"
        ? "bg-amber-100"
        : "bg-primary/10";
  const avatarIconColour =
    roleGroup === "admin"
      ? "text-rose-600"
      : roleGroup === "vendor"
        ? "text-amber-600"
        : "text-primary";

  return (
    <div
      id="account-options-panel"
      role="dialog"
      aria-label="Account options"
      style={{ boxShadow: "0px 4px 25px 0px #0000001A" }}
      className={`
        w-[292px] p-4 rounded-xl bg-white absolute right-0 z-50
        divide-y divide-border/50
        ${showOptions ? "flex flex-col" : "hidden"}
        animate-in fade-in-0 zoom-in-95 duration-150
      `}
    >
      {isAuthenticated ? (
        <>
          {/* ── User header ───────────────────────────────────────────────── */}
          <div className="pb-3 mb-1">
            <div className="flex items-center gap-3">
              {/* Avatar circle */}
              <div
                className={`w-9 h-9 rounded-full ${avatarBg} flex items-center justify-center shrink-0`}
              >
                {roleGroup === "admin" ? (
                  <Shield className={`w-4 h-4 ${avatarIconColour}`} />
                ) : roleGroup === "vendor" ? (
                  <Store className={`w-4 h-4 ${avatarIconColour}`} />
                ) : (
                  <UserRound className={`w-4 h-4 ${avatarIconColour}`} />
                )}
              </div>

              {/* Name + role badge */}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm text-foreground truncate leading-tight">
                  {displayName}
                </p>
                <div className="mt-0.5">
                  <RoleBadge group={roleGroup} role={user?.role} />
                  {!user?.role && (
                    <span className="text-xs text-muted-foreground capitalize">
                      {roleGroup === "admin" ? "Staff" : roleGroup === "vendor" ? "Vendor" : "Customer"} account
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Role-specific menu ────────────────────────────────────────── */}
          {roleGroup === "vendor" ? (
            <VendorMenu close={close} />
          ) : roleGroup === "admin" ? (
            <AdminMenu close={close} />
          ) : (
            <ClientMenu close={close} />
          )}

          {/* ── Sign-out ──────────────────────────────────────────────────── */}
          <div className="pt-2 mt-1">
            <button
              id="nav-logout-btn"
              onClick={() => {
                doLogout();
                close();
              }}
              disabled={isLoggingOut}
              aria-label="Sign out of your account"
              className="
                w-full text-destructive font-raleway font-medium text-sm
                flex items-center gap-2.5 py-2 px-2.5 rounded-lg
                hover:bg-destructive/5 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoggingOut ? (
                <Loader2 className="w-[15px] h-[15px] animate-spin" />
              ) : (
                <LogOut className="w-[15px] h-[15px]" />
              )}
              {isLoggingOut ? "Signing out…" : "Sign Out"}
            </button>
          </div>
        </>
      ) : (
        <GuestPanel close={close} pathname={pathname} />
      )}
    </div>
  );
};

export default AccountOptions;
