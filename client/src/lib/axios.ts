"use client";

import axios, { AxiosHeaders } from "axios";
import toast from "react-hot-toast";
import { getRefreshToken, clearRefreshToken } from "@/lib/auth";
import { useAuthStore } from "@/store/auth.store";
import { AuthTokens } from "@/lib/types";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

let refreshPromise: Promise<string | null> | null = null;

async function requestNewAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  try {
    const response = await axios.post<{ data: AuthTokens }>(`${API_BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const tokens = response.data.data;
    const { setAccessTokenFromJWT } = useAuthStore.getState();
    setAccessTokenFromJWT(tokens.token);
    return tokens.token;
  } catch {
    toast.error("Session expired. Please log in again.");
    useAuthStore.getState().logout();
    clearRefreshToken();
    return null;
  }
}

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else if (config.headers) {
      (config.headers as Record<string, unknown>)["Authorization"] = `Bearer ${token}`;
    } else {
      config.headers = AxiosHeaders.from({
        Authorization: `Bearer ${token}`,
      });
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = requestNewAccessToken();
      }

      const newToken = await refreshPromise;
      refreshPromise = null;

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
