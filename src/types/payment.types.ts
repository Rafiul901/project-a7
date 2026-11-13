import type { PaginationMeta } from "@/types/api.types";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED";

export interface Payment {
  id: number;
  parcelId: number;
  amount: number;
  currency: string;
  status: PaymentStatus;
  stripeSessionId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentPayload {
  parcelId: number;
}

export interface CheckoutResponse {
  sessionId: string;
  checkoutUrl: string;
}

export interface MyPaymentsResponse {
  payments: Payment[];
  meta: PaginationMeta;
}