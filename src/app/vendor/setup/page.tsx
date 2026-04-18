import Link from "next/link";
import { ArrowRight, Settings } from "lucide-react";

export default function VendorSetupPage() {
  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-white p-8 shadow-card md:p-10">
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Settings className="h-7 w-7" />
      </div>

      <div className="space-y-4">
        <h1 className="font-bon-foyage text-4xl leading-tight text-primary">
          Finish Setting Up Your Vendor Space
        </h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          Your vendor account is active. The next step is to complete your
          store profile so your dashboard, product workflow, and payment setup
          are all pointing to the right business details.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-muted/20 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Recommended
          </p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">
            Review store settings
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Update business name, contact details, branding, and store-facing
            information before you begin listing products.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-muted/20 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Next
          </p>
          <h2 className="mt-3 text-xl font-semibold text-foreground">
            Start adding products
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Once the essentials are in place, jump into the product flow and
            start preparing your catalog for launch.
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/vendor/settings"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
        >
          Open Vendor Settings
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/vendor/dashboard"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
        >
          Go To Dashboard
        </Link>
      </div>
    </div>
  );
}
