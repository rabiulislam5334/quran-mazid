"use client";

import { Play, Pause, SkipBack, SkipForward, X, Loader2 } from "lucide-react";
import { clsx } from "clsx";

interface BottomPlayerProps {
  isPlaying: boolean;
  isLoading: boolean;
  currentAyah: { surah: number; verse: number } | null;
  surahName: string;
  currentTime: number;
  duration: number;
  totalVerses: number;
  onPlayPause: () => void;
  onStop: () => void;
  onSeek: (time: number) => void;
  onSkipPrev: () => void;
  onSkipNext: () => void;
}

function formatTime(sec: number): string {
  if (!sec || isNaN(sec)) return "00:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function BottomPlayer({
  isPlaying,
  isLoading,
  currentAyah,
  surahName,
  currentTime,
  duration,
  totalVerses,
  onPlayPause,
  onStop,
  onSeek,
  onSkipPrev,
  onSkipNext,
}: BottomPlayerProps) {
  if (!currentAyah) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary border-t border-border shadow-2xl">
      {/* Progress bar */}
      <div className="relative h-1 bg-border cursor-pointer group" onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        onSeek(ratio * duration);
      }}>
        <div
          className="absolute left-0 top-0 h-full bg-gold transition-all"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity shadow"
          style={{ left: `calc(${progress}% - 6px)` }}
        />
      </div>

      <div className="flex items-center gap-3 px-4 py-2.5 md:px-6">
        {/* Surah + verse info */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <div className="w-8 h-8 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="text-gold text-xs font-bold">{currentAyah.surah}</span>
          </div>
          <div className="min-w-0">
            <p className="text-text-primary text-sm font-medium truncate">
              {surahName} : {currentAyah.verse}
            </p>
            <p className="text-text-muted text-xs">{formatTime(currentTime)}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSkipPrev}
            disabled={currentAyah.verse <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary hover:bg-bg-hover transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous ayah"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={onPlayPause}
            className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all",
              "bg-gold text-bg-primary hover:bg-gold-light shadow-lg shadow-gold/20"
            )}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : isPlaying ? (
              <Pause size={18} fill="currentColor" />
            ) : (
              <Play size={18} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <button
            onClick={onSkipNext}
            disabled={currentAyah.verse >= totalVerses}
            className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary hover:bg-bg-hover transition disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next ayah"
          >
            <SkipForward size={16} />
          </button>

          <button
            onClick={onStop}
            className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:text-red-400 hover:bg-bg-hover transition ml-1"
            aria-label="Stop"
          >
            <X size={16} />
          </button>
        </div>

        {/* Duration */}
        <div className="hidden sm:block text-xs text-text-muted min-w-[40px] text-right">
          {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}
