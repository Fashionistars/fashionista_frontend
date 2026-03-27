import { cookies } from "next/headers";

/**
 * LEGACY lib.ts — Fixed cookieStore usage
 * Old code used `cookieStore` without declaring it.
 */
export const checkUserRole = async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  return role;
};
