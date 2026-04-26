import { apiSync } from "@/core/api/client.sync";
import {
  CatalogBrandListSchema,
  CatalogCategoryListSchema,
  CatalogCollectionListSchema,
} from "../schemas/catalog.schemas";
import type { CatalogBrand, CatalogCategory, CatalogCollection } from "../types/catalog.types";

function unwrapListPayload<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    const nested = (payload as { data: unknown }).data;
    if (Array.isArray(nested)) {
      return nested as T[];
    }
    if (nested && typeof nested === "object" && "results" in nested) {
      const results = (nested as { results: unknown }).results;
      return Array.isArray(results) ? (results as T[]) : [];
    }
    return [];
  }

  if (payload && typeof payload === "object" && "results" in payload) {
    const results = (payload as { results: unknown }).results;
    return Array.isArray(results) ? (results as T[]) : [];
  }

  if (payload && typeof payload === "object") {
    return Object.entries(payload as Record<string, unknown>)
      .filter(([key]) => /^\d+$/.test(key))
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([, value]) => value as T);
  }

  return [];
}

export const catalogApi = {
  async getCategories(): Promise<CatalogCategory[]> {
    const { data } = await apiSync.get("/v1/catalog/categories/");
    return CatalogCategoryListSchema.parse(unwrapListPayload<CatalogCategory>(data));
  },

  async getBrands(): Promise<CatalogBrand[]> {
    const { data } = await apiSync.get("/v1/catalog/brands/");
    return CatalogBrandListSchema.parse(unwrapListPayload<CatalogBrand>(data));
  },

  async getCollections(): Promise<CatalogCollection[]> {
    const { data } = await apiSync.get("/v1/catalog/collections/");
    return CatalogCollectionListSchema.parse(unwrapListPayload<CatalogCollection>(data));
  },
};
