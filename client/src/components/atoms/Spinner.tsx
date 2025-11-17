"use client";

import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  size?: number;
};

export function Spinner({ className, size = 20 }: SpinnerProps) {
  return (
    <span
      className={cn("inline-block animate-spin rounded-full border-2 border-white/30", className)}
      style={{
        width: size,
        height: size,
        borderTopColor: "var(--color-primary)",
      }}
    />
  );
}
