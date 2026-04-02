import { redirect } from "next/navigation";

/**
 * Legacy /signup route — permanently redirected to /auth/choose-role (Phase 7).
 * Users must select their role (Vendor / Client) before the registration form.
 * The new canonical role-selection page is at /auth/choose-role.
 */
export default function SignupRedirect() {
  redirect("/auth/choose-role");
}
