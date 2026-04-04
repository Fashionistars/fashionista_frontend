"use client";
/**
 * PasswordResetForm Component — Feature Auth
 *
 * Two modes:
 *   1. REQUEST: user enters email → backend sends reset link/OTP
 *   2. CONFIRM: user enters new password (used in /reset-password/[uid]/[token] page)
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Mail, Loader2, CheckCircle } from "lucide-react";
import { z } from "zod";

import { requestPasswordReset } from "@/features/auth/services/auth.service";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
type ForgotPasswordPayload = z.infer<typeof ForgotPasswordSchema>;

export function PasswordResetForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ForgotPasswordPayload>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgotPasswordPayload) =>
      requestPasswordReset({ email: data.email }),
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-6 animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <div>
          <h2 className="font-semibold text-lg text-foreground">
            Check your email
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            We sent a password reset link to{" "}
            <span className="font-semibold text-foreground">
              {watch("email")}
            </span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Didn&apos;t receive it?{" "}
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-primary hover:underline font-semibold"
          >
            Try again
          </button>
        </p>
        <button
          type="button"
          id="back-to-login-btn"
          onClick={() => router.push("/auth/sign-in")}
          className="text-sm text-primary font-semibold hover:underline"
        >
          ← Back to login
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit((data) => mutate(data))}
      className="space-y-5"
      noValidate
    >
      <div className="space-y-1.5">
        <label
          htmlFor="reset-email"
          className="text-sm font-medium text-foreground"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="reset-email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            placeholder="you@fashionistar.com"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <button
        id="reset-submit-btn"
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending link...
          </>
        ) : (
          "Send Reset Link"
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <button
          type="button"
          onClick={() => router.push("/auth/sign-in")}
          className="text-primary font-semibold hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  );
}
