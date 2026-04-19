/**
 * LEGACY services/api.ts — Replaced by feature services in @/features/
 *
 * This file is DEPRECATED.
 * New auth service: @/features/auth/services/auth.service.ts
 * New upload service: @/features/uploads/services/upload.service.ts
 *
 * Keeping as stub to prevent TS import errors from old components.
 */
import type { OrderProp, VendorProp } from "@/core/types";

interface LegacyVendorOrderItem {
  id: string;
  image: string;
  title: string;
  price: number;
  quantity: number;
  total?: number | string | null;
}

export const getVendor = async () => null;
export const getVendorOrders = async (): Promise<OrderProp[]> => [];
export const getSingleOrder = async (
  _oid: string,
): Promise<LegacyVendorOrderItem | null> => {
  void _oid;
  return null;
};
export const orderAcceptReject = async (_oid: string, _data: object) => {
  void _oid;
  void _data;
  return null;
};
export const getAllProducts = async () => [];
export const createNewProduct = async (_data: object | FormData) => {
  void _data;
  return null;
};
export const getAllVendors = async (): Promise<VendorProp[]> => [];
