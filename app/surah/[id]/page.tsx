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

// import { IconSidebar } from "./components/IconSidebar";
// import { SurahSidebar } from "./components/SurahSidebar";
// import { SurahNavbar } from "./components/SurahNavbar";
// import { AyahCard } from "./components/AyahCard";
// import { BottomAudioPlayer } from "./components/BottomAudioPlayer";
// import { RightPanel } from "./components/RightPanel";

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

  const { settings, setArabicFont, setArabicFontSize, setTranslationFontSize } =
    useFontSettings();
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
  const { theme, setTheme } = useTheme();

  // Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

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
    setData(null);
    fetchSurahAyahs(surahId)
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load. Check backend connection."); setLoading(false); });
  }, [surahId]);

  const surahName = data?.surah.transliteration ?? `Surah ${surahId}`;
  const totalVerses = data?.total_verses ?? data?.total ?? 0;
  const prevId = surahId > 1 ? surahId - 1 : null;
  const nextId = surahId < 114 ? surahId + 1 : null;

  // Parse ayahs from API response
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
      className="flex h-screen overflow-hidden"
      style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ══ LEFT ICON RAIL ══ */}
      <IconSidebar surahId={surahId} theme={theme} setTheme={setTheme} />

      {/* ══ SURAH SIDEBAR ══ */}
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

      {/* ══ CENTER READER ══ */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Sticky Navbar (hides on scroll down) */}
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

        {/* Scrollable content */}
        <div
          id="surah-scroll-area"
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: audio.currentAyah ? "72px" : "0" }}
        >
          {loading && (
            <div
              className="flex flex-col items-center justify-center py-24 gap-3"
              style={{ color: "var(--text-muted)" }}
            >
              <Loader2 size={32} className="animate-spin" style={{ color: "var(--gold)" }} />
              <p className="text-sm">Loading surah...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <AlertCircle size={28} className="text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{ color: "var(--gold)" }}
                className="text-xs hover:underline"
              >
                Retry
              </button>
            </div>
          )}

          {data && (
            <>
              {/* Surah header */}
              <div
                className="border-b px-4 sm:px-6 py-5 text-center relative flex-shrink-0"
                style={{
                  background: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="absolute left-4 sm:left-6 top-4 opacity-20 text-3xl">🕌</div>
                <h1
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Surah {data.surah.transliteration}
                </h1>
                <div
                  className="flex items-center justify-center gap-2 mt-1"
                  style={{ color: "var(--text-muted)", fontSize: "13px" }}
                >
                  <MapPin size={11} />
                  <span>Ayah-{data.total ?? data.total_verses}</span>
                  <span>·</span>
                  <span>{data.surah.type === "meccan" ? "Makkah" : "Madinah"}</span>
                </div>
              </div>

              {/* Ayah list */}
              <div>
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

              {/* Prev / Next */}
              <div
                className="flex items-center justify-between px-4 sm:px-6 py-6 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                {prevId ? (
                  <Link
                    href={`/surah/${prevId}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
                    }
                  >
                    <ChevronLeft size={15} />
                    <div>
                      <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>Previous</div>
                      <div className="text-xs font-medium">
                        {allSurahs[prevId - 1]?.transliteration}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextId && (
                  <Link
                    href={`/surah/${nextId}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition ml-auto"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor = "var(--gold)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
                    }
                  >
                    <div className="text-right">
                      <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>Next</div>
                      <div className="text-xs font-medium">
                        {allSurahs[nextId - 1]?.transliteration}
                      </div>
                    </div>
                    <ChevronRight size={15} />
                  </Link>
                )}
              </div>
            </>
          )}
        </div>

        {/* ══ BOTTOM AUDIO PLAYER ══ */}
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
      </main>

      {/* ══ RIGHT PANEL ══ */}
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

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
