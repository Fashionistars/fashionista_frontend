/**
 * useAuthHydration — Server-Side Auth State Rehydration Hook
 *
 * PROBLEM SOLVED:
 *   When a user refreshes the page, React re-mounts from scratch.
 *   Zustand's sessionStorage persistence restores the access token,
 *   but the `user` object (name, role, etc.) is lost because it's
 *   excluded from persistence (security: no PII in sessionStorage).
 *
 * SOLUTION:
 *   On mount, if an access token exists, silently call GET /api/v1/auth/me/
 *   to fetch the user profile and rehydrate the Zustand `user` state.
 *   If the token is expired, the 401 interceptor auto-refreshes it first.
 *   If refresh fails, the user is logged out gracefully.
 *
 * USAGE:
 *   Call useAuthHydration() once in your root layout's client component:
 *
 *   ```tsx
 *   // src/app/(root)/layout.tsx  (or any global client wrapper)
 *   'use client';
 *   import { useAuthHydration } from '@/features/auth/hooks/useAuthHydration';
 *
 *   export function RootClientProvider({ children }: { children: React.ReactNode }) {
 *     useAuthHydration();
 *     return <>{children}</>;
 *   }
 *   ```
 *
 * DESIGN NOTES:
 *   - Only fires if an accessToken exists in Zustand (avoids unauthenticated calls)
 *   - Idempotent: safe to call multiple times (no re-fetch if user already set)
 *   - Non-blocking: runs after mount, never delays initial render
 *   - SSR-safe: 'use client' ensures this only runs in the browser
 */
'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { apiSync } from '@/core/api/client.sync';
import { AUTH_ENDPOINTS } from '@/core/constants/api.constants';

export function useAuthHydration(): void {
  const accessToken      = useAuthStore((s) => s.accessToken);
  const user             = useAuthStore((s) => s.user);
  const setUser          = useAuthStore((s) => s.setUser);
  const clearAuth        = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    // Skip if: no access token (unauthenticated) OR user already hydrated
    if (!accessToken || user) return;

    let cancelled = false;

    const hydrate = async () => {
      try {
        const { data } = await apiSync.get(AUTH_ENDPOINTS.ME);
        if (!cancelled) {
          // MeSerializer returns `user_id` (not `id`) to avoid shadowing Django's
          // internal pk. We remap it here so AuthUser.id is always populated.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const raw = data as Record<string, any>;
          setUser({
            id: raw.user_id ?? raw.id ?? '',
            email: raw.email ?? undefined,
            phone: raw.phone ?? undefined,
            first_name: raw.first_name ?? '',
            last_name: raw.last_name ?? '',
            role: raw.role ?? undefined,
            is_verified: raw.is_verified ?? false,
            is_staff: raw.is_staff ?? false,
            avatar: raw.avatar ?? null,
            date_joined: raw.date_joined ?? undefined,
          });
        }
      } catch {
        // Token invalid/expired and refresh failed → force logout
        if (!cancelled) {
          clearAuth();
        }
      }
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [accessToken, user, setUser, clearAuth]);
}
