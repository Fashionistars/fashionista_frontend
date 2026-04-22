import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { vendorService } from "@/features/vendor/services/vendor.service";
import type { VendorSetupPayload } from "@/features/vendor/types/vendor.types";

const VENDOR_PROFILE_QUERY_KEY = ["vendor", "profile"] as const;
const VENDOR_SETUP_QUERY_KEY = ["vendor", "setup"] as const;
const VENDOR_DASHBOARD_QUERY_KEY = ["vendor", "dashboard"] as const;

export function useVendorProfile() {
  return useQuery({
    queryKey: VENDOR_PROFILE_QUERY_KEY,
    queryFn: vendorService.getProfile,
    staleTime: 30_000,
  });
}

export function useVendorSetupState() {
  return useQuery({
    queryKey: VENDOR_SETUP_QUERY_KEY,
    queryFn: vendorService.getSetupState,
    staleTime: 15_000,
  });
}

export function useVendorDashboard() {
  return useQuery({
    queryKey: VENDOR_DASHBOARD_QUERY_KEY,
    queryFn: vendorService.getDashboard,
    staleTime: 30_000,
  });
}

export function useSubmitVendorSetup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VendorSetupPayload) => vendorService.submitSetup(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: VENDOR_PROFILE_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: VENDOR_SETUP_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: VENDOR_DASHBOARD_QUERY_KEY }),
      ]);
    },
  });
}
