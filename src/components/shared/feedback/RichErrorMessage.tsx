/**
 * RichErrorMessage — Premium Enterprise-Grade Error Display Component
 *
 * Features:
 *  - Fade-in animation on mount
 *  - URLs within messages rendered as clickable links
 *  - Long messages with multiple sentences split into bullet list
 *  - Internal API paths mapped to frontend routes (e.g. /auth/resend-otp/ → /verify-otp)
 *  - Colour-coded: destructive red with subtle background
 *  - Accessible: role="alert", aria-live="assertive"
 *
 * Used in: OTPVerifyForm, LoginForm, RegisterForm, PasswordResetForm
 */
"use client";

import Link from "next/link";
import { AlertCircle, ExternalLink } from "lucide-react";
import type { ParsedApiError } from "@/lib/api/parseApiError";

interface RichErrorMessageProps {
  /** The full parsed error object from parseApiError() */
  parsed: ParsedApiError;
  /** Additional className overrides */
  className?: string;
}

// Splits a message on ". " boundaries to produce bullet points if needed
function splitSentences(message: string): string[] {
  const parts = message
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [message];
}

// Replaces URL occurrences in text with <Link> or <a> elements
function renderMessageWithLinks(
  message: string,
  links: ParsedApiError["links"],
): React.ReactNode {
  if (links.length === 0) return message;

  const parts: React.ReactNode[] = [];
  let remaining = message;

  for (const link of links) {
    const idx = remaining.indexOf(link.text);
    if (idx === -1) continue;

    // Text before the URL
    if (idx > 0) {
      parts.push(remaining.slice(0, idx));
    }

    const isInternal = link.href.startsWith("/");
    if (isInternal) {
      parts.push(
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex items-center gap-0.5 underline underline-offset-2 font-medium text-destructive hover:text-destructive/80 transition-colors"
        >
          {link.text}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 underline underline-offset-2 font-medium text-destructive hover:text-destructive/80 transition-colors"
        >
          {link.text}
          <ExternalLink className="h-3 w-3" />
        </a>,
      );
    }

    remaining = remaining.slice(idx + link.text.length);
  }

  if (remaining) parts.push(remaining);

  return <>{parts}</>;
}

export function RichErrorMessage({
  parsed,
  className = "",
}: RichErrorMessageProps) {
  const { message, links } = parsed;
  const sentences = splitSentences(message);
  const isMultiSentence = sentences.length > 1;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={`
        flex items-start gap-2.5 p-3 rounded-lg
        bg-destructive/8 border border-destructive/20
        animate-in fade-in-0 slide-in-from-top-1 duration-200
        ${className}
      `}
    >
      <AlertCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {isMultiSentence ? (
          <ul className="list-disc list-inside space-y-0.5 text-sm text-destructive">
            {sentences.map((sentence, i) => (
              <li key={i} className="leading-snug">
                {renderMessageWithLinks(sentence, links)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-destructive leading-snug">
            {renderMessageWithLinks(message, links)}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Inline field error — smaller, used under individual form inputs
 */
export function FieldError({
  message,
  className = "",
}: {
  message?: string;
  className?: string;
}) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={`text-xs text-destructive mt-0.5 animate-in fade-in-0 duration-150 ${className}`}
    >
      {message}
    </p>
  );
}
