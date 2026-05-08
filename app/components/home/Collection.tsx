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
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#1a2e1a]">Collection</h2>
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

      <div className="flex gap-4 overflow-x-auto pb-2">
        {lastReads.map((lr, i) => (
          <Link
            key={i}
            href={`/surah/${lr.surahId}`}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 p-3 bg-white border border-[#d4e4d0] rounded-xl w-28 hover:border-[#2d6a2d]/40 hover:shadow-sm transition"
          >
            <div className="w-10 h-10 rounded-lg bg-[#e8f0e4] border border-[#c8dcc4] flex items-center justify-center">
              <BookOpen size={16} className="text-[#2d6a2d]" />
            </div>
            <span className="text-xs font-medium text-[#1a2e1a]">{lr.surahName}</span>
            <span className="text-[10px] text-[#5a7a5a]">Ayah - {lr.verse ?? "01"}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
