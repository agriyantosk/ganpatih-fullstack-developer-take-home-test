"use client";

import { Button } from "@/components/atoms/Button";
import { APP_NAME } from "@/config/theme";
import { PenSquare, LogOut } from "lucide-react";

type NavbarProps = {
  onCreatePost: () => void;
  onLogout: () => void;
  isCreateDisabled?: boolean;
};

export function Navbar({ onCreatePost, onLogout, isCreateDisabled }: NavbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-white/5 px-6 py-4">
      <div>
        <p className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
          Ganapatih
        </p>
        <p className="text-lg font-semibold text-[var(--color-foreground)]">{APP_NAME}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCreatePost}
          disabled={isCreateDisabled}
          className="hidden sm:inline-flex"
        >
          <PenSquare className="h-4 w-4" />
          Create Post
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="text-red-400 hover:text-red-200"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
