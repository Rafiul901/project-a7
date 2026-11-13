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

function getStoredPaymentId(): number | null {
  if (typeof window === "undefined") return null;

  const storedId = sessionStorage.getItem("currentPaymentId");
  const parsedId = Number(storedId);

  if (storedId && Number.isInteger(parsedId) && parsedId > 0) {
    return parsedId;
  }

  return null;
}

export default function PaymentCancelPage() {
  const router = useRouter();
  const [paymentId] = useState<number | null>(getStoredPaymentId);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mb-3 text-5xl">↩</div>
          <CardTitle className="text-2xl">
            Checkout Cancelled
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 text-center">
          <p className="text-sm text-muted-foreground">
            You cancelled the Stripe Checkout process. No payment
            confirmation has been received.
          </p>

          {paymentId !== null && (
            <div className="rounded-lg border p-4 text-left">
              <p className="text-sm text-muted-foreground">
                Payment ID
              </p>
              <p className="font-semibold">#{paymentId}</p>
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            {"You can return to your payment details and try again whenever you're ready."}
          </p>

          <Button
            className="w-full"
            onClick={() => {
              if (paymentId !== null) {
                router.push(`/customer/payments/${paymentId}`);
              } else {
                router.push("/customer/payments");
              }
            }}
          >
            {paymentId !== null
              ? "Return to Payment"
              : "View Payment History"}
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => router.push("/customer/dashboard")}
          >
            Customer Dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
