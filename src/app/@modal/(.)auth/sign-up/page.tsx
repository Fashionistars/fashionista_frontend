/**
 * @modal/(.)auth/sign-up/page.tsx
 *
 * Next.js intercept route — renders the registration form as a modal
 * when the user navigates to /auth/sign-up?role=... via client nav.
 * role is required (sign-up page enforces it via redirect if missing).
 */
import { AuthModal } from "@/components/shared/modal/AuthModal";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignUpModal({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const role = params.role;

  // Guard: if role is missing, fall back to choose-role
  if (!role || (role !== "vendor" && role !== "client")) {
    redirect("/auth/choose-role");
  }

  return (
    <AuthModal>
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold font-bon-foyage text-primary tracking-wide mb-1">
          FASHIONISTAR
        </h1>
        <p className="text-muted-foreground text-sm">
          {role === "vendor"
            ? "Create your Vendor account — start selling"
            : "Create your account — start shopping"}
        </p>
      </div>

      <RegisterForm role={role as "vendor" | "client"} />

      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthModal>
  );
}
