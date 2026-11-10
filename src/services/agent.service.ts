import axiosInstance from "@/lib/axios";
import type { ParcelStatus } from "@/types/parcel.types";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const getAvailableParcels = async (
  token: string,
  page = 1,
  limit = 10
) => {
  const response = await axiosInstance.get("/parcels/available", {
    headers: authHeaders(token),
    params: { page, limit },
  });

  return response.data;
};

export const getAssignedParcels = async (
  token: string,
  page = 1,
  limit = 10,
  status?: ParcelStatus
) => {
  const response = await axiosInstance.get("/parcels/assigned", {
    headers: authHeaders(token),
    params: { page, limit, status },
  });

  return response.data;
};

export const assignParcel = async (
  id: number,
  token: string
) => {
  const response = await axiosInstance.patch(
    `/parcels/${id}/assign`,
    {},
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const updateParcelStatus = async (
  id: number,
  status: ParcelStatus,
  token: string,
  location?: string,
  note?: string
) => {
  const response = await axiosInstance.patch(
    `/parcels/${id}/status`,
    { status, location, note },
    { headers: authHeaders(token) }
  );

  return response.data;
};