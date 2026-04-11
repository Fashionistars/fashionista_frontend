/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Partial Pre-rendering (PPR) — Next.js 16.2+ ─────────────────────────
  // Renamed from `experimental.ppr` → `experimental.cacheComponents` → top-level `cacheComponents`
  cacheComponents: true,


  // (Top-level allowedDevHosts removed for Next.js 15+ Turbopack compatibility)

  // ── Image Optimization ───────────────────────────────────────────────────
  images: {
    remotePatterns: [
      // Cloudinary CDN
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dgpdlknc1/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
      // Backend (ngrok)
      {
        protocol: 'https',
        hostname: 'hydrographically-tawdrier-hayley.ngrok-free.dev',
        pathname: '/media/**',
      },
      // Backend (localhost dev)
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      // Cloudflare Quick Tunnels (frontend accessed via trycloudflare.com)
      {
        protocol: 'https',
        hostname: '**.trycloudflare.com',
      },
      // Placeholder services
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800, // 7 days
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },

  // ── Security & Performance Headers ──────────────────────────────────────
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), microphone=(), geolocation=(self)',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // ── Legacy Route Redirects ───────────────────────────────────────────────
  // Permanent 301 redirects for deprecated auth route names.
  // New canonical routes follow Stripe/Vercel/Shopify conventions.
  redirects: async () => {
    return [
      // Login
      {
        source: '/login',
        destination: '/auth/sign-in',
        permanent: true,
      },
      // Register / Sign Up
      {
        source: '/register',
        destination: '/auth/choose-role',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth/choose-role',
        permanent: true,
      },
      {
        source: '/sign-up',
        destination: '/auth/choose-role',
        permanent: true,
      },
      // Verify OTP (old path was at top-level, now in (auth) group)
      // Next.js renders /verify-otp fine from (auth) group — no redirect needed.
      // Forgot Password
      {
        source: '/reset-password',
        destination: '/forgot-password',
        permanent: true,
      },
    ];
  },

  // ── API Rewrites (BFF Proxy) ─────────────────────────────────────────────
  // In development: proxy to local Django (localhost:8000)
  // In production: override via BACKEND_URL env var (ngrok / real server)
  rewrites: async () => {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

    return {
      beforeFiles: [
        // DRF Sync endpoints
        {
          source: '/api/v1/:path*',
          destination: `${backendUrl}/api/v1/:path*`,
        },
        // Ninja Async endpoints
        {
          source: '/api/v2/:path*',
          destination: `${backendUrl}/api/v2/:path*`,
        },
      ],
    };
  },

  // ── Server External Packages ─────────────────────────────────────────────
  serverExternalPackages: ['sharp', '@opentelemetry/sdk-trace-web'],

  // ── Build & Runtime ──────────────────────────────────────────────────────
  // output: 'standalone', // Enable only for Docker/production deployment
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

};

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
