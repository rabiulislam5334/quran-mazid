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
    <div 
      className="relative overflow-hidden pt-20 pb-10 text-center transition-colors duration-300"
      style={{
        background: "linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))",
      }}
    >
      {/* Mosque Silhouette - Opacity adjusted for dark theme */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-[0.1] dark:opacity-[0.05] flex justify-center">
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[120%] min-w-[1440px]">
          <path d="M0 320 L0 260 Q60 220 120 260 L120 200 Q140 160 160 200 L160 180 Q180 140 200 180 L200 200 Q220 160 240 200 L240 260 Q300 220 360 260 L360 320Z" fill="var(--text-primary)"/>
          <path d="M400 320 L400 240 Q480 180 560 240 L560 320Z" fill="var(--text-primary)"/>
          <path d="M600 320 L600 260 Q640 230 680 260 L680 220 Q700 190 720 220 L720 260 Q760 230 800 260 L800 320Z" fill="var(--text-primary)"/>
          <path d="M900 320 L900 240 Q980 180 1060 240 L1060 320Z" fill="var(--text-primary)"/>
          <path d="M1100 320 L1100 260 Q1160 220 1220 260 L1220 200 Q1240 160 1260 200 L1260 260 Q1320 220 1380 260 L1380 320 Z" fill="var(--text-primary)"/>
        </svg>
      </div>

      {/* Decorative Lanterns */}
      <div className="hidden lg:block pointer-events-none absolute top-12 left-16 opacity-30 select-none animate-bounce duration-[3000ms]">
        <img src="/vlight.png" alt="lantern" className="w-16 h-auto dark:invert" />
      </div>
      <div className="hidden lg:block pointer-events-none absolute top-12 right-16 opacity-30 select-none animate-bounce duration-[3000ms]">
        <img src="/vlight.png" alt="lantern" className="w-16 h-auto dark:invert" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 z-10">
        <h1
          className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-[0.15em]"
          style={{ 
            fontFamily: "'Cinzel', 'Georgia', serif",
            color: "var(--text-primary)"
          }}
        >
          QURAN MAZID
        </h1>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto mb-6">
          <button
            onClick={onSearchClick}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg shadow-sm hover:shadow-xl transition-all duration-300 group border"
            style={{ 
               background: "var(--bg-primary)", 
               borderColor: "var(--border)",
               color: "var(--text-muted)"
            }}
          >
            <Search size={22} style={{ color: "var(--green)" }} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">What do you want to read?</span>
            <div 
                className="ml-auto flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg border"
                style={{ background: "var(--bg-hover)", borderColor: "var(--border)", color: "var(--text-secondary)" }}
            >
              <span>CTRL + K</span>
            </div>
          </button>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {QUICK_LINKS.map((name, i) => (
            <Link
              key={name}
              href={`/surah/${QUICK_IDS[i]}`}
              className="px-6 py-2.5 rounded-full text-sm md:text-base font-semibold transition-all shadow-sm border"
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
              {name}
            </Link>
          ))}
        </div>

        <div className="mt-4">
           <AyahTicker />
        </div>
      </div>
    </div>
  );
}