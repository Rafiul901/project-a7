import type { User } from "@/types/auth.types";
import type { Parcel } from "@/types/parcel.types";
import type { PaginationMeta } from "@/types/api.types";

export interface AdminUsersResponse {
  users: User[];
  meta: PaginationMeta;
}

export interface AdminParcelsResponse {
  parcels: Parcel[];
  meta: PaginationMeta;
}

export interface AuditLog {
  id: number;
  userId: number | null;
  action: string;
  entity: string;
  entityId: number | null;
  details: string | null;
  createdAt: string;
}

export interface AdminAuditLogsResponse {
  logs: AuditLog[];
  meta: PaginationMeta;
}