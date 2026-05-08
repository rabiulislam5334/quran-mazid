"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Search, Settings, Home, Headphones, Moon, Info, Bookmark } from "lucide-react";
import { clsx } from "clsx";

interface IconSidebarProps {
  onSearchClick: () => void;
  onSettingsClick: () => void;
}

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: BookOpen, label: "Quran", href: "/surah/1" },
  { icon: Headphones, label: "Audio", href: "/surah/1" },
  { icon: Bookmark, label: "Bookmarks", href: "/" },
];

export function IconSidebar({ onSearchClick, onSettingsClick }: IconSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-full w-14 flex-col items-center bg-bg-secondary border-r border-border py-4 gap-1 hidden md:flex">
      {/* Logo */}
      <div className="mb-4 flex flex-col items-center">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg">
          <span className="text-bg-primary font-bold text-sm select-none">ق</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-1 w-full px-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith("/surah");
          return (
            <Link
              key={label}
              href={href}
              title={label}
              className={clsx(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 group relative",
                isActive && label === "Quran"
                  ? "bg-gold/20 text-gold"
                  : "text-text-muted hover:text-text-secondary hover:bg-bg-hover"
              )}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="absolute left-full ml-2 px-2 py-1 bg-bg-tertiary text-text-primary text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-border">
                {label}
              </span>
            </Link>
          );
        })}

        <div className="w-8 h-px bg-border my-1" />

        <button
          onClick={onSearchClick}
          title="Search"
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 text-text-muted hover:text-text-secondary hover:bg-bg-hover group relative"
        >
          <Search size={18} strokeWidth={1.5} />
          <span className="absolute left-full ml-2 px-2 py-1 bg-bg-tertiary text-text-primary text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-border">
            Search
          </span>
        </button>

        <button
          onClick={onSettingsClick}
          title="Font Settings"
          className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 text-text-muted hover:text-text-secondary hover:bg-bg-hover group relative"
        >
          <Settings size={18} strokeWidth={1.5} />
          <span className="absolute left-full ml-2 px-2 py-1 bg-bg-tertiary text-text-primary text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-border">
            Font Settings
          </span>
        </button>
      </div>

      <div className="flex flex-col items-center gap-1 w-full px-1">
        <button title="Dark Mode" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all text-gold hover:bg-bg-hover">
          <Moon size={18} />
        </button>
        <button title="About" className="w-10 h-10 rounded-lg flex items-center justify-center transition-all text-text-muted hover:text-text-secondary hover:bg-bg-hover">
          <Info size={16} />
        </button>
      </div>
    </aside>
  );
}
