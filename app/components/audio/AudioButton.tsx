"use client";

import { Play, Pause, Loader2 } from "lucide-react";

interface AudioButtonProps {
  surahId: number;
  verseNum: number;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: (surahId: number, verseNum: number) => void;
  size?: "sm" | "md";
}

export function AudioButton({
  surahId,
  verseNum,
  isPlaying,
  isLoading,
  onPlay,
  size = "md",
}: AudioButtonProps) {
  const sizeClass = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const iconSize = size === "sm" ? 13 : 15;

  return (
    <button
      onClick={() => onPlay(surahId, verseNum)}
      aria-label={isPlaying ? "Pause" : "Play"}
      style={
        isPlaying
          ? { background: "var(--green)", color: "#fff", border: "none" }
          : {
              background: "var(--bg-tertiary)",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }
      }
      className={`${sizeClass} rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 active:scale-90 hover:opacity-80`}
    >
      {isLoading ? (
        <Loader2 size={iconSize} className="animate-spin" style={{ color: "var(--green-active)" }} />
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
      {[0.3, 0.6, 1, 0.7, 0.4].map((h, i) => (
        <div
          key={i}
          className="w-0.5 rounded-full"
          style={{
            background: "var(--green-active)",
            height: `${h * 14}px`,
            animation: `soundwave 0.8s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes soundwave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}