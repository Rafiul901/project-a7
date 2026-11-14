
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Package, RefreshCw } from "lucide-react";

import { useAdminParcels } from "@/hooks/use-admin";
import type { ParcelStatus } from "@/types/parcel.types";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statuses: { label: string; value: string }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Picked Up", value: "PICKED_UP" },
  { label: "In Transit", value: "IN_TRANSIT" },
  { label: "Out for Delivery", value: "OUT_FOR_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

function formatStatus(status: ParcelStatus) {
  return status.replaceAll("_", " ");
}

export default function AdminParcelsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const status = searchParams.get("status") || "";

  const { data, isLoading, isError, refetch } =
    useAdminParcels(page, 10, status || undefined);

  const parcels = data?.parcels ?? [];
  const meta = data?.meta;

  const updateURL = (newPage: number, newStatus: string) => {
    const params = new URLSearchParams();

    if (newPage > 1) {
      params.set("page", String(newPage));
    }

    if (newStatus) {
      params.set("status", newStatus);
    }

    const query = params.toString();

    router.push(
      query ? `/admin/parcels?${query}` : "/admin/parcels"
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold">Manage Parcels</h1>
          <p className="text-sm text-muted-foreground">
            View and filter parcels across the platform.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Filter by Status
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {statuses.map((item) => (
              <Button
                key={item.value || "all"}
                size="sm"
                variant={status === item.value ? "default" : "outline"}
                onClick={() => updateURL(1, item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="space-y-3 p-6">
            <p className="text-destructive">
              Failed to load parcels.
            </p>
            <Button onClick={() => void refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : parcels.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <h2 className="font-semibold">No parcels found</h2>
            <p className="text-sm text-muted-foreground">
              No parcels match this status filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Parcels ({meta?.total ?? parcels.length})
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {parcels.map((parcel) => (
                  <div
                    key={parcel.id}
                    className="rounded-lg border p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">
                          {parcel.trackingNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Parcel ID: {parcel.id}
                        </p>
                      </div>

                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                        {formatStatus(parcel.status)}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
                      <div>
                        <p className="text-muted-foreground">
                          Receiver
                        </p>
                        <p className="font-medium">
                          {parcel.receiverName}
                        </p>
                        <p>{parcel.receiverPhone}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">
                          Pickup Address
                        </p>
                        <p>{parcel.pickupAddress}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">
                          Delivery Address
                        </p>
                        <p>{parcel.deliveryAddress}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground">
                          Parcel Information
                        </p>
                        <p>
                          Weight: {parcel.weight} kg
                        </p>
                        <p>
                          Delivery Fee: ৳
                          {Number(parcel.deliveryFee).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => updateURL(page - 1, status)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= (meta?.totalPages ?? 1)}
                onClick={() => updateURL(page + 1, status)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
