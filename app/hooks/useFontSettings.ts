"use client";

import { useState, useEffect, useCallback } from "react";
import { ArabicFont, FontSettings } from "../types";


const DEFAULT_SETTINGS: FontSettings = {
  arabicFont: "uthmani",
  arabicFontSize: 28,
  translationFontSize: 16,
};

const STORAGE_KEY = "quran_font_settings";

export function useFontSettings() {
  const [settings, setSettings] = useState<FontSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(stored) });
    } catch {}
  }, []);

  const updateSettings = useCallback((updates: Partial<FontSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...updates };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setArabicFont = useCallback((font: ArabicFont) => updateSettings({ arabicFont: font }), [updateSettings]);
  const setArabicFontSize = useCallback((size: number) => updateSettings({ arabicFontSize: size }), [updateSettings]);
  const setTranslationFontSize = useCallback((size: number) => updateSettings({ translationFontSize: size }), [updateSettings]);

  return { settings, setArabicFont, setArabicFontSize, setTranslationFontSize };
}
