"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  cancelParcel,
  createParcel,
  getMyParcels,
} from "@/services/parcel.service";

import { useAuthStore } from "@/store/auth.store";
import type {
  CreateParcelPayload,
  ParcelStatus,
} from "@/types/parcel.types";

export function useMyParcels(
  page = 1,
  limit = 10,
  status?: ParcelStatus
) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["my-parcels", page, limit, status],

    queryFn: () =>
      getMyParcels(accessToken!, page, limit, status),

    enabled: !!accessToken,
  });
}

export function useCreateParcel() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateParcelPayload) =>
      createParcel(payload, accessToken!),

    onSuccess: () => {
      toast.success("Parcel created successfully!");

      queryClient.invalidateQueries({
        queryKey: ["my-parcels"],
      });
    },

    onError: () => {
      toast.error("Failed to create parcel.");
    },
  });
}

export function useCancelParcel() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (parcelId: number) =>
      cancelParcel(parcelId, accessToken!),

    onSuccess: () => {
      toast.success("Parcel cancelled successfully!");

      queryClient.invalidateQueries({
        queryKey: ["my-parcels"],
      });
    },

    onError: () => {
      toast.error("Failed to cancel parcel.");
    },
  });
}