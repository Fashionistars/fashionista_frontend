export type CanonicalRole = "client" | "vendor" | "admin";

export interface AuthSessionMirror {
  authenticated: boolean;
  role?: CanonicalRole;
}

export interface PersistedAuthUserLike {
  role?: string | null;
  is_staff?: boolean;
}

export interface PersistedAuthStateLike {
  accessToken?: string | null;
  refreshToken?: string | null;
  isAuthenticated?: boolean;
  user?: PersistedAuthUserLike | null;
}
