"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
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
        fontFamily: "inherit",
      }}
    >
      {/* Decorative top border */}
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

      {/* Arabic Ayah — إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ */}
      <div
        style={{
          fontSize: "1.7rem",
          fontFamily: "'KFGQPC Uthmanic Script', 'Scheherazade New', serif",
          direction: "rtl",
          color: "var(--gold)",
          opacity: 0.85,
          animation: "fadeIn 0.7s ease both",
          lineHeight: 2.2,
          maxWidth: 480,
        }}
      >
        إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
      </div>

      {/* Icon */}
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "var(--bg-tertiary)",
          border: "2px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "2rem",
          animation: "fadeIn 0.5s ease 0.2s both",
          boxShadow: "0 0 32px rgba(201,168,76,0.1)",
        }}
      >
        ⚠
      </div>

      {/* Heading */}
      <h1
        style={{
          color: "var(--text-primary)",
          fontSize: "1.5rem",
          fontWeight: 700,
          margin: 0,
          animation: "fadeIn 0.5s ease 0.3s both",
        }}
      >
        Something went wrong
      </h1>

      {/* Error message */}
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.95rem",
          margin: 0,
          maxWidth: 420,
          lineHeight: 1.7,
          animation: "fadeIn 0.5s ease 0.4s both",
        }}
      >
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>

      {/* Error digest (for support) */}
      {error?.digest && (
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            background: "var(--bg-tertiary)",
            padding: "4px 12px",
            borderRadius: 6,
            border: "1px solid var(--border)",
            animation: "fadeIn 0.5s ease 0.5s both",
          }}
        >
          Error ID: {error.digest}
        </p>
      )}

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fadeIn 0.5s ease 0.6s both",
        }}
      >
        <button
          onClick={reset}
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: 8,
            background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.03em",
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

        {/* <a
          href="/"
          style={{
            padding: "0.65rem 1.5rem",
            borderRadius: 8,
            background: "var(--bg-tertiary)",
            color: "var(--text-primary)",
            fontWeight: 600,
            fontSize: "0.9rem",
            border: "1px solid var(--border)",
            cursor: "pointer",
            letterSpacing: "0.03em",
            textDecoration: "none",
            transition: "background 0.2s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-tertiary)";
          }}
        >
          Go Home
        </a> */}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
