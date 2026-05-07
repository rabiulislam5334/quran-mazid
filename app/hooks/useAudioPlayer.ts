"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { getAudioUrl } from "../lib/api";


interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  currentAyah: { surah: number; verse: number } | null;
  duration: number;
  currentTime: number;
  error: string | null;
}

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentAyah: null,
    duration: 0,
    currentTime: 0,
    error: null,
  });

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handlers = {
      play: () => setState((s) => ({ ...s, isPlaying: true, isLoading: false })),
      pause: () => setState((s) => ({ ...s, isPlaying: false })),
      ended: () => setState((s) => ({ ...s, isPlaying: false, currentAyah: null, currentTime: 0 })),
      loadstart: () => setState((s) => ({ ...s, isLoading: true, error: null })),
      canplay: () => setState((s) => ({ ...s, isLoading: false })),
      durationchange: () => setState((s) => ({ ...s, duration: audio.duration || 0 })),
      timeupdate: () => setState((s) => ({ ...s, currentTime: audio.currentTime })),
      error: () => setState((s) => ({ ...s, isLoading: false, isPlaying: false, error: "Audio unavailable" })),
    };

    for (const [event, handler] of Object.entries(handlers)) {
      audio.addEventListener(event, handler);
    }

    return () => {
      for (const [event, handler] of Object.entries(handlers)) {
        audio.removeEventListener(event, handler);
      }
      audio.pause();
    };
  }, []);

  const playAyah = useCallback(async (surahId: number, verseNum: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const isSameAyah =
      state.currentAyah?.surah === surahId && state.currentAyah?.verse === verseNum;

    if (isSameAyah) {
      if (state.isPlaying) {
        audio.pause();
      } else {
        await audio.play().catch(console.error);
      }
      return;
    }

    audio.pause();
    audio.src = getAudioUrl(surahId, verseNum);
    setState((s) => ({
      ...s,
      currentAyah: { surah: surahId, verse: verseNum },
      currentTime: 0,
      duration: 0,
    }));

    await audio.play().catch(() => {
      setState((s) => ({ ...s, error: "Failed to play audio" }));
    });
  }, [state.currentAyah, state.isPlaying]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setState((s) => ({ ...s, isPlaying: false, currentAyah: null, currentTime: 0 }));
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  const isPlayingAyah = useCallback(
    (surahId: number, verseNum: number) =>
      state.isPlaying &&
      state.currentAyah?.surah === surahId &&
      state.currentAyah?.verse === verseNum,
    [state]
  );

  const isLoadingAyah = useCallback(
    (surahId: number, verseNum: number) =>
      state.isLoading &&
      state.currentAyah?.surah === surahId &&
      state.currentAyah?.verse === verseNum,
    [state]
  );

  return { state, playAyah, pause, stop, seek, isPlayingAyah, isLoadingAyah };
}
