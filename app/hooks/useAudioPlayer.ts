"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const VERSE_COUNTS: number[] = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
  111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73,
  54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60,
  49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52,
  44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19,
  26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3,
  6, 3, 5, 4, 5, 6,
];

export function getTotalVerses(surahId: number): number {
  return VERSE_COUNTS[surahId - 1] ?? 7;
}

function getAudioUrl(surahId: number, verseNum: number): string {
  let globalNum = 0;
  for (let i = 0; i < surahId - 1; i++) {
    globalNum += VERSE_COUNTS[i] ?? 0;
  }
  globalNum += verseNum;
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNum}.mp3`;
}

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
  const currentAyahRef = useRef<{ surah: number; verse: number } | null>(null);
  const isPlayingRef = useRef(false);

  const [state, setState] = useState<AudioState>({
    isPlaying: false,
    isLoading: false,
    currentAyah: null,
    duration: 0,
    currentTime: 0,
    error: null,
  });

  const playAyah = useCallback(async (surahId: number, verseNum: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const isSame =
      currentAyahRef.current?.surah === surahId &&
      currentAyahRef.current?.verse === verseNum;

    if (isSame) {
      isPlayingRef.current ? audio.pause() : audio.play().catch(console.error);
      return;
    }

    audio.pause();
    currentAyahRef.current = { surah: surahId, verse: verseNum };

    setState((s) => ({
      ...s,
      currentAyah: { surah: surahId, verse: verseNum },
      currentTime: 0,
      duration: 0,
      isLoading: true,
      error: null,
    }));

    audio.src = getAudioUrl(surahId, verseNum);
    audio.load();

    try {
      await audio.play();
    } catch (e) {
      setState((s) => ({ ...s, error: "Failed to play audio", isLoading: false }));
    }
  }, []);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.src = ""; }
    currentAyahRef.current = null;
    isPlayingRef.current = false;
    setState({ isPlaying: false, isLoading: false, currentAyah: null, currentTime: 0, duration: 0, error: null });
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);

  const skipPrev = useCallback((surahId: number, verseNum: number) => {
    if (verseNum > 1) playAyah(surahId, verseNum - 1);
  }, [playAyah]);

  const skipNext = useCallback((surahId: number, verseNum: number) => {
    const total = getTotalVerses(surahId);
    if (verseNum < total) playAyah(surahId, verseNum + 1);
  }, [playAyah]);

  const isPlayingAyah = useCallback(
    (surahId: number, verseNum: number) =>
      state.isPlaying && state.currentAyah?.surah === surahId && state.currentAyah?.verse === verseNum,
    [state.isPlaying, state.currentAyah]
  );

  const isLoadingAyah = useCallback(
    (surahId: number, verseNum: number) =>
      state.isLoading && state.currentAyah?.surah === surahId && state.currentAyah?.verse === verseNum,
    [state.isLoading, state.currentAyah]
  );

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "auto";
    audioRef.current = audio;

    const onPlay = () => {
      isPlayingRef.current = true;
      setState((s) => ({ ...s, isPlaying: true, isLoading: false }));
    };
    const onPause = () => {
      isPlayingRef.current = false;
      setState((s) => ({ ...s, isPlaying: false }));
    };
    const onLoadStart = () => setState((s) => ({ ...s, isLoading: true, error: null }));
    const onCanPlay = () => setState((s) => ({ ...s, isLoading: false }));
    const onDurationChange = () =>
      setState((s) => ({ ...s, duration: isNaN(audio.duration) ? 0 : audio.duration }));
    const onTimeUpdate = () =>
      setState((s) => ({ ...s, currentTime: audio.currentTime }));
    const onError = () =>
      setState((s) => ({ ...s, isLoading: false, isPlaying: false, error: "Audio unavailable" }));

    const onEnded = () => {
      isPlayingRef.current = false;

      // ref থেকে সরাসরি পড়ো — stale closure নেই
      const current = currentAyahRef.current;
      if (!current) return;

      const total = getTotalVerses(current.surah); // সঠিক total, সবসময়
      const nextVerse = current.verse + 1;

      if (nextVerse > total) {
        setState((s) => ({ ...s, isPlaying: false }));
        return;
      }

      const nextUrl = getAudioUrl(current.surah, nextVerse);
      currentAyahRef.current = { surah: current.surah, verse: nextVerse };

      setState((s) => ({
        ...s,
        isPlaying: false,
        isLoading: true,
        currentAyah: { surah: current.surah, verse: nextVerse },
        currentTime: 0,
        duration: 0,
      }));

      setTimeout(() => {
        audio.src = nextUrl;
        audio.load();
        audio.play().catch(() => {
          setState((s) => ({ ...s, isLoading: false, isPlaying: false }));
        });
      }, 200);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.src = "";
    };
  }, []);

  return { state, playAyah, pause, stop, seek, skipPrev, skipNext, isPlayingAyah, isLoadingAyah, getTotalVerses };
}
