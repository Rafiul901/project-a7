"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createCheckoutSession,
  createPayment,
  getMyPayments,
  getPaymentById,
} from "@/services/payment.service";

import { useAuthStore } from "@/store/auth.store";
import type { CreatePaymentPayload } from "@/types/payment.types";

export function useMyPayments(
  page = 1,
  limit = 10,
  status?: string
) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["my-payments", page, limit, status],
    queryFn: () =>
      getMyPayments(accessToken!, page, limit, status),
    enabled: !!accessToken,
  });
}

export function usePaymentDetails(paymentId: number) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () =>
      getPaymentById(paymentId, accessToken!),
    enabled: !!accessToken && paymentId > 0,
  });
}

export function useCreatePayment() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) =>
      createPayment(payload, accessToken!),

    onSuccess: () => {
      toast.success("Payment created successfully!");

      queryClient.invalidateQueries({
        queryKey: ["my-payments"],
      });
    },

    onError: () => {
      toast.error("Failed to create payment.");
    },
  });
}

export function useCheckout() {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useMutation({
    mutationFn: (paymentId: number) =>
      createCheckoutSession(paymentId, accessToken!),

    onError: () => {
      toast.error("Unable to start Stripe Checkout.");
    },
  });
}