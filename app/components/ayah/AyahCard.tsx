"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play, Pause, Bookmark, Copy, Share2, Loader2,
  MoreHorizontal, Link2, BookOpen, Book, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // framer-motion যোগ করা হয়েছে
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
  const [moreOpen, setMoreOpen] = useState(false); // Modal state
  const cardRef = useRef<HTMLDivElement>(null);

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${ayah.text}\n\n${ayah.translation}\n— Quran ${surahId}:${ayah.verse}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setMoreOpen(false);
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

  return (
    <div
      ref={cardRef}
      id={`ayah-${ayah.verse}`}
      className="border-b transition-colors flex flex-col md:flex-row"
      style={{
        borderColor: "rgba(128,128,128,0.15)",
        background: isPlaying ? "var(--green-bg)" : "",
        borderLeft: isPlaying ? "4px solid var(--green)" : "4px solid transparent",
      }}
    >
      {/* ══ TOP ROW (Mobile only) ══ */}
      <div className="flex md:hidden items-center justify-between px-4 pt-4">
        <span className="font-bold text-sm" style={{ color: "var(--green)" }}>
          {surahId}:{ayah.verse}
        </span>
        <button
          onClick={() => setMoreOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700"
          style={{ color: "var(--text-muted)" }}
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* ══ LEFT COLUMN (Desktop only) ══ */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 pt-5 pb-4 gap-3 w-[56px] pl-3">
        <span className="font-bold text-[13px]" style={{ color: isPlaying ? "var(--green-active)" : "var(--text-muted)" }}>
          {surahId}:{ayah.verse}
        </span>
        
        {/* Play Button */}
        <button onClick={onPlay} className="w-8 h-8 rounded flex items-center justify-center transition hover:bg-gray-100 dark:hover:bg-white/5">
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>

        <button className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-[var(--green)]">
          <BookOpen size={18} />
        </button>

        <button className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-[var(--green)]">
          <Bookmark size={18} />
        </button>

        <button onClick={() => setMoreOpen(true)} className="w-8 h-8 rounded flex items-center justify-center text-gray-400 hover:text-[var(--green)]">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* ══ RIGHT CONTENT ══ */}
      <div className="flex-1 min-w-0 pt-4 md:pt-5 pb-6 px-4 md:pl-6 md:pr-12">
        <p dir="rtl" className="arabic-text text-right leading-[2.5] mb-5"
          style={{
            fontFamily: FONT_FAMILIES[fontSettings.arabicFont] || FONT_FAMILIES.uthmani,
            fontSize: `${fontSettings.arabicFontSize}px`,
            color: "var(--text-arabic)",
          }}
        >
          {ayah.text}
        </p>

        <p className="mb-1 uppercase tracking-widest font-bold opacity-70" style={{ fontSize: "10px", color: "var(--text-muted)" }}>
          SAHEEH INTERNATIONAL
        </p>

        <p className="leading-relaxed" style={{ fontSize: `${fontSettings.translationFontSize}px`, color: "var(--text-secondary)" }}>
          {ayah.translation}
        </p>
      </div>

      {/* ══ MOBILE BOTTOM SHEET MODAL ══ */}
      <AnimatePresence>
        {moreOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMoreOpen(false)}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#1a2e1a] rounded-t-[2rem] p-6 pb-10 shadow-2xl md:max-w-md md:mx-auto md:rounded-2xl md:bottom-10"
            >
              {/* Handle Bar */}
              <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6 md:hidden" />
              
              <div className="flex flex-col gap-1">
                {[
                  { icon: <Play size={20} />, label: isPlaying ? "Pause" : "Play", onClick: () => { onPlay(); setMoreOpen(false); } },
                  { icon: <Book size={20} />, label: "Tafsir", onClick: () => setMoreOpen(false) },
                  { icon: <Bookmark size={20} />, label: "Bookmark", onClick: () => setMoreOpen(false) },
                  { icon: <Copy size={20} />, label: "Ayah Copy", onClick: handleCopy },
                  { icon: <Link2 size={20} />, label: "Copy Link", onClick: handleCopyLink },
                  { icon: <Share2 size={20} />, label: "Ayah Share", onClick: handleShare },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={item.onClick}
                    className="flex items-center gap-4 w-full p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <span className="text-gray-500 dark:text-gray-400">{item.icon}</span>
                    <span className="text-lg font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}