/**
 * @file measurements.api.ts
 * @description Measurements domain API client.
 */
import { apiSync } from "@/core/api/client.sync";
import type {
  MeasurementProfile,
  CreateMeasurementProfileInput,
} from "../types/measurements.types";

const BASE = "/measurements";

export async function fetchMeasurementProfiles(): Promise<MeasurementProfile[]> {
  const { data } = await apiSync.get<{ results: MeasurementProfile[] }>(`${BASE}/profiles/`);
  return data.results ?? [];
}

export async function createMeasurementProfile(
  input: CreateMeasurementProfileInput,
): Promise<MeasurementProfile> {
  const { data } = await apiSync.post<MeasurementProfile>(`${BASE}/profiles/`, input);
  return data;
}

export async function updateMeasurementProfile(
  profileId: string,
  input: Partial<CreateMeasurementProfileInput>,
): Promise<MeasurementProfile> {
  const { data } = await apiSync.patch<MeasurementProfile>(
    `${BASE}/profiles/${profileId}/`,
    input,
  );
  return data;
}

export async function setDefaultMeasurementProfile(
  profileId: string,
): Promise<MeasurementProfile> {
  const { data } = await apiSync.post<MeasurementProfile>(
    `${BASE}/profiles/${profileId}/set-default/`,
  );
  return data;
}

export async function deleteMeasurementProfile(profileId: string): Promise<void> {
  await apiSync.delete(`${BASE}/profiles/${profileId}/`);
}
