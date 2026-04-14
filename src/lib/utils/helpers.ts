import { cookies } from "next/headers";

/**
 * checkUserRole — reads the role cookie set on login.
 * Migrated from src/app/utils/lib.ts to FSD helpers.
 */
export const checkUserRole = async () => {
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;
  return role;
};

// Shared utility helpers
export function createNewProduct(data: unknown) {
  console.log("createNewProduct stub", data);
  return Promise.resolve({ success: true });
}
