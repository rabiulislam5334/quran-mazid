"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { AyahTicker } from "./AyahTicker";

const QUICK_LINKS = ["Al Mulk", "Yasin", "Al Kahf", "Al Ikhlas"];
const QUICK_IDS   = [67, 36, 18, 112];

interface HeroProps {
  onSearchClick: () => void;
}

export function Hero({ onSearchClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#e8f0e4] to-[#f5f7f2] pt-12 pb-0 text-center">
      {/* Mosque silhouette */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-10">
        <svg viewBox="0 0 1440 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 220 L0 160 Q60 120 120 160 L120 100 Q140 60 160 100 L160 80 Q180 40 200 80 L200 100 Q220 60 240 100 L240 160 Q300 120 360 160 L360 220Z" fill="#2d6a2d"/>
          <path d="M400 220 L400 140 Q480 80 560 140 L560 220Z" fill="#2d6a2d"/>
          <path d="M600 220 L600 160 Q640 130 680 160 L680 120 Q700 90 720 120 L720 160 Q760 130 800 160 L800 220Z" fill="#2d6a2d"/>
          <path d="M900 220 L900 140 Q980 80 1060 140 L1060 220Z" fill="#2d6a2d"/>
          <path d="M1100 220 L1100 160 Q1160 120 1220 160 L1220 100 Q1240 60 1260 100 L1260 160 Q1320 120 1380 160 L1380 220 Z" fill="#2d6a2d"/>
          <rect x="0" y="210" width="1440" height="10" fill="#2d6a2d"/>
        </svg>
      </div>

      {/* Lanterns */}
      <div className="pointer-events-none absolute top-8 left-8 opacity-20 text-4xl select-none">🪔</div>
      <div className="pointer-events-none absolute top-8 right-8 opacity-20 text-4xl select-none">🪔</div>

      <div className="relative max-w-2xl mx-auto px-4">
        <h1
          className="font-serif text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-6 tracking-wide"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "0.08em" }}
        >
          QURAN MAZID
        </h1>

        {/* Search bar */}
        <button
          onClick={onSearchClick}
          className="w-full max-w-md mx-auto flex items-center gap-3 px-4 py-3 bg-white border border-[#c8dcc4] rounded-xl text-[#8aaa8a] text-sm shadow-sm hover:shadow-md hover:border-[#2d6a2d]/40 transition mb-4"
        >
          <Search size={16} className="text-[#5a7a5a]" />
          <span>What do you want to read?</span>
          <span className="ml-auto text-xs bg-[#f0f4ee] text-[#5a7a5a] px-2 py-0.5 rounded">Ctrl+k</span>
        </button>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {QUICK_LINKS.map((name, i) => (
            <Link
              key={name}
              href={`/surah/${QUICK_IDS[i]}`}
              className="px-3 py-1.5 bg-white border border-[#c8dcc4] rounded-full text-xs text-[#3a5a3a] hover:bg-[#e8f0e4] hover:border-[#2d6a2d]/50 transition shadow-sm"
            >
              {name}
            </Link>
          ))}
        </div>

        <AyahTicker />
      </div>
    </div>
  );
}
