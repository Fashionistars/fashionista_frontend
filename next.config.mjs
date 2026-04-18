import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeDevOrigin(value) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).host;
  } catch {
    return value.replace(/^https?:\/\//, "").split("/")[0] || null;
  }
}

function toRemotePattern(url, pathname = "/**") {
  if (!url) {
    return null;
  }

  try {
    const parsed = new URL(url);

    return {
      protocol: parsed.protocol.replace(":", ""),
      hostname: parsed.hostname,
      ...(parsed.port ? { port: parsed.port } : {}),
      pathname,
    };
  } catch {
    return null;
  }
}

const allowedDevOrigins = unique([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "*.loca.lt",
  "*.ngrok-free.app",
  "*.ngrok-free.dev",
  "*.trycloudflare.com",
  normalizeDevOrigin(process.env.NEXT_PUBLIC_APP_URL),
  normalizeDevOrigin(process.env.NEXT_PUBLIC_FRONTEND_TUNNEL_URL),
  normalizeDevOrigin(backendUrl),
]);

const imageRemotePatterns = unique([
  {
    protocol: "https",
    hostname: "res.cloudinary.com",
    pathname: "/dgpdlknc1/**",
  },
  {
    protocol: "https",
    hostname: "**.cloudinary.com",
  },
  {
    protocol: "https",
    hostname: "**.trycloudflare.com",
  },
  {
    protocol: "https",
    hostname: "**.ngrok-free.app",
  },
  {
    protocol: "https",
    hostname: "**.ngrok-free.dev",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    port: "8000",
    pathname: "/media/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "8000",
    pathname: "/media/**",
  },
  {
    protocol: "https",
    hostname: "picsum.photos",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
  toRemotePattern(backendUrl, "/media/**"),
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  allowedDevOrigins,
  experimental: {
    cpus: 1,
    workerThreads: true,
  },
  typescript: {
    // CI and local verification run `make type-check` explicitly, which avoids
    // duplicate Next.js worker spawning issues in this Windows/OneDrive setup.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: imageRemotePatterns,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 604800,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(self), microphone=(), geolocation=(self)",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
  redirects: async () => [
    { source: "/login", destination: "/auth/sign-in", permanent: true },
    { source: "/register", destination: "/auth/choose-role", permanent: true },
    { source: "/signup", destination: "/auth/choose-role", permanent: true },
    { source: "/sign-up", destination: "/auth/choose-role", permanent: true },
    { source: "/verify", destination: "/auth/verify-otp", permanent: true },
    { source: "/verify-otp", destination: "/auth/verify-otp", permanent: true },
    {
      source: "/forgot-password",
      destination: "/auth/forgot-password",
      permanent: true,
    },
    {
      source: "/forgot-password/confirm-phone",
      destination: "/auth/forgot-password/confirm-phone",
      permanent: true,
    },
    {
      source: "/reset-password",
      destination: "/auth/forgot-password",
      permanent: true,
    },
    {
      source: "/password-recovery",
      destination: "/auth/forgot-password",
      permanent: true,
    },
    {
      source: "/password-recovery/:uidb64/:token",
      destination: "/auth/forgot-password/confirm-email/:uidb64/:token",
      permanent: true,
    },
    {
      source: "/auth/forgot-password/c=onfirm-email/:uidb64/:token",
      destination: "/auth/forgot-password/confirm-email/:uidb64/:token",
      permanent: true,
    },
    { source: "/shop", destination: "/shops", permanent: true },
    { source: "/location", destination: "/contact-us", permanent: true },
    {
      source: "/client/settings",
      destination: "/client/dashboard/account-details",
      permanent: true,
    },
  ],
  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/api/v1/:path*",
        destination: `${backendUrl}/api/v1/:path*`,
      },
      {
        source: "/api/v2/:path*",
        destination: `${backendUrl}/api/v2/:path*`,
      },
    ],
  }),
  serverExternalPackages: ["sharp", "@opentelemetry/sdk-trace-web"],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
