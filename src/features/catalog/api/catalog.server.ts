import {
  CatalogBrandListSchema,
  CatalogCategoryListSchema,
  CatalogCollectionListSchema,
} from "../schemas/catalog.schemas";
import type { CatalogBrand, CatalogCategory, CatalogCollection } from "../types/catalog.types";

const FALLBACK_TIMEOUT_MS = 3_000;

function apiBaseUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";
}

function unwrapEnvelope<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data: unknown }).data;
    if (data && typeof data === "object" && "results" in data) {
      return (data as { results: T }).results;
    }
    return data as T;
  }
  if (payload && typeof payload === "object" && "results" in payload) {
    return (payload as { results: T }).results;
  }
  return payload as T;
}

async function fetchCatalog<T>(path: string): Promise<T[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FALLBACK_TIMEOUT_MS);

  try {
    const response = await fetch(`${apiBaseUrl()}${path}`, {
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    if (!response.ok) {
      return [];
    }

    return unwrapEnvelope<T[]>(await response.json());
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const payload = await fetchCatalog<CatalogCategory>("/api/v1/catalog/categories/");
  return CatalogCategoryListSchema.parse(payload);
}

export async function getCatalogBrands(): Promise<CatalogBrand[]> {
  const payload = await fetchCatalog<CatalogBrand>("/api/v1/catalog/brands/");
  return CatalogBrandListSchema.parse(payload);
}

export async function getCatalogCollections(): Promise<CatalogCollection[]> {
  const payload = await fetchCatalog<CatalogCollection>("/api/v1/catalog/collections/");
  return CatalogCollectionListSchema.parse(payload);
}
