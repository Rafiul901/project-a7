
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

import { useMyParcels } from "@/hooks/use-parcels";
import type { ParcelStatus } from "@/types/parcel.types";

const statuses: ParcelStatus[] = [
  "PENDING",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

function ParcelListContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const selectedStatus = searchParams.get("status");
  const status = statuses.includes(selectedStatus as ParcelStatus)
    ? (selectedStatus as ParcelStatus)
    : undefined;

  const { data, isLoading, isError, refetch } = useMyParcels(
    page,
    10,
    status
  );

  const parcels = data?.parcels ?? [];
  const meta = data?.meta;

  const updateUrl = (newPage: number, newStatus?: ParcelStatus) => {
    const params = new URLSearchParams();

    params.set("page", String(newPage));

    if (newStatus) {
      params.set("status", newStatus);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const getStatusVariant = (parcelStatus: ParcelStatus) => {
    switch (parcelStatus) {
      case "DELIVERED":
        return "default";
      case "CANCELLED":
        return "destructive";
      case "IN_TRANSIT":
      case "OUT_FOR_DELIVERY":
        return "secondary";
      default:
        return "outline";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          Loading your parcels...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="space-y-4 py-12 text-center">
          <p>Unable to load your parcels.</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <CardTitle>My Parcels</CardTitle>

        <select
          value={status ?? "ALL"}
          onChange={(event) => {
            const value = event.target.value;
            updateUrl(
              1,
              value === "ALL" ? undefined : (value as ParcelStatus)
            );
          }}
          className="h-10 rounded-md border bg-background px-3 text-sm"
        >
          <option value="ALL">All Statuses</option>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </CardHeader>

      <CardContent>
        {parcels.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-medium">No parcels found.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Start by booking your first delivery.
            </p>
            <Button className="mt-4" onClick={() => router.push("/customer/parcels/create")}>
              Send a Parcel
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tracking Number</TableHead>
                    <TableHead>Receiver</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {parcels.map((parcel) => (
                    <TableRow key={parcel.id}>
                      <TableCell className="font-medium">
                        {parcel.trackingNumber}
                      </TableCell>
                      <TableCell>{parcel.receiverName}</TableCell>
                      <TableCell className="max-w-48 truncate">
                        {parcel.deliveryAddress}
                      </TableCell>
                      <TableCell>
                        ৳{parcel.deliveryFee}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(parcel.status)}>
                          {parcel.status.replaceAll("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/customer/parcels/${parcel.id}`}
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
                {meta?.total ?? parcels.length} parcels
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

export default function CustomerParcelsPage() {
  return (
    <Suspense fallback={<p className="p-8">Loading parcels...</p>}>
      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold">My Parcels</h1>
              <p className="mt-2 text-muted-foreground">
                View and manage your delivery bookings.
              </p>
            </div>

            <Button onClick={() => window.location.assign("/customer/parcels/create")}>
              Send a Parcel
            </Button>
          </div>

          <ParcelListContent />
        </div>
      </main>
    </Suspense>
  );
}
