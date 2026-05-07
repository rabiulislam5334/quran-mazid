"use client";

import { Play, Pause, Loader2 } from "lucide-react";
 import { clsx } from "clsx";

interface AudioButtonProps {
  surahId: number;
  verseNum: number;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (surahId: number, verseNum: number) => void;
  size?: "sm" | "md";
}

export function AudioButton({ surahId, verseNum, isPlaying, isLoading, onPlay, size = "md" }: AudioButtonProps) {
  const sizeClass = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const iconSize = size === "sm" ? 12 : 15;

  return (
    <button
      onClick={() => onPlay(surahId, verseNum)}
      aria-label={isPlaying ? "Pause" : "Play"}
      className={clsx(
        sizeClass,
        "rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0",
        isPlaying
          ? "bg-gold text-bg-primary shadow-lg shadow-gold/30"
          : "bg-bg-tertiary border border-border text-text-muted hover:border-gold/50 hover:text-gold hover:bg-gold/10"
      )}
    >
      {isLoading ? (
        <Loader2 size={iconSize} className="animate-spin" />
      ) : isPlaying ? (
        <Pause size={iconSize} fill="currentColor" />
      ) : (
        <Play size={iconSize} fill="currentColor" className="ml-0.5" />
      )}
    </button>
  );
}

export function SoundWave() {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="soundwave-bar" style={{ animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}