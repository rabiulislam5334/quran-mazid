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
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.12)",
      }}
    >
      {/* Progress bar */}
      <div
        className="h-1 w-full cursor-pointer relative"
        style={{ background: "var(--border)" }}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          onSeek(((e.clientX - r.left) / r.width) * audio.duration);
        }}
      >
        <div
          className="h-full transition-all duration-150"
          style={{
            width: `${
              audio.duration > 0
                ? (audio.currentTime / audio.duration) * 100
                : 0
            }%`,
            background: "var(--green)",
          }}
        />
      </div>

      <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5">
        {/* Surah info */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <p
            className="font-semibold truncate"
            style={{ color: "var(--text-primary)", fontSize: "13px" }}
          >
            {surahName} :{" "}
            <span style={{ color: "var(--green-active)" }}>
              {audio.currentAyah.verse}
            </span>
          </p>
        </div>

        {/* Time left */}
        <span
          className="hidden sm:block tabular-nums"
          style={{ color: "var(--text-muted)", fontSize: "12px" }}
        >
          {fmt(audio.currentTime)}
        </span>

        {/* Dots */}
        <button
          className="w-7 h-7 flex items-center justify-center rounded-full"
          style={{ color: "var(--text-muted)" }}
        >
          <MoreHorizontal size={16} />
        </button>

        {/* Skip prev */}
        <button
          onClick={() =>
            audio.currentAyah &&
            onSkipPrev(audio.currentAyah.surah, audio.currentAyah.verse)
          }
          disabled={audio.currentAyah.verse <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-full transition disabled:opacity-30"
          style={{ color: "var(--text-muted)" }}
        >
          <SkipBack size={18} fill="currentColor" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={() =>
            audio.isPlaying
              ? onPause()
              : audio.currentAyah &&
                onPlay(audio.currentAyah.surah, audio.currentAyah.verse)
          }
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition"
          style={{ background: "var(--green)", color: "#fff" }}
        >
          {audio.isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : audio.isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" className="ml-0.5" />
          )}
        </button>

        {/* Skip next */}
        <button
          onClick={() =>
            audio.currentAyah &&
            onSkipNext(audio.currentAyah.surah, audio.currentAyah.verse, totalVerses)
          }
          disabled={audio.currentAyah.verse >= totalVerses}
          className="w-8 h-8 flex items-center justify-center rounded-full transition disabled:opacity-30"
          style={{ color: "var(--text-muted)" }}
        >
          <SkipForward size={18} fill="currentColor" />
        </button>

        {/* Stop */}
        <button
          onClick={onStop}
          className="w-7 h-7 flex items-center justify-center rounded-full transition"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "#f87171")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
          }
        >
          <X size={16} />
        </button>

        {/* Duration */}
        <span
          className="hidden sm:block tabular-nums"
          style={{ color: "var(--text-muted)", fontSize: "12px" }}
        >
          {fmt(audio.duration)}
        </span>
      </div>
    </div>
  );
}
