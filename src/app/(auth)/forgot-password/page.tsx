import { redirect } from "next/navigation";

/**
 * Legacy /forgot-password route — permanently redirected to canonical /auth/forgot-password
 * The new canonical page follows the /auth/<action> FSD naming pattern.
 */
export default function ForgotPasswordLegacyRedirect() {
  redirect("/auth/forgot-password");
}
