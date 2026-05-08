"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Surah, SurahWithAyahs } from "@/app/types";
import { fetchAllSurahs, fetchSurahAyahs } from "@/app/lib/api";
import { SearchModal } from "@/app/components/search/SearchModal";
import { FontSettingsPanel } from "@/app/components/settings/FontSettingsPanel";
import { SurahHeader } from "@/app/components/surah/SurahHeader";
import { BottomPlayer } from "@/app/components/audio/BottomPlayer";
// import { fetchSurahAyahs, fetchAllSurahs } from "@/lib/api";
// import { IconSidebar }      from "@/components/layout/IconSidebar";
// import { SurahSidebar }     from "@/components/layout/SurahSidebar";
// import { MobileHeader }     from "@/components/layout/MobileHeader";
// import { SearchModal }      from "@/components/search/SearchModal";
// import { FontSettingsPanel } from "@/components/settings/FontSettingsPanel";
// import { SurahHeader }      from "@/components/surah/SurahHeader";
// import { AyahCard }         from "@/components/ayah/AyahCard";
// import { BottomPlayer }     from "@/components/audio/BottomPlayer";
// import { useFontSettings }  from "@/hooks/useFontSettings";
// import { useAudioPlayer }   from "@/hooks/useAudioPlayer";
// import type { Surah, SurahWithAyahs } from "@/types";

export default function SurahPage() {
  const params  = useParams();
  const surahId = Number(params.id);

  const [data,        setData]        = useState<SurahWithAyahs | null>(null);
  const [allSurahs,   setAllSurahs]   = useState<Surah[]>([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [settingsOpen,setSettingsOpen]= useState(false);

  const { settings, setArabicFont, setArabicFontSize, setTranslationFontSize } = useFontSettings();
  const { state: audio, playAyah, pause, stop, seek, skipPrev, skipNext, isPlayingAyah, isLoadingAyah } = useAudioPlayer();

  useEffect(() => { fetchAllSurahs().then(setAllSurahs).catch(console.error); }, []);

  useEffect(() => {
    if (!surahId || surahId < 1 || surahId > 114) { setError("Invalid surah"); setIsLoading(false); return; }
    setIsLoading(true); setError(null); setData(null);
    fetchSurahAyahs(surahId)
      .then((d) => { setData(d); setIsLoading(false); })
      .catch(() => { setError("Failed to load surah. Please check your connection."); setIsLoading(false); });
  }, [surahId]);

  const handlePlay = useCallback((sid: number, verse: number) => { playAyah(sid, verse); }, [playAyah]);

  const prevSurah = surahId > 1   ? surahId - 1 : null;
  const nextSurah = surahId < 114 ? surahId + 1 : null;

  const surahName = data?.surah.transliteration ?? `Surah ${surahId}`;
  const totalVerses = data?.total ?? 0;

  return (
    <div className="flex min-h-screen">
      <IconSidebar onSearchClick={() => setSearchOpen(true)} onSettingsClick={() => setSettingsOpen(true)} />
      <SurahSidebar surahs={allSurahs} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <FontSettingsPanel
        isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}
        settings={settings} onFontChange={setArabicFont}
        onArabicSizeChange={setArabicFontSize} onTranslationSizeChange={setTranslationFontSize}
      />
      <MobileHeader
        title={surahName}
        onMenuClick={() => setSidebarOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        onSettingsClick={() => setSettingsOpen(true)}
      />

      <main className={`flex-1 md:ml-[calc(56px+288px)] min-h-screen page-enter ${audio.currentAyah ? "pb-20" : ""}`}>
        {isLoading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3 text-text-muted">
              <Loader2 size={32} className="animate-spin text-gold" />
              <p className="text-sm">Loading surah...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <AlertCircle size={32} className="text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
              <button onClick={() => window.location.reload()} className="text-xs text-gold hover:underline mt-1">Try again</button>
            </div>
          </div>
        )}

        {data && (
          <>
            <SurahHeader surah={data.surah} totalAyahs={data.total} />
            <div>
              {data.ayahs.map((ayah) => (
                <AyahCard
                  key={ayah.verse}
                  ayah={ayah}
                  surahId={surahId}
                  surahName={surahName}
                  fontSettings={settings}
                  isPlaying={isPlayingAyah(surahId, ayah.verse)}
                  isLoading={isLoadingAyah(surahId, ayah.verse)}
                  onPlay={handlePlay}
                />
              ))}
            </div>

            {/* Prev / Next */}
            <div className="flex items-center justify-between px-6 py-8 border-t border-border">
              {prevSurah ? (
                <Link href={`/surah/${prevSurah}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border rounded-xl text-sm text-text-secondary hover:border-gold/30 hover:text-text-primary transition-all group">
                  <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                  <div>
                    <div className="text-xs text-text-muted">Previous</div>
                    <div className="font-medium">{allSurahs[prevSurah - 1]?.transliteration ?? `Surah ${prevSurah}`}</div>
                  </div>
                </Link>
              ) : <div />}

              {nextSurah && (
                <Link href={`/surah/${nextSurah}`}
                  className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-border rounded-xl text-sm text-text-secondary hover:border-gold/30 hover:text-text-primary transition-all group text-right ml-auto">
                  <div>
                    <div className="text-xs text-text-muted">Next</div>
                    <div className="font-medium">{allSurahs[nextSurah - 1]?.transliteration ?? `Surah ${nextSurah}`}</div>
                  </div>
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </>
        )}
      </main>

      {/* Bottom persistent audio player */}
      <BottomPlayer
        isPlaying={audio.isPlaying}
        isLoading={audio.isLoading}
        currentAyah={audio.currentAyah}
        surahName={surahName}
        currentTime={audio.currentTime}
        duration={audio.duration}
        totalVerses={totalVerses}
        onPlayPause={() => audio.isPlaying ? pause() : (audio.currentAyah && playAyah(audio.currentAyah.surah, audio.currentAyah.verse))}
        onStop={stop}
        onSeek={seek}
        onSkipPrev={() => audio.currentAyah && skipPrev(audio.currentAyah.surah, audio.currentAyah.verse)}
        onSkipNext={() => audio.currentAyah && skipNext(audio.currentAyah.surah, audio.currentAyah.verse, totalVerses)}
      />
    </div>
  );
}
