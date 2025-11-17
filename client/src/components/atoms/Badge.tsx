"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-foreground)]",
        className
      )}
      {...props}
    />
  );
}
