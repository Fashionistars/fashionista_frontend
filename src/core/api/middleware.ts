/**
 * LEGACY middleware.ts — Replaced by core/api/client.sync.ts
 *
 * This file is DEPRECATED. The new industrial-grade Axios sync client
 * with circuit breaker and refresh-queue is at:
 *   @/core/api/client.sync.ts
 *
 * Keeping this stub to prevent TS import errors from old code.
 */
export const fetchWithAuth = async (
  _url: string,
  _method: "get" | "post" | "put" | "delete" | "patch" = "get",
  _data: null | object | FormData = null,
  _content = "application/json"
): Promise<unknown> => {
  console.warn("[DEPRECATED] fetchWithAuth — use apiSync from @/core/api/client.sync instead");
  return null;
};
