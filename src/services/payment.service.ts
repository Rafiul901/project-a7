import axiosInstance from "@/lib/axios";
import type {
  CheckoutResponse,
  CreatePaymentPayload,
  Payment,
} from "@/types/payment.types";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const createPayment = async (
  payload: CreatePaymentPayload,
  token: string
): Promise<Payment> => {
  const response = await axiosInstance.post<Payment>(
    "/payments",
    payload,
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const createCheckoutSession = async (
  paymentId: number,
  token: string
): Promise<CheckoutResponse> => {
  const response = await axiosInstance.post<CheckoutResponse>(
    `/payments/${paymentId}/checkout`,
    {},
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const getPaymentById = async (
  paymentId: number,
  token: string
): Promise<Payment> => {
  const response = await axiosInstance.get<Payment>(
    `/payments/${paymentId}`,
    { headers: authHeaders(token) }
  );

  return response.data;
};

export const getMyPayments = async (
  token: string,
  page = 1,
  limit = 10,
  status?: string
) => {
  const response = await axiosInstance.get("/payments/my", {
    headers: authHeaders(token),
    params: { page, limit, status },
  });

  return response.data;
};