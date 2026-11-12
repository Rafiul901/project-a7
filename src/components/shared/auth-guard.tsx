
"use client";

import { useEffect, useSyncExternalStore  } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import type { UserRole } from "@/types/auth.types";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const dashboardRoutes: Record<UserRole, string> = {
  CUSTOMER: "/customer/dashboard",
  DELIVERY_AGENT: "/agent/dashboard",
  ADMIN: "/admin/dashboard",
};

export default function AuthGuard({
  children,
  allowedRole,
}: AuthGuardProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

const hasHydrated = useSyncExternalStore(
  (onStoreChange) => {
    const unsubscribeHydrate =
      useAuthStore.persist.onHydrate(onStoreChange);

    const unsubscribeFinish =
      useAuthStore.persist.onFinishHydration(onStoreChange);

    return () => {
      unsubscribeHydrate();
      unsubscribeFinish();
    };
  },
  () => useAuthStore.persist.hasHydrated(),
  () => false
);
  useEffect(() => {
    if (!hasHydrated) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== allowedRole) {
      router.replace(dashboardRoutes[user.role]);
    }
  }, [hasHydrated, user, allowedRole, router]);

  if (!hasHydrated || !user || user.role !== allowedRole) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
}