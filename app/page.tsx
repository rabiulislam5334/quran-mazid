"use client";

import { useState, useEffect } from "react";
import { Collection, LastRead } from "./components/home/Collection";
import { SurahList } from "./components/home/SurahList";
import { AppBanner } from "./components/home/AppBanner";
import { SadaqahBanner } from "./components/home/SadaqahBanner";
import { Surah } from "./types";
import { FontSettingsPanel } from "./components/settings/FontSettingsPanel";
import { Hero } from "./components/home/Hero";
import { Footer } from "./components/layout/Footer";
import { fetchAllSurahs } from "./lib/api";
import { SearchModal } from "./components/search/SearchModal";
import { useFontSettings } from "./hooks/useFontSettings";
import { Navbar } from "./components/layout/Navbar";
import { useTheme } from "./hooks/useTheme";

export default function HomePage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lastReads, setLastReads] = useState<LastRead[]>([]);
  const { settings, setArabicFont, setArabicFontSize, setTranslationFontSize } = useFontSettings();
  
  // থিম হুক
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    fetchAllSurahs()
      .then((s) => { setSurahs(s); setLoading(false); })
      .catch(() => setLoading(false));

    try {
      const lr = localStorage.getItem("quran_last_read");
      if (lr) setLastReads([JSON.parse(lr)]);
    } catch {}
  }, []);

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      
      style={{ 
        background: "var(--bg-primary)", 
        color: "var(--text-primary)" 
      }}
    >
      {/* Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <FontSettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onFontChange={setArabicFont}
        onArabicSizeChange={setArabicFontSize}
        onTranslationSizeChange={setTranslationFontSize}
      />
      
   
      <Navbar 
        theme={theme} 
        setTheme={setTheme} 
        onSettingsClick={() => setSettingsOpen(true)} 
      />
      <main>
        <Hero onSearchClick={() => setSearchOpen(true)} />
        <Collection lastReads={lastReads} />
        
        <SurahList surahs={surahs} loading={loading} />
        
        <AppBanner />
        <SadaqahBanner />
      </main>

      <Footer />
    </div>
  );
}