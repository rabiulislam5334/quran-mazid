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

const INITIAL_STATE: AudioState = {
  isPlaying: false,
  isLoading: false,
  currentAyah: null,
  duration: 0,
  currentTime: 0,
  error: null,
};

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stateRef = useRef<AudioState>(INITIAL_STATE);
  const [state, setState] = useState<AudioState>(INITIAL_STATE);

  const updateState = useCallback((updates: Partial<AudioState>) => {
    setState((prev) => {
      const next = { ...prev, ...updates };
      stateRef.current = next;
      return next;
    });
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    audio.addEventListener("play", () => updateState({ isPlaying: true, isLoading: false }));
    audio.addEventListener("pause", () => updateState({ isPlaying: false }));
    audio.addEventListener("ended", () => updateState({ isPlaying: false, currentAyah: null, currentTime: 0 }));
    audio.addEventListener("loadstart", () => updateState({ isLoading: true, error: null }));
    audio.addEventListener("canplay", () => updateState({ isLoading: false }));
    audio.addEventListener("durationchange", () => updateState({ duration: audio.duration || 0 }));
    audio.addEventListener("timeupdate", () => updateState({ currentTime: audio.currentTime }));
    audio.addEventListener("error", () => updateState({ isLoading: false, isPlaying: false, error: "Audio unavailable" }));

    return () => { audio.pause(); };
  }, [updateState]);

  const playAyah = useCallback(async (surahId: number, verseNum: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const cur = stateRef.current;
    const isSame = cur.currentAyah?.surah === surahId && cur.currentAyah?.verse === verseNum;

    if (isSame) {
      if (cur.isPlaying) { audio.pause(); } else { await audio.play().catch(console.error); }
      return;
    }

    audio.pause();
    audio.src = getAudioUrl(surahId, verseNum);
    updateState({ currentAyah: { surah: surahId, verse: verseNum }, currentTime: 0, duration: 0 });
    await audio.play().catch(() => updateState({ error: "Failed to play audio" }));
  }, [updateState]);

  const pause = useCallback(() => { audioRef.current?.pause(); }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    updateState({ isPlaying: false, currentAyah: null, currentTime: 0 });
  }, [updateState]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  const skipPrev = useCallback(async (surahId: number, currentVerse: number, totalVerses: number) => {
    if (currentVerse > 1) await playAyah(surahId, currentVerse - 1);
  }, [playAyah]);

  const skipNext = useCallback(async (surahId: number, currentVerse: number, totalVerses: number) => {
    if (currentVerse < totalVerses) await playAyah(surahId, currentVerse + 1);
  }, [playAyah]);

  const isPlayingAyah = useCallback(
    (surahId: number, verseNum: number) =>
      state.isPlaying && state.currentAyah?.surah === surahId && state.currentAyah?.verse === verseNum,
    [state]
  );

  const isLoadingAyah = useCallback(
    (surahId: number, verseNum: number) =>
      state.isLoading && state.currentAyah?.surah === surahId && state.currentAyah?.verse === verseNum,
    [state]
  );

  return { state, playAyah, pause, stop, seek, skipPrev, skipNext, isPlayingAyah, isLoadingAyah };
}