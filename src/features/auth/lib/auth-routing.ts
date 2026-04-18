import type { CanonicalRole } from "@/features/auth/lib/auth.types";

const ADMIN_ROLES = new Set([
  "admin",
  "staff",
  "support",
  "editor",
  "director",
  "assistant",
  "moderator",
  "super_admin",
  "super_staff",
  "super_support",
  "super_editor",
  "super_director",
  "super_assistant",
  "super_moderator",
]);

export function normalizeCanonicalRole(
  role?: string | null,
  isStaff = false,
): CanonicalRole | undefined {
  const normalizedRole = (role ?? "").trim().toLowerCase();

  if (isStaff || ADMIN_ROLES.has(normalizedRole)) {
    return "admin";
  }

  if (normalizedRole.includes("vendor")) {
    return "vendor";
  }

  if (normalizedRole.includes("client") || normalizedRole.includes("customer")) {
    return "client";
  }

  return undefined;
}

export function getCanonicalDashboardPath(
  role?: string | null,
  isStaff = false,
): string {
  const canonicalRole = normalizeCanonicalRole(role, isStaff);

  if (canonicalRole === "admin") {
    return "/admin-dashboard";
  }

  if (canonicalRole === "vendor") {
    return "/vendor/dashboard";
  }

  return "/client/dashboard";
}

export function getPostAuthRedirectPath({
  role,
  isStaff = false,
  hasVendorProfile = true,
  returnUrl,
}: {
  role?: string | null;
  isStaff?: boolean;
  hasVendorProfile?: boolean;
  returnUrl?: string | null;
}): string {
  const canonicalRole = normalizeCanonicalRole(role, isStaff);

  if (canonicalRole === "admin") {
    return "/admin-dashboard";
  }

  if (canonicalRole === "vendor") {
    return hasVendorProfile ? "/vendor/dashboard" : "/vendor/setup";
  }

  if (returnUrl && returnUrl.startsWith("/")) {
    return returnUrl;
  }

  return "/client/dashboard";
}

export function isRoleAllowed(
  requiredRole: CanonicalRole | CanonicalRole[],
  actualRole?: CanonicalRole,
): boolean {
  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return Boolean(actualRole && allowedRoles.includes(actualRole));
}
