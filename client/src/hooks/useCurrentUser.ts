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
    enabled: !storeUser,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: storeUser ?? (query.data as AuthUser | undefined) ?? null,
    isLoading: storeUser ? false : query.isLoading,
    refetch: query.refetch,
  };
}
