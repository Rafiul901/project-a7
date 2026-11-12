"use client";

import { Package, PlusCircle, CreditCard, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

import AuthGuard from "@/components/shared/auth-guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";

const quickActions = [
  {
    title: "My Parcels",
    description: "View and manage your parcel bookings.",
    href: "/customer/parcels",
    icon: Package,
    cta: "View Parcels",
  },
  {
    title: "Payments",
    description: "Check your payment history and status.",
    href: "/customer/payments",
    icon: CreditCard,
    cta: "View Payments",
  },
  {
    title: "Tracking",
    description: "Follow your parcel delivery progress.",
    href: "/customer/parcels",
    icon: Truck,
    cta: "Track Parcels",
  },
];

export default function CustomerDashboardPage() {
  const { data: user } = useCurrentUser();

  return (
    <AuthGuard allowedRole="CUSTOMER">
      <div className="min-h-screen bg-slate-50">
        {/* Blue accent hero band */}
        <div className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600">
          {/* Subtle decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative mx-auto max-w-7xl px-6 py-10 sm:py-12">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-medium text-blue-100">
                  Customer Dashboard
                </p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Welcome back, {user?.name ?? "Customer"}!
                </h1>
                <p className="mt-2 max-w-xl text-blue-100">
                  Manage your parcels, track deliveries, and stay on top of
                  payments — all in one place.
                </p>
              </div>

              <Link href="/customer/parcels/create">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 shadow-lg shadow-blue-900/20 hover:bg-blue-50"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Send a Parcel
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick action cards */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-6 w-1 rounded-full bg-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Quick Actions
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Card
                  key={action.title}
                  className="group relative overflow-hidden border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
                >
                  {/* Top accent bar */}
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
                    <Link
                      href={action.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
                    >
                      {action.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}