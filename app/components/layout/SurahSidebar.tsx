"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { Surah } from "@/app/types";


interface SurahSidebarProps {
  surahs: Surah[];
  isOpen: boolean;
  onClose: () => void;
}

export function SurahSidebar({ surahs, isOpen, onClose }: SurahSidebarProps) {
  const pathname = usePathname();
  const [filter, setFilter] = useState("");
  const activeSurahId = pathname.match(/\/surah\/(\d+)/)?.[1];

  const filtered = filter
    ? surahs.filter(
        (s) =>
          s.transliteration.toLowerCase().includes(filter.toLowerCase()) ||
          s.translation.toLowerCase().includes(filter.toLowerCase()) ||
          String(s.id).includes(filter)
      )
    : surahs;

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30 sidebar-overlay md:hidden" onClick={onClose} />}

      <aside className={clsx(
        "fixed top-0 z-40 h-full w-72 bg-bg-secondary border-r border-border flex flex-col transition-transform duration-300",
        "md:left-14",
        isOpen ? "left-0 translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold text-text-primary">Surah List</h2>
            <p className="text-xs text-text-muted">114 Surahs</p>
          </div>
          <button onClick={onClose} className="md:hidden w-7 h-7 flex items-center justify-center rounded text-text-muted hover:text-text-primary hover:bg-bg-hover transition">
            <X size={16} />
          </button>
        </div>

        <div className="px-3 py-2 border-b border-border">
          <input
            type="text"
            placeholder="Search Surah..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full bg-bg-primary border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-gold/50 transition"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((surah) => {
            const isActive = String(surah.id) === activeSurahId;
            return (
              <Link
                key={surah.id}
                href={`/surah/${surah.id}`}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 border-b border-border/40 transition-all duration-150 group",
                  isActive ? "bg-gold/10 border-l-2 border-l-gold" : "hover:bg-bg-hover"
                )}
              >
                <div className={clsx(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors",
                  isActive ? "bg-gold text-bg-primary" : "bg-bg-tertiary text-text-muted group-hover:text-gold group-hover:bg-gold/10"
                )}>
                  {surah.id}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={clsx("text-sm font-medium truncate", isActive ? "text-gold" : "text-text-primary")}>
                      {surah.transliteration}
                    </span>
                    <span className="text-xs text-text-muted ml-1">{surah.total_verses}v</span>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-xs text-text-muted truncate">{surah.translation}</span>
                    <span className={clsx(
                      "text-xs px-1.5 py-0.5 rounded ml-1 flex-shrink-0",
                      surah.type === "meccan" ? "bg-amber-900/30 text-amber-400" : "bg-blue-900/30 text-blue-400"
                    )}>
                      {surah.type === "meccan" ? "Mak" : "Mad"}
                    </span>
                  </div>
                </div>

                <span className="text-base text-right flex-shrink-0" style={{
                  fontFamily: "'Scheherazade New', serif",
                  color: isActive ? "var(--gold-light)" : "var(--text-secondary)",
                  direction: "rtl",
                  lineHeight: 1.5,
                }}>
                  {surah.name}
                </span>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <p className="text-sm">No surahs found</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
