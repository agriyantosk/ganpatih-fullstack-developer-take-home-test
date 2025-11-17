"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

type AuthOptions = {
  requireAuth?: boolean;
  redirectIfAuthenticated?: boolean;
};

export function useAuth(options: AuthOptions = {}) {
  const { requireAuth = false, redirectIfAuthenticated = false } = options;
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const initializeFromRefresh = useAuthStore((state) => state.initializeFromRefresh);

  useEffect(() => {
    initializeFromRefresh();
  }, [initializeFromRefresh]);

  useEffect(() => {
    if (isInitializing) return;

    if (requireAuth && !accessToken) {
      router.replace("/");
    } else if (redirectIfAuthenticated && accessToken && pathname === "/") {
      router.replace("/feed");
    }
  }, [accessToken, requireAuth, redirectIfAuthenticated, router, pathname, isInitializing]);

  return {
    user,
    accessToken,
    isLoading: isInitializing,
    isAuthenticated: Boolean(accessToken),
  };
}
