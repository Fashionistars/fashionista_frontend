/**
 * BFF Proxy Route — /api/v1/auth/[...path]
 *
 * Proxies all auth requests from Next.js frontend to Django backend.
 * This avoids CORS issues and allows server-side token injection.
 *
 * Routes:
 *   POST /api/v1/auth/login/       → Django /api/v1/auth/login/
 *   POST /api/v1/auth/register/    → Django /api/v1/auth/register/
 *   POST /api/v1/auth/verify-otp/  → Django /api/v1/auth/verify-otp/
 *   etc.
 */
import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "PUT");
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "PATCH");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  return proxyRequest(request, path, "DELETE");
}

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[],
  method: string,
): Promise<NextResponse> {
  const targetPath = pathSegments.join("/");
  const targetUrl = `${BACKEND_URL}/api/v1/auth/${targetPath}`;

  // Forward query params
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const fullUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

  // Forward headers (exclude host)
  const forwardHeaders: Record<string, string> = {
    "Content-Type": request.headers.get("content-type") || "application/json",
    "ngrok-skip-browser-warning": "true",
  };

  const auth = request.headers.get("authorization");
  if (auth) forwardHeaders["Authorization"] = auth;

  // Forward cookies as Authorization if present
  const accessToken = request.cookies.get("fashionistar_access")?.value;
  if (accessToken && !auth) {
    forwardHeaders["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    let body: string | undefined;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      body = await request.text();
    }

    const response = await fetch(fullUrl, {
      method,
      headers: forwardHeaders,
      body,
      signal: AbortSignal.timeout(30_000),
    });

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
        "X-Proxied-By": "fashionistar-bff",
      },
    });
  } catch (error) {
    console.error(`[BFF Proxy] ${method} ${fullUrl} failed:`, error);
    return NextResponse.json(
      { detail: "Upstream service unavailable. Please try again." },
      { status: 503 },
    );
  }
}
