/**
 * @modal/(.)auth/sign-in/page.tsx
 *
 * Next.js intercept route — renders the sign-in form as a modal
 * when the user navigates to /auth/sign-in via client-side nav (Link).
 * Hard refresh still shows the full /auth/sign-in page.
 */
import { AuthModal } from "@/components/shared/modal/AuthModal";
import { LoginForm } from "@/features/auth/components/LoginForm";
import Link from "next/link";

export default function SignInModal() {
  return (
    <AuthModal>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-bon-foyage text-primary tracking-wide mb-1">
          FASHIONISTAR
        </h1>
        <p className="text-muted-foreground text-sm">
          Sign in to your account
        </p>
      </div>

      <LoginForm />

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/auth/choose-role" className="text-primary font-semibold hover:underline">
          Create one
        </Link>
      </p>
    </AuthModal>
  );
}
