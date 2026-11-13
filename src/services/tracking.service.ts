import axiosInstance from "@/lib/axios";
import { extractData } from "@/lib/api-response";
import type { ParcelTracking } from "@/types/tracking.types";

export const getParcelTracking = async (
  parcelId: number,
  token: string
): Promise<ParcelTracking[]> => {
  const response = await axiosInstance.get(
    `/parcels/${parcelId}/tracking`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return extractData<ParcelTracking[]>(response.data);
};