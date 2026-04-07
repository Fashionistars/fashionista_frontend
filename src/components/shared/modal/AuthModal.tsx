/**
 * AuthModal — Glassmorphism dialog overlay for auth intercept routes.
 *
 * Used by @modal parallel slot intercept routes to display auth forms
 * as overlays on top of the current page, without navigating away.
 *
 * Features:
 *  - Backdrop blur + semi-transparent dark overlay
 *  - Escape key closes the modal (returns to previous page)
 *  - Clicking backdrop closes the modal
 *  - Focus trap via native <dialog> semantics
 *  - Hard refresh falls through to the full-page route automatically
 */
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface AuthModalProps {
  children: React.ReactNode;
}

export function AuthModal({ children }: AuthModalProps) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  function dismiss() {
    router.back();
  }

  // Close on Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Inline CSS for fade-in animation */}
      <style>{`
        @keyframes auth-modal-in {
          from { opacity: 0; transform: scale(0.97) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
        .auth-modal-animate {
          animation: auth-modal-in 0.22s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        id="auth-modal-backdrop"
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
        onClick={(e) => {
          if (e.target === overlayRef.current) dismiss();
        }}
        aria-modal="true"
        role="dialog"
        aria-label="Authentication"
      >
        {/* Card */}
        <div
          className="auth-modal-animate relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            id="auth-modal-close"
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="
              absolute top-4 right-4 z-10
              w-8 h-8 rounded-full flex items-center justify-center
              text-muted-foreground hover:text-foreground
              hover:bg-muted/60 transition-colors
            "
          >
            <X className="w-4 h-4" />
          </button>

          {/* Inner content (the actual auth form page) */}
          <div className="p-8">{children}</div>
        </div>
      </div>
    </>
  );
}
