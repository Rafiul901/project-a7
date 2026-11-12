import axiosInstance from "@/lib/axios";
import { extractData } from "@/lib/api-response";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  User,
} from "@/types/auth.types";

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post(
    "/auth/login",
    payload
  );

  return extractData<LoginResponse>(response.data);
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<User> => {
  const response = await axiosInstance.post<User>(
    "/auth/register",
    payload
  );

  return response.data;
};

export const getCurrentUser = async (
  token: string
): Promise<User> => {
  const response = await axiosInstance.get<User>("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};