"use client";
import { useFeaturedProducts } from "@/features/product";
import ProductCard from "@/features/product/components/ProductCard";
import { ProductGridSkeleton } from "@/features/product";
import { Package } from "lucide-react";

/**
 * FeaturedProductsSection
 * ─────────────────────────────────────────────────────────────────
 * Live featured products from the Ninja /products/?featured=true endpoint.
 * Rendered inside a Suspense boundary on the home page.
 * Shows up to 4 products in a responsive grid.
 */
export default function FeaturedProductsSection() {
  const { data, isLoading, isError } = useFeaturedProducts();
  const products = data?.results?.slice(0, 4) ?? [];

  if (isLoading) return <ProductGridSkeleton count={4} />;

  if (isError || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <Package size={48} className="text-[#D9D9D9]" />
        <p className="font-raleway text-base text-[#475367]">
          Featured products coming soon. Check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} index={idx} />
      ))}
    </div>
  );
}
