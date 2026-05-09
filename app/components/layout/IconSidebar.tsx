"use client";

import Link from "next/link";
import {
  Home, Grid2X2, Navigation, Bookmark, Users, Sun, Moon, Book, Settings,
} from "lucide-react";
import { Theme } from "@/app/hooks/useTheme";

interface IconSidebarProps {
  surahId: number;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const THEMES: { id: Theme; label: string; icon: React.ReactNode }[] = [
  { id: "light", label: "Light", icon: <Sun size={14} /> },
  { id: "dark", label: "Dark", icon: <Moon size={14} /> },
  { id: "sepia", label: "Sepia", icon: <Book size={14} /> },
  { id: "system", label: "System", icon: <Settings size={14} /> },
];

export function IconSidebar({ surahId, theme, setTheme }: IconSidebarProps) {
  const themeIcon =
    theme === "light" ? (
      <Sun size={18} />
    ) : theme === "sepia" ? (
      <Book size={18} />
    ) : (
      <Moon size={18} />
    );

  const navItems = [
    { icon: <Home size={18} strokeWidth={1.5} />, label: "Home", href: "/" },
    { icon: <Grid2X2 size={18} strokeWidth={1.5} />, label: "Surah", href: `/surah/${surahId}` },
    { icon: <Navigation size={18} strokeWidth={1.5} />, label: "Navigate", href: `/surah/${surahId}` },
    { icon: <Bookmark size={18} strokeWidth={1.5} />, label: "Bookmarks", href: "/" },
    { icon: <Users size={18} strokeWidth={1.5} />, label: "Community", href: "/" },
  ];

  return (
    <aside
      className="hidden md:flex flex-col items-center w-14 flex-shrink-0 z-30 py-4"
      style={{
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo — top */}
      <Link href="/" className="mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow"
          style={{
            background: "linear-gradient(135deg, var(--gold), var(--gold-dark))",
          }}
        >
          <span
            className="font-bold text-sm select-none"
            style={{ color: "var(--bg-primary)" }}
          >
            ق
          </span>
        </div>
      </Link>

      {/* ══ Nav icons — vertically centered in remaining space ══ */}
      <div className="flex-1 flex flex-col items-center justify-center gap-1 w-full px-1">
        {navItems.map(({ icon, label, href }) => (
          <Link
            key={label}
            href={href}
            title={label}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition group relative"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--gold)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.background = "";
            }}
          >
            {icon}
            <span
              className="absolute left-full ml-2 px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 z-50 pointer-events-none"
              style={{
                background: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* Theme toggle — bottom */}
      <div className="relative group">
        <button
          title="Theme"
          className="w-10 h-10 rounded-lg flex items-center justify-center transition"
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

        {/* Theme submenu on hover */}
        <div
          className="absolute left-full bottom-0 ml-2 rounded-xl shadow-2xl z-50 overflow-hidden min-w-[130px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm transition text-left"
              style={{
                color: theme === t.id ? "var(--gold)" : "var(--text-secondary)",
                background: theme === t.id ? "var(--bg-hover)" : "",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
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
      </div>
    </aside>
  );
}
