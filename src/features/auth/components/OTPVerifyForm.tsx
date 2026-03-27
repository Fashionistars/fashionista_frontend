"use client";
/**
 * OTPVerifyForm Component — Feature Auth
 *
 * Used after: register, login (if OTP required), forgot password
 * Uses: 6 individual input boxes, auto-advance, paste support
 * Calls: features/auth/services/auth.service.ts → verifyOTP() + resendOTP()
 */
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";

import { verifyOTP, resendOTP } from "@/features/auth/services/auth.service";
import { useAuthStore } from "@/features/auth/store/auth.store";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;

export function OTPVerifyForm() {
  const router = useRouter();
  const { setToken, setUser, pendingOTPEmail, pendingOTPPhone } = useAuthStore();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const { mutate: verify, isPending: isVerifying } = useMutation({
    mutationFn: () =>
      verifyOTP({
        otp: otp.join(""),
        email: pendingOTPEmail,
        phone: pendingOTPPhone,
      }),
    onSuccess: (data) => {
      setToken(data.access);
      setUser(data.user);
      toast.success("Verification successful!", {
        description: `Welcome, ${data.user.first_name}! 🎉`,
      });
      router.push("/");
    },
    onError: () => {
      // Toast handled by apiSync interceptor
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    },
  });

  const { mutate: resend, isPending: isResending } = useMutation({
    mutationFn: () =>
      resendOTP({ email: pendingOTPEmail, phone: pendingOTPPhone }),
    onSuccess: () => {
      setCountdown(RESEND_COOLDOWN_SECONDS);
      toast.info("OTP Resent", {
        description: "A new code has been sent to your email/phone.",
      });
    },
  });

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (digit && index === OTP_LENGTH - 1 && newOtp.every(Boolean)) {
      verify();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    pasted.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);
    // Focus last filled input
    const lastFilledIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const isComplete = otp.every(Boolean);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to{" "}
          <span className="font-semibold text-foreground">
            {pendingOTPEmail || pendingOTPPhone || "your email/phone"}
          </span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {Array(OTP_LENGTH)
          .fill(null)
          .map((_, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-bold border-2 border-input rounded-lg bg-background focus:border-primary focus:outline-none transition-all"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
      </div>

      {/* Verify Button */}
      <button
        id="otp-verify-btn"
        onClick={() => verify()}
        disabled={!isComplete || isVerifying}
        className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        {isVerifying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Code"
        )}
      </button>

      {/* Resend OTP */}
      <div className="text-center">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in{" "}
            <span className="font-semibold text-foreground">{countdown}s</span>
          </p>
        ) : (
          <button
            id="otp-resend-btn"
            onClick={() => resend()}
            disabled={isResending}
            className="text-sm text-primary font-semibold hover:underline flex items-center gap-1.5 mx-auto"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {isResending ? "Sending..." : "Resend Code"}
          </button>
        )}
      </div>
    </div>
  );
}
