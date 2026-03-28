import type { Metadata, Viewport } from "next";
import { Inter, Raleway } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

import "./globals.css";

// ── Google Fonts ──────────────────────────────────────────────────────────────
// NOTE: preload: false + fallback arrays prevent download warnings when
// fonts.googleapis.com is unreachable (Playwright, offline dev, CI environments).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false, // avoids dev-time network errors when fonts.googleapis.com unreachable
  adjustFontFallback: false, // prevents synthetic download on restricted networks
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  preload: false,
  adjustFontFallback: false, // same — prevents network attempts when offline
  fallback: ["Trebuchet MS", "Gill Sans", "system-ui", "sans-serif"],
});

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
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
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
      suppressHydrationWarning // Required for next-themes
      className={`${inter.variable} ${raleway.variable} ${bonFoyage.variable} ${satoshi.variable}`}
    >
      <body className="min-h-screen bg-background font-raleway antialiased">
        <Providers>
          {children}
          {/* Global Toast Notifications — driven by auth service errors */}
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
