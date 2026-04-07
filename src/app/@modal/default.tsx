/**
 * @modal/default.tsx — Renders null when no modal is active.
 * Required by Next.js parallel routes spec — without this file the
 * @modal slot throws an error during hard refreshes.
 */
export default function ModalDefault() {
  return null;
}
