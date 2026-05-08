"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2, AlertCircle, BookOpen, Type, X, Search, Settings, Moon, Home, Headphones, Bookmark, Info, Play, Pause, SkipBack, SkipForward, Copy, Share2, Check, Loader, MapPin } from "lucide-react";
import { clsx } from "clsx";
import { ArabicFont, FontSettings, Surah, SurahWithAyahs } from "@/app/types";
import { fetchAllSurahs, fetchSurahAyahs, searchAyahs } from "@/app/lib/api";
import { SearchModal } from "@/app/components/search/SearchModal";
import { useFontSettings } from "@/app/hooks/useFontSettings";
import { useAudioPlayer } from "@/app/hooks/useAudioPlayer";
// import type { Surah, SurahWithAyahs, FontSettings, ArabicFont } from "@/types";
// import { fetchAllSurahs, fetchSurahAyahs } from "@/lib/api";
// import { SearchModal } from "@/components/search/SearchModal";
// import { useFontSettings } from "@/hooks/useFontSettings";
// import { useAudioPlayer } from "@/hooks/useAudioPlayer";

/* ─── Font map ─── */
const FONT_FAMILIES: Record<ArabicFont, string> = {
  uthmani:      "'KFGQPC Uthmanic Script','Scheherazade New',serif",
  amiri:        "'Amiri Quran','Amiri',serif",
  scheherazade: "'Scheherazade New',serif",
};
const ARABIC_FONTS: { id: ArabicFont; label: string }[] = [
  { id: "uthmani",      label: "KFGQ" },
  { id: "amiri",        label: "Amiri" },
  { id: "scheherazade", label: "Scheherazade" },
];

/* ─── Time formatter ─── */
function fmt(s: number) {
  if (!s || isNaN(s)) return "00:00";
  return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(Math.floor(s%60)).padStart(2,"0")}`;
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function SurahPage() {
  const params  = useParams();
  const surahId = Number(params.id);

  const [data,         setData]         = useState<SurahWithAyahs
   | null>(null);
  const [allSurahs,    setAllSurahs]    = useState<Surah[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [surahFilter,  setSurahFilter]  = useState("");
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [rightPanel,   setRightPanel]   = useState<"settings"|null>("settings");
  const [mobileSidebar,setMobileSidebar]= useState(false);

  const { settings, setArabicFont, setArabicFontSize, setTranslationFontSize } = useFontSettings();
  const { state: audio, playAyah, pause, stop, seek, skipPrev, skipNext, isPlayingAyah, isLoadingAyah } = useAudioPlayer();

  useEffect(() => { fetchAllSurahs().then(setAllSurahs).catch(()=>{}); }, []);
  useEffect(() => {
    if (!surahId||surahId<1||surahId>114) { setError("Invalid surah"); setLoading(false); return; }
    setLoading(true); setError(null); setData(null);
    fetchSurahAyahs(surahId)
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load. Check backend connection."); setLoading(false); });
  }, [surahId]);

  const filteredSurahs = surahFilter
    ? allSurahs.filter(s =>
        s.transliteration.toLowerCase().includes(surahFilter.toLowerCase()) ||
        s.translation.toLowerCase().includes(surahFilter.toLowerCase()) ||
        String(s.id).includes(surahFilter))
    : allSurahs;

  const surahName   = data?.surah.transliteration ?? `Surah ${surahId}`;
  const totalVerses = data?.total ?? 0;
  const prevId      = surahId > 1   ? surahId - 1 : null;
  const nextId      = surahId < 114 ? surahId + 1 : null;

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary text-text-primary">

      {/* ══ LEFT: icon rail ══ */}
      <aside className="hidden md:flex flex-col items-center w-14 bg-bg-secondary border-r border-border py-3 gap-1 flex-shrink-0 z-30">
        <Link href="/" className="mb-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow">
            <span className="text-bg-primary font-bold text-sm">ق</span>
          </div>
        </Link>
        {[
          { icon: Home,       label: "Home",      href: "/" },
          { icon: BookOpen,   label: "Quran",     href: `/surah/${surahId}` },
          { icon: Headphones, label: "Audio",     href: `/surah/${surahId}` },
          { icon: Bookmark,   label: "Bookmarks", href: "/" },
        ].map(({ icon: Icon, label, href }) => (
          <Link key={label} href={href} title={label}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-text-muted hover:text-gold hover:bg-bg-hover transition group relative">
            <Icon size={18} strokeWidth={1.5}/>
            <span className="absolute left-full ml-2 px-2 py-1 bg-bg-tertiary text-text-primary text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 z-50 border border-border pointer-events-none">
              {label}
            </span>
          </Link>
        ))}
        <div className="flex-1"/>
        <button onClick={()=>setSearchOpen(true)} title="Search"
          className="w-10 h-10 rounded-lg flex items-center justify-center text-text-muted hover:text-gold hover:bg-bg-hover transition">
          <Search size={18} strokeWidth={1.5}/>
        </button>
        <button onClick={()=>setRightPanel(p=>p?"settings"===p?null:"settings":"settings")} title="Settings"
          className="w-10 h-10 rounded-lg flex items-center justify-center text-text-muted hover:text-gold hover:bg-bg-hover transition">
          <Settings size={18} strokeWidth={1.5}/>
        </button>
        <button title="Dark mode" className="w-10 h-10 rounded-lg flex items-center justify-center text-gold hover:bg-bg-hover transition">
          <Moon size={18}/>
        </button>
        <button title="About" className="w-10 h-10 rounded-lg flex items-center justify-center text-text-muted hover:bg-bg-hover transition">
          <Info size={16}/>
        </button>
      </aside>

      {/* ══ LEFT: surah sidebar ══ */}
      <>
        {mobileSidebar && (
          <div className="fixed inset-0 z-40 bg-black/60 md:hidden" onClick={()=>setMobileSidebar(false)}/>
        )}
        <aside className={clsx(
          "flex flex-col w-[230px] bg-bg-secondary border-r border-border flex-shrink-0 z-40",
          "fixed md:relative top-0 left-0 h-full transition-transform duration-300",
          mobileSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          {/* Search surah */}
          <div className="px-3 py-3 border-b border-border">
            <div className="flex items-center gap-2 px-3 py-2 bg-bg-primary border border-border rounded-lg">
              <Search size={13} className="text-text-muted flex-shrink-0"/>
              <input
                value={surahFilter} onChange={e=>setSurahFilter(e.target.value)}
                placeholder="Search Surah"
                className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
              />
            </div>
          </div>

          {/* Surah list */}
          <div className="flex-1 overflow-y-auto">
            {filteredSurahs.map(s => {
              const active = s.id === surahId;
              return (
                <Link key={s.id} href={`/surah/${s.id}`} onClick={()=>setMobileSidebar(false)}
                  className={clsx(
                    "flex items-center gap-2.5 px-3 py-2.5 border-b border-border/30 transition group",
                    active ? "bg-[#1e2d1e] border-l-2 border-l-[#2d6a2d]" : "hover:bg-bg-hover"
                  )}>
                  {/* number diamond */}
                  <div className={clsx(
                    "w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0 transition",
                    active ? "bg-[#2d6a2d] text-white" : "bg-bg-tertiary text-text-muted group-hover:text-gold"
                  )}>
                    {s.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={clsx("text-xs font-semibold truncate", active ? "text-[#4a9a4a]" : "text-text-primary")}>
                      {s.transliteration}
                    </div>
                    <div className="text-[10px] text-text-muted truncate">{s.translation}</div>
                  </div>
                  <span dir="rtl" className="text-xs flex-shrink-0"
                    style={{ fontFamily:"'Scheherazade New',serif", color: active?"#4a9a4a":"var(--text-secondary)", lineHeight:2 }}>
                    {s.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>
      </>

      {/* ══ CENTER: ayah reader ══ */}
      <main className={clsx(
        "flex-1 flex flex-col overflow-hidden",
        audio.currentAyah ? "pb-0" : ""
      )}>
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-bg-secondary border-b border-border">
          <button onClick={()=>setMobileSidebar(true)} className="w-8 h-8 flex items-center justify-center rounded text-text-muted hover:bg-bg-hover">
            <BookOpen size={18}/>
          </button>
          <span className="text-sm font-semibold text-text-primary">{surahName}</span>
          <button onClick={()=>setSearchOpen(true)} className="w-8 h-8 flex items-center justify-center rounded text-text-muted hover:bg-bg-hover">
            <Search size={18}/>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-text-muted">
              <Loader2 size={32} className="animate-spin text-gold"/>
              <p className="text-sm">Loading surah...</p>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <AlertCircle size={28} className="text-red-400"/>
              <p className="text-sm text-red-400">{error}</p>
              <button onClick={()=>window.location.reload()} className="text-xs text-gold hover:underline">Retry</button>
            </div>
          )}

          {data && (
            <>
              {/* Surah header */}
              <div className="border-b border-border bg-bg-secondary px-6 py-6 text-center relative">
                {/* Kaaba icon placeholder */}
                <div className="absolute left-6 top-4 opacity-30">
                  <div className="w-12 h-12 flex items-center justify-center text-2xl">🕌</div>
                </div>
                <h1 className="text-lg font-bold text-text-primary">Surah {data.surah.transliteration}</h1>
                <div className="flex items-center justify-center gap-2 mt-1 text-xs text-text-muted">
                  <span>Ayah-{data.total}</span>
                  <span>·</span>
                  <span>{data.surah.type === "meccan" ? "Makkah" : "Madinah"}</span>
                </div>
              </div>

              {/* Ayah list */}
              <div className={audio.currentAyah ? "pb-16" : ""}>
                {data.ayahs.map(ayah => (
                  <AyahRow
                    key={ayah.verse}
                    ayah={ayah}
                    surahId={surahId}
                    surahName={surahName}
                    fontSettings={settings}
                    isPlaying={isPlayingAyah(surahId, ayah.verse)}
                    isLoading={isLoadingAyah(surahId, ayah.verse)}
                    onPlay={()=>playAyah(surahId, ayah.verse)}
                  />
                ))}
              </div>

              {/* Prev/Next */}
              <div className="flex items-center justify-between px-6 py-6 border-t border-border">
                {prevId ? (
                  <Link href={`/surah/${prevId}`}
                    className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-xl text-sm hover:border-gold/30 transition group">
                    <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform"/>
                    <div>
                      <div className="text-[10px] text-text-muted">Previous</div>
                      <div className="text-xs font-medium">{allSurahs[prevId-1]?.transliteration}</div>
                    </div>
                  </Link>
                ) : <div/>}
                {nextId && (
                  <Link href={`/surah/${nextId}`}
                    className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-xl text-sm hover:border-gold/30 transition group ml-auto">
                    <div className="text-right">
                      <div className="text-[10px] text-text-muted">Next</div>
                      <div className="text-xs font-medium">{allSurahs[nextId-1]?.transliteration}</div>
                    </div>
                    <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform"/>
                  </Link>
                )}
              </div>
            </>
          )}
        </div>

        {/* Bottom audio player */}
        {audio.currentAyah && (
          <div className="border-t border-border bg-bg-secondary flex-shrink-0">
            <div
              className="h-0.5 bg-border cursor-pointer"
              onClick={e=>{
                const r = e.currentTarget.getBoundingClientRect();
                seek(((e.clientX-r.left)/r.width)*audio.duration);
              }}
            >
              <div className="h-full bg-gold transition-all" style={{width:`${audio.duration>0?(audio.currentTime/audio.duration)*100:0}%`}}/>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold text-xs font-bold">{audio.currentAyah.surah}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-text-primary truncate">{surahName} : {audio.currentAyah.verse}</p>
                  <p className="text-[10px] text-text-muted">{fmt(audio.currentTime)}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={()=>audio.currentAyah&&skipPrev(audio.currentAyah.surah,audio.currentAyah.verse)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary disabled:opacity-30 transition"
                  disabled={audio.currentAyah.verse<=1}>
                  <SkipBack size={14}/>
                </button>
                <button onClick={()=>audio.isPlaying?pause():(audio.currentAyah&&playAyah(audio.currentAyah.surah,audio.currentAyah.verse))}
                  className="w-9 h-9 rounded-full bg-gold text-bg-primary flex items-center justify-center shadow-lg shadow-gold/20 hover:bg-gold-light transition">
                  {audio.isLoading ? <Loader2 size={16} className="animate-spin"/> : audio.isPlaying ? <Pause size={16} fill="currentColor"/> : <Play size={16} fill="currentColor" className="ml-0.5"/>}
                </button>
                <button onClick={()=>audio.currentAyah&&skipNext(audio.currentAyah.surah,audio.currentAyah.verse,totalVerses)}
                  className="w-7 h-7 flex items-center justify-center rounded-full text-text-muted hover:text-text-primary disabled:opacity-30 transition"
                  disabled={audio.currentAyah.verse>=totalVerses}>
                  <SkipForward size={14}/>
                </button>
                <button onClick={stop} className="w-7 h-7 flex items-center justify-center rounded-full text-text-muted hover:text-red-400 transition ml-1">
                  <X size={14}/>
                </button>
              </div>
              <span className="hidden sm:block text-[10px] text-text-muted ml-1">{fmt(audio.duration)}</span>
            </div>
          </div>
        )}
      </main>

      {/* ══ RIGHT: font settings panel ══ */}
      {rightPanel === "settings" && (
        <aside className="hidden lg:flex flex-col w-[260px] bg-bg-secondary border-l border-border flex-shrink-0 overflow-y-auto">
          {/* Reading Settings */}
          <div className="border-b border-border">
            <button className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-bg-hover transition">
              <div className="flex items-center gap-2.5 text-sm font-medium text-text-secondary">
                <BookOpen size={15}/>
                Reading Settings
              </div>
              <ChevronRight size={14} className="text-text-muted"/>
            </button>
          </div>

          {/* Font Settings */}
          <div>
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-gold">
                <Type size={15}/>
                Font Settings
              </div>
              <ChevronRight size={14} className="text-text-muted rotate-90"/>
            </div>

            <div className="px-4 py-4 space-y-5">
              {/* Arabic font size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Arabic Font Size</span>
                  <span className="text-xs font-mono text-gold">{settings.arabicFontSize}</span>
                </div>
                <input type="range" min={18} max={48} step={2}
                  value={settings.arabicFontSize} onChange={e=>setArabicFontSize(Number(e.target.value))}
                  className="w-full h-1 rounded-full cursor-pointer appearance-none"
                  style={{background:`linear-gradient(to right,#2d6a2d ${((settings.arabicFontSize-18)/30)*100}%,#252d42 0%)`}}
                />
              </div>

              {/* Translation font size */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Translation Font Size</span>
                  <span className="text-xs font-mono text-gold">{settings.translationFontSize}</span>
                </div>
                <input type="range" min={12} max={24} step={1}
                  value={settings.translationFontSize} onChange={e=>setTranslationFontSize(Number(e.target.value))}
                  className="w-full h-1 rounded-full cursor-pointer appearance-none"
                  style={{background:`linear-gradient(to right,#2d6a2d ${((settings.translationFontSize-12)/12)*100}%,#252d42 0%)`}}
                />
              </div>

              {/* Arabic font face */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary">Arabic Font Face</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {ARABIC_FONTS.map(f => (
                    <button key={f.id} onClick={()=>setArabicFont(f.id)}
                      className={clsx(
                        "flex items-center justify-between px-3 py-2.5 rounded-lg border text-xs transition",
                        settings.arabicFont === f.id
                          ? "border-[#2d6a2d] bg-[#1e2d1e] text-[#4a9a4a]"
                          : "border-border bg-bg-tertiary text-text-secondary hover:border-border-light"
                      )}>
                      <span className="font-medium">{f.label}</span>
                      <ChevronRight size={12} className="text-text-muted"/>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Support Us card */}
          <div className="mx-4 mb-4 mt-2 p-4 bg-[#1e2d1e] border border-[#2d4a2d] rounded-xl">
            <p className="text-xs font-semibold text-text-primary mb-1">Help spread the knowledge of Islam</p>
            <p className="text-[10px] text-text-muted leading-relaxed mb-3">
              Your regular support helps us reach our religious brothers and sisters with the message of Islam.
            </p>
            <button className="w-full py-2 bg-[#2d6a2d] text-white text-xs font-semibold rounded-lg hover:bg-[#245224] transition">
              Support Us
            </button>
          </div>
        </aside>
      )}

      {/* Search modal */}
      <SearchModal isOpen={searchOpen} onClose={()=>setSearchOpen(false)}/>
    </div>
  );
}

/* ══════════════════════════════════════════
   AYAH ROW — matches reference exactly
══════════════════════════════════════════ */
interface AyahRowProps {
  ayah: { verse: number; text: string; translation: string };
  surahId: number;
  surahName: string;
  fontSettings: FontSettings;
  isPlaying: boolean;
  isLoading: boolean;
  onPlay: () => void;
}

function AyahRow({ ayah, surahId, surahName, fontSettings, isPlaying, isLoading, onPlay }: AyahRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${ayah.text}\n\n${ayah.translation}\n— Quran ${surahId}:${ayah.verse}`);
    setCopied(true); setTimeout(()=>setCopied(false),2000);
  };

  return (
    <div id={`ayah-${ayah.verse}`}
      className={clsx(
        "group border-b border-border/40 transition-colors",
        isPlaying ? "bg-[#1a2d1a]" : "hover:bg-bg-hover/20"
      )}>

      {/* Verse header row — matches reference: "1:1" on left, icons on left too */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        {/* Verse ref badge */}
        <div className={clsx(
          "text-xs font-semibold min-w-[2rem]",
          isPlaying ? "text-[#4a9a4a]" : "text-text-muted"
        )}>
          {surahId}:{ayah.verse}
        </div>

        {/* Play button */}
        <button onClick={onPlay} aria-label={isPlaying?"Pause":"Play"}
          className={clsx(
            "w-7 h-7 rounded-full flex items-center justify-center transition flex-shrink-0",
            isPlaying ? "bg-[#2d6a2d] text-white" : "text-text-muted hover:text-[#4a9a4a] hover:bg-[#1e2d1e]"
          )}>
          {isLoading ? <Loader2 size={12} className="animate-spin"/>
           : isPlaying ? <Pause size={12} fill="currentColor"/>
           : <Play size={12} fill="currentColor" className="ml-0.5"/>}
        </button>

        {/* Bookmark */}
        <button title="Bookmark"
          className="w-7 h-7 rounded flex items-center justify-center text-text-muted hover:text-[#4a9a4a] transition opacity-0 group-hover:opacity-100">
          <Bookmark size={13}/>
        </button>

        {/* Copy */}
        <button onClick={handleCopy} title="Copy"
          className="w-7 h-7 rounded flex items-center justify-center text-text-muted hover:text-[#4a9a4a] transition opacity-0 group-hover:opacity-100">
          {copied ? <Check size={13} className="text-green-400"/> : <Copy size={13}/>}
        </button>

        {/* More */}
        <button title="More"
          className="w-7 h-7 rounded flex items-center justify-center text-text-muted hover:text-[#4a9a4a] transition opacity-0 group-hover:opacity-100">
          <span className="text-xs tracking-widest">···</span>
        </button>
      </div>

      {/* Arabic text — right aligned */}
      <div className="px-4 pt-1 pb-2 text-right">
        <p dir="rtl" className="arabic-text text-text-arabic leading-loose"
          style={{
            fontFamily: FONT_FAMILIES[fontSettings.arabicFont],
            fontSize: `${fontSettings.arabicFontSize}px`,
          }}>
          {ayah.text}
        </p>
      </div>

      {/* Translation */}
      <div className="px-4 pb-5">
        <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1">Saheeh International</p>
        <p className="text-text-secondary leading-relaxed"
          style={{ fontSize: `${fontSettings.translationFontSize}px` }}>
          {ayah.translation}
        </p>
      </div>
    </div>
  );
}
