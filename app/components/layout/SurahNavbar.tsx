"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BookOpen, Search, Sun, Moon, Book, Settings, Heart, Menu
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
    theme === "light" ? <Sun size={18} /> : 
    theme === "sepia" ? <Book size={18} /> : <Moon size={18} />;

  return (
    <nav
      className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 py-2 md:py-3 border-b transition-all duration-300"
      style={{
        background: "var(--bg-primary)",
        borderColor: "var(--border)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
      }}
    >
      {/* Left: Mobile Menu & Desktop Logo */}
      <div className="flex items-center gap-3">
        {/* মেনু বাটন - lg:hidden যোগ করা হয়েছে যাতে ডেস্কটপে এটি না দেখায় */}
        <button
          onClick={onMobileSidebar}
          className="w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-gray-100 lg:hidden"
          style={{ background: "var(--bg-secondary)", color: "var(--green)" }}
        >
          <Menu size={20} />
        </button>

        <Link href="/" className="group">
          <h1 className="text-lg md:text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Quran Mazid
          </h1>
          <p className="hidden lg:block text-[11px] font-medium opacity-60" style={{ color: "var(--text-muted)" }}>
            Read, Study, and Learn The Quran
          </p>
        </Link>
      </div>

      {/* Right Actions: Search, Theme, Settings */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <button
          onClick={onSearchOpen}
          className="w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-gray-100"
          style={{ background: "var(--bg-secondary)", color: "var(--green)" }}
        >
          <Search size={18} />
        </button>

        {/* Theme Toggler */}
        <div className="relative">
          <button
            onClick={() => setThemeMenuOpen((p) => !p)}
            className="w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-gray-100"
            style={{ background: "var(--bg-secondary)", color: "var(--green)" }}
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
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-xl transition-all hover:bg-gray-100/50"
                    style={{
                      color: theme === t.id ? "var(--green)" : "var(--text-primary)",
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

        {/* Settings */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full transition hover:bg-gray-100"
          style={{ background: "var(--bg-secondary)", color: "var(--green)" }}
        >
          <Settings size={18} />
        </button>

        {/* Support Us Button */}
        <button
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all hover:shadow-lg bg-[var(--green)] text-white"
        >
          Support Us <Heart size={14} fill="white" />
        </button>
      </div>
    </nav>
  );
}