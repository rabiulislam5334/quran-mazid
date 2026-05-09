"use client";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { clsx } from "clsx";

export interface LastRead {
  surahId: number;
  surahName: string;
  verse?: number;
}

interface CollectionProps {
  lastReads: LastRead[];
}

const TABS = ["Last Reads", "Bookmark", "Pin"];

export function Collection({ lastReads }: CollectionProps) {
  if (lastReads.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <h2 className="text-3xl font-extrabold text-[#1a2e1a]">Collection</h2>
        
        <div className="flex bg-[#f3f6f2] p-1.5 rounded-full border border-[#d4e4d0]">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={clsx(
                "px-6 py-2 text-sm md:text-base rounded-full transition-all",
                i === 0
                  ? "bg-white text-[#2d6a2d] shadow-sm font-bold"
                  : "text-[#5a7a5a] hover:text-[#2d6a2d]"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {lastReads.map((lr, i) => (
          <Link
            key={i}
            href={`/surah/${lr.surahId}`}
            className="flex-shrink-0 flex flex-col items-center gap-3 p-6 bg-white border border-[#e2ede0] rounded-[2rem] w-40 md:w-48 hover:border-[#2d6a2d] hover:shadow-xl transition-all group"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#f0f5ef] border border-[#d4e4d0] flex items-center justify-center group-hover:bg-[#2d6a2d] transition-colors">
              <BookOpen size={28} className="text-[#2d6a2d] group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-[#1a2e1a] group-hover:text-[#2d6a2d]">
                {lr.surahName}
              </span>
              <span className="text-sm text-[#5a7a5a] mt-1 block">
                Ayah - {lr.verse ?? "01"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}