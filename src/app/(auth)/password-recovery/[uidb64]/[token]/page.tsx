import { redirect } from "next/navigation";

/**
 * Legacy /password-recovery/[uidb64]/[token] route.
 * Redirects to new canonical /auth/forgot-password/confirm-email/[uidb64]/[token].
 *
 * Note: Next.js cannot read params in a server redirect cleanly,
 * but the canonical confirm-email page handles the dynamic segments directly.
 * Any old email links with /password-recovery/<uid>/<token> will be forwarded.
 */
export default async function PasswordRecoveryTokenLegacyRedirect({
  params,
}: {
  params: Promise<{ uidb64: string; token: string }>;
}) {
  const { uidb64, token } = await params;
  redirect(`/auth/forgot-password/confirm-email/${uidb64}/${token}`);
}
