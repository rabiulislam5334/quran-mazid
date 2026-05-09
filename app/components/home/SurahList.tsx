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
    
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
      
      {/* Header Section: Title and Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2e1a] tracking-tight">
          Quran Mazid
        </h2>
        
        <div className="flex bg-[#f3f6f2] p-1.5 rounded-full border border-[#d4e4d0]">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={clsx(
                "px-6 py-2 text-sm md:text-base rounded-full transition-all duration-200",
                i === 0
                  ? "bg-white text-[#2d6a2d] shadow-sm font-semibold"
                  : "text-[#5a7a5a] hover:text-[#2d6a2d]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-24 bg-[#e8f0e4] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Grid Layout: Responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayed.map((s) => (
              <Link
                key={s.id}
                href={`/surah/${s.id}`}
                className="flex items-center gap-4 p-4 bg-white border border-[#e2ede0] rounded-2xl hover:border-[#2d6a2d] hover:shadow-md transition-all group"
              >
                {/* ID Container */}
                <div className="w-12 h-12 rounded-xl bg-[#f0f5ef] border border-[#d4e4d0] flex items-center justify-center text-[#2d6a2d] font-bold text-lg flex-shrink-0 group-hover:bg-[#2d6a2d] group-hover:text-white transition-colors">
                  {s.id}
                </div>

                {/* Name and Translation */}
                <div className="flex-1 min-w-0">
                  <div className="text-base md:text-lg font-bold text-[#1a2e1a] truncate group-hover:text-[#2d6a2d]">
                    {s.transliteration}
                  </div>
                  <div className="text-xs md:text-sm text-[#5a7a5a] truncate uppercase tracking-wide">
                    {s.translation}
                  </div>
                </div>

                {/* Arabic Name */}
                <div
                  dir="rtl"
                  className="text-xl md:text-2xl text-[#1a2e1a] font-medium group-hover:text-[#2d6a2d] transition-colors pl-2"
                  style={{ fontFamily: "'Scheherazade New', serif" }}
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
                className="flex items-center gap-2 px-8 py-3 bg-white border border-[#d4e4d0] rounded-full text-base font-semibold text-[#3a5a3a] hover:bg-[#2d6a2d] hover:text-white hover:border-[#2d6a2d] transition-all shadow-sm"
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