/**
 * components/shared/feedback/index.ts
 *
 * Purpose:
 *   Exports shared feedback components (Toast, Toaster, Progress) for use
 *   by feature slices via '@/components/shared/feedback'.
 *
 * Exported Symbols:
 *   - Toast: local toast component
 *   - Toaster: toast container for rendering multiple toasts
 *   - Progress: progress bar component
 *
 * Dependencies:
 *   - All components rely on React 19's "react" import for useActionState
 *   - Some components use cn() utility; ensure @/lib/utils is properly aliased
 *
 * Usage Example:
 *   import { Toast, Toaster, Progress } from "@/components/shared/feedback";
 */

export { default as Toast } from "./Toast";
export { default as Toaster } from "./Toaster";
export { default as Progress } from "./Progress";
export { default as Footer } from "./Footer";
export { default as NewFooter } from "./NewFooter";
