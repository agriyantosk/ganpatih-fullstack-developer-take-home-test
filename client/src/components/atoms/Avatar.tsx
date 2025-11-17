"use client";

import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

export function Avatar({ label = "GN", className, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-[var(--color-foreground)]",
        className
      )}
      {...props}
    >
      {label.slice(0, 2).toUpperCase()}
    </div>
  );
}
