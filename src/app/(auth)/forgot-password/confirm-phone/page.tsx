import { redirect } from "next/navigation";

/**
 * Legacy /forgot-password/confirm-phone route.
 * Permanently redirected to canonical /auth/forgot-password/confirm-phone.
 */
export default function ForgotPasswordConfirmPhoneLegacyRedirect() {
  redirect("/auth/forgot-password/confirm-phone");
}
