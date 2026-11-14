
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Users, RefreshCw } from "lucide-react";

import { useAdminUsers } from "@/hooks/use-admin";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const roles: { label: string; value: string }[] = [
  { label: "All Roles", value: "" },
  { label: "Customers", value: "CUSTOMER" },
  { label: "Delivery Agents", value: "DELIVERY_AGENT" },
  { label: "Admins", value: "ADMIN" },
];

export default function AdminUsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const role = searchParams.get("role") || "";

  const { data, isLoading, isError, refetch } =
    useAdminUsers(page, 10, role || undefined);

  const users = data?.users ?? [];
  const meta = data?.meta;

  const updateURL = (newPage: number, newRole: string) => {
    const params = new URLSearchParams();

    if (newPage > 1) {
      params.set("page", String(newPage));
    }

    if (newRole) {
      params.set("role", newRole);
    }

    const query = params.toString();

    router.push(
      query ? `/admin/users?${query}` : "/admin/users"
    );
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Manage Users</h1>
        </div>
        <p className="mt-1 text-muted-foreground">
          View and filter registered platform users.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Filter by Role</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {roles.map((item) => (
              <Button
                key={item.value || "all"}
                variant={role === item.value ? "default" : "outline"}
                size="sm"
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
              className="h-16 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : isError ? (
        <Card>
          <CardContent className="space-y-3 p-6">
            <p className="text-destructive">
              Failed to load users.
            </p>
            <Button onClick={() => void refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : users.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <h2 className="font-semibold">No users found</h2>
            <p className="text-sm text-muted-foreground">
              No users match this role filter.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Users ({meta?.total ?? users.length})
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="p-3">ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b last:border-0">
                        <td className="p-3">{user.id}</td>
                        <td className="p-3 font-medium">{user.name}</td>
                        <td className="p-3">{user.email}</td>
                        <td className="p-3">
                          {user.phone || "Not provided"}
                        </td>
                        <td className="p-3">
                          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                            {user.role.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                onClick={() => updateURL(page - 1, role)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={page >= (meta?.totalPages ?? 1)}
                onClick={() => updateURL(page + 1, role)}
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
