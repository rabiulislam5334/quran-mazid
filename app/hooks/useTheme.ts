"use client";
import { useState, useEffect, useCallback } from "react";

export type Theme = "dark" | "light" | "sepia" | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("light"); // ← ডিফল্ট লাইট করা হয়েছে

  useEffect(() => {
    const stored = localStorage.getItem("quran_theme") as Theme | null;
    
    // যদি আগে কোনো থিম সেভ না থাকে তাহলে লাইট হবে
    const initialTheme = stored || "light"; 
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", t);
    }
  };

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    localStorage.setItem("quran_theme", t);
    applyTheme(t);
  }, []);

  return { theme, setTheme };
}