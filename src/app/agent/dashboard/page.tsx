"use client";

import Link from "next/link";
import {
  Package,
  Truck,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  useAvailableParcels,
  useAssignedParcels,
} from "@/hooks/use-agent-parcels";

const quickActions = [
  {
    title: "Available Parcels",
    description: "Find parcels waiting for a delivery agent.",
    href: "/agent/parcels/available",
    icon: Package,
    cta: "Browse Parcels",
  },
  {
    title: "My Assigned Parcels",
    description: "View parcels assigned to you.",
    href: "/agent/parcels/assigned",
    icon: ClipboardList,
    cta: "View Assigned",
  },
  {
    title: "Manage Deliveries",
    description: "Update the status of your deliveries.",
    href: "/agent/parcels/manage",
    icon: Truck,
    cta: "Manage Now",
  },
];

export default function AgentDashboardPage() {
  const { data: user } = useCurrentUser();

  const availableQuery = useAvailableParcels();
  const assignedQuery = useAssignedParcels();

  const availableCount = availableQuery.data?.meta?.total ?? 0;
  const assignedCount = assignedQuery.data?.meta?.total ?? 0;

  const isLoading =
    availableQuery.isLoading || assignedQuery.isLoading;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Blue accent hero band */}
      <div className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 sm:py-12">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-blue-100">
                Delivery Agent Dashboard
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Welcome back, {user?.name || "Agent"}!
              </h1>
              <p className="mt-2 max-w-xl text-blue-100">
                Manage your assigned parcels and keep deliveries moving.
              </p>
            </div>

            <Link
              href="/agent/parcels/available"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-blue-700 shadow-lg shadow-blue-900/20 transition-colors hover:bg-blue-50"
            >
              <Package className="h-4 w-4" />
              Find Parcels
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-10 px-6 py-10">
        {/* Statistics */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Overview
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Available stat */}
            <Card className="group relative overflow-hidden border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  Available Parcels
                </CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Package className="h-5 w-5" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {isLoading ? (
                    <span className="inline-block h-8 w-12 animate-pulse rounded bg-slate-200" />
                  ) : (
                    availableCount
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Parcels waiting for assignment
                </p>
              </CardContent>
            </Card>

            {/* Assigned stat */}
            <Card className="group relative overflow-hidden border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  My Assigned Parcels
                </CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <Truck className="h-5 w-5" />
                </div>
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {isLoading ? (
                    <span className="inline-block h-8 w-12 animate-pulse rounded bg-slate-200" />
                  ) : (
                    assignedCount
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Parcels assigned to you
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick actions */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="block"
                >
                  <Card className="group relative h-full overflow-hidden border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-sm font-semibold text-slate-900">
                        {action.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {action.description}
                      </p>

                      <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
                        {action.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}