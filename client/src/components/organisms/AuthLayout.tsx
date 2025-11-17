"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/atoms/Spinner";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const { isLoading } = useAuth({ redirectIfAuthenticated: true });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size={32} />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)] px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/5 to-transparent opacity-40" />
      {children}
    </div>
  );
}
