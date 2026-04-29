/**
 * @file FashionVideo.tsx
 * @description Next.js 16 / React 19 optimized video component.
 *
 * Handles ALL video scenarios:
 *   - Product gallery videos (Cloudinary CDN)
 *   - Hero / banner autoplay videos (muted, loop, no controls)
 *   - Tutorial / how-to videos (with controls)
 *
 * Key optimizations:
 *   • `preload="none"` for off-screen videos — avoids wasted bandwidth
 *   • `preload="metadata"` for above-fold — fast first frame without full download
 *   • Intersection Observer for lazy-play (autoplay only when in viewport)
 *   • `poster` image from Cloudinary thumbnail (avoids blank frame flash)
 *   • Cloudinary auto-quality: appends `q_auto,f_auto` to Cloudinary URLs
 */
"use client";
import { useEffect, useRef } from "react";

export interface FashionVideoProps {
  src: string;
  /** Poster frame URL — use Cloudinary thumbnail transform */
  poster?: string;
  /** @default false — for hero/banner videos */
  isHero?: boolean;
  /** Show native controls */
  controls?: boolean;
  /** Loop the video */
  loop?: boolean;
  /** className applied to <video> */
  className?: string;
  /** aria-label for accessibility */
  label?: string;
}

// Append Cloudinary quality + format transform if URL is from Cloudinary CDN
function cloudinaryOptimize(url: string): string {
  if (!url.includes("res.cloudinary.com")) return url;
  // Insert /q_auto,f_auto/ before /upload/
  return url.replace("/upload/", "/upload/q_auto,f_auto/");
}

/**
 * Usage — hero autoplay:
 * ```tsx
 * <FashionVideo src={heroVideoUrl} poster={posterUrl} isHero loop />
 * ```
 *
 * Usage — product gallery video (lazy):
 * ```tsx
 * <FashionVideo src={videoUrl} poster={posterUrl} controls />
 * ```
 */
export function FashionVideo({
  src,
  poster,
  isHero = false,
  controls = false,
  loop = false,
  className = "",
  label,
}: FashionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer: autoplay only when in viewport
  useEffect(() => {
    if (!videoRef.current || controls) return; // user-controlled videos skip this

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {
            // Autoplay blocked (no user gesture) — gracefully do nothing
          });
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const optimizedSrc = cloudinaryOptimize(src);

  return (
    <video
      ref={videoRef}
      src={optimizedSrc}
      poster={poster}
      preload={isHero ? "metadata" : "none"}
      muted={!controls} // muted required for autoplay in most browsers
      playsInline      // required for iOS autoplay
      loop={loop}
      controls={controls}
      aria-label={label}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}

export default FashionVideo;
