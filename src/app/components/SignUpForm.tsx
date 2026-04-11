/**
 * SignUpForm — LEGACY STUB
 *
 * This is a legacy stub kept for backward compatibility.
 * The actual implementation is now at:
 *   src/features/auth/components/RegisterForm.tsx
 *
 * The old implementation used `useFormState` (Server Actions) which
 * is incompatible with the new TanStack Query architecture.
 *
 * New registration flow:
 *   1. User goes to /auth/choose-role → picks Vendor or Client
 *   2. /auth/sign-up?role=vendor|client → RegisterForm component
 *   3. RegisterForm uses React Hook Form + Zod + TanStack Mutation
 */
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SignUpForm = ({ role }: { role?: "Vendor" | "Client" }) => {
  const router = useRouter();

  // Redirect to new canonical registration flow
  useEffect(() => {
    const roleParam = role
      ? role.toLowerCase() === "vendor"
        ? "?role=vendor"
        : "?role=client"
      : "";
    router.replace(`/auth/choose-role${roleParam}`);
  }, [role, router]);

  return null;
};

export default SignUpForm;
