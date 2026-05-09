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
    <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12 transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <h2 className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>Collection</h2>
        
        {/* Tabs */}
        <div className="flex p-1.5 rounded-full border" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              className={clsx(
                "px-6 py-2 text-sm md:text-base rounded-full transition-all",
                i === 0 ? "shadow-sm font-bold" : "hover:opacity-80"
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

      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {lastReads.map((lr, i) => (
          <Link
            key={i}
            href={`/surah/${lr.surahId}`}
            className="flex-shrink-0 flex flex-col items-center gap-3 p-6 border rounded-[2rem] w-40 md:w-48 hover:shadow-xl transition-all group"
            style={{ background: "var(--bg-primary)", borderColor: "var(--border)" }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--green)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div 
              className="w-16 h-16 rounded-2xl border flex items-center justify-center transition-colors group-hover:text-white"
              style={{ background: "var(--bg-secondary)", borderColor: "var(--border)", color: "var(--green)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--green)"}
            >
              <BookOpen size={28} className="group-hover:text-white transition-colors" />
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold group-hover:text-[#2d6a2d]" style={{ color: "var(--text-primary)" }}>
                {lr.surahName}
              </span>
              <span className="text-sm mt-1 block" style={{ color: "var(--text-muted)" }}>
                Ayah - {lr.verse ?? "01"}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}