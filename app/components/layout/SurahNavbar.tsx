"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BookOpen, Search, Sun, Moon, Book, Settings, ChevronLeft, ChevronRight, Heart
} from "lucide-react";
import { Theme } from "@/app/hooks/useTheme";

interface SurahNavbarProps {
  surahName: string;
  surahId: number;
  prevId: number | null;
  nextId: number | null;
  theme: Theme;
  setTheme: (t: Theme) => void;
  onSearchOpen: () => void;
  onMobileSidebar: () => void;
}

const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light", icon: <Sun size={16} /> },
  { id: "dark", label: "Dark", icon: <Moon size={16} /> },
  { id: "sepia", label: "Sepia", icon: <Book size={16} /> },
  { id: "system", label: "System", icon: <Settings size={16} /> },
];

export function SurahNavbar({
  surahName,
  surahId,
  prevId,
  nextId,
  theme,
  setTheme,
  onSearchOpen,
  onMobileSidebar,
}: SurahNavbarProps) {
  const [visible, setVisible] = useState(true);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themeIcon =
    theme === "light" ? <Sun size={20} /> : 
    theme === "sepia" ? <Book size={20} /> : <Moon size={20} />;

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-3 border-b transition-all duration-300"
      style={{
        background: "#FFFFFF",
        borderColor: "var(--border)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
      }}
    >
      {/* Left: Logo & Surah Info */}
      <div className="flex items-center gap-4 md:gap-8">
        {/* Brand Section (As per your image) */}
        <Link href="/" className="hidden lg:block group">
          <h1 className="text-2xl font-black tracking-tight leading-none" style={{ color: "var(--text-primary)" }}>
            Quran Mazid
          </h1>
          <p className="text-[11px] font-medium mt-1 opacity-60" style={{ color: "var(--text-muted)" }}>
            Read, Study, and Learn The Quran
          </p>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={onMobileSidebar}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition"
          style={{ background: "var(--bg-secondary)", color: "var(--text-primary)" }}
        >
          <BookOpen size={22} />
        </button>

        {/* Surah Navigation Details */}
        <div >
          {/* {prevId && (
            <Link href={`/surah/${prevId}`} className="hover:text-[var(--green)] transition">
              <ChevronLeft size={20} />
            </Link>
          )} */}
          
          {/* <div className="flex flex-col md:flex-row md:items-center md:gap-2">
            <span className="font-bold text-base md:text-lg" style={{ color: "var(--text-primary)" }}>
              {surahName}
            </span>
            <span className="text-[11px] md:text-sm font-medium opacity-50" style={{ color: "var(--text-muted)" }}>
              Surah {surahId}
            </span>
          </div> */}

          {/* {nextId && (
            <Link href={`/surah/${nextId}`} className="hover:text-[var(--green)] transition">
              <ChevronRight size={20} />
            </Link>
          )} */}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <button
          onClick={onSearchOpen}
          className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-105"
          style={{ background: "var(--bg-secondary)", color: "var(--text-muted)" }}
        >
          <Search size={20} />
        </button>

        {/* Theme Toggler */}
        <div className="relative">
          <button
            onClick={() => setThemeMenuOpen((p) => !p)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-all hover:scale-105"
            style={{ background: "var(--bg-secondary)", color: "var(--gold)" }}
          >
            {themeIcon}
          </button>

          {themeMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setThemeMenuOpen(false)} />
              <div
                className="absolute right-0 top-full mt-3 rounded-2xl shadow-2xl z-50 overflow-hidden min-w-[150px] p-1 border"
                style={{ background: "var(--bg-primary)", borderColor: "var(--border)" }}
              >
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeMenuOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-xl transition-all"
                    style={{
                      color: theme === t.id ? "var(--green)" : "var(--text-primary)",
                      background: theme === t.id ? "var(--bg-hover)" : "transparent",
                    }}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Support Us Button (Styled like the image) */}
        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-lg active:scale-95"
          style={{ background: "var(--green)", color: "#fff" }}
        >
          Support Us <Heart size={16} fill="white" />
        </button>
      </div>
    </nav>
  );
}