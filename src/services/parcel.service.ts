import axiosInstance from "@/lib/axios";
import type {
  CreateParcelPayload,
  Parcel,
  ParcelStatus,
} from "@/types/parcel.types";

export const createParcel = async (
  payload: CreateParcelPayload,
  token: string
): Promise<Parcel> => {
  const response = await axiosInstance.post<Parcel>(
    "/parcels",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyParcels = async (
  token: string,
  page = 1,
  limit = 10,
  status?: ParcelStatus
) => {
  const response = await axiosInstance.get("/parcels/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
      status,
    },
  });

  return response.data;
};

export const getParcelById = async (
  id: number,
  token: string
): Promise<Parcel> => {
  const response = await axiosInstance.get<Parcel>(
    `/parcels/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const cancelParcel = async (
  id: number,
  token: string
) => {
  const response = await axiosInstance.patch(
    `/parcels/${id}/cancel`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};