import { redirect } from "next/navigation";

/**
 * Legacy /verify route — permanently redirected to canonical /verify-otp.
 * The new canonical OTP page uses the modern OTPVerifyForm component.
 */
export default function VerifyRedirect() {
  redirect("/verify-otp");
}
