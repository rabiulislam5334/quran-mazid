"use client";

import {
  Play, Pause, SkipBack, SkipForward, X, MoreHorizontal, Loader2,
} from "lucide-react";

function fmt(s: number) {
  if (!s || isNaN(s)) return "00:00";
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
    Math.floor(s % 60)
  ).padStart(2, "0")}`;
}

interface BottomAudioPlayerProps {
  audio: {
    isPlaying: boolean;
    isLoading: boolean;
    currentAyah: { surah: number; verse: number } | null;
    duration: number;
    currentTime: number;
  };
  surahName: string;
  totalVerses: number;
  onPause: () => void;
  onPlay: (surah: number, verse: number) => void;
  onStop: () => void;
  onSeek: (time: number) => void;
  onSkipPrev: (surah: number, verse: number) => void;
  onSkipNext: (surah: number, verse: number, total: number) => void;
}

export function BottomAudioPlayer({
  audio,
  surahName,
  totalVerses,
  onPause,
  onPlay,
  onStop,
  onSeek,
  onSkipPrev,
  onSkipNext,
}: BottomAudioPlayerProps) {
  if (!audio.currentAyah) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 animate-in slide-in-from-bottom"
    >
      <div 
        className="w-full border-t backdrop-blur-xl"
        style={{
          background: "rgba(var(--bg-secondary-rgb), 0.9)", // হালকা স্বচ্ছ ব্যাকগ্রাউন্ড
          borderColor: "var(--border)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.15)",
        }}
      >
        {/* Progress bar - Full Width */}
        <div
          className="h-1.5 w-full cursor-pointer relative group"
          style={{ background: "rgba(var(--border-rgb), 0.3)" }}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            onSeek(((e.clientX - r.left) / r.width) * audio.duration);
          }}
        >
          <div
            className="h-full transition-all duration-150 relative"
            style={{
              width: `${audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0}%`,
              background: "var(--green)",
            }}
          >
            {/* Progress Handle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-[var(--green)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md" />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 px-4 md:px-10 py-3">
          
          {/* Left Side: Surah & Ayah Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <h4 className="font-bold truncate text-[14px] md:text-[17px]" style={{ color: "var(--text-primary)" }}>
              {surahName}
            </h4>
            <p className="text-[11px] md:text-[13px] font-medium" style={{ color: "var(--text-muted)" }}>
              Ayah <span className="text-[var(--green)]">{audio.currentAyah.verse}</span> of {totalVerses}
            </p>
          </div>

          {/* Center Side: Playback Controls */}
          <div className="flex items-center gap-4 md:gap-10">
            <button
              onClick={() => audio.currentAyah && onSkipPrev(audio.currentAyah.surah, audio.currentAyah.verse)}
              disabled={audio.currentAyah.verse <= 1}
              className="p-2 rounded-full transition-all hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-20 active:scale-90"
              style={{ color: "var(--text-primary)" }}
            >
              <SkipBack size={24} fill="currentColor" />
            </button>

            <button
              onClick={() => audio.isPlaying ? onPause() : audio.currentAyah && onPlay(audio.currentAyah.surah, audio.currentAyah.verse)}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all hover:brightness-110"
              style={{ background: "var(--green)", color: "#fff" }}
            >
              {audio.isLoading ? (
                <Loader2 size={26} className="animate-spin" />
              ) : audio.isPlaying ? (
                <Pause size={26} fill="currentColor" />
              ) : (
                <Play size={26} fill="currentColor" className="ml-1" />
              )}
            </button>

            <button
              onClick={() => audio.currentAyah && onSkipNext(audio.currentAyah.surah, audio.currentAyah.verse, totalVerses)}
              disabled={audio.currentAyah.verse >= totalVerses}
              className="p-2 rounded-full transition-all hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-20 active:scale-90"
              style={{ color: "var(--text-primary)" }}
            >
              <SkipForward size={24} fill="currentColor" />
            </button>
          </div>

          {/* Right Side: Timer & Close Actions */}
          <div className="flex items-center justify-end gap-4 flex-1">
            <div className="hidden sm:flex items-center gap-2 tabular-nums text-[13px] font-medium" style={{ color: "var(--text-muted)" }}>
              <span style={{ color: "var(--text-primary)" }}>{fmt(audio.currentTime)}</span>
              <span className="opacity-40">/</span>
              <span>{fmt(audio.duration)}</span>
            </div>

            <div className="flex items-center gap-1 md:gap-2">
              <button
                className="hidden md:flex w-9 h-9 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                style={{ color: "var(--text-muted)" }}
              >
                <MoreHorizontal size={20} />
              </button>

              <button
                onClick={onStop}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-red-500"
              >
                <X size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}