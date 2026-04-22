import { apiAsync } from "@/core/api/client.async";
import { apiSync } from "@/core/api/client.sync";
import {
  VendorDashboardSchema,
  VendorProfileSchema,
  VendorSetupSchema,
  VendorSetupStateSchema,
} from "@/features/vendor/schemas/vendor.schemas";
import type {
  VendorDashboard,
  VendorProfile,
  VendorSetupPayload,
  VendorSetupState,
} from "@/features/vendor/types/vendor.types";

function unwrapData<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export const vendorApi = {
  async getProfile(): Promise<VendorProfile> {
    const { data } = await apiSync.get("/v1/vendor/profile/");
    return VendorProfileSchema.parse(unwrapData<VendorProfile>(data));
  },

  async getSetupState(): Promise<VendorSetupState> {
    const { data } = await apiSync.get("/v1/vendor/setup/");
    return VendorSetupStateSchema.parse(unwrapData<VendorSetupState>(data));
  },

  async submitSetup(payload: VendorSetupPayload): Promise<{
    profile: VendorProfile;
    setup_state: VendorSetupState | null;
  }> {
    const validatedPayload = VendorSetupSchema.parse(payload);
    const { data } = await apiSync.post("/v1/vendor/setup/", validatedPayload);
    const unwrapped = unwrapData<{
      profile: VendorProfile;
      setup_state: VendorSetupState | null;
    }>(data);

    return {
      profile: VendorProfileSchema.parse(unwrapped.profile),
      setup_state: unwrapped.setup_state
        ? VendorSetupStateSchema.parse(unwrapped.setup_state)
        : null,
    };
  },

  async getDashboard(): Promise<VendorDashboard> {
    const data = await apiAsync.get("vendor/dashboard/").json();
    return VendorDashboardSchema.parse(data);
  },
};
