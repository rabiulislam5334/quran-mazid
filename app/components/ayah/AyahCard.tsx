"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play, Pause, Bookmark, Copy, Share2, Check, Loader2,
  MoreHorizontal, Link2, BookOpen,
} from "lucide-react";
import { FontSettings } from "@/app/types";

const FONT_FAMILIES: Record<string, string> = {
  uthmani: "'KFGQPC Uthmanic Script','Scheherazade New',serif",
  amiri: "'Amiri Quran','Amiri',serif",
  scheherazade: "'Scheherazade New',serif",
};

interface AyahCardProps {
  ayah: { verse: number; text: string; translation: string };
  surahId: number;
  surahName: string;
  fontSettings: FontSettings;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
}

export function AyahCard({
  ayah,
  surahId,
  surahName,
  fontSettings,
  isPlaying,
  isLoading,
  onPlay,
}: AyahCardProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll: active আয়াত scroll area-র একদম উপরে snap
  // surah-scroll-area নিজেই navbar-এর নিচে শুরু হয়, তাই extra offset দরকার নেই
  useEffect(() => {
    if (isPlaying && cardRef.current) {
      const scrollArea = document.getElementById("surah-scroll-area");
      const card = cardRef.current;
      if (scrollArea) {
        const relativeTop =
          card.getBoundingClientRect().top -
          scrollArea.getBoundingClientRect().top +
          scrollArea.scrollTop;
        scrollArea.scrollTo({ top: relativeTop, behavior: "smooth" });
      } else {
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [isPlaying]);

  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${ayah.text}\n\n${ayah.translation}\n— Quran ${surahId}:${ayah.verse}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/surah/${surahId}#ayah-${ayah.verse}`
    );
    setMoreOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Quran ${surahId}:${ayah.verse}`,
        text: ayah.translation,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
    setMoreOpen(false);
  };

  const iconBtn =
    "w-7 h-7 rounded flex items-center justify-center transition active:scale-90";

  return (
    <div
      ref={cardRef}
      id={`ayah-${ayah.verse}`}
      className="border-b transition-colors flex"
      style={{
        borderColor: "rgba(128,128,128,0.15)",
        background: isPlaying ? "var(--green-bg)" : "",
        borderLeft: isPlaying
          ? "3px solid var(--green)"
          : "3px solid transparent",
      }}
      onMouseEnter={(e) => {
        if (!isPlaying)
          (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
      }}
      onMouseLeave={(e) => {
        if (!isPlaying)
          (e.currentTarget as HTMLElement).style.background = "";
      }}
    >
      {/* ══ LEFT COLUMN: verse number + icons ══ */}
      <div
        className="flex flex-col items-center flex-shrink-0 pt-5 pb-4 gap-3"
        style={{ width: "56px", paddingLeft: "14px", paddingRight: "4px" }}
      >
        {/* Verse number */}
        <span
          className="font-bold leading-none"
          style={{
            color: isPlaying ? "var(--green-active)" : "var(--text-muted)",
            fontSize: "13px",
          }}
        >
          {surahId}:{ayah.verse}
        </span>

        {/* Play */}
        <button
          onClick={onPlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className={iconBtn}
          style={{ color: isPlaying ? "var(--green-active)" : "var(--text-muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--green-active)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = isPlaying
              ? "var(--green-active)"
              : "var(--text-muted)")
          }
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : isPlaying ? (
            <Pause size={18} fill="currentColor" />
          ) : (
            <Play size={18} fill="currentColor" className="ml-0.5" />
          )}
        </button>

        {/* Read / BookOpen */}
        <button
          title="Read"
          className={iconBtn}
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--green-active)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
          }
        >
          <BookOpen size={18} />
        </button>

        {/* Bookmark */}
        <button
          title="Bookmark"
          className={iconBtn}
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--green-active)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
          }
        >
          <Bookmark size={18} />
        </button>

        {/* More dropdown */}
        <div className="relative" ref={moreRef}>
          <button
            onClick={() => setMoreOpen((p) => !p)}
            title="More"
            className={iconBtn}
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--green-active)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
            }
          >
            <MoreHorizontal size={18} />
          </button>

          {moreOpen && (
            <div
              className="absolute left-full top-0 ml-1 rounded-xl shadow-2xl z-50 overflow-hidden min-w-[160px]"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
              }}
            >
              {[
                {
                  icon: <Copy size={16} />,
                  label: "Ayah Copy",
                  action: () => {
                    handleCopy();
                    setMoreOpen(false);
                  },
                },
                {
                  icon: <Link2 size={16} />,
                  label: "Copy Link",
                  action: handleCopyLink,
                },
                {
                  icon: <Share2 size={16} />,
                  label: "Ayah Share",
                  action: handleShare,
                },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 transition text-sm"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "var(--bg-hover)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "")
                  }
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══ RIGHT CONTENT ══ */}
      <div className="flex-1 min-w-0 pt-5 pb-6 pl-6 pr-4 md:pr-8 lg:pr-12">
        {/* Arabic text */}
        <p
          dir="rtl"
          className="arabic-text text-right leading-loose mb-5"
          style={{
            fontFamily:
              FONT_FAMILIES[fontSettings.arabicFont] || FONT_FAMILIES.uthmani,
            fontSize: `${fontSettings.arabicFontSize}px`,
            color: "var(--text-arabic)",
          }}
        >
          {ayah.text}
        </p>

        {/* Translator label */}
        <p
          className="mb-1 uppercase tracking-widest"
          style={{ fontSize: "11px", color: "var(--text-muted)" }}
        >
          SAHEEH INTERNATIONAL
        </p>

        {/* Translation */}
        <p
          className="leading-relaxed"
          style={{
            fontSize: `${fontSettings.translationFontSize}px`,
            color: "var(--text-secondary)",
          }}
        >
          {ayah.translation}
        </p>
      </div>
    </div>
  );
}