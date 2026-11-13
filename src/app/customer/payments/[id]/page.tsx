
"use client";

import { useParams, useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  useCheckout,
  usePaymentDetails,
} from "@/hooks/use-payments";

import type { PaymentStatus } from "@/types/payment.types";

export default function PaymentDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const paymentId = Number(params.id);

  const {
    data: payment,
    isLoading,
    isError,
    refetch,
  } = usePaymentDetails(paymentId);

  const checkoutMutation = useCheckout();

  const getStatusVariant = (status: PaymentStatus) => {
    switch (status) {
      case "PAID":
        return "default";
      case "FAILED":
      case "REFUNDED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleCheckout = async () => {
    if (!payment) return;

    try {
      const result = await checkoutMutation.mutateAsync(payment.id);

      // Remember which payment is being processed.
      sessionStorage.setItem(
        "currentPaymentId",
        String(payment.id)
      );

      // Redirect the customer to Stripe Checkout.
      window.location.assign(result.checkoutUrl);
    } catch {
      // The useCheckout hook already displays an error toast.
    }
  };

  if (!Number.isInteger(paymentId) || paymentId <= 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="py-12 text-center">
            <p>Invalid payment ID.</p>
            <Button
              className="mt-4"
              onClick={() => router.push("/customer/payments")}
            >
              Back to Payments
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="py-12 text-center">
            Loading payment details...
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isError || !payment) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="space-y-4 py-12 text-center">
            <p>Unable to load payment details.</p>
            <Button onClick={() => refetch()}>Try Again</Button>
            <Button
              variant="outline"
              onClick={() => router.push("/customer/payments")}
            >
              Back to Payments
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Details</h1>
          <p className="mt-2 text-muted-foreground">
            Review your transaction information.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <span>Payment #{payment.id}</span>
              <Badge variant={getStatusVariant(payment.status)}>
                {payment.status}
              </Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  Payment ID
                </p>
                <p className="mt-1 font-semibold">#{payment.id}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Parcel ID
                </p>
                <p className="mt-1 font-semibold">#{payment.parcelId}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Amount
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {payment.amount} {payment.currency}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Payment Status
                </p>
                <p className="mt-1 font-semibold">
                  {payment.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Created At
                </p>
                <p className="mt-1 font-medium">
                  {new Date(payment.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Last Updated
                </p>
                <p className="mt-1 font-medium">
                  {new Date(payment.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>

            {payment.stripeSessionId && (
              <div>
                <p className="text-sm text-muted-foreground">
                  Stripe Session ID
                </p>
                <p className="mt-1 break-all text-sm">
                  {payment.stripeSessionId}
                </p>
              </div>
            )}

            {payment.status === "PENDING" && (
              <Button
                className="w-full"
                onClick={handleCheckout}
                disabled={checkoutMutation.isPending}
              >
                {checkoutMutation.isPending
                  ? "Connecting to Stripe..."
                  : "Pay Now with Stripe"}
              </Button>
            )}

            {payment.status === "PAID" && (
              <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
                This payment has been completed successfully.
              </div>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/customer/payments")}
            >
              Back to Payment History
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
