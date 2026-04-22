import { apiAsync } from "@/core/api/client.async";
import { apiSync } from "@/core/api/client.sync";
import {
  ClientDashboardSchema,
  ClientProfileSchema,
  ClientProfileUpdateSchema,
} from "@/features/client/schemas/client.schemas";
import type {
  ClientDashboard,
  ClientProfile,
  ClientProfileUpdatePayload,
} from "@/features/client/types/client.types";

function unwrapData<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export const clientApi = {
  async getProfile(): Promise<ClientProfile> {
    const { data } = await apiSync.get("/v1/client/profile/");
    return ClientProfileSchema.parse(unwrapData<ClientProfile>(data));
  },

  async updateProfile(payload: ClientProfileUpdatePayload): Promise<ClientProfile> {
    const validatedPayload = ClientProfileUpdateSchema.parse(payload);
    const { data } = await apiSync.patch("/v1/client/profile/", validatedPayload);
    return ClientProfileSchema.parse(unwrapData<ClientProfile>(data));
  },

  async getDashboard(): Promise<ClientDashboard> {
    const data = await apiAsync.get("client/dashboard/").json();
    return ClientDashboardSchema.parse(data);
  },
};
