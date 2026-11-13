"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  MapPin,
  Package,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useParcelDetails } from "@/hooks/use-parcels";
import { useParcelTracking } from "@/hooks/use-tracking";

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  PICKED_UP: "Picked Up",
  IN_TRANSIT: "In Transit",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export default function ParcelTrackingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const parcelId = Number(params.id);

  const {
    data: parcel,
    isLoading: parcelLoading,
    isError: parcelError,
  } = useParcelDetails(parcelId);

  const {
    data: trackingHistory,
    isLoading: trackingLoading,
    isError: trackingError,
  } = useParcelTracking(parcelId);

  if (!Number.isInteger(parcelId) || parcelId <= 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">Invalid Parcel ID</h1>
        <Button
          className="mt-4"
          onClick={() => router.push("/customer/parcels")}
        >
          Back to My Parcels
        </Button>
      </div>
    );
  }

  if (parcelLoading || trackingLoading) {
    return (
      <div className="space-y-4 p-6">
        <div className="h-8 w-48 animate-pulse bg-muted" />
        <div className="h-40 animate-pulse bg-muted" />
        <div className="h-40 animate-pulse bg-muted" />
      </div>
    );
  }

  if (parcelError || trackingError || !parcel) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">
          Unable to Load Tracking
        </h1>
        <p className="mt-2 text-muted-foreground">
          We could not retrieve the tracking information.
        </p>
        <Button
          className="mt-4"
          onClick={() => router.push("/customer/parcels")}
        >
          Back to My Parcels
        </Button>
      </div>
    );
  }

  const history = trackingHistory ?? [];

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
      <Button
        variant="outline"
        onClick={() =>
          router.push(`/customer/parcels/${parcelId}`)
        }
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Parcel Details
      </Button>

      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          Parcel Tracking
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tracking Number: {parcel.trackingNumber}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Current Status
          </CardTitle>
          <CardDescription>
            Latest delivery information.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Badge variant="default">
            {statusLabels[parcel.status] ?? parcel.status}
          </Badge>
          <p className="mt-3 text-sm text-muted-foreground">
            Destination: {parcel.deliveryAddress}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tracking History</CardTitle>
          <CardDescription>
            Updates recorded by the delivery system.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {history.length === 0 ? (
            <div className="py-8 text-center">
              <Package className="mx-auto h-10 w-10 text-muted-foreground" />
              <h3 className="mt-3 font-semibold">
                No Tracking Updates Yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tracking updates will appear here when the delivery
                agent updates your parcel.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {history.map((item, index) => (
                <div key={item.id} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    {index === 0 ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}

                    {index !== history.length - 1 && (
                      <div className="mt-2 h-full min-h-12 w-px bg-border" />
                    )}
                  </div>

                  <div className="flex-1 pb-2">
                    <h3 className="font-semibold">
                      {statusLabels[item.status] ?? item.status}
                    </h3>

                    {item.location && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </p>
                    )}

                    {item.note && (
                      <p className="mt-2 text-sm">
                        {item.note}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}