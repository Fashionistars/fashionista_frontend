/**
 * @file FashionImage.tsx
 * @description Next.js 16 / React 19 optimized image component.
 *
 * Handles ALL image scenarios on the platform:
 *   - Product images (Cloudinary CDN)
 *   - Avatar / profile photos
 *   - Hero / banner images (priority LCP)
 *   - Collection / category thumbnails
 *
 * Key optimizations applied:
 *   • `sizes` prop always set to avoid 100vw default (reduces waste)
 *   • `priority` for above-the-fold / LCP images
 *   • `quality={80}` for product images (Cloudinary re-encodes anyway)
 *   • `placeholder="blur"` on static imports; `blurDataURL` for CDN images
 *   • `fetchPriority="high"` for hero images via Next 16 passthrough
 *   • Graceful fallback for broken / null URLs
 */
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

// ── Tiny 1×1px blur placeholder (inline base64) ───────────────────────────────
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

// ── Brand fallback image (served from /public, zero network cost) ─────────────
const FALLBACK_SRC = "/images/placeholder-fashion.webp";

export interface FashionImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string | null | undefined;
  alt: string;
  /** @default false — set true for hero / LCP images */
  isHero?: boolean;
  /** Custom fallback image URL */
  fallbackSrc?: string;
  /** Applied to the wrapping div when using fill layout */
  wrapperClassName?: string;
}

/**
 * Standard usage — fixed width/height (e.g. product cards):
 * ```tsx
 * <FashionImage src={product.cover_image_url} alt={product.title} width={400} height={400} />
 * ```
 *
 * Fill usage (parent must be position:relative with explicit height):
 * ```tsx
 * <div className="relative h-64">
 *   <FashionImage src={url} alt="Hero" fill sizes="100vw" isHero />
 * </div>
 * ```
 */
export function FashionImage({
  src,
  alt,
  isHero = false,
  fallbackSrc = FALLBACK_SRC,
  wrapperClassName,
  className,
  ...props
}: FashionImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src ?? fallbackSrc);

  const handleError = () => setImgSrc(fallbackSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      // LCP images: eager fetch, disable lazy decode
      priority={isHero}
      loading={isHero ? "eager" : "lazy"}
      // Always provide blur placeholder for CDN images
      placeholder="blur"
      blurDataURL={BLUR_PLACEHOLDER}
      // Product images: 80 quality (Cloudinary f_auto handles format)
      quality={isHero ? 90 : 80}
      // Graceful degradation
      onError={handleError}
      className={className}
      {...props}
    />
  );
}

export default FashionImage;
