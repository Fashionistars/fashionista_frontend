"use client";
/**
 * Root Providers — Combined Provider Stack
 *
 * Order matters:
 *  GoogleOAuthProvider → ThemeProvider → QueryProvider → children
 *
 * This is the single import used in app/layout.tsx.
 */
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider>
        <NuqsAdapter>
          <QueryProvider>{children}</QueryProvider>
        </NuqsAdapter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

