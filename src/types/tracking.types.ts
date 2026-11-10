import type { ParcelStatus } from "@/types/parcel.types";

export interface ParcelTracking {
  id: number;
  parcelId: number;
  status: ParcelStatus;
  location?: string | null;
  note?: string | null;
  createdAt: string;
}