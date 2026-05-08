"use client";

import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  surahId: number;
  verse: number;
  surahName: string;
}

export function ShareModal({ isOpen, onClose, surahId, verse, surahName }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = typeof window !== "undefined"
    ? `${window.location.origin}/surah/${surahId}#ayah-${verse}`
    : `https://yourapp.vercel.app/surah/${surahId}#ayah-${verse}`;

  const text = encodeURIComponent(`${surahName} ${surahId}:${verse} — Read the Quran`);
  const encodedUrl = encodeURIComponent(url);

  const socials = [
    { label: "Facebook", color: "#1877F2", icon: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { label: "Twitter", color: "#1DA1F2", icon: "𝕏", href: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}` },
    { label: "WhatsApp", color: "#25D366", icon: "W", href: `https://wa.me/?text=${text}%20${encodedUrl}` },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm bg-bg-secondary border border-border rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-text-primary">Share Ayah</h3>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:bg-bg-hover transition">
            <X size={16} />
          </button>
        </div>

        <p className="text-xs text-text-muted mb-4">{surahName} — Verse {verse}</p>

        {/* Social buttons */}
        <div className="flex gap-3 mb-5">
          {socials.map(({ label, color, icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border border-border hover:bg-bg-hover transition"
            >
              <span className="text-lg font-bold" style={{ color }}>{icon}</span>
              <span className="text-xs text-text-muted">{label}</span>
            </a>
          ))}
        </div>

        {/* Copy link */}
        <div className="flex items-center gap-2 p-3 bg-bg-primary border border-border rounded-xl">
          <span className="flex-1 text-xs text-text-secondary truncate">{url}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-gold hover:text-gold-light transition flex-shrink-0"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </>
  );
}
