
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useAdminAuditLogs } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AdminAuditLogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const action = searchParams.get("action") || "";
  const entity = searchParams.get("entity") || "";

  const [actionInput, setActionInput] = useState(action);
  const [entityInput, setEntityInput] = useState(entity);

  const { data, isLoading, isError, refetch } = useAdminAuditLogs(
    page,
    10,
    action || undefined,
    entity || undefined
  );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (actionInput.trim()) {
      params.set("action", actionInput.trim());
    }

    if (entityInput.trim()) {
      params.set("entity", entityInput.trim());
    }

    router.push(`/admin/audit-logs?${params.toString()}`);
  };

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`/admin/audit-logs?${params.toString()}`);
  };

  if (isLoading) {
    return <div className="p-6">Loading audit logs...</div>;
  }

  if (isError) {
    return (
      <div className="space-y-4 p-6">
        <p>Failed to load audit logs.</p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  const logs = data?.logs ?? [];
  const meta = data?.meta;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground">
          Review recorded activities across the platform.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Filter by action"
          value={actionInput}
          onChange={(event) => setActionInput(event.target.value)}
        />

        <Input
          placeholder="Filter by entity"
          value={entityInput}
          onChange={(event) => setEntityInput(event.target.value)}
        />

        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>

      {logs.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="font-semibold">No audit logs found</h2>
          <p className="text-sm text-muted-foreground">
            Try changing or clearing your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">User ID</th>
                  <th className="p-3 text-left">Action</th>
                  <th className="p-3 text-left">Entity</th>
                  <th className="p-3 text-left">Entity ID</th>
                  <th className="p-3 text-left">Details</th>
                  <th className="p-3 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-t">
                    <td className="p-3">{log.id}</td>
                    <td className="p-3">{log.userId ?? "System"}</td>
                    <td className="p-3">{log.action}</td>
                    <td className="p-3">{log.entity}</td>
                    <td className="p-3">{log.entityId ?? "—"}</td>
                    <td className="max-w-xs p-3">
                      <span className="break-words">
                        {log.details ?? "—"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap p-3">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {meta?.page ?? page} of {meta?.totalPages ?? 1}
              {" · "}
              {meta?.total ?? logs.length} records
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={!meta || meta.page <= 1}
                onClick={() => changePage(page - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                disabled={!meta || meta.page >= meta.totalPages}
                onClick={() => changePage(page + 1)}
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
