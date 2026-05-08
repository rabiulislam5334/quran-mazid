"use client";

import { Menu, Search, Settings } from "lucide-react";

interface MobileHeaderProps {
  title?: string;
  onMenuClick: () => void;
  onSearchClick: () => void;
  onSettingsClick: () => void;
}

export function MobileHeader({ title, onMenuClick, onSearchClick, onSettingsClick }: MobileHeaderProps) {
  return (
    <header className="md:hidden sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-border">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-bg-hover transition">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
            <span className="text-bg-primary font-bold text-xs">ق</span>
          </div>
          <span className="text-sm font-semibold text-text-primary">{title || "QuranMazid"}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={onSearchClick} className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-bg-hover transition">
          <Search size={18} />
        </button>
        <button onClick={onSettingsClick} className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-bg-hover transition">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}
