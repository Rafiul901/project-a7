"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { usePaymentDetails } from "@/hooks/use-payments";

function getStoredPaymentId(): number | null {
  if (typeof window === "undefined") return null;

  const storedId = sessionStorage.getItem("currentPaymentId");
  const parsedId = Number(storedId);

  if (storedId && Number.isInteger(parsedId) && parsedId > 0) {
    return parsedId;
  }

  return null;
}

export default function PaymentSuccessPage() {
  const router = useRouter();

  // ✅ Reads sessionStorage synchronously on mount without useEffect
  const [paymentId] = useState<number | null>(getStoredPaymentId);

  const {
    data: payment,
    isLoading,
    isError,
    refetch,
  } = usePaymentDetails(paymentId ?? 0);

  if (paymentId !== null && isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-lg">
          <CardContent className="py-12 text-center">
            Verifying your payment...
          </CardContent>
        </Card>
      </main>
    );
  }

  if (paymentId === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Payment Information Not Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {"We couldn't find the payment session information in this browser. Please check your payment history."}
            </p>

            <Button
              className="w-full"
              onClick={() => router.push("/customer/payments")}
            >
              View Payment History
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isError || !payment) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Unable to Verify Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {"We couldn't retrieve your payment status. Your payment may still be processing."}
            </p>

            <Button className="w-full" onClick={() => refetch()}>
              Check Again
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/customer/payments")}
            >
              View Payment History
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const isPaid = payment.status === "PAID";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mb-3 text-5xl">{isPaid ? "✓" : "⏳"}</div>
          <CardTitle className="text-2xl">
            {isPaid ? "Payment Successful!" : "Payment Processing"}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 text-center">
          <p className="text-sm text-muted-foreground">
            {isPaid
              ? "Your payment has been confirmed by our server."
              : "Stripe has redirected you back, but our server has not confirmed payment yet. Please check again shortly."}
          </p>

          <div className="rounded-lg border p-4 text-left">
            <p className="text-sm text-muted-foreground">Payment ID</p>
            <p className="font-semibold">#{payment.id}</p>

            <p className="mt-3 text-sm text-muted-foreground">Amount</p>
            <p className="font-semibold">
              {payment.amount} {payment.currency}
            </p>

            <p className="mt-3 text-sm text-muted-foreground">Status</p>
            <p className="font-semibold">{payment.status}</p>
          </div>

          {!isPaid && (
            <Button className="w-full" onClick={() => refetch()}>
              Check Payment Status Again
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/customer/payments")}
          >
            Go to Payment History
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
