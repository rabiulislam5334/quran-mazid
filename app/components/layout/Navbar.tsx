"use client";

import Link from "next/link";
import { Sun } from "lucide-react";

interface NavbarProps {
  onSettingsClick: () => void;
}

export function Navbar({ onSettingsClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#d4e4d0] px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#2d6a2d] flex items-center justify-center">
            <span className="text-white font-bold text-sm">ق</span>
          </div>
          <div>
            <div className="text-sm font-bold text-[#1a2e1a] leading-none">Quran Mazid</div>
            <div className="text-[10px] text-[#5a7a5a]">Read, Study, and Learn The Quran</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-[#3a5a3a] font-medium">
          <Link href="/" className="hover:text-[#2d6a2d] transition">Home</Link>
          <Link href="/surah/1" className="hover:text-[#2d6a2d] transition">Read Quran</Link>
          <span className="text-[#8aaa8a] cursor-default">Prayer Time</span>
          <span className="text-[#8aaa8a] cursor-default">Ramadan 2026</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSettingsClick}
            className="w-8 h-8 rounded-full border border-[#d4e4d0] flex items-center justify-center hover:bg-[#e8f0e4] transition text-[#3a5a3a]"
          >
            <Sun size={14} />
          </button>
          <Link
            href="/surah/1"
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 bg-[#2d6a2d] text-white text-xs font-semibold rounded-full hover:bg-[#245224] transition shadow"
          >
            Support Us 💚
          </Link>
        </div>
      </div>
    </nav>
  );
}
