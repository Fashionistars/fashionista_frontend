/**
 * Auth Zod Schemas — Frontend Data Contracts
 *
 * Zero-trust validation: every user input and API response is validated.
 * Aligned with backend Django serializers in apps/authentication/
 */
import { z } from "zod";

// ── Login ─────────────────────────────────────────────────────────────────────
export const LoginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

// ── Login Response ─────────────────────────────────────────────────────────────
export const LoginResponseSchema = z.object({
  access: z.string().min(1),
  refresh: z.string().optional(),
  user: z.object({
    id: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
    first_name: z.string(),
    last_name: z.string(),
    is_verified: z.boolean(),
    is_staff: z.boolean(),
    avatar: z.string().optional(),
    date_joined: z.string(),
  }),
  requires_otp: z.boolean().optional().default(false),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// ── Register ──────────────────────────────────────────────────────────────────
export const RegisterSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(
        /^\+\d{10,15}$/,
        "Phone must be in E.164 format (e.g. +2348012345678)",
      )
      .optional()
      .or(z.literal("")),
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50),
    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    password_confirm: z.string().min(8),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone number is required",
    path: ["email"],
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });

export type RegisterPayload = z.infer<typeof RegisterSchema>;

// ── OTP Verification ──────────────────────────────────────────────────────────
export const OTPSchema = z.object({
  otp: z
    .string()
    .min(4, "OTP must be at least 4 digits")
    .max(6, "OTP must be at most 6 digits")
    .regex(/^\d+$/, "OTP must contain only digits"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export type OTPPayload = z.infer<typeof OTPSchema>;

// ── OTP Resend ────────────────────────────────────────────────────────────────
export const ResendOTPSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export type ResendOTPPayload = z.infer<typeof ResendOTPSchema>;

// ── Password Reset Request ────────────────────────────────────────────────────
export const PasswordResetRequestSchema = z
  .object({
    email: z.string().email().optional().or(z.literal("")),
    phone: z
      .string()
      .regex(/^\+\d{10,15}$/)
      .optional()
      .or(z.literal("")),
  })
  .refine((d) => d.email || d.phone, {
    message: "Email or phone is required",
    path: ["email"],
  });

export type PasswordResetRequestPayload = z.infer<
  typeof PasswordResetRequestSchema
>;

// ── Password Reset Confirm (Email — uidb64 + token from URL) ──────────────────
export const PasswordResetConfirmEmailSchema = z
  .object({
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    new_password_confirm: z.string().min(8),
    uidb64: z.string().min(1),
    token: z.string().min(1),
  })
  .refine((d) => d.new_password === d.new_password_confirm, {
    message: "Passwords do not match",
    path: ["new_password_confirm"],
  });

export type PasswordResetConfirmEmailPayload = z.infer<
  typeof PasswordResetConfirmEmailSchema
>;

// ── Password Reset Confirm (Phone — OTP only, no phone field) ─────────────────
export const PasswordResetConfirmPhoneSchema = z
  .object({
    otp: z.string().min(4).max(6).regex(/^\d+$/),
    new_password: z.string().min(8),
    new_password_confirm: z.string().min(8),
  })
  .refine((d) => d.new_password === d.new_password_confirm, {
    message: "Passwords do not match",
    path: ["new_password_confirm"],
  });

export type PasswordResetConfirmPhonePayload = z.infer<
  typeof PasswordResetConfirmPhoneSchema
>;

// ── Change Password (Authenticated) ───────────────────────────────────────────
export const ChangePasswordSchema = z
  .object({
    old_password: z.string().min(8, "Current password is required"),
    new_password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "Needs uppercase letter")
      .regex(/[0-9]/, "Needs a number"),
    new_password_confirm: z.string().min(8),
  })
  .refine((d) => d.new_password === d.new_password_confirm, {
    message: "Passwords do not match",
    path: ["new_password_confirm"],
  })
  .refine((d) => d.old_password !== d.new_password, {
    message: "New password must differ from current password",
    path: ["new_password"],
  });

export type ChangePasswordPayload = z.infer<typeof ChangePasswordSchema>;
