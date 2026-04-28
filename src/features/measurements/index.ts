/**
 * @file index.ts
 * @description Public API for the `features/measurements` canonical FSD slice.
 */
export type {
  MeasurementProfile,
  CreateMeasurementProfileInput,
  MeasurementUnit,
} from "./types/measurements.types";

export {
  fetchMeasurementProfiles,
  createMeasurementProfile,
  updateMeasurementProfile,
  setDefaultMeasurementProfile,
  deleteMeasurementProfile,
} from "./api/measurements.api";

export {
  measurementKeys,
  useMeasurementProfiles,
  useCreateMeasurementProfile,
  useUpdateMeasurementProfile,
  useSetDefaultProfile,
  useDeleteMeasurementProfile,
} from "./hooks/use-measurements";
