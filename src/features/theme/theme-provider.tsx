/**
 * Theme context bridge — re-exports `useTheme` from next-themes
 * so all Settings views use the same store already wired in Providers.
 */
export { useTheme } from "next-themes";
export type Theme = "light" | "dark" | "system";
