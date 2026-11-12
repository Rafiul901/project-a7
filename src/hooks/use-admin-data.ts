"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getAllParcels,
  getAllUsers,
  getAuditLogs,
} from "@/services/admin.service";

import { useAuthStore } from "@/store/auth.store";

export function useAdminUsers(
  page = 1,
  limit = 10,
  role?: string
) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["admin-users", page, limit, role],
    queryFn: () =>
      getAllUsers(accessToken!, page, limit, role),
    enabled: !!accessToken,
  });
}

export function useAdminParcels(
  page = 1,
  limit = 10,
  status?: string
) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["admin-parcels", page, limit, status],
    queryFn: () =>
      getAllParcels(accessToken!, page, limit, status),
    enabled: !!accessToken,
  });
}

export function useAuditLogs(
  page = 1,
  limit = 10,
  action?: string,
  entity?: string
) {
  const accessToken = useAuthStore(
    (state) => state.accessToken
  );

  return useQuery({
    queryKey: ["admin-audit-logs", page, limit, action, entity],
    queryFn: () =>
      getAuditLogs(
        accessToken!,
        page,
        limit,
        action,
        entity
      ),
    enabled: !!accessToken,
  });
}