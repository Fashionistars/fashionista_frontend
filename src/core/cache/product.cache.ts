/**
 * Product Cache Layer — Next.js 15 Stable API
 *
 * Uses `unstable_cache` from next/cache (stable in Next.js 15.x).
 * The canary-only 'use cache' directive + cacheTag + cacheLife are
 * commented out until we upgrade to Next.js Canary/16.
 *
 * Provides:
 *   - getCachedProducts   — paginated product listing (5min revalidation)
 *   - getCachedProduct    — single product by slug (10min revalidation)
 *   - getCachedCategories — all categories (15min revalidation)
 *   - getCachedCollections — all collections (15min revalidation)
 */
import { unstable_cache } from "next/cache";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

// ── Shared fetch helper ───────────────────────────────────────────────────────
async function fetchFromBackend<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BACKEND_URL}/api${path}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
    });

    if (!res.ok) return fallback;
    return res.json() as Promise<T>;
  } catch {
    return fallback;
  }
}

// ── Products ─────────────────────────────────────────────────────────────────
export const getCachedProducts = unstable_cache(
  async (category: string = "all", page: number = 1) => {
    return fetchFromBackend(
      `/v1/products/?category=${category}&page=${page}`,
      { results: [], count: 0 }
    );
  },
  ["products"],
  {
    tags: ["products"],
    revalidate: 300, // 5 minutes
  }
);

// ── Single Product ────────────────────────────────────────────────────────────
export const getCachedProduct = unstable_cache(
  async (slug: string) => {
    return fetchFromBackend<Record<string, unknown> | null>(
      `/v1/products/${slug}/`,
      null
    );
  },
  ["product"],
  {
    tags: ["product"],
    revalidate: 600, // 10 minutes
  }
);

// ── Categories ────────────────────────────────────────────────────────────────
export const getCachedCategories = unstable_cache(
  async () => {
    return fetchFromBackend<unknown[]>("/v1/categories/", []);
  },
  ["categories"],
  {
    tags: ["categories"],
    revalidate: 900, // 15 minutes
  }
);

// ── Collections ───────────────────────────────────────────────────────────────
export const getCachedCollections = unstable_cache(
  async () => {
    return fetchFromBackend<unknown[]>("/v1/collections/", []);
  },
  ["collections"],
  {
    tags: ["collections"],
    revalidate: 900, // 15 minutes
  }
);
