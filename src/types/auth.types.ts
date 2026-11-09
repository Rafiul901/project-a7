export type UserRole = "CUSTOMER" | "DELIVERY_AGENT" | "ADMIN";

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}