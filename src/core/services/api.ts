/**
 * LEGACY services/api.ts — Replaced by feature services in @/features/
 *
 * This file is DEPRECATED.
 * New auth service: @/features/auth/services/auth.service.ts
 * New upload service: @/features/uploads/services/upload.service.ts
 *
 * Keeping as stub to prevent TS import errors from old components.
 */
export const getVendor = async () => null;
export const getVendorOrders = async () => [];
export const getSingleOrder = async (_oid: string) => null;
export const orderAcceptReject = async (_oid: string, _data: object) => null;
export const getAllProducts = async () => [];
export const createNewProduct = async (_data: object | FormData) => null;
export const getAllVendors = async () => [];
