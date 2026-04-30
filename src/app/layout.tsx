/* eslint-disable @next/next/no-css-tags, @next/next/no-img-element */

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
    process.env.NEXT_PUBLIC_APP_URL ?? "https://www.fashionistar.net",
  ),
  title: {
    default: "FASHIONISTAR AI — Premium Fashion E-Commerce",
    template: "%s | FASHIONISTAR AI",
  },
  applicationName: "FASHIONISTAR AI",
  description:
    "FASHIONISTAR AI connects clients with professional tailors through AI-powered digital measurements, premium fashion commerce, secure payments, and real-time collaboration.",
  keywords: [
    "fashionistar",
    "african fashion",
    "ai measurements",
    "digital body measurements",
    "tailor marketplace",
    "custom clothing",
    "premium clothing",
    "luxury fashion nigeria",
  ],
  authors: [{ name: "FASHIONISTAR Team", url: "https://fashionistar.net" }],
  creator: "FASHIONISTAR Engineering",
  category: "Fashion E-Commerce",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  // Open Graph — Social sharing
  openGraph: {
    type: "website",
    url: "https://www.fashionistar.net",
    title: "FASHIONISTAR AI — Premium Fashion E-Commerce",
    description:
      "AI-powered fashion commerce for perfect-fit custom clothing, tailor collaboration, and secure transactions.",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
        <link
          rel="preload"
          href="/preloader/fashionistar-ai-preloader.svg"
          as="image"
          type="image/svg+xml"
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
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="fashionistar-google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}

        {/*
         * ── Static Preloader Shell ────────────────────────────────────────
         * Server-rendered — visible on the very first paint before any JS.
         * Styled entirely by /public/preloader.css (zero JS cost).
         * Dismissed by <PreloaderDismiss> after React hydration.
         */}
        <div id="fs-preloader" role="status" aria-label="Loading Fashionistar AI">
          <div className="fs-preloader-inner">
            <div className="fs-logo-wrap" aria-hidden="true">
              <img
                className="fs-logo-svg"
                src="/preloader/fashionistar-ai-preloader.svg"
                alt=""
                width="256"
                height="256"
                fetchPriority="high"
              />
            </div>

            <p className="fs-brand">
              FASHION<span>ISTAR</span>
            </p>

            <p className="fs-tagline">
              AI Precision • Perfect Fit • Seamless Fashion Commerce
            </p>

            <div className="fs-progress-track" aria-hidden="true">
              <div className="fs-progress-bar" />
            </div>

            <div className="fs-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
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
