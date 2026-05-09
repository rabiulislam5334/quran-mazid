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

  // Theme আপডেট করার জন্য useEffect (SurahNavbar এর লজিক অনুযায়ী)
  useEffect(() => {
    const root = window.document.documentElement;
    let targetTheme = theme;

    if (theme === "system") {
      targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    // data-theme সেট করা যা আপনার CSS Variables নিয়ন্ত্রণ করবে
    root.setAttribute("data-theme", targetTheme);
    
    // Tailwind dark mode ক্লাসের জন্য
    if (targetTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

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
    <nav 
      className="sticky top-0 z-50 border-b px-4 md:px-8 transition-colors duration-300"
      style={{
        background: "var(--bg-secondary)", // CSS Variable ব্যবহার করা হয়েছে
        borderColor: "var(--border)",
        backdropFilter: "blur(12px)",
      }}
    >
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
            <div 
              className="text-xl font-black leading-none tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Quran Mazid
            </div>
            <div 
              className="text-xs font-medium mt-1"
              style={{ color: "var(--text-muted)" }}
            >
              Read, Study, and Learn The Quran
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-[15px] font-bold">
          <Link href="/" className="transition-colors" style={{ color: "var(--text-secondary)" }}>Home</Link>
          <Link href="/surah/1" className="transition-colors" style={{ color: "var(--text-secondary)" }}>Read Quran</Link>
          <span style={{ color: "var(--text-muted)" }} className="cursor-not-allowed">Prayer Time</span>
          <span style={{ color: "var(--text-muted)" }} className="cursor-not-allowed">Ramadan 2026</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setThemeMenuOpen((p) => !p)}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all shadow-sm"
              style={{ 
                background: "var(--bg-primary)",
                borderColor: "var(--border)",
                color: "var(--gold)" 
              }}
            >
              {themeIcon}
            </button>

            {themeMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setThemeMenuOpen(false)}
                />
                <div 
                  className="absolute right-0 top-full mt-2 rounded-2xl shadow-2xl z-50 overflow-hidden min-w-[160px] p-1 border"
                  style={{ 
                    background: "var(--bg-secondary)", 
                    borderColor: "var(--border)" 
                  }}
                >
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition rounded-xl text-left`}
                      style={{
                        color: theme === t.id ? "#fff" : "var(--text-primary)",
                        background: theme === t.id ? "var(--green)" : "transparent",
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

          {/* Support Button */}
          <Link
            href="/support"
            className="hidden md:flex items-center gap-2 px-7 py-2.5 text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-95"
            style={{ background: "var(--green)" }}
          >
            Support Us 💚
          </Link>
        </div>
      </div>
    </nav>
  );
}