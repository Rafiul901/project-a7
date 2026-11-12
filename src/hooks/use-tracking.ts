"use client";

import { useQuery } from "@tanstack/react-query";

import { getParcelTracking } from "@/services/tracking.service";
import { useAuthStore } from "@/store/auth.store";

export function useParcelTracking(parcelId: number) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["parcel-tracking", parcelId],

    queryFn: () =>
      getParcelTracking(parcelId, accessToken!),

    enabled: !!accessToken && parcelId > 0,
  });
}