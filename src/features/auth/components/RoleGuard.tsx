"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { AuthHydrationGate } from "@/features/auth/components/AuthHydrationGate";
import { getCanonicalDashboardPath, isRoleAllowed, normalizeCanonicalRole } from "@/features/auth/lib/auth-routing";
import type { CanonicalRole } from "@/features/auth/lib/auth.types";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useIsHydrated } from "@/lib/react/useIsHydrated";

interface RoleGuardProps {
  requiredRole: CanonicalRole | CanonicalRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({
  requiredRole,
  children,
  fallback = null,
}: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useIsHydrated();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const role = useMemo(
    () => normalizeCanonicalRole(user?.role, user?.is_staff === true),
    [user?.is_staff, user?.role],
  );

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!isAuthenticated || !accessToken) {
      router.replace(`/auth/sign-in?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!isRoleAllowed(requiredRole, role)) {
      router.replace(getCanonicalDashboardPath(user?.role, user?.is_staff === true));
    }
  }, [
    accessToken,
    hydrated,
    isAuthenticated,
    pathname,
    requiredRole,
    role,
    router,
    user?.is_staff,
    user?.role,
  ]);

  if (!hydrated || !isAuthenticated || !accessToken || !isRoleAllowed(requiredRole, role)) {
    return <>{fallback}</>;
  }

  return <AuthHydrationGate fallback={fallback}>{children}</AuthHydrationGate>;
}
