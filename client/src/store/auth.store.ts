"use client";

import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { AuthTokens, AuthUser } from "@/lib/types";
import {
  clearRefreshToken,
  getRefreshToken,
  setRefreshToken,
} from "@/lib/auth";
import { api } from "@/lib/api";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isInitializing: boolean;
  setAccessTokenFromJWT: (token: string | null) => void;
  authenticate: (tokens: AuthTokens) => void;
  logout: () => void;
  initializeFromRefresh: () => Promise<void>;
};

function decodeUser(token: string | null, fallback?: AuthUser | null): AuthUser | null {
  if (!token) return fallback ?? null;
  try {
    const payload = jwtDecode<{ id?: string | number; username?: string }>(token);
    return {
      id: String(payload.id ?? fallback?.id ?? ""),
      username: payload.username ?? fallback?.username ?? "",
    };
  } catch (error) {
    console.error("Failed to decode token", error);
    return fallback ?? null;
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isInitializing: true,
  setAccessTokenFromJWT: (token) => {
    set({
      accessToken: token,
      user: decodeUser(token, get().user),
    });
  },
  authenticate: (tokens) => {
    set({
      accessToken: tokens.token,
      user: decodeUser(tokens.token),
    });
    setRefreshToken(tokens.refreshToken);
  },
  logout: () => {
    set({
      accessToken: null,
      user: null,
    });
    clearRefreshToken();
  },
  initializeFromRefresh: async () => {
    if (get().accessToken) {
      set({ isInitializing: false });
      return;
    }

    const storedRefresh = getRefreshToken();
    if (!storedRefresh) {
      set({ isInitializing: false });
      return;
    }

    try {
      const tokens = await api.refreshSession(storedRefresh);
      const nextUser = decodeUser(tokens.token);
      set({
        accessToken: tokens.token,
        user: nextUser,
        isInitializing: false,
      });
      setRefreshToken(tokens.refreshToken ?? storedRefresh);
    } catch {
      toast.error("Session expired. Please log in again.");
      clearRefreshToken();
      set({
        accessToken: null,
        user: null,
        isInitializing: false,
      });
    }
  },
}));
