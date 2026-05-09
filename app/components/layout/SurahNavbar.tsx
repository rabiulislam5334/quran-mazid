"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  BookOpen, Search, Sun, Moon, Book, Settings, ChevronLeft, ChevronRight,
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
  { id: "light", label: "Light", icon: <Sun size={14} /> },
  { id: "dark", label: "Dark", icon: <Moon size={14} /> },
  { id: "sepia", label: "Sepia", icon: <Book size={14} /> },
  { id: "system", label: "System", icon: <Settings size={14} /> },
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
  const scrollContainer = useRef<HTMLElement | null>(null);

  // Find the scrollable parent (main content div)
  useEffect(() => {
    // We'll use window scroll or the closest scroll parent
    const mainEl = document.getElementById("surah-scroll-area");
    scrollContainer.current = mainEl;

    const target = mainEl || window;

    const handleScroll = () => {
      const currentY = mainEl ? mainEl.scrollTop : window.scrollY;
      if (currentY > lastScrollY.current && currentY > 60) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  const themeIcon =
    theme === "light" ? (
      <Sun size={16} />
    ) : theme === "sepia" ? (
      <Book size={16} />
    ) : (
      <Moon size={16} />
    );

  return (
    <nav
      className="sticky top-0 z-30 flex items-center justify-between px-3 md:px-6 py-2.5 border-b transition-transform duration-300"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--border)",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Left: mobile sidebar + surah name */}
      <div className="flex items-center gap-2">
        <button
          onClick={onMobileSidebar}
          className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg transition"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "")
          }
        >
          <BookOpen size={18} />
        </button>

        <div className="flex items-center gap-1.5">
          {prevId && (
            <Link
              href={`/surah/${prevId}`}
              className="hidden sm:flex w-7 h-7 items-center justify-center rounded-lg transition"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "")
              }
            >
              <ChevronLeft size={16} />
            </Link>
          )}

          <div>
            <span
              className="font-bold text-sm md:text-base"
              style={{ color: "var(--text-primary)" }}
            >
              {surahName}
            </span>
            <span
              className="hidden sm:inline ml-2 text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Surah {surahId}
            </span>
          </div>

          {nextId && (
            <Link
              href={`/surah/${nextId}`}
              className="hidden sm:flex w-7 h-7 items-center justify-center rounded-lg transition"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "")
              }
            >
              <ChevronRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Right: search + theme */}
      <div className="flex items-center gap-1">
        <button
          onClick={onSearchOpen}
          className="w-8 h-8 flex items-center justify-center rounded-lg transition"
          style={{ color: "var(--text-muted)" }}
          title="Search (Ctrl+K)"
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "")
          }
        >
          <Search size={17} />
        </button>

        {/* Theme */}
        <div className="relative">
          <button
            onClick={() => setThemeMenuOpen((p) => !p)}
            title="Theme"
            className="w-8 h-8 flex items-center justify-center rounded-lg transition"
            style={{ color: "var(--gold)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "")
            }
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
                className="absolute right-0 top-full mt-1 rounded-xl shadow-2xl z-50 overflow-hidden min-w-[130px]"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setThemeMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm transition text-left"
                    style={{
                      color: theme === t.id ? "var(--gold)" : "var(--text-secondary)",
                      background: theme === t.id ? "var(--bg-hover)" : "",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "var(--bg-hover)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        theme === t.id ? "var(--bg-hover)" : "")
                    }
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Support Us - desktop only */}
        <button
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition ml-1"
          style={{
            background: "var(--green)",
            color: "#fff",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.85")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          ❤ Support Us
        </button>
      </div>
    </nav>
  );
}
