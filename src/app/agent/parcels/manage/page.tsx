
"use client";

import { useState, type FormEvent } from "react";
import { Package, MapPin, RefreshCw, Truck } from "lucide-react";

import {
  useAssignedParcels,
  useUpdateParcelStatus,
} from "@/hooks/use-agent-parcels";

import type { ParcelStatus } from "@/types/parcel.types";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const nextStatus: Partial<Record<ParcelStatus, ParcelStatus>> = {
  PENDING: "PICKED_UP",
  PICKED_UP: "IN_TRANSIT",
  IN_TRANSIT: "OUT_FOR_DELIVERY",
  OUT_FOR_DELIVERY: "DELIVERED",
};

function ManageDeliveriesContent() {
  const { data, isLoading, isError, refetch } = useAssignedParcels(1, 10);

  const updateMutation = useUpdateParcelStatus();

  const [selectedParcelId, setSelectedParcelId] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const parcels = data?.parcels ?? [];

  const selectedParcel = parcels.find(
    (parcel) => String(parcel.id) === selectedParcelId
  );

  const upcomingStatus = selectedParcel
    ? nextStatus[selectedParcel.status]
    : undefined;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedParcel || !upcomingStatus) {
      return;
    }

    updateMutation.mutate({
      parcelId: selectedParcel.id,
      status: upcomingStatus,
      location: location.trim() || undefined,
      note: note.trim() || undefined,
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl space-y-5 px-4 py-8">
        <div className="h-8 w-64 animate-pulse rounded bg-slate-200" />
        <div className="h-72 animate-pulse rounded-xl bg-slate-200" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
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
      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6">
        <section>
          <p className="text-sm font-medium text-blue-600">
            Delivery Agent
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Manage Deliveries
          </h1>

          <p className="mt-2 text-slate-600">
            Select an assigned parcel and update its delivery progress.
          </p>
        </section>

        {parcels.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-16 text-center">
              <Package className="mb-4 h-12 w-12 text-slate-400" />
              <h2 className="text-lg font-semibold">
                No Assigned Parcels
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Assign a parcel before managing its delivery.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Update Delivery Status
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="parcel">
                    Select Assigned Parcel
                  </Label>

                  <select
                    id="parcel"
                    value={selectedParcelId}
                    onChange={(event) => {
                      setSelectedParcelId(event.target.value);
                      setLocation("");
                      setNote("");
                    }}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    required
                  >
                    <option value="">Choose a parcel</option>

                    {parcels.map((parcel) => (
                      <option
                        key={parcel.id}
                        value={String(parcel.id)}
                      >
                        {parcel.trackingNumber} — {parcel.receiverName}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedParcel && (
                  <div className="rounded-lg border bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold">
                        {selectedParcel.trackingNumber}
                      </h3>

                      <Badge variant="secondary">
                        {selectedParcel.status.replaceAll("_", " ")}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Receiver</p>
                        <p className="font-medium">
                          {selectedParcel.receiverName}
                        </p>
                        <p>{selectedParcel.receiverPhone}</p>
                      </div>

                      <div className="flex gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        <div>
                          <p className="text-muted-foreground">
                            Delivery Address
                          </p>
                          <p>{selectedParcel.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <p className="text-sm text-muted-foreground">
                        Next Status
                      </p>

                      {upcomingStatus ? (
                        <p className="mt-1 font-semibold text-blue-700">
                          {upcomingStatus.replaceAll("_", " ")}
                        </p>
                      ) : (
                        <p className="mt-1 font-medium text-green-700">
                          This parcel has completed its delivery or cannot be advanced.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedParcel && upcomingStatus && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="location">
                        Current Location (Optional)
                      </Label>

                      <input
                        id="location"
                        value={location}
                        onChange={(event) =>
                          setLocation(event.target.value)
                        }
                        placeholder="e.g. Bogura, Bangladesh"
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="note">
                        Delivery Note (Optional)
                      </Label>

                      <Textarea
                        id="note"
                        value={note}
                        onChange={(event) => setNote(event.target.value)}
                        placeholder="Add an update about this delivery..."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={updateMutation.isPending}
                    >
                      {updateMutation.isPending
                        ? "Updating..."
                        : `Update to ${upcomingStatus.replaceAll("_", " ")}`}
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Parcels
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ManageDeliveriesPage() {
  return <ManageDeliveriesContent />;
}
