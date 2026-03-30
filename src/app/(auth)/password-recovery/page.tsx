import { redirect } from "next/navigation";

/**
 * Legacy /password-recovery route — permanently redirected to /forgot-password.
 * The canonical password reset request page is at /forgot-password.
 */
export default function PasswordRecoveryRedirect() {
  redirect("/forgot-password");
}
