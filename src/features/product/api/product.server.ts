/**
 * @file product.server.ts
 * @description Server-only helpers for product metadata and PPR shells.
 *
 * Client interactivity still uses TanStack Query. These reads are intentionally
 * small, cached, and pointed at the canonical Ninja read endpoint.
 */
import { ProductDetailSchema } from "../schemas/product.schemas";
import type { ProductDetail } from "../types/product.types";
import { unwrapApiData } from "@/core/api/response";

const PRODUCT_METADATA_TIMEOUT_MS = 2_500;

function backendBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";
}

/** Fetch one product for SEO metadata without blocking the client product UI. */
export async function getProductDetailForMetadata(
  slug: string,
): Promise<ProductDetail | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PRODUCT_METADATA_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${backendBaseUrl()}/api/v1/ninja/products/${encodeURIComponent(slug)}/`,
      {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        next: { revalidate: 300 },
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      return null;
    }

    return ProductDetailSchema.parse(unwrapApiData(await response.json()));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[product metadata] Falling back to slug metadata", error);
    }
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
