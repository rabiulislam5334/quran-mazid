"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function SurahError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        gap: "1.5rem",
      }}
    >
      {/* Top gold bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light), var(--gold))",
        }}
      />

      {/* Arabic */}
      <div
        style={{
          fontFamily: "'KFGQPC Uthmanic Script', 'Scheherazade New', serif",
          direction: "rtl",
          fontSize: "1.5rem",
          color: "var(--gold)",
          opacity: 0.8,
          lineHeight: 2.2,
          animation: "fadeSlide 0.6s ease both",
        }}
      >
        وَاللَّهُ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ
      </div>

      {/* Card */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "2rem 2.5rem",
          maxWidth: 460,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.2rem",
          animation: "fadeSlide 0.5s ease 0.15s both",
          boxShadow: "0 8px 40px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ fontSize: "2.5rem", lineHeight: 1 }}>📖</div>

        <h2
          style={{
            color: "var(--text-primary)",
            fontSize: "1.25rem",
            fontWeight: 700,
            margin: 0,
          }}
        >
          Failed to Load Surah
        </h2>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          {error?.message || "Could not fetch the Surah. Please check your connection and try again."}
        </p>

        {error?.digest && (
          <code
            style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              background: "var(--bg-tertiary)",
              padding: "3px 10px",
              borderRadius: 5,
              border: "1px solid var(--border)",
            }}
          >
            {error.digest}
          </code>
        )}

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={reset}
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: 8,
              background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.88rem",
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            Try Again
          </button>

          <Link
            href="/"
            style={{
              padding: "0.6rem 1.4rem",
              borderRadius: 8,
              background: "var(--bg-tertiary)",
              color: "var(--text-primary)",
              fontWeight: 600,
              fontSize: "0.88rem",
              border: "1px solid var(--border)",
              textDecoration: "none",
              transition: "background 0.2s",
              display: "inline-block",
            }}
          >
            ← All Surahs
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
