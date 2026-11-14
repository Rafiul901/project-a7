"use client";

import Link from "next/link";
import {
  Users,
  Package,
  ClipboardList,
  Truck,
  RefreshCw,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  useAdminUsers,
  useAdminParcels,
} from "@/hooks/use-admin";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboardPage() {
  const usersQuery = useAdminUsers(1, 1);
  const parcelsQuery = useAdminParcels(1, 100);

  const isLoading =
    usersQuery.isLoading || parcelsQuery.isLoading;

  const isError =
    usersQuery.isError || parcelsQuery.isError;

  const totalUsers = usersQuery.data?.meta.total ?? 0;
  const totalParcels = parcelsQuery.data?.meta.total ?? 0;

  const allParcels = parcelsQuery.data?.parcels ?? [];

  const chartData = [
    {
      name: "Pending",
      total: allParcels.filter((p) => p.status === "PENDING").length,
    },
    {
      name: "Picked Up",
      total: allParcels.filter((p) => p.status === "PICKED_UP").length,
    },
    {
      name: "In Transit",
      total: allParcels.filter((p) => p.status === "IN_TRANSIT").length,
    },
    {
      name: "Out for Delivery",
      total: allParcels.filter((p) => p.status === "OUT_FOR_DELIVERY").length,
    },
    {
      name: "Delivered",
      total: allParcels.filter((p) => p.status === "DELIVERED").length,
    },
    {
      name: "Cancelled",
      total: allParcels.filter((p) => p.status === "CANCELLED").length,
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-32 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-destructive">
          Failed to load dashboard information.
        </p>
        <Button
          onClick={() => {
            void usersQuery.refetch();
            void parcelsQuery.refetch();
          }}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  const summaryCards = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      description: "Registered platform users",
    },
    {
      title: "Total Parcels",
      value: totalParcels,
      icon: Package,
      description: "Parcels in the platform",
    },
  ];

  const managementLinks = [
    {
      title: "Manage Users",
      description: "View users and filter by role.",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Manage Parcels",
      description: "View and filter all parcels.",
      href: "/admin/parcels",
      icon: Truck,
    },
    {
      title: "Audit Logs",
      description: "Review recorded platform activities.",
      href: "/admin/audit-logs",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-muted-foreground">
          Overview of your courier platform.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {summaryCards.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">
                  {item.value.toLocaleString()}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Parcel Status Breakdown Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Parcel Status Breakdown</CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on the latest 100 parcels.
          </p>
        </CardHeader>

        <CardContent>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="total"
                  name="Parcels"
                  fill="var(--chart-1)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          Management
        </h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {managementLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <Icon className="mb-2 h-6 w-6 text-primary" />
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}