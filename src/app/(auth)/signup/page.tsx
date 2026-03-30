import { redirect } from "next/navigation";

/**
 * Legacy /signup route — permanently redirected to canonical /auth/sign-up.
 * The new canonical page is at /auth/sign-up with full enterprise design.
 */
export default function SignupRedirect() {
  redirect("/auth/sign-up");
}
