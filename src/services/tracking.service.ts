import axiosInstance from "@/lib/axios";
import type { ParcelTracking } from "@/types/tracking.types";

export const getParcelTracking = async (
  parcelId: number,
  token: string
): Promise<ParcelTracking[]> => {
  const response = await axiosInstance.get<ParcelTracking[]>(
    `/parcels/${parcelId}/tracking`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};