/**
 * @file Preloader.tsx
 * @description React shell for the static preloader.
 * - The <div id="fs-preloader"> HTML is rendered server-side in root layout.
 * - The CSS lives in /public/preloader.css (pure static, no JS bundle cost).
 * - This client component fires ONE effect after hydration to add "app-ready"
 *   to <html>, triggering the CSS exit animation.
 * - Zero state, zero fetch, zero re-render. Absolute minimum footprint.
 */
"use client";
import { useEffect } from "react";

export function PreloaderDismiss() {
  useEffect(() => {
    // Tiny delay lets the page paint first — avoids flash of un-styled content
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.add("app-ready");
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return null; // renders nothing — purely a side-effect component
}
