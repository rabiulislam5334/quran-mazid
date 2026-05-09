"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, MapPin } from "lucide-react";
import { Surah, SurahWithAyahs } from "@/app/types";
import { fetchAllSurahs, fetchSurahAyahs } from "@/app/lib/api";
import { SearchModal } from "@/app/components/search/SearchModal";
import { useFontSettings } from "@/app/hooks/useFontSettings";
import { useAudioPlayer } from "@/app/hooks/useAudioPlayer";
import { useTheme } from "@/app/hooks/useTheme";
import { SurahSidebar } from "@/app/components/layout/SurahSidebar";
import { IconSidebar } from "@/app/components/layout/IconSidebar";
import { SurahNavbar } from "@/app/components/layout/SurahNavbar";
import { AyahCard } from "@/app/components/ayah/AyahCard";
import { BottomAudioPlayer } from "@/app/components/audio/BottomPlayer";
import { RightPanel } from "@/app/components/layout/RightPanel";

export default function SurahPage() {
  const params = useParams();
  const surahId = Number(params.id);

  const [data, setData] = useState<SurahWithAyahs | null>(null);
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [surahFilter, setSurahFilter] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"surah" | "juz" | "page">("surah");
  const [fontPanelOpen, setFontPanelOpen] = useState(true);
  const [readingPanelOpen, setReadingPanelOpen] = useState(false);

  const { settings, setArabicFont, setArabicFontSize, setTranslationFontSize } = useFontSettings();
  const { theme, setTheme } = useTheme();
  
  const {
    state: audio,
    playAyah,
    pause,
    stop,
    seek,
    skipPrev,
    skipNext,
    isPlayingAyah,
    isLoadingAyah,
  } = useAudioPlayer(data?.total_verses ?? data?.total ?? 114);

  useEffect(() => {
    fetchAllSurahs().then(setAllSurahs).catch(() => {});
  }, []);

  useEffect(() => {
    if (!surahId || surahId < 1 || surahId > 114) {
      setError("Invalid surah");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetchSurahAyahs(surahId)
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load."); setLoading(false); });
  }, [surahId]);

  const surahName = data?.surah.transliteration ?? `Surah ${surahId}`;
  const totalVerses = data?.total_verses ?? data?.total ?? 0;
  const prevId = surahId > 1 ? surahId - 1 : null;
  const nextId = surahId < 114 ? surahId + 1 : null;

  const allVerses = (() => {
    if (!data) return [];
    const ayahsArray = Object.values(data?.ayahs || {});
    let verses: any[] = [];

    for (const item of ayahsArray) {
      if (item?.text && typeof item.text === "object" && !Array.isArray(item.text)) {
        Object.keys(item.text).forEach((key) => {
          const verseNum = parseInt(key.replace("verse_", ""));
          if (verseNum) {
            verses.push({
              verse: verseNum,
              text: item.text[key],
              translation: item.translation?.[key] || "",
              audio_url: item.audio_url,
              surah: item.surah,
            });
          }
        });
        break;
      }
    }

    if (verses.length === 0) {
      verses = ayahsArray
        .map((item: any) => {
          let ayah = item;
          if (item && typeof item === "object" && !item.verse) {
            ayah = Object.values(item)[0];
          }
          return ayah;
        })
        .filter(Boolean);
    }
    return verses;
  })();

  return (
    <div
      className="flex min-h-screen" 
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
   
      <div className="sticky top-0 h-screen shrink-0">
        <IconSidebar surahId={surahId} theme={theme} setTheme={setTheme} />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        
     
        <SurahNavbar
          surahName={surahName}
          surahId={surahId}
          prevId={prevId}
          nextId={nextId}
          theme={theme}
          setTheme={setTheme}
          onSearchOpen={() => setSearchOpen(true)}
          onMobileSidebar={() => setMobileSidebar(true)}
        />

        <div className="flex flex-1 items-start">
          
        
          <aside className="sticky top-0 h-screen overflow-y-auto hidden md:block shrink-0">
            <SurahSidebar
                surahId={surahId}
                allSurahs={allSurahs}
                mobileSidebar={mobileSidebar}
                setMobileSidebar={setMobileSidebar}
                sidebarTab={sidebarTab}
                setSidebarTab={setSidebarTab}
                surahFilter={surahFilter}
                setSurahFilter={setSurahFilter}
            />
          </aside>

      
          <main className="flex-1 min-w-0 border-x" style={{ borderColor: "var(--border)" }}>
            <div className="pb-24"> 
              {loading && (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                  <Loader2 size={32} className="animate-spin text-[#2d6a2d]" />
                  <p className="text-sm text-gray-400">Loading surah...</p>
                </div>
              )}

              {data && (
                <>
                  <div className="border-b px-6 py-8 text-center" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
                    <h1 className="text-2xl font-bold">Surah {data.surah.transliteration}</h1>
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
                      <MapPin size={14} />
                      <span>{data.surah.type === "meccan" ? "Makkah" : "Madinah"}</span>
                      <span>•</span>
                      <span>{data.total ?? data.total_verses} Ayahs</span>
                    </div>
                  </div>

                  <div className="max-w-5xl mx-auto w-full">
                    {allVerses.map((ayah: any) => (
                      <AyahCard
                        key={`${surahId}-${ayah.verse}`}
                        ayah={ayah}
                        surahId={surahId}
                        surahName={surahName}
                        fontSettings={settings}
                        isPlaying={isPlayingAyah(surahId, ayah.verse)}
                        isLoading={isLoadingAyah(surahId, ayah.verse)}
                        onPlay={() => playAyah(surahId, ayah.verse)}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between px-6 py-10 max-w-5xl mx-auto w-full">
                    {prevId ? (
                      <Link href={`/surah/${prevId}`} className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50 transition">
                        <ChevronLeft size={16} /> Previous
                      </Link>
                    ) : <div />}
                    {nextId && (
                      <Link href={`/surah/${nextId}`} className="flex items-center gap-2 px-4 py-2 rounded-xl border hover:bg-gray-50 transition">
                        Next <ChevronRight size={16} />
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>
          </main>

      
          <aside className="sticky top-0 h-screen overflow-y-auto hidden lg:block shrink-0">
            <RightPanel
                settings={settings}
                fontPanelOpen={fontPanelOpen}
                setFontPanelOpen={setFontPanelOpen}
                readingPanelOpen={readingPanelOpen}
                setReadingPanelOpen={setReadingPanelOpen}
                setArabicFont={setArabicFont}
                setArabicFontSize={setArabicFontSize}
                setTranslationFontSize={setTranslationFontSize}
            />
          </aside>
        </div>
      </div>

    
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomAudioPlayer
            audio={audio}
            surahName={surahName}
            totalVerses={totalVerses}
            onPause={pause}
            onPlay={playAyah}
            onStop={stop}
            onSeek={seek}
            onSkipPrev={skipPrev}
            onSkipNext={skipNext}
        />
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}