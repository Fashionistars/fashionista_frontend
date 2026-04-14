import { redirect } from "next/navigation";

/**
 * Legacy /register route — permanently redirected to canonical /auth/choose-role.
 *
 * Users MUST select their role (Vendor / Client) before seeing the registration form.
 * The role is passed as a URL param to /auth/sign-up?role=vendor or ?role=client.
 *
 * The canonical flow is: /auth/choose-role → /auth/sign-up?role=<role>
 */
export default function RegisterLegacyRedirect() {
  redirect("/auth/choose-role");
}
