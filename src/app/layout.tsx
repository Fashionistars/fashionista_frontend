import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";
import { PreloaderDismiss } from "@/components/shared/preloader/Preloader";

import "./globals.css";

// ── Local Fonts ───────────────────────────────────────────────────────────────
const bonFoyage = localFont({
  src: "./fonts/Bon-Foyage-Demo.otf",
  variable: "--font-bon-foyage",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

// ── Metadata (SEO) ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "FASHIONISTAR AI — Premium Fashion E-Commerce",
    template: "%s | FASHIONISTAR AI",
  },
  description:
    "Discover premium African fashion with AI-powered size recommendations, exclusive collections, and seamless checkout. Shop FASHIONISTAR AI.",
  keywords: [
    "fashionistar",
    "african fashion",
    "ai measurements",
    "premium clothing",
    "luxury fashion nigeria",
  ],
  authors: [{ name: "FASHIONISTAR Team", url: "https://fashionistar.com" }],
  creator: "FASHIONISTAR Engineering",
  robots: { index: true, follow: true },

  // Open Graph — Social sharing
  openGraph: {
    type: "website",
    url: "https://fashionistar.com",
    title: "FASHIONISTAR AI — Premium Fashion E-Commerce",
    description:
      "AI-powered premium African fashion: perfect fits, exclusive collections.",
    siteName: "FASHIONISTAR AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FASHIONISTAR AI",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    site: "@fashionistar",
    creator: "@fashionistar",
    images: ["/og-image.png"],
  },

  // App Icons
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// ── Viewport ──────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#01454A" },
    { media: "(prefers-color-scheme: dark)", color: "#01454A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${bonFoyage.variable} ${satoshi.variable}`}
    >
      <head>
        {/*
         * ── Static Preloader CSS ──────────────────────────────────────────
         * Loaded before any JS bundle — renders immediately from first byte.
         * Lives in /public (static file server, zero DB, zero React needed).
         * Cache-Control: immutable set in next.config.mjs headers rule.
         */}
        <link
          rel="stylesheet"
          href="/preloader.css"
          // @ts-expect-error — fetchpriority is valid HTML but not yet in TS lib types
          fetchpriority="high"
        />

        {/*
         * ── Resource Hints — Media Performance ───────────────────────────
         * Preconnect to Cloudinary CDN so the first image fetch is instant.
         * DNS prefetch as fallback for older browsers.
         */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>

      <body className="min-h-screen bg-background font-raleway antialiased">
        {/*
         * ── Static Preloader Shell ────────────────────────────────────────
         * Server-rendered — visible on the very first paint before any JS.
         * Styled entirely by /public/preloader.css (zero JS cost).
         * Dismissed by <PreloaderDismiss> after React hydration.
         */}
        <div id="fs-preloader" role="status" aria-label="Loading Fashionistar">
          <div className="fs-logo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Fashionistar"
              className="fs-logo-img"
              width={60}
              height={60}
            />
          </div>
          <p className="fs-brand">
            FASHION<span>ISTAR</span>
          </p>
          <p className="fs-tagline">Perfect Fit, Every Time</p>
          <div className="fs-progress-track">
            <div className="fs-progress-bar" />
          </div>
          <div className="fs-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Dismiss preloader after React hydration — zero re-renders, RAF-based */}
        <PreloaderDismiss />

        <Providers>
          {children}

          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              classNames: {
                toast: "font-raleway text-sm",
                error: "border-destructive",
                success: "border-primary",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
