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
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-[#1a2e1a]">Quran Mazid</h2>
        <div className="flex gap-1">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={clsx(
                "px-3 py-1 text-xs rounded-full border transition",
                i === 0
                  ? "bg-white border-[#2d6a2d] text-[#2d6a2d] font-medium"
                  : "border-[#d4e4d0] text-[#5a7a5a] hover:bg-white"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-14 bg-[#e8f0e4] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {displayed.map((s) => (
              <Link
                key={s.id}
                href={`/surah/${s.id}`}
                className="flex items-center gap-3 px-3 py-2.5 bg-white border border-[#d4e4d0] rounded-xl hover:border-[#2d6a2d]/50 hover:shadow-sm transition group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#e8f0e4] border border-[#c8dcc4] flex items-center justify-center text-[#2d6a2d] font-bold text-xs flex-shrink-0">
                  {s.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-[#1a2e1a] truncate">{s.transliteration}</div>
                  <div className="text-[10px] text-[#5a7a5a] truncate">{s.translation}</div>
                </div>
                <span
                  dir="rtl"
                  className="text-sm text-[#3a5a3a] group-hover:text-[#2d6a2d] transition"
                  style={{ fontFamily: "'Scheherazade New',serif", lineHeight: 2 }}
                >
                  {s.name}
                </span>
              </Link>
            ))}
          </div>

          {!showAll && surahs.length > 20 && (
            <div className="flex justify-center mt-5">
              <button
                onClick={() => setShowAll(true)}
                className="flex items-center gap-2 px-5 py-2 bg-white border border-[#d4e4d0] rounded-full text-sm text-[#3a5a3a] hover:bg-[#e8f0e4] hover:border-[#2d6a2d]/50 transition shadow-sm"
              >
                Show More <ChevronDown size={14} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
