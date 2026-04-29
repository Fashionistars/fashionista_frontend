import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductDetailClient } from "./ProductDetailClient";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Dynamic metadata for SEO — resolves product title from slug if possible.
 * Falls back to a generic title while client hydrates.
 */
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    title: cleanSlug,
    description: `Shop ${cleanSlug} on FASHIONISTAR AI — premium African fashion with AI-powered size recommendations and secure Paystack checkout.`,
    openGraph: {
      title: `${cleanSlug} | FASHIONISTAR AI`,
      description: `Premium African fashion — ${cleanSlug}. AI-powered measurements ensure your perfect fit.`,
      type: "website",
    },
  };
}

/**
 * Product detail page — PPR pattern.
 * Static shell + Suspense boundary; detail hydrated via TanStack Query.
 */
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailClient slug={slug} />
      </Suspense>
    </div>
  );
}
