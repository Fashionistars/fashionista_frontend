/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Experimental Features ────────────────────────────────────────────────
  // NOTE: All experimental canary-only flags removed.
  // reactCompiler needs 'babel-plugin-react-compiler' — add with:
  //   pnpm add -D babel-plugin-react-compiler
  // then re-enable: experimental: { reactCompiler: true }
  // experimental: {},

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

  // ── Webpack Customizations ───────────────────────────────────────────────
  webpack: (config, { isServer }) => {
    // Bundle analyzer (run: ANALYZE=true pnpm build)
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('@next/bundle-analyzer')();
      config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
    }
    return config;
  },
};

export default nextConfig;
