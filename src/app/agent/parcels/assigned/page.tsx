
"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Package, MapPin, RefreshCw } from "lucide-react";

import { useAssignedParcels } from "@/hooks/use-agent-parcels";
import type { ParcelStatus } from "@/types/parcel.types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: ParcelStatus[] = [
  "PENDING",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

function AssignedParcelsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const selectedStatus = searchParams.get("status") as ParcelStatus | null;

  const validStatus =
    selectedStatus && statuses.includes(selectedStatus)
      ? selectedStatus
      : undefined;

  const { data, isLoading, isError, refetch } = useAssignedParcels(
    currentPage,
    10,
    validStatus
  );

  const parcels = data?.parcels ?? [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const updateUrl = (page: number, status?: ParcelStatus) => {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (status) {
      params.set("status", status);
    }

    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-64 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="mb-4 text-red-600">
          Unable to load your assigned parcels.
        </p>
        <Button onClick={() => refetch()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <p className="text-sm font-medium text-blue-600">
            Delivery Agent
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Assigned Parcels
          </h1>
          <p className="mt-2 text-slate-600">
            Track and manage parcels assigned to you.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-slate-600">
            Total parcels:{" "}
            <span className="font-semibold text-slate-900">
              {meta?.total ?? parcels.length}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <Select
              value={validStatus ?? "ALL"}
              onValueChange={(value) =>
                updateUrl(1, value === "ALL" ? undefined : (value as ParcelStatus))
              }
            >
              <SelectTrigger className="w-[190px] bg-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {parcels.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-16 text-center">
              <Package className="mb-4 h-12 w-12 text-slate-400" />
              <h2 className="text-lg font-semibold">
                No Assigned Parcels
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {validStatus
                  ? `No parcels currently have the status ${validStatus.replaceAll("_", " ")}.`
                  : "You don't have any parcels assigned yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {parcels.map((parcel) => (
                <Card key={parcel.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">
                        {parcel.trackingNumber}
                      </CardTitle>
                      <Badge variant="secondary">
                        {parcel.status.replaceAll("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-1 flex-col">
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Receiver</p>
                        <p className="font-medium">{parcel.receiverName}</p>
                        <p className="text-muted-foreground">
                          {parcel.receiverPhone}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <div>
                          <p className="text-muted-foreground">
                            Delivery Address
                          </p>
                          <p>{parcel.deliveryAddress}</p>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-muted-foreground">
                          Delivery Fee
                        </p>
                        <p className="font-semibold">
                          ৳{Number(parcel.deliveryFee).toLocaleString("en-BD")}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="mt-5 w-full"
                      onClick={() =>
                        router.push("/agent/parcels/manage")
                      }
                    >
                      Manage Deliveries
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => updateUrl(currentPage - 1, validStatus)}
              >
                Previous
              </Button>

              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => updateUrl(currentPage + 1, validStatus)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AssignedParcelsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-600">
          Loading assigned parcels...
        </div>
      }
    >
      <AssignedParcelsContent />
    </Suspense>
  );
}
