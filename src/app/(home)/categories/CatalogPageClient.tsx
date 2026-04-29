"use client";

/**
 * @file CatalogPageClient.tsx
 * @description Client-side product grid for the catalog/categories page.
 * Manages URL-driven filters and renders ProductGrid.
 */

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductGrid from "@/features/product/components/ProductGrid";

const ORDERINGS = [
  { value: "-created_at", label: "Newest" },
  { value: "price", label: "Price: Low → High" },
  { value: "-price", label: "Price: High → Low" },
  { value: "-average_rating", label: "Top Rated" },
] as const;

interface CatalogPageClientProps {
  category?: string;
  search?: string;
  ordering?: string;
}

export default function CatalogPageClient({
  category,
  search,
  ordering = "-created_at",
}: CatalogPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(sp.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, sp],
  );

  return (
    <div className="space-y-6">
      {/* Filter / search bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            defaultValue={search}
            placeholder="Search products…"
            className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-4 text-sm placeholder:text-muted-foreground focus:border-[hsl(var(--accent))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))/20] transition"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParam("q", (e.target as HTMLInputElement).value || null);
              }
            }}
          />
        </div>

        {/* Ordering */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-muted-foreground" />
          <select
            value={ordering}
            onChange={(e) => updateParam("ordering", e.target.value)}
            className="h-11 rounded-xl border border-border bg-card px-3 text-sm text-foreground focus:border-[hsl(var(--accent))] focus:outline-none transition"
          >
            {ORDERINGS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chip */}
      {category && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filtering by:</span>
          <button
            onClick={() => updateParam("category", null)}
            className="flex items-center gap-1.5 rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-xs font-bold text-[hsl(var(--accent-foreground))] transition hover:brightness-110"
          >
            {category} ×
          </button>
        </div>
      )}

      {/* Live product grid — data from TanStack Query → Ninja API */}
      <ProductGrid
        params={{
          category,
          search,
          ordering,
        }}
        skeletonCount={12}
      />
    </div>
  );
}
