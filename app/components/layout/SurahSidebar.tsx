"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { Surah } from "@/app/types";

interface SurahSidebarProps {
  surahId: number;
  allSurahs: Surah[];
  mobileSidebar: boolean;
  setMobileSidebar: (v: boolean) => void;
  sidebarTab: "surah" | "juz" | "page";
  setSidebarTab: (t: "surah" | "juz" | "page") => void;
  surahFilter: string;
  setSurahFilter: (v: string) => void;
}

export function SurahSidebar({
  surahId,
  allSurahs,
  mobileSidebar,
  setMobileSidebar,
  sidebarTab,
  setSidebarTab,
  surahFilter,
  setSurahFilter,
}: SurahSidebarProps) {
  const filteredSurahs = surahFilter
    ? allSurahs.filter(
        (s) =>
          s.transliteration.toLowerCase().includes(surahFilter.toLowerCase()) ||
          s.translation.toLowerCase().includes(surahFilter.toLowerCase()) ||
          String(s.id).includes(surahFilter)
      )
    : allSurahs;

  return (
    <>
      {/* Mobile overlay */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileSidebar(false)}
        />
      )}

      <aside
        className="flex flex-col w-[240px] flex-shrink-0 z-40 fixed md:relative top-0 left-0 h-full transition-transform duration-300"
        style={{
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
          transform: mobileSidebar ? "translateX(0)" : undefined,
        }}
      >
        <style>{`
          @media (max-width: 767px) {
            aside.surah-aside {
              transform: ${mobileSidebar ? "translateX(0)" : "translateX(-100%)"};
            }
          }
        `}</style>

        {/* Tabs */}
        <div
          className="flex border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          {(["surah", "juz", "page"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSidebarTab(tab)}
              className="flex-1 py-3 text-xs font-semibold capitalize transition"
              style={{
                color: sidebarTab === tab ? "var(--gold)" : "var(--text-muted)",
                borderBottom:
                  sidebarTab === tab
                    ? "2px solid var(--gold)"
                    : "2px solid transparent",
                fontSize: "13px",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div
          className="px-3 py-2.5 border-b flex-shrink-0"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border)",
            }}
          >
            <Search size={13} style={{ color: "var(--text-muted)" }} />
            <input
              value={surahFilter}
              onChange={(e) => setSurahFilter(e.target.value)}
              placeholder="Search Surah"
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: "var(--text-primary)", fontSize: "13px" }}
            />
          </div>
        </div>

        {/* Surah list */}
        {sidebarTab === "surah" && (
          <div
            className="flex-1 overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
          >
            {filteredSurahs.map((s) => {
              const active = s.id === surahId;
              return (
                <Link
                  key={s.id}
                  href={`/surah/${s.id}`}
                  onClick={() => setMobileSidebar(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 border-b transition"
                  style={{
                    borderColor: "rgba(128,128,128,0.15)",
                    background: active ? "var(--green-bg)" : "",
                    borderLeft: active
                      ? "3px solid var(--green)"
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.background =
                        "var(--bg-hover)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.background = "";
                  }}
                >
                  {/* Diamond shape surah number — ছবির মতো */}
                  <div
                    className="flex-shrink-0 relative flex items-center justify-center"
                    style={{ width: "32px", height: "32px" }}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      width="32"
                      height="32"
                      className="absolute inset-0"
                    >
                      <rect
                        x="4"
                        y="4"
                        width="24"
                        height="24"
                        rx="6"
                        transform="rotate(45 16 16)"
                        fill={active ? "var(--green)" : "var(--bg-tertiary)"}
                      />
                    </svg>
                    <span
                      className="relative z-10 font-bold"
                      style={{
                        color: active ? "#fff" : "var(--text-muted)",
                        fontSize: "11px",
                        lineHeight: 1,
                      }}
                    >
                      {s.id}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className="font-semibold truncate"
                      style={{
                        color: active ? "var(--green-active)" : "var(--text-primary)",
                        fontSize: "14px",
                      }}
                    >
                      {s.transliteration}
                    </div>
                    <div
                      className="truncate"
                      style={{ color: "var(--text-muted)", fontSize: "12px" }}
                    >
                      {s.translation}
                    </div>
                  </div>

                  <span
                    dir="rtl"
                    className="flex-shrink-0"
                    style={{
                      fontFamily: "'Scheherazade New',serif",
                      color: active ? "var(--green-active)" : "var(--text-secondary)",
                      lineHeight: 2,
                      fontSize: "15px",
                    }}
                  >
                    {s.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {sidebarTab !== "surah" && (
          <div
            className="flex-1 flex items-center justify-center"
            style={{ color: "var(--text-muted)" }}
          >
            <p style={{ fontSize: "13px" }}>
              {sidebarTab === "juz" ? "Juz" : "Page"} view coming soon
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
