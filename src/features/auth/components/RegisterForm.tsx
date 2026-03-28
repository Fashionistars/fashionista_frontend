"use client";
/**
 * RegisterForm Component — Feature Auth
 *
 * Uses: React Hook Form + Zod + TanStack Query mutation
 * Supports: Email OR Phone registration toggle
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

import { RegisterSchema, type RegisterPayload } from "@/features/auth/schemas/auth.schemas";
import { register } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/auth.store";

type RegistrationMode = "email" | "phone";

export function RegisterForm() {
  const router = useRouter();
  const { setPendingOTP } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<RegistrationMode>("email");

  const {
    register: rhfRegister,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      phone: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirm: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      const identifier = mode === "email" ? watch("email") : watch("phone");
      setPendingOTP(
        mode === "email" ? { email: identifier } : { phone: identifier }
      );
      toast.success("Account created!", {
        description: "Check your email/phone for the OTP code.",
      });
      router.push("/verify-otp");
    },
  });

  const toggleMode = (newMode: RegistrationMode) => {
    setMode(newMode);
    setValue("email", "");
    setValue("phone", "");
  };

  const onSubmit = (data: RegisterPayload) => mutate(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* Mode toggle: Email / Phone */}
      <div className="flex rounded-lg border border-border overflow-hidden" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "email"}
          onClick={() => toggleMode("email")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "email"
              ? "bg-primary text-primary-foreground"
              : "bg-background text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Mail className="inline w-4 h-4 mr-1.5" />
          Email
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "phone"}
          onClick={() => toggleMode("phone")}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "phone"
              ? "bg-primary text-primary-foreground"
              : "bg-background text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Phone className="inline w-4 h-4 mr-1.5" />
          Phone
        </button>
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="reg-fname" className="text-sm font-medium">First Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="reg-fname"
              type="text"
              {...rhfRegister("first_name")}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Daniel"
            />
          </div>
          {errors.first_name && <p className="text-xs text-destructive">{errors.first_name.message}</p>}
        </div>
        <div className="space-y-1">
          <label htmlFor="reg-lname" className="text-sm font-medium">Last Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="reg-lname"
              type="text"
              {...rhfRegister("last_name")}
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Ezichi"
            />
          </div>
          {errors.last_name && <p className="text-xs text-destructive">{errors.last_name.message}</p>}
        </div>
      </div>

      {/* Email or Phone */}
      {mode === "email" ? (
        <div className="space-y-1">
          <label htmlFor="reg-email" className="text-sm font-medium">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="reg-email"
              type="email"
              autoComplete="email"
              {...rhfRegister("email")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="you@fashionistar.com"
            />
          </div>
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
      ) : (
        <div className="space-y-1">
          <label htmlFor="reg-phone" className="text-sm font-medium">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="reg-phone"
              type="tel"
              autoComplete="tel"
              {...rhfRegister("phone")}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="+2348012345678"
            />
          </div>
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      )}

      {/* Password */}
      <div className="space-y-1">
        <label htmlFor="reg-password" className="text-sm font-medium">Password</label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...rhfRegister("password")}
            className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Min. 8 chars, 1 uppercase, 1 number"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label htmlFor="reg-password-confirm" className="text-sm font-medium">Confirm Password</label>
        <input
          id="reg-password-confirm"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...rhfRegister("password_confirm")}
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Repeat password"
        />
        {errors.password_confirm && (
          <p className="text-xs text-destructive">{errors.password_confirm.message}</p>
        )}
      </div>

      {/* Root error (email or phone required) */}
      {errors.root && <p className="text-xs text-destructive text-center">{errors.root.message}</p>}

      {/* Submit */}
      <button
        id="register-submit-btn"
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
