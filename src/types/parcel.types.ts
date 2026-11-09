export type ParcelStatus =
  | "PENDING"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface Parcel {
  id: number;
  trackingNumber: string;
  senderId: number;
  deliveryAgentId?: number | null;
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  weight: number;
  deliveryFee: number;
  status: ParcelStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParcelPayload {
  receiverName: string;
  receiverPhone: string;
  pickupAddress: string;
  deliveryAddress: string;
  weight: number;
  deliveryFee: number;
}