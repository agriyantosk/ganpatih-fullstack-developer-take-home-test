"use client";

import { REFRESH_TOKEN_KEY } from "@/config/theme";

const WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setRefreshToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
  document.cookie = `${REFRESH_TOKEN_KEY}=${token}; path=/; max-age=${WEEK_IN_SECONDS}; SameSite=Lax`;
}

export function clearRefreshToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
}
