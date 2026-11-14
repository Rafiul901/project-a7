
"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Package, MapPin, Weight, RefreshCw } from "lucide-react";

import { useAvailableParcels, useAssignParcel } from "@/hooks/use-agent-parcels";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function AvailableParcelsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const { data, isLoading, isError, refetch } =
    useAvailableParcels(currentPage, 10);

  const assignMutation = useAssignParcel();

  const parcels = data?.parcels ?? [];
  const meta = data?.meta;

  const totalPages = meta?.totalPages ?? 1;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  };

  const handleAssign = (parcelId: number) => {
    assignMutation.mutate(parcelId);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="mb-4 text-red-600">
          Unable to load available parcels.
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
            Available Parcels
          </h1>
          <p className="mt-2 text-slate-600">
            Browse parcels waiting for a delivery agent and assign one to yourself.
          </p>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Total available:{" "}
            <span className="font-semibold text-slate-900">
              {meta?.total ?? parcels.length}
            </span>
          </p>

          <Button
            variant="outline"
            onClick={() => refetch()}
            disabled={assignMutation.isPending}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>

        {parcels.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-16 text-center">
              <Package className="mb-4 h-12 w-12 text-slate-400" />
              <h2 className="text-lg font-semibold">
                No Available Parcels
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                There are currently no parcels waiting for assignment.
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
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">
                          Receiver
                        </p>
                        <p className="font-medium">
                          {parcel.receiverName}
                        </p>
                        <p className="text-muted-foreground">
                          {parcel.receiverPhone}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                        <div>
                          <p className="text-muted-foreground">
                            Pickup Address
                          </p>
                          <p>{parcel.pickupAddress}</p>
                        </div>
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

                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Weight className="h-4 w-4" />
                          {parcel.weight} kg
                        </div>

                        <p className="font-semibold text-slate-900">
                          ৳{Number(parcel.deliveryFee).toLocaleString("en-BD")}
                        </p>
                      </div>
                    </div>

                    <Button
                      className="mt-6 w-full"
                      onClick={() => handleAssign(parcel.id)}
                      disabled={assignMutation.isPending}
                    >
                      {assignMutation.isPending
                        ? "Assigning..."
                        : "Assign to Me"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => changePage(currentPage - 1)}
              >
                Previous
              </Button>

              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => changePage(currentPage + 1)}
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

export default function AvailableParcelsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-600">
          Loading available parcels...
        </div>
      }
    >
      <AvailableParcelsContent />
    </Suspense>
  );
}
