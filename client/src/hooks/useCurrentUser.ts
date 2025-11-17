"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { api } from "@/lib/api";
import { AuthUser } from "@/lib/types";

export function useCurrentUser() {
  const storeUser = useAuthStore((state) => state.user);

  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => api.fetchCurrentUser(),
    enabled: Boolean(storeUser),
    staleTime: 1000 * 60 * 5,
  });

  const latestUser = (query.data as AuthUser | undefined) ?? storeUser;

  return {
    user: latestUser,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}
