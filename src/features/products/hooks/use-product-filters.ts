/**
 * Product Filter Hook — URL State Management (Nuqs v2)
 *
 * Uses nuqs to persist filter state in the URL query string.
 * This means:
 *  - Filters survive page refresh
 *  - Filters are shareable via URL
 *  - Back/forward navigation works correctly
 *
 * Usage:
 *   const { category, priceRange, sortBy, setCategory, setSort } = useProductFilters();
 */
"use client";
import { useQueryState, parseAsString, parseAsInteger } from "nuqs";

export function useProductFilters() {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault("")
  );
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withDefault("newest")
  );
  const [minPrice, setMinPrice] = useQueryState(
    "min_price",
    parseAsInteger.withDefault(0)
  );
  const [maxPrice, setMaxPrice] = useQueryState(
    "max_price",
    parseAsInteger.withDefault(500000)
  );
  const [search, setSearch] = useQueryState(
    "q",
    parseAsString.withDefault("")
  );
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  );

  const resetFilters = () => {
    setCategory(null);
    setSortBy(null);
    setMinPrice(null);
    setMaxPrice(null);
    setSearch(null);
    setPage(null);
  };

  return {
    category,
    sortBy,
    minPrice,
    maxPrice,
    search,
    page,
    setCategory,
    setSortBy,
    setMinPrice,
    setMaxPrice,
    setSearch,
    setPage,
    resetFilters,
  };
}
