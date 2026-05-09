"use client";

import Link from "next/link";
import { Search, Command } from "lucide-react"; 
import { Surah } from "@/app/types";

interface SurahSidebarProps {
  surahId: number;
  allSurahs: Surah[];
  mobileSidebar: boolean;
  setMobileSidebar: (v: boolean) => void;
  sidebarTab: "surah" | "juz" | "page";
  setSidebarTab: (t: "surah" | "juz" | "page") => void;
  onGlobalSearchClick: () => void; 
}

export function SurahSidebar({
  surahId,
  allSurahs,
  mobileSidebar,
  setMobileSidebar,
  sidebarTab,
  setSidebarTab,
  onGlobalSearchClick,
}: SurahSidebarProps) {
  
  return (
    <>
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

        {/* ══ Tabs ══ */}
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
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ══ Global Search Trigger (শুধুমাত্র এই সার্চটি রাখা হয়েছে) ══ */}
        <div className="px-4 py-3">
          <button
            onClick={onGlobalSearchClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-[var(--border)] hover:border-[var(--green)] transition-all group"
            style={{ background: "var(--bg-primary)" }}
          >
            <Search size={18} className="text-[var(--green)]" />
            <span className="text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
              Search Ayah...
            </span>
            <div className="ml-auto flex items-center gap-1 opacity-40 group-hover:opacity-100">
               <Command size={10} />
               <span className="text-[10px] font-bold">K</span>
            </div>
          </button>
        </div>

        {/* ══ Surah List ══ */}
        {sidebarTab === "surah" && (
          <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
            <div className="flex flex-col gap-1 pb-4">
              {allSurahs.length > 0 ? (
                allSurahs.map((s) => {
                  const active = s.id === surahId;
                  return (
                    <Link
                      key={s.id}
                      href={`/surah/${s.id}`}
                      onClick={() => setMobileSidebar(false)}
                      className="flex items-center gap-4 px-4 py-3 rounded-2xl transition-all border border-transparent"
                      style={{
                        background: active ? "var(--green-bg)" : "transparent",
                        border: active ? "1px solid var(--green)" : "none",
                      }}
                    >
                      <div
                        className="flex-shrink-0 flex items-center justify-center rotate-45 w-8 h-8 rounded-lg"
                        style={{ background: active ? "var(--green)" : "var(--bg-tertiary)" }}
                      >
                        <span className="font-bold -rotate-45 text-[11px]" style={{ color: active ? "#fff" : "var(--text-muted)" }}>
                          {s.id}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate text-[14px]" style={{ color: "var(--text-primary)" }}>{s.transliteration}</div>
                        <div className="truncate text-[11px] opacity-70" style={{ color: "var(--text-muted)" }}>{s.translation || (s as any).name_translation}</div>
                      </div>
                      <span dir="rtl" className="font-arabic text-[16px]" style={{ color: active ? "var(--green)" : "var(--text-secondary)" }}>{s.name}</span>
                    </Link>
                  );
                })
              ) : (
                <div className="p-8 text-center text-sm opacity-50">No Surahs found.</div>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}