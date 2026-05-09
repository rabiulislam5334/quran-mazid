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
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h2 
          className="text-3xl md:text-4xl font-extrabold tracking-tight" 
          style={{ color: "var(--text-primary)" }}
        >
          Quran Mazid
        </h2>
        
        <div 
          className="flex p-1.5 rounded-full border" 
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          {TABS.map((t, i) => (
            <button
              key={t}
              className={clsx(
                "px-6 py-2 text-sm md:text-base rounded-full transition-all duration-200",
                i === 0 ? "shadow-sm font-semibold" : "hover:opacity-80"
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
                className="group flex items-center gap-6 p-4 border rounded-2xl transition-all duration-300"
                style={{ 
                  background: "var(--bg-primary)", 
                  borderColor: "var(--border)" 
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
              >
                {/* Diamond Shape - Improved Hover */}
                <div className="relative flex-shrink-0 w-11 h-11 flex items-center justify-center">
                  <div 
                    className="absolute inset-0 rotate-45 border-2 rounded-sm transition-all duration-300 
                               group-hover:bg-green-600 group-hover:border-green-600"
                    style={{ 
                      borderColor: "rgba(45, 106, 45, 0.3)",
                      background: "var(--bg-secondary)"
                    }}
                  />
                  <span 
                    className="relative z-10 font-bold text-base transition-all duration-300 
                               group-hover:text-white"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.id}
                  </span>
                </div>

                {/* Surah Info */}
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-base font-bold truncate group-hover:text-[var(--green)] transition-colors" 
                    style={{ color: "var(--text-primary)" }}
                  >
                    {s.transliteration}
                  </div>
                  <div 
                    className="text-[10px] md:text-xs truncate uppercase tracking-widest opacity-70" 
                    style={{ color: "var(--text-muted)" }}
                  >
                    {s.translation}
                  </div>
                </div>

                {/* Arabic Name */}
                <div
                  dir="rtl"
                  className="text-lg md:text-xl font-medium pl-2"
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

          {/* Show More Button */}
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