import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware — Auth Guard + Security Headers
 *
 * Runs on the Edge Runtime (fast, global).
 * Responsibilities:
 *  1. Protect routes requiring authentication (redirect to /auth/sign-in)
 *  2. Block authenticated users from accessing auth pages (redirect to /)
 *  3. Inject Content-Security-Policy and security headers
 *  4. Inject ngrok-skip-browser-warning in development
 */

// ── Protected Routes — require valid JWT ───────────────────────────────────────
const PROTECTED_ROUTES = [
  "/vendor/dashboard",
  "/vendor/setup",
  "/vendor/products",
  "/vendor/orders",
  "/client/dashboard",
  "/client/profile",
  "/client/orders",
  "/admin-dashboard",
  "/account",
  "/checkout",
  "/orders",
  "/wishlist",
  "/settings",
];

// ── Auth Routes — redirect to home if already authenticated ───────────────────
const AUTH_ROUTES = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/choose-role",
  "/login",
  "/register",
];

// ── Public API Routes — always allow ─────────────────────────────────────────
const PUBLIC_API_ROUTES = ["/api/v1/health", "/api/v1/upload/webhook"];


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow public API routes
  if (PUBLIC_API_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Read access token from cookie (set by backend after login)
  // or from sessionStorage via a forwarded auth header (Next.js middleware cant read sessionStorage)
  const accessToken =
    request.cookies.get("fashionistar_access")?.value ??
    request.cookies.get("access")?.value ??
    request.headers.get("x-access-token");

  const isAuthenticated = Boolean(accessToken);

  // ── Route Guard: protected routes require auth ─────────────────────────────
  const isProtected = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/auth/sign-in", request.url);
    loginUrl.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Auth Route Guard: authenticated users → redirect home ─────────────────
  // NOTE: This only works when the token is in a cookie.
  // Zustand sessionStorage tokens are NOT visible to middleware.
  // We only redirect if a COOKIE-based token is present (server-rendered sessions).
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ── Build Response with Security Headers ──────────────────────────────────
  const response = NextResponse.next();

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://accounts.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://accounts.google.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://res.cloudinary.com https://*.cloudinary.com https://lh3.googleusercontent.com",
    "media-src 'self' blob: https://res.cloudinary.com",
    "connect-src 'self' https://hydrographically-tawdrier-hayley.ngrok-free.dev https://api.cloudinary.com https://*.loca.lt wss: https://accounts.google.com",
    "frame-src https://js.stripe.com https://accounts.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");

  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Skip ngrok browser warning in development
  if (process.env.NODE_ENV === "development") {
    response.headers.set("ngrok-skip-browser-warning", "true");
  }

  return response;
}

// ── Middleware Matcher ────────────────────────────────────────────────────────
export const config = {
  matcher: [
    // Match all routes except: static files, Next.js internals, favicon
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|svg|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
