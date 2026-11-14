"use client";

import { useCreatePayment } from "@/hooks/use-payments";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Scale,
  Wallet,
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

import {
  useCancelParcel,
  useParcelDetails,
} from "@/hooks/use-parcels";

import type { ParcelStatus } from "@/types/parcel.types";

const statusVariants: Record<
  ParcelStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  PENDING: "secondary",
  PICKED_UP: "outline",
  IN_TRANSIT: "default",
  OUT_FOR_DELIVERY: "default",
  DELIVERED: "secondary",
  CANCELLED: "destructive",
};

export default function ParcelDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  // Safely handle params incase it's parsed as an array
  const rawId = params?.id;
  const parcelId = Number(Array.isArray(rawId) ? rawId[0] : rawId);

  const {
    data: parcel,
    isLoading,
    isError,
  } = useParcelDetails(parcelId);

  const cancelMutation = useCancelParcel();
  const createPaymentMutation = useCreatePayment();

  const handleCreatePayment = () => {
    createPaymentMutation.mutate(
      { parcelId },
      {
        onSuccess: (payment) => {
          router.push(`/customer/payments/${payment.id}`);
        },
      }
    );
  };

  const handleCancel = () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this parcel?"
    );

    if (!confirmed) return;

    cancelMutation.mutate(parcelId, {
      onSuccess: () => {
        router.push("/customer/parcels");
      },
    });
  };

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

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <div className="h-8 w-48 animate-pulse bg-muted rounded" />
        <div className="h-48 animate-pulse bg-muted rounded" />
        <div className="h-48 animate-pulse bg-muted rounded" />
      </div>
    );
  }

  if (isError || !parcel) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold">Parcel Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          We could not load this parcel. It may not exist or you may not have
          permission to view it.
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

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 md:p-8">
      <div>
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Parcel Details
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tracking Number: {parcel.trackingNumber}
          </p>
        </div>

        <Badge variant={statusVariants[parcel.status]}>
          {parcel.status.replaceAll("_", " ")}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4" />
              Receiver Information
            </CardTitle>
            <CardDescription>
              Details of the person receiving this parcel.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Receiver Name</p>
              <p className="font-medium">{parcel.receiverName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone Number</p>
              <p className="flex items-center gap-2 font-medium">
                <Phone className="h-4 w-4" />
                {parcel.receiverPhone}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              Delivery Route
            </CardTitle>
            <CardDescription>
              Pickup and destination addresses.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Pickup Address</p>
              <p className="font-medium">{parcel.pickupAddress}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Delivery Address
              </p>
              <p className="font-medium">{parcel.deliveryAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Parcel Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Scale className="h-4 w-4" />
                Weight
              </span>
              <span className="font-medium">{parcel.weight} kg</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-4 w-4" />
                Delivery Fee
              </span>
              <span className="font-medium">
                ৳{parcel.deliveryFee.toLocaleString("en-BD")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Parcel Timeline</CardTitle>
            <CardDescription>
              Important parcel dates.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">
                {new Date(parcel.createdAt).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {new Date(parcel.updatedAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() =>
            router.push(`/customer/parcels/${parcel.id}/tracking`)
          }
        >
          Track Parcel
        </Button>

        {/* Payment Button (Added back since useCreatePayment was imported) */}
        {parcel.status === "PENDING" && (
          <Button
            onClick={handleCreatePayment}
            disabled={createPaymentMutation.isPending}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            {createPaymentMutation.isPending ? "Processing..." : "Pay Now"}
          </Button>
        )}

        {parcel.status === "PENDING" && (
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={cancelMutation.isPending}
          >
            {cancelMutation.isPending ? "Cancelling..." : "Cancel Parcel"}
          </Button>
        )}

        <Button
          variant="outline"
          onClick={() => router.push("/customer/parcels")}
        >
          All Parcels
        </Button>
      </div>
    </div>
  );
}