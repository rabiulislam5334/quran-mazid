"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { searchAyahs } from "@/app/lib/api";
import { SearchResult } from "@/app/types";

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  // ESC দিয়ে বন্ধ
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Open হলে input focus
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setError(null);
    }
  }, [isOpen]);

  
  const handleSearch = (val: string) => {
    setQuery(val);
    clearTimeout(debounceRef.current);

    if (val.trim().length < 3) {
      setResults([]);
      setError(null);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      setError(null);
      try {
        const { data } = await searchAyahs(val);
        setResults(data);
      } catch (e) {
        setError("Search failed. Please check your connection.");
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 px-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
        style={{ background: "var(--bg-primary)", border: "1px solid var(--border)" }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: "var(--border)" }}>
          {isSearching
            ? <Loader2 size={22} className="animate-spin flex-shrink-0" style={{ color: "var(--green)" }} />
            : <Search size={22} className="flex-shrink-0" style={{ color: "var(--green)" }} />
          }
          <input
            ref={inputRef}
            className="flex-1 bg-transparent outline-none text-lg font-medium"
            placeholder="Search by Ayah translation or Arabic..."
            style={{ color: "var(--text-primary)" }}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults([]); inputRef.current?.focus(); }}
              className="p-1.5 rounded-full transition" style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}>
              <X size={16} />
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded-full transition ml-1" style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "")}>
            <X size={20} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Error */}
          {error && (
            <div className="p-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Loading */}
          {isSearching && (
            <div className="p-10 text-center flex flex-col items-center gap-3" style={{ color: "var(--text-muted)" }}>
              <Loader2 size={30} className="animate-spin opacity-30" />
              <span className="text-sm">Searching in Quran...</span>
            </div>
          )}

          {/* Results list */}
          {!isSearching && results.length > 0 && (
            <div className="flex flex-col gap-1 p-2">
              {results.map((res, i) => (
                <Link
                  key={`${res.surah_id}-${res.verse}-${i}`}
                  href={`/surah/${res.surah_id}?verse=${res.verse}`}
                  onClick={onClose}
                  className="group flex flex-col gap-2 p-4 rounded-2xl transition-all"
                  style={{ border: "1px solid transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "";
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--green)" }}>
                      {res.surah_transliteration || res.surah_name} • Ayah {res.verse}
                    </span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" style={{ color: "var(--green)" }} />
                  </div>

                  {/* Arabic */}
                  {res.text && (
                    <p dir="rtl" className="text-right leading-loose text-base"
                      style={{ fontFamily: "'Scheherazade New',serif", color: "var(--text-arabic)" }}>
                      {res.text}
                    </p>
                  )}

                  {/* Translation — highlight সহ */}
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}
                    dangerouslySetInnerHTML={{ __html: res.highlight || res.translation }} />
                </Link>
              ))}
            </div>
          )}

          {/* No results */}
          {!isSearching && !error && results.length === 0 && query.length > 2 && (
            <div className="p-10 text-center text-sm" style={{ color: "var(--text-muted)" }}>
              No ayahs found for <span className="font-bold" style={{ color: "var(--text-primary)" }}>"{query}"</span>
            </div>
          )}

          {/* Empty state */}
          {!isSearching && query.length <= 2 && (
            <div className="p-10 text-center flex flex-col items-center gap-3">
              <BookOpen size={40} style={{ color: "var(--text-muted)", opacity: 0.2 }} />
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Type at least 3 characters to search across all ayahs
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
                You can search in English translation or Arabic text
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 flex justify-between items-center border-t" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            {results.length > 0 ? `${results.length} results found` : "Search the Holy Quran"}
          </span>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ border: "1px solid var(--border)", background: "var(--bg-primary)", color: "var(--text-muted)" }}>ESC</kbd>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
