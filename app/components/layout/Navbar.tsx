"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon, Book, Settings } from "lucide-react";
import { Theme } from "@/app/hooks/useTheme";

interface NavbarProps {
  theme: Theme;
  setTheme: (t: Theme) => void;
  onSettingsClick?: () => void;
}

const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light", icon: <Sun size={14} /> },
  { id: "dark", label: "Dark", icon: <Moon size={14} /> },
  { id: "sepia", label: "Sepia", icon: <Book size={14} /> },
  { id: "system", label: "System", icon: <Settings size={14} /> },
];

export function Navbar({ theme, setTheme }: NavbarProps) {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  // Theme আপডেট করার জন্য useEffect
  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Current theme এর আইকন
  const themeIcon =
    theme === "light" ? (
      <Sun size={20} />
    ) : theme === "sepia" ? (
      <Book size={20} />
    ) : theme === "dark" ? (
      <Moon size={20} />
    ) : (
      <Settings size={20} />
    );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#0f1a0f]/95 backdrop-blur-md border-b border-[#e2ede0] dark:border-[#2a3f2a] px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
            <Image 
              src="/quran_mazid.png" 
              alt="Quran Mazid Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-xl font-black text-[#1a2e1a] dark:text-[#c5e6c5] leading-none tracking-tight">
              Quran Mazid
            </div>
            <div className="text-xs text-[#5a7a5a] dark:text-[#8aaa8a] font-medium mt-1">
              Read, Study, and Learn The Quran
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-[15px] text-[#3a5a3a] dark:text-[#a3c4a3] font-bold">
          <Link href="/" className="hover:text-[#2d6a2d] dark:hover:text-[#7ed47e] transition-colors">Home</Link>
          <Link href="/surah/1" className="hover:text-[#2d6a2d] dark:hover:text-[#7ed47e] transition-colors">Read Quran</Link>
          <span className="text-[#8aaa8a] cursor-not-allowed">Prayer Time</span>
          <span className="text-[#8aaa8a] cursor-not-allowed">Ramadan 2026</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setThemeMenuOpen((p) => !p)}
              className="w-10 h-10 rounded-full bg-[#f0f5ef] dark:bg-[#1f2f1f] border border-[#d4e4d0] dark:border-[#3a5a3a] flex items-center justify-center hover:bg-[#2d6a2d] hover:text-white transition-all text-[#3a5a3a] dark:text-[#a3c4a3] shadow-sm"
            >
              {themeIcon}
            </button>

            {themeMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setThemeMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 rounded-2xl shadow-2xl z-50 overflow-hidden min-w-[160px] bg-white dark:bg-[#1a2a1a] border border-[#d4e4d0] dark:border-[#3a5a3a] p-1">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition rounded-xl text-left ${
                        theme === t.id 
                          ? "bg-[#2d6a2d] text-white" 
                          : "text-[#3a5a3a] dark:text-[#c5e6c5] hover:bg-[#f0f5ef] dark:hover:bg-[#2a3f2a]"
                      }`}
                    >
                      {t.icon}
                      {t.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Support Button */}
          <Link
            href="/support"
            className="hidden md:flex items-center gap-2 px-7 py-2.5 bg-[#2d6a2d] text-white text-sm font-bold rounded-full hover:bg-[#1f4a1f] transition-all shadow-md active:scale-95"
          >
            Support Us 💚
          </Link>
        </div>
      </div>
    </nav>
  );
}