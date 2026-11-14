"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  loginUser,
  registerUser,
} from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import type {
  LoginPayload,
  RegisterPayload,
} from "@/types/auth.types";

export function useAuth() {
  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),

    onSuccess: (data) => {
      setAuth(data.user, data.accessToken);
      
      // Set role cookie for Next.js routing/middleware access
      document.cookie = `courier-role=${data.user.role}; path=/; max-age=86400; samesite=lax`;
      
      toast.success("Login successful!");

      const dashboardRoutes = {
        CUSTOMER: "/customer/dashboard",
        DELIVERY_AGENT: "/agent/dashboard",
        ADMIN: "/admin/dashboard",
      };

      router.push(dashboardRoutes[data.user.role]);
    },

    onError: () => {
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),

    onSuccess: () => {
      toast.success("Registration successful! Please log in.");
      router.push("/login");
    },

    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });

  const logout = () => {
    logoutStore();
    
    // Clear the role cookie on logout
    document.cookie = "courier-role=; path=/; max-age=0; samesite=lax";
    
    toast.success("Logged out successfully.");
    router.push("/login");
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
  };
}