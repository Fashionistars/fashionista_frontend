/**
 * Collapsible — Stub component
 * This is a placeholder. Replace with Shadcn/ui Collapsible after running:
 * pnpm dlx shadcn@latest add collapsible
 */
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface CollapsibleProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function Collapsible({
  trigger,
  children,
  className,
  defaultOpen = false,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "border border-border rounded-lg overflow-hidden",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
        aria-expanded={isOpen}
      >
        {trigger}
        <svg
          className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-1 text-sm text-muted-foreground animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
