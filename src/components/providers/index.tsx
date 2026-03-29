"use client";
/**
 * Root Providers — Combined Provider Stack
 *
 * Order matters:
 *  ThemeProvider → QueryProvider → children
 *
 * This is the single import used in app/layout.tsx.
 */
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        <QueryProvider>{children}</QueryProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
