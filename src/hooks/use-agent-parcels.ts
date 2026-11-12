"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  assignParcel,
  getAssignedParcels,
  getAvailableParcels,
  updateParcelStatus,
} from "@/services/agent.service";

import { useAuthStore } from "@/store/auth.store";
import type { ParcelStatus } from "@/types/parcel.types";

export function useAvailableParcels(page = 1, limit = 10) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["available-parcels", page, limit],
    queryFn: () =>
      getAvailableParcels(accessToken!, page, limit),
    enabled: !!accessToken,
  });
}

export function useAssignedParcels(
  page = 1,
  limit = 10,
  status?: ParcelStatus
) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["assigned-parcels", page, limit, status],
    queryFn: () =>
      getAssignedParcels(accessToken!, page, limit, status),
    enabled: !!accessToken,
  });
}

export function useAssignParcel() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (parcelId: number) =>
      assignParcel(parcelId, accessToken!),

    onSuccess: () => {
      toast.success("Parcel assigned successfully!");

      queryClient.invalidateQueries({
        queryKey: ["available-parcels"],
      });

      queryClient.invalidateQueries({
        queryKey: ["assigned-parcels"],
      });
    },

    onError: () => {
      toast.error("Failed to assign parcel.");
    },
  });
}

export function useUpdateParcelStatus() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      parcelId,
      status,
      location,
      note,
    }: {
      parcelId: number;
      status: ParcelStatus;
      location?: string;
      note?: string;
    }) =>
      updateParcelStatus(
        parcelId,
        status,
        accessToken!,
        location,
        note
      ),

    onSuccess: () => {
      toast.success("Parcel status updated!");

      queryClient.invalidateQueries({
        queryKey: ["assigned-parcels"],
      });
    },

    onError: () => {
      toast.error("Failed to update parcel status.");
    },
  });
}