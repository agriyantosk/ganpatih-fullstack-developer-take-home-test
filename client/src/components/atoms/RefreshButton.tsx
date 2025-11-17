"use client";

import { RefreshCw } from "lucide-react";

type RefreshButtonProps = {
  onRefresh: () => Promise<void> | void;
};

export function RefreshButton({ onRefresh }: RefreshButtonProps) {
  return (
    <button
      type="button"
      onClick={onRefresh}
      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-foreground)] hover:bg-white/5 cursor-pointer"
    >
      <RefreshCw className="h-4 w-4" />
      Refresh
    </button>
  );
}
