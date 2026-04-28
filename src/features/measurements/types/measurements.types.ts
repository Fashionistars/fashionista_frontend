/**
 * @file measurements.types.ts
 * @description Canonical types for the Measurements domain.
 * Source: `apps/measurements/serializers/`
 */

export type MeasurementUnit = "cm" | "inch";

export interface MeasurementProfile {
  id: string;
  name: string;
  is_default: boolean;
  unit: MeasurementUnit;
  // Body measurements (all in selected unit)
  chest: string | null;
  waist: string | null;
  hips: string | null;
  inseam: string | null;
  shoulder_width: string | null;
  sleeve_length: string | null;
  neck: string | null;
  thigh: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMeasurementProfileInput {
  name: string;
  is_default?: boolean;
  unit: MeasurementUnit;
  chest?: string;
  waist?: string;
  hips?: string;
  inseam?: string;
  shoulder_width?: string;
  sleeve_length?: string;
  neck?: string;
  thigh?: string;
  notes?: string;
}
