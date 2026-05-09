"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Surah } from "@/app/types";

interface SurahFooterProps {
  surahId: number;
  allSurahs: Surah[];
}

export function SurahFooter({ surahId, allSurahs }: SurahFooterProps) {
  const prevId = surahId > 1 ? surahId - 1 : null;
  const nextId = surahId < 114 ? surahId + 1 : null;

  const linkStyle = {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    borderRadius: "12px",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    transition: "border-color 0.15s",
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-6 border-t"
      style={{ borderColor: "var(--border)" }}>
      {prevId ? (
        <Link href={`/surah/${prevId}`} style={linkStyle}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--gold)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}>
          <ChevronLeft size={15} />
          <div>
            <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>Previous</div>
            <div className="font-medium">{allSurahs[prevId - 1]?.transliteration}</div>
          </div>
        </Link>
      ) : <div />}

      {nextId && (
        <Link href={`/surah/${nextId}`} style={{ ...linkStyle, marginLeft: "auto" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--gold)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")}>
          <div className="text-right">
            <div style={{ color: "var(--text-muted)", fontSize: "11px" }}>Next</div>
            <div className="font-medium">{allSurahs[nextId - 1]?.transliteration}</div>
          </div>
          <ChevronRight size={15} />
        </Link>
      )}
    </div>
  );
}
