/**
 * PasswordResetConfirmForm — Shared form for email + phone reset confirm.
 *
 * Mode "email": URL `/password-recovery/[uidb64]/[token]`
 *   - Accepts new_password + new_password_confirm
 *   - POSTs to /api/v1/password/reset-confirm/<uidb64>/<token>/
 *
 * Mode "phone": URL `/forgot-password/confirm-phone`
 *   - Accepts otp + new_password + new_password_confirm
 *   - POSTs to /api/v1/password/reset-phone-confirm/
 */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Eye, EyeOff, Loader2, Lock, ShieldCheck, KeyRound,
} from "lucide-react";
import {
  PasswordResetConfirmEmailSchema,
  PasswordResetConfirmPhoneSchema,
  type PasswordResetConfirmEmailPayload,
  type PasswordResetConfirmPhonePayload,
} from "@/features/auth/schemas/auth.schemas";
import {
  confirmPasswordResetEmail,
  confirmPasswordResetPhone,
} from "@/features/auth/services/auth.service";
import { AuthAlert, FieldError } from "@/components/shared/feedback/AuthAlert";
import { parseApiError } from "@/lib/api/parseApiError";

// ── Email Mode ────────────────────────────────────────────────────────────────

interface EmailModeProps {
  mode: "email";
  uidb64: string;
  token: string;
}

interface PhoneModeProps {
  mode: "phone";
}

type PasswordResetConfirmFormProps = EmailModeProps | PhoneModeProps;

// ── Email Confirm Sub-form ─────────────────────────────────────────────────────

function EmailConfirmForm({ uidb64, token }: { uidb64: string; token: string }) {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetConfirmEmailPayload>({
    resolver: zodResolver(PasswordResetConfirmEmailSchema),
    defaultValues: { uidb64, token, new_password: "", new_password_confirm: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: confirmPasswordResetEmail,
    onSuccess: (data) => {
      setErrorMsg(null);
      setSuccessMsg(data.message ?? "Password reset successful! You can now sign in.");
      setTimeout(() => router.push("/auth/sign-in"), 2500);
    },
    onError: (err) => {
      const parsed = parseApiError(err);
      setErrorMsg(parsed.message);
    },
  });

  const onSubmit = (data: PasswordResetConfirmEmailPayload) => {
    setErrorMsg(null);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Hidden URL fields */}
      <input type="hidden" {...register("uidb64")} />
      <input type="hidden" {...register("token")} />

      {successMsg && (
        <AuthAlert variant="success" message={successMsg} autoDismissMs={3000} />
      )}
      {errorMsg && (
        <AuthAlert
          variant="error"
          message={errorMsg}
          autoDismissMs={8000}
          onDismiss={() => setErrorMsg(null)}
        />
      )}

      {/* New Password */}
      <div className="space-y-1.5">
        <label htmlFor="new-password" className="text-sm font-medium text-foreground">
          New Password
        </label>
        <div className="relative" suppressHydrationWarning>
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            id="new-password"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            {...register("new_password")}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring transition-all
                       placeholder:text-muted-foreground/60"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <FieldError message={errors.new_password?.message} />
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
          Confirm New Password
        </label>
        <div className="relative" suppressHydrationWarning>
          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            id="confirm-password"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            {...register("new_password_confirm")}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring transition-all
                       placeholder:text-muted-foreground/60"
            placeholder="Repeat your new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirm ? "Hide" : "Show"}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <FieldError message={errors.new_password_confirm?.message} />
      </div>

      {/* Submit */}
      <button
        id="pw-reset-email-submit"
        type="submit"
        disabled={isPending || !!successMsg}
        className="
          w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl
          font-semibold text-sm hover:bg-primary/90
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200 flex items-center justify-center gap-2
          shadow-sm hover:shadow-md active:scale-[0.99]
        "
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Resetting Password…
          </>
        ) : successMsg ? (
          <>
            <ShieldCheck className="h-4 w-4" />
            Redirecting to Sign In…
          </>
        ) : (
          <>
            <KeyRound className="h-4 w-4" />
            Set New Password
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Remembered your password?{" "}
        <Link href="/auth/sign-in" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
}

// ── Phone OTP Confirm Sub-form ────────────────────────────────────────────────

function PhoneConfirmForm() {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordResetConfirmPhonePayload>({
    resolver: zodResolver(PasswordResetConfirmPhoneSchema),
    defaultValues: { otp: "", new_password: "", new_password_confirm: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: confirmPasswordResetPhone,
    onSuccess: (data) => {
      setErrorMsg(null);
      setSuccessMsg(data.message ?? "Password reset successful!");
      setTimeout(() => router.push("/auth/sign-in"), 2500);
    },
    onError: (err) => {
      const parsed = parseApiError(err);
      setErrorMsg(parsed.message);
    },
  });

  const onSubmit = (data: PasswordResetConfirmPhonePayload) => {
    setErrorMsg(null);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {successMsg && (
        <AuthAlert variant="success" message={successMsg} autoDismissMs={3000} />
      )}
      {errorMsg && (
        <AuthAlert
          variant="error"
          message={errorMsg}
          autoDismissMs={8000}
          onDismiss={() => setErrorMsg(null)}
        />
      )}

      {/* OTP Code */}
      <div className="space-y-1.5">
        <label htmlFor="phone-otp" className="text-sm font-medium text-foreground">
          SMS Verification Code
        </label>
        <input
          id="phone-otp"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          autoComplete="one-time-code"
          {...register("otp")}
          className="
            w-full px-4 py-3 rounded-lg border border-input bg-background
            text-center text-2xl font-bold tracking-[0.5em]
            focus:outline-none focus:ring-2 focus:ring-ring transition-all
            placeholder:text-muted-foreground/40 placeholder:tracking-normal
            placeholder:text-base placeholder:font-normal
          "
          placeholder="6-digit code"
        />
        <FieldError message={errors.otp?.message} />
        <p className="text-xs text-muted-foreground">
          Didn&apos;t receive the SMS?{" "}
          <Link href="/forgot-password" className="text-primary hover:underline font-medium">
            Request a new code
          </Link>
        </p>
      </div>

      {/* New Password */}
      <div className="space-y-1.5">
        <label htmlFor="phone-new-password" className="text-sm font-medium text-foreground">
          New Password
        </label>
        <div className="relative" suppressHydrationWarning>
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            id="phone-new-password"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            {...register("new_password")}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring transition-all
                       placeholder:text-muted-foreground/60"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPw ? "Hide" : "Show"}
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <FieldError message={errors.new_password?.message} />
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label htmlFor="phone-confirm-password" className="text-sm font-medium text-foreground">
          Confirm New Password
        </label>
        <div className="relative" suppressHydrationWarning>
          <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            id="phone-confirm-password"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            {...register("new_password_confirm")}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm
                       focus:outline-none focus:ring-2 focus:ring-ring transition-all
                       placeholder:text-muted-foreground/60"
            placeholder="Repeat your new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirm ? "Hide" : "Show"}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <FieldError message={errors.new_password_confirm?.message} />
      </div>

      {/* Submit */}
      <button
        id="pw-reset-phone-submit"
        type="submit"
        disabled={isPending || !!successMsg}
        className="
          w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl
          font-semibold text-sm hover:bg-primary/90
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200 flex items-center justify-center gap-2
          shadow-sm hover:shadow-md active:scale-[0.99]
        "
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Resetting Password…
          </>
        ) : (
          <>
            <KeyRound className="h-4 w-4" />
            Set New Password
          </>
        )}
      </button>
    </form>
  );
}

// ── Public export — dispatcher ─────────────────────────────────────────────────

export function PasswordResetConfirmForm(props: PasswordResetConfirmFormProps) {
  if (props.mode === "phone") {
    return <PhoneConfirmForm />;
  }
  return <EmailConfirmForm uidb64={props.uidb64} token={props.token} />;
}
