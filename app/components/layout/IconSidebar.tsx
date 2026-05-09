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
      <Sun size={20} />
    ) : theme === "sepia" ? (
      <Book size={20} />
    ) : (
      <Moon size={20} />
    );

  const navItems = [
    { icon: <Home size={22} strokeWidth={1.5} />, label: "Home", href: "/" },
    { icon: <Grid2X2 size={22} strokeWidth={1.5} />, label: "Surah", href: `/surah/${surahId}` },
    { icon: <Navigation size={22} strokeWidth={1.5} />, label: "Navigate", href: `/surah/${surahId}` },
    { icon: <Bookmark size={22} strokeWidth={1.5} />, label: "Bookmarks", href: "/" },
    { icon: <Users size={22} strokeWidth={1.5} />, label: "Community", href: "/" },
  ];

  return (
    <aside
      className="hidden md:flex flex-col items-center w-16 flex-shrink-0 z-30 py-6 transition-colors duration-300 h-full"
      style={{
        background: "var(--bg-primary)", // আপনি হোয়াইট চাইলে এখানে সরাসরি "#FFFFFF" দিতে পারেন
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* ১. লোগো - একদম উপরে */}
      <Link href="/" className="mb-10 transition-transform hover:scale-110 active:scale-95">
        <div className="w-10 h-10 flex items-center justify-center">
          <img 
            src="/quran_mazid.png" 
            alt="Quran Mazid" 
            className="w-full h-full object-contain shadow-sm rounded-lg"
          />
        </div>
      </Link>

      {/* ২. নেভিগেশন আইকন - মাঝখানে (Centering logic) */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 w-full">
        {navItems.map(({ icon, label, href }) => (
          <Link
            key={label}
            href={href}
            title={label}
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 group relative hover:shadow-md"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--green)";
              (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--text-muted)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {icon}
            
            {/* টুলটিপ */}
            <span
              className="absolute left-[120%] px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 z-50 pointer-events-none transition-opacity shadow-xl"
              style={{
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* ৩. থিম টগল - একদম নিচে */}
      <div className="relative group mt-auto">
        <button
          title="Theme"
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-md"
          style={{ 
            color: "var(--gold)",
            background: "var(--bg-secondary)" 
          }}
        >
          {themeIcon}
        </button>

        {/* থিম সাবমেনু */}
        <div
          className="absolute left-[110%] bottom-0 ml-2 rounded-2xl shadow-2xl z-50 overflow-hidden min-w-[140px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all transform group-hover:translate-x-1 p-1 border"
          style={{
            background: "var(--bg-primary)",
            borderColor: "var(--border)",
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-all rounded-xl text-left hover:translate-x-1"
              style={{
                color: theme === t.id ? "var(--green)" : "var(--text-secondary)",
                background: theme === t.id ? "var(--bg-secondary)" : "transparent",
              }}
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