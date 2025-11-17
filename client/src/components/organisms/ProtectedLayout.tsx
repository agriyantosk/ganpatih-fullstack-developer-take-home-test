"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/components/atoms/Spinner";

type ProtectedLayoutProps = {
  children: ReactNode;
};

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { isLoading } = useAuth({ requireAuth: true });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size={32} />
      </div>
    );
  }

  return <div className="min-h-screen bg-[var(--color-background)]">{children}</div>;
}
