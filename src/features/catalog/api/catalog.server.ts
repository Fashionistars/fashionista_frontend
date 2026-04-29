import {
  CatalogBrandListSchema,
  CatalogBlogPostListSchema,
  CatalogBlogPostSchema,
  CatalogCategoryListSchema,
  CatalogCollectionListSchema,
} from "../schemas/catalog.schemas";
import type {
  CatalogBlogPost,
  CatalogBrand,
  CatalogCategory,
  CatalogCollection,
} from "../types/catalog.types";

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

async function fetchCatalogItem<T>(path: string): Promise<T | null> {
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
      return null;
    }

    return unwrapEnvelope<T>(await response.json());
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getCatalogCategories(): Promise<CatalogCategory[]> {
  const payload = await fetchCatalog<CatalogCategory>("/api/v1/ninja/catalog/categories/");
  return CatalogCategoryListSchema.parse(payload);
}

export async function getCatalogBrands(): Promise<CatalogBrand[]> {
  const payload = await fetchCatalog<CatalogBrand>("/api/v1/ninja/catalog/brands/");
  return CatalogBrandListSchema.parse(payload);
}

export async function getCatalogCollections(): Promise<CatalogCollection[]> {
  const payload = await fetchCatalog<CatalogCollection>("/api/v1/ninja/catalog/collections/");
  return CatalogCollectionListSchema.parse(payload);
}

export async function getCatalogBlogPosts(): Promise<CatalogBlogPost[]> {
  const payload = await fetchCatalog<CatalogBlogPost>("/api/v1/ninja/catalog/blog/");
  return CatalogBlogPostListSchema.parse(payload);
}

export async function getCatalogBlogPostBySlug(slug: string): Promise<CatalogBlogPost | null> {
  const payload = await fetchCatalogItem<CatalogBlogPost>(`/api/v1/ninja/catalog/blog/${slug}/`);
  if (!payload) {
    return null;
  }
  return CatalogBlogPostSchema.parse(payload);
}
