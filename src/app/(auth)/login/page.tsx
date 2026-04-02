import { redirect } from "next/navigation";

/**
 * Legacy /login route — permanently redirected to canonical /auth/sign-in.
 * Enterprise URL naming convention: /auth/sign-in (Stripe / Vercel standard).
 * Kept to preserve backward compatibility (bookmarks, links, email links).
 * The full sign-in page lives at: src/app/(auth)/auth/sign-in/page.tsx
 */
export default function LoginRedirect() {
  redirect("/auth/sign-in");
}
