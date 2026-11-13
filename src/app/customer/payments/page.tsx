
"use client";

import { Suspense } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useMyPayments } from "@/hooks/use-payments";
import type { PaymentStatus } from "@/types/payment.types";

const statuses: PaymentStatus[] = [
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

function PaymentListContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const selectedStatus = searchParams.get("status");
  const status = statuses.includes(selectedStatus as PaymentStatus)
    ? (selectedStatus as PaymentStatus)
    : undefined;

  const { data, isLoading, isError, refetch } = useMyPayments(
    page,
    10,
    status
  );

  const payments = data?.payments ?? [];
  const meta = data?.meta;

  const updateUrl = (newPage: number, newStatus?: PaymentStatus) => {
    const params = new URLSearchParams();

    params.set("page", String(newPage));

    if (newStatus) {
      params.set("status", newStatus);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const getStatusVariant = (paymentStatus: PaymentStatus) => {
    switch (paymentStatus) {
      case "PAID":
        return "default";
      case "FAILED":
      case "REFUNDED":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          Loading your payments...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="space-y-4 py-12 text-center">
          <p>Unable to load your payments.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <CardTitle>Payment History</CardTitle>

        <select
          value={status ?? "ALL"}
          onChange={(event) => {
            const value = event.target.value;

            updateUrl(
              1,
              value === "ALL" ? undefined : (value as PaymentStatus)
            );
          }}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="ALL">All Statuses</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </CardHeader>

      <CardContent>
        {payments.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-medium">No payments found.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your parcel payments will appear here.
            </p>
            <Button
              className="mt-4"
              onClick={() => router.push("/customer/parcels")}
            >
              View My Parcels
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Parcel ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        #{payment.id}
                      </TableCell>
                      <TableCell>#{payment.parcelId}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.currency}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(payment.status)}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/customer/payments/${payment.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
                {" · "}
                {meta?.total ?? payments.length} payments
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => updateUrl(page - 1, status)}
                >
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= (meta?.totalPages ?? 1)}
                  onClick={() => updateUrl(page + 1, status)}
                >
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function CustomerPaymentsPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading payments...</p>}>
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold">My Payments</h1>
            <p className="mt-2 text-muted-foreground">
              View your payment history and transaction details.
            </p>
          </div>

          <PaymentListContent />
        </div>
      </main>
    </Suspense>
  );
}
