/**
 * Auth API exports — TanStack Query era
 *
 * All auth operations are now in:
 *   src/features/auth/services/auth.service.ts
 *
 * This file kept for backward compatibility with any old imports.
 */

// Re-export everything from the new service layer
export {
  login,
  register,
  verifyOTP,
  resendOTP,
  googleAuth,
  logout,
  refreshToken,
  requestPasswordReset,
  confirmPasswordResetEmail,
  confirmPasswordResetPhone,
  changePassword,
} from "@/features/auth/services/auth.service";
