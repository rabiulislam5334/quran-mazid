"use client";

import { useState } from "react";
import { Bookmark, Share2, Copy, Check } from "lucide-react";
import { clsx } from "clsx";
import { ArabicFont, Ayah, FontSettings } from "@/app/types";
import { AudioButton, SoundWave } from "../audio/AudioButton";
import { ShareModal } from "./ShareModal";
import { BookmarkModal } from "./BookmarkModal";
const FONT_FAMILIES: Record<ArabicFont, string> = {
  uthmani:       "'KFGQPC Uthmanic Script', 'Scheherazade New', serif",
  amiri:         "'Amiri Quran', 'Amiri', serif",
  scheherazade:  "'Scheherazade New', serif",
};

interface AyahCardProps {
  ayah: Ayah;
  surahId: number;
  surahName: string;
  fontSettings: FontSettings;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (surahId: number, verseNum: number) => void;
}

export function AyahCard({ ayah, surahId, surahName, fontSettings, isPlaying, isLoading, onPlay }: AyahCardProps) {
  const [copied,       setCopied]       = useState(false);
  const [shareOpen,    setShareOpen]    = useState(false);
  const [bookmarkOpen, setBookmarkOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${ayah.text}\n\n${ayah.translation}\n— Quran ${surahId}:${ayah.verse}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div
        id={`ayah-${ayah.verse}`}
        className={clsx(
          "group border-b border-border/40 transition-all duration-200",
          isPlaying ? "bg-gold/5 border-l-2 border-l-gold" : "hover:bg-bg-hover/30"
        )}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-2">
          <div className="flex items-center gap-3">
            <div className="verse-badge">{ayah.verse}</div>
            <AudioButton
              surahId={surahId} verseNum={ayah.verse}
              isPlaying={isPlaying} isLoading={isLoading} onPlay={onPlay}
            />
            {isPlaying && <SoundWave />}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setBookmarkOpen(true)} title="Bookmark"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-gold hover:bg-bg-hover transition">
              <Bookmark size={14} />
            </button>
            <button onClick={handleCopy} title="Copy"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-gold hover:bg-bg-hover transition">
              {copied ? <Check size={14} className="text-accent-green" /> : <Copy size={14} />}
            </button>
            <button onClick={() => setShareOpen(true)} title="Share"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-text-muted hover:text-gold hover:bg-bg-hover transition">
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* Arabic text */}
        <div className="px-6 pt-2 pb-6">
          <p dir="rtl" className="arabic-text text-text-arabic leading-loose mb-4 text-right"
            style={{ fontFamily: FONT_FAMILIES[fontSettings.arabicFont], fontSize: `${fontSettings.arabicFontSize}px` }}>
            {ayah.text}
          </p>
          <p className="text-text-muted text-xs mb-1 uppercase tracking-wide">Saheeh International</p>
          <p className="text-text-secondary leading-relaxed"
            style={{ fontSize: `${fontSettings.translationFontSize}px` }}>
            {ayah.translation}
          </p>
        </div>
      </div>

      <ShareModal    isOpen={shareOpen}    onClose={() => setShareOpen(false)}    surahId={surahId} verse={ayah.verse} surahName={surahName} />
      <BookmarkModal isOpen={bookmarkOpen} onClose={() => setBookmarkOpen(false)} surahId={surahId} verse={ayah.verse} surahName={surahName} arabicText={ayah.text} translation={ayah.translation} />
    </>
  );
}
