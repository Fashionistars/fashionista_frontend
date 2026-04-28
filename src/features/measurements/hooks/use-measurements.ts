/**
 * @file use-measurements.ts
 * @description TanStack Query hooks for the Measurements domain.
 */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  fetchMeasurementProfiles,
  createMeasurementProfile,
  updateMeasurementProfile,
  setDefaultMeasurementProfile,
  deleteMeasurementProfile,
} from "../api/measurements.api";
import type { CreateMeasurementProfileInput } from "../types/measurements.types";

export const measurementKeys = {
  all: ["measurement"] as const,
  profiles: () => [...measurementKeys.all, "profiles"] as const,
} as const;

/** Hook: all measurement profiles for current user. */
export function useMeasurementProfiles() {
  return useQuery({
    queryKey: measurementKeys.profiles(),
    queryFn: fetchMeasurementProfiles,
    staleTime: 120_000,
  });
}

/** Mutation: create a new measurement profile. */
export function useCreateMeasurementProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMeasurementProfileInput) =>
      createMeasurementProfile(input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: measurementKeys.profiles() });
      toast.success("Measurement profile created!");
    },
  });
}

/** Mutation: update an existing profile. */
export function useUpdateMeasurementProfile(profileId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreateMeasurementProfileInput>) =>
      updateMeasurementProfile(profileId, input),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: measurementKeys.profiles() });
      toast.success("Profile updated.");
    },
  });
}

/** Mutation: set profile as default (atomic backend operation). */
export function useSetDefaultProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (profileId: string) => setDefaultMeasurementProfile(profileId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: measurementKeys.profiles() });
      toast.success("Default measurement profile updated.");
    },
  });
}

/** Mutation: delete a profile. */
export function useDeleteMeasurementProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (profileId: string) => deleteMeasurementProfile(profileId),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: measurementKeys.profiles() });
      toast.success("Profile deleted.");
    },
    onError: () => {
      toast.error("Cannot delete default profile. Set another as default first.");
    },
  });
}
