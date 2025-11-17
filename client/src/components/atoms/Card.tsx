"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/5 bg-[var(--color-muted)]/70 p-6 backdrop-blur-sm shadow-lg",
        className
      )}
      {...props}
    />
  );
}
