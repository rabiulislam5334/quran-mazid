"use client";

import { Surah } from "@/app/types";
import { MapPin, BookOpen } from "lucide-react";


interface SurahHeaderProps {
  surah: Surah;
  totalAyahs: number;
}

export function SurahHeader({ surah, totalAyahs }: SurahHeaderProps) {
  const isFirst = surah.id === 1;
  const isTawbah = surah.id === 9;

  return (
    <div className="relative overflow-hidden bg-bg-card border-b border-border">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold rounded-full translate-y-24 -translate-x-24" />
      </div>

      <div className="relative px-6 py-8 text-center">
        <div className="inline-flex items-center gap-1.5 text-xs text-text-muted mb-3">
          <span>Surah {surah.id}</span>
        </div>

        <h1
          dir="rtl"
          className="text-4xl mb-2"
          style={{ fontFamily: "'Scheherazade New', serif", color: "var(--gold-light)", lineHeight: 2 }}
        >
          {surah.name}
        </h1>

        <h2 className="text-xl font-semibold text-text-primary mb-1">{surah.transliteration}</h2>
        <p className="text-sm text-text-secondary mb-4">{surah.translation}</p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-bg-tertiary border border-border text-text-secondary">
            <BookOpen size={11} />
            <span>Ayah-{totalAyahs}</span>
          </div>
          <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border ${
            surah.type === "meccan"
              ? "bg-amber-900/20 border-amber-800/30 text-amber-400"
              : "bg-blue-900/20 border-blue-800/30 text-blue-400"
          }`}>
            <MapPin size={11} />
            <span>{surah.type === "meccan" ? "Makkah" : "Madinah"}</span>
          </div>
        </div>

        {!isFirst && !isTawbah && (
          <div className="mt-6 pt-6 border-t border-border/50">
            <p dir="rtl" className="bismillah">بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</p>
            <p className="text-xs text-text-muted mt-1">In the name of Allah, the Most Gracious, the Most Merciful</p>
          </div>
        )}
      </div>
    </div>
  );
}
