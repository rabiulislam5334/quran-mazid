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
        className="surah-aside flex flex-col w-[300px] flex-shrink-0 z-40 fixed md:relative top-0 left-0 h-full transition-transform duration-300"
        style={{
          background: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <style>{`
          @media (max-width: 767px) {
            aside.surah-aside {
              transform: ${mobileSidebar ? "translateX(0)" : "translateX(-100%)"};
            }
          }
        `}</style>

        {/* ══ Tabs (Pill Style as per image) ══ */}
        <div className="px-4 pt-6 pb-2">
          <div 
            className="flex p-1 rounded-full" 
            style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}
          >
            {(["surah", "juz", "page"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSidebarTab(tab)}
                className="flex-1 py-2 text-xs font-bold capitalize transition-all rounded-full"
                style={{
                  color: sidebarTab === tab ? "#fff" : "var(--text-muted)",
                  background: sidebarTab === tab ? "var(--green)" : "transparent",
                  fontSize: "14px",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ══ Search Input ══ */}
        <div className="px-4 py-3">
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all"
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border)",
            }}
          >
            <Search size={18} style={{ color: "var(--text-muted)" }} />
            <input
              value={surahFilter}
              onChange={(e) => setSurahFilter(e.target.value)}
              placeholder="Search Surah"
              className="flex-1 bg-transparent outline-none font-medium"
              style={{ color: "var(--text-primary)", fontSize: "15px" }}
            />
          </div>
        </div>

        {/* ══ Surah List ══ */}
        {sidebarTab === "surah" && (
          <div
            className="flex-1 overflow-y-auto px-2 custom-scrollbar"
            style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
          >
            <div className="flex flex-col gap-1 pb-4">
              {filteredSurahs.map((s) => {
                const active = s.id === surahId;
                return (
                  <Link
                    key={s.id}
                    href={`/surah/${s.id}`}
                    onClick={() => setMobileSidebar(false)}
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200"
                    style={{
                      background: active ? "var(--green-bg)" : "transparent",
                      border: active ? "1px solid var(--green)" : "1px solid transparent",
                    }}
                  >
                    {/* Surah Number (Diamond-ish background) */}
                    <div
                      className="flex-shrink-0 relative flex items-center justify-center rotate-45 w-9 h-9 rounded-xl"
                      style={{ 
                        background: active ? "var(--green)" : "var(--bg-tertiary)",
                        boxShadow: active ? "0 4px 10px rgba(var(--green-rgb), 0.3)" : "none"
                      }}
                    >
                      <span
                        className="font-bold -rotate-45"
                        style={{
                          color: active ? "#fff" : "var(--text-muted)",
                          fontSize: "13px",
                        }}
                      >
                        {s.id}
                      </span>
                    </div>

                    {/* Surah Names */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-bold truncate"
                        style={{
                          color: "var(--text-primary)",
                          fontSize: "15px",
                        }}
                      >
                        {s.transliteration}
                      </div>
                      <div
                        className="truncate font-medium opacity-70"
                        style={{ color: "var(--text-muted)", fontSize: "12px" }}
                      >
                        {s.translation}
                      </div>
                    </div>

                    {/* Arabic Name */}
                    <span
                      dir="rtl"
                      className="flex-shrink-0 font-arabic"
                      style={{
                        color: active ? "var(--green)" : "var(--text-secondary)",
                        fontSize: "18px",
                      }}
                    >
                      {s.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Coming Soon state */}
        {sidebarTab !== "surah" && (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <p className="font-medium opacity-60" style={{ color: "var(--text-muted)", fontSize: "15px" }}>
              {sidebarTab.toUpperCase()} view is coming soon inshAllah.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}