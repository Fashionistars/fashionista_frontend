import { redirect } from "next/navigation";

/**
 * Legacy /password-recovery route — redirects to canonical /auth/forgot-password.
 * This was the old Django token-based reset entry point.
 */
export default function PasswordRecoveryLegacyRedirect() {
  redirect("/auth/forgot-password");
}
