import axiosInstance from "@/lib/axios";

const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

export const getAllUsers = async (
  token: string,
  page = 1,
  limit = 10,
  role?: string
) => {
  const response = await axiosInstance.get("/admin/users", {
    headers: authHeaders(token),
    params: { page, limit, role },
  });

  return response.data;
};

export const getAllParcels = async (
  token: string,
  page = 1,
  limit = 10,
  status?: string
) => {
  const response = await axiosInstance.get("/admin/parcels", {
    headers: authHeaders(token),
    params: { page, limit, status },
  });

  return response.data;
};

export const getAuditLogs = async (
  token: string,
  page = 1,
  limit = 10,
  action?: string,
  entity?: string
) => {
  const response = await axiosInstance.get("/admin/audit-logs", {
    headers: authHeaders(token),
    params: { page, limit, action, entity },
  });

  return response.data;
};