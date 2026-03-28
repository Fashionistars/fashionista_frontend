/**
 * Auth Store — Zustand v5 with sessionStorage persistence
 *
 * Stores: access token, user info, authentication status
 * Persisted to sessionStorage (clears on browser tab close — security best practice)
 */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface AuthUser {
  id: string;
  email?: string;
  phone?: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  is_staff: boolean;
  avatar?: string;
  date_joined: string;
}

export interface AuthSession {
  id: number;
  device: string;
  ip_address: string;
  location?: string;
  last_seen: string;
  is_current: boolean;
}

export interface LoginEvent {
  id: number;
  timestamp: string;
  ip_address: string;
  device: string;
  location?: string;
  success: boolean;
}

interface AuthState {
  // ── State ──────────────────────────────────────────────────────────────
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingOTPEmail?: string;
  pendingOTPPhone?: string;

  // ── Actions ────────────────────────────────────────────────────────────
  setToken: (token: string) => void;
  setUser: (user: AuthUser) => void;
  setPendingOTP: (opts: { email?: string; phone?: string }) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

// ── Store ─────────────────────────────────────────────────────────────────────
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      pendingOTPEmail: undefined,
      pendingOTPPhone: undefined,

      setToken: (token) => set({ accessToken: token, isAuthenticated: true }),

      setUser: (user) => set({ user }),

      setPendingOTP: ({ email, phone }) =>
        set({ pendingOTPEmail: email, pendingOTPPhone: phone }),

      setLoading: (loading) => set({ isLoading: loading }),

      logout: () =>
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
          pendingOTPEmail: undefined,
          pendingOTPPhone: undefined,
        }),
    }),
    {
      name: "fashionistar-auth",
      // sessionStorage: clears when the browser tab is closed
      // This is the correct security posture for JWT access tokens
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? sessionStorage : localStorage,
      ),
      // Only persist essential fields — NOT the loading state
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        pendingOTPEmail: state.pendingOTPEmail,
        pendingOTPPhone: state.pendingOTPPhone,
      }),
    },
  ),
);

// ── Selectors (for performance — avoid object spread re-renders) ───────────────
export const selectIsAuthenticated = (state: AuthState) =>
  state.isAuthenticated;
export const selectUser = (state: AuthState) => state.user;
export const selectToken = (state: AuthState) => state.accessToken;
