"use client";

/**
 * @file KycStatusView.tsx
 * @description KYC status surface for client, vendor, and admin routes.
 */
import { ShieldCheck } from "lucide-react";
import { useKycStatus } from "../hooks/use-kyc";

const copy = {
  client: "Verify identity before high-trust wallet payments and custom measurement sharing.",
  vendor: "Complete KYC before withdrawals, payout setup, and high-value custom orders.",
  admin: "Monitor verification readiness and provider integration status.",
} as const;

export function KycStatusView({
  audience = "client",
}: {
  audience?: keyof typeof copy;
}) {
  const { data, isError, isLoading } = useKycStatus();

  return (
    <div className="flex flex-col gap-8 py-4">
      <div>
        <h1 className="font-bon_foyage text-5xl text-black">KYC Verification</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#5A6465]">
          {copy[audience]}
        </p>
      </div>

      <section className="rounded-[32px] bg-white p-8 shadow-card_shadow">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-[20px] bg-[#FDA600]/10 text-[#FDA600]">
            <ShieldCheck />
          </div>
          <div>
            <p className="text-lg font-semibold text-black">
              {isLoading ? "Checking status..." : data?.status ?? "Not started"}
            </p>
            <p className="mt-1 text-sm text-[#5A6465]">
              {isError
                ? "Backend KYC routes are still scaffolded. This frontend slice is ready for activation."
                : data?.review_notes || "Upload identity documents through the secure Cloudinary flow when the KYC API is mounted."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
