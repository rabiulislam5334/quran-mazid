"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { searchAyahs } from "@/app/lib/api";
import { SearchResult } from "@/app/types";


function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (isOpen) { setTimeout(() => inputRef.current?.focus(), 100); }
    else { setQuery(""); setResults([]); setError(null); }
  }, [isOpen]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) { setResults([]); setTotal(0); return; }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    searchAyahs(debouncedQuery)
      .then(({ data, total }) => {
        if (!cancelled) { setResults(data); setTotal(total); setIsLoading(false); }
      })
      .catch(() => {
        if (!cancelled) { setError("Search failed. Please try again."); setIsLoading(false); }
      });

    return () => { cancelled = true; };
  }, [debouncedQuery]);

  const handleKey = useCallback((e: KeyboardEvent) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden mx-4">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <Search size={18} className="text-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Quran by Arabic text or English translation..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-text-primary placeholder-text-muted text-base outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-text-muted hover:text-text-primary transition">
              <X size={16} />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-12 gap-2 text-text-muted">
              <Loader2 size={18} className="animate-spin" /><span className="text-sm">Searching all 114 surahs...</span>
            </div>
          )}
          {error && <div className="flex items-center justify-center py-12 text-red-400 text-sm">{error}</div>}
          {!isLoading && !error && query.length >= 2 && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <Search size={32} className="mb-3 opacity-30" />
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          )}
          {!isLoading && results.length > 0 && (
            <>
              <div className="px-4 py-2 border-b border-border bg-bg-primary/50">
                <p className="text-xs text-text-muted">Showing {results.length} of {total} results across all 114 surahs</p>
              </div>
              {results.map((result, i) => (
                <Link
                  key={`${result.surah_id}-${result.verse}-${i}`}
                  href={`/surah/${result.surah_id}#ayah-${result.verse}`}
                  onClick={onClose}
                  className="block px-4 py-4 border-b border-border/50 hover:bg-bg-hover transition group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-gold/15 text-gold font-medium">{result.surah_transliteration}</span>
                    <span className="text-xs text-text-muted">Verse {result.verse}</span>
                    <span className="ml-auto text-sm" style={{ fontFamily: "'Scheherazade New', serif", color: "var(--gold-light)", direction: "rtl" }}>
                      {result.surah_name}
                    </span>
                  </div>
                  <p dir="rtl" className="text-text-arabic text-base mb-1 line-clamp-1" style={{ fontFamily: "'Scheherazade New', serif", lineHeight: 2 }}>
                    {result.text}
                  </p>
                  <p className="text-text-secondary text-sm line-clamp-2 leading-relaxed">{result.highlight}</p>
                </Link>
              ))}
            </>
          )}
          {!query && (
            <div className="flex flex-col items-center justify-center py-12 text-text-muted">
              <Search size={32} className="mb-3 opacity-20" />
              <p className="text-sm">Type to search ayahs</p>
              <p className="text-xs mt-1">Search in Arabic or English across all 114 surahs</p>
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-border bg-bg-primary/30 flex items-center gap-3 text-xs text-text-muted">
          <kbd className="px-1.5 py-0.5 rounded bg-bg-tertiary border border-border font-mono">ESC</kbd>
          <span>to close</span>
          <span className="ml-auto">Searches all 114 surahs</span>
        </div>
      </div>
    </>
  );
}
