"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { Surah } from "@/app/types";

interface SurahListProps {
  surahs: Surah[];
  loading: boolean;
}

const TABS = ["Surah", "Juz", "Page"];

export function SurahList({ surahs, loading }: SurahListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? surahs : surahs.slice(0, 20);

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Quran Mazid
        </h2>
        
        {/* Tabs Container */}
        <div className="flex p-1.5 rounded-full border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              className={clsx(
                "px-6 py-2 text-sm md:text-base rounded-full transition-all duration-200",
                i === 0
                  ? "shadow-sm font-semibold"
                  : "hover:opacity-80"
              )}
              style={{
                background: i === 0 ? "var(--bg-primary)" : "transparent",
                color: i === 0 ? "var(--green)" : "var(--text-muted)"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: "var(--bg-secondary)" }} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((s) => (
              <Link
                key={s.id}
                href={`/surah/${s.id}`}
                className="flex items-center gap-4 p-4 border rounded-2xl transition-all group"
                style={{ 
                   background: "var(--bg-primary)", 
                   borderColor: "var(--border)" 
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                {/* ID Container */}
                <div 
                  className="w-12 h-12 rounded-xl border flex items-center justify-center font-bold text-lg flex-shrink-0 transition-colors group-hover:text-white"
                  style={{ 
                    background: "var(--bg-secondary)", 
                    borderColor: "var(--border)",
                    color: "var(--green)"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--green)"}
                >
                  {s.id}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-base md:text-lg font-bold truncate group-hover:text-[#2d6a2d]" style={{ color: "var(--text-primary)" }}>
                    {s.transliteration}
                  </div>
                  <div className="text-xs md:text-sm truncate uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
                    {s.translation}
                  </div>
                </div>

                <div
                  dir="rtl"
                  className="text-xl md:text-2xl font-medium transition-colors pl-2"
                  style={{ 
                    fontFamily: "'Scheherazade New', serif",
                    color: "var(--text-primary)"
                  }}
                >
                  {s.name}
                </div>
              </Link>
            ))}
          </div>

          {!showAll && surahs.length > 20 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center gap-2 px-8 py-3 border rounded-full text-base font-semibold transition-all shadow-sm"
                style={{ 
                  background: "var(--bg-primary)", 
                  borderColor: "var(--border)", 
                  color: "var(--text-secondary)" 
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--green)";
                    e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--bg-primary)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                Show More <ChevronDown size={20} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}