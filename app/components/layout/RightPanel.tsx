"use client";

import { BookOpen, Type, ChevronRight, Heart } from "lucide-react";
import { ArabicFont, FontSettings } from "@/app/types";

const ARABIC_FONTS: { id: ArabicFont; label: string }[] = [
  { id: "uthmani", label: "PDMS Islamic" },
  { id: "amiri", label: "Amiri Font" },
  { id: "scheherazade", label: "Scheherazade" },
];

interface RightPanelProps {
  settings: FontSettings;
  fontPanelOpen: boolean;
  setFontPanelOpen: (v: boolean) => void;
  readingPanelOpen: boolean;
  setReadingPanelOpen: (v: boolean) => void;
  setArabicFont: (f: ArabicFont) => void;
  setArabicFontSize: (s: number) => void;
  setTranslationFontSize: (s: number) => void;
}

export function RightPanel({
  settings,
  fontPanelOpen,
  setFontPanelOpen,
  readingPanelOpen,
  setReadingPanelOpen,
  setArabicFont,
  setArabicFontSize,
  setTranslationFontSize,
}: RightPanelProps) {
  return (
    <aside
      className="hidden lg:flex flex-col w-[280px] flex-shrink-0 overflow-y-auto custom-scrollbar"
      style={{
        background: "var(--bg-secondary)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      {/* ══ Translation/Reading Toggle (Top Tabs) ══ */}
      <div className="flex p-4 gap-2">
        <button className="flex-1 py-2 text-sm font-medium rounded-xl transition-all"
          style={{ background: "var(--bg-primary)", color: "var(--text-muted)", border: "1px solid var(--border)" }}>
          Translation
        </button>
        <button className="flex-1 py-2 text-sm font-medium rounded-xl transition-all opacity-60"
          style={{ background: "transparent", color: "var(--text-muted)" }}>
          Reading
        </button>
      </div>

      {/* ══ Reading Settings Accordion ══ */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={() => setReadingPanelOpen(!readingPanelOpen)}
          className="w-full flex items-center justify-between px-5 py-4 transition hover:bg-[var(--bg-hover)]"
        >
          <div className="flex items-center gap-3 font-bold text-[var(--text-primary)]" style={{ fontSize: "14px" }}>
            <BookOpen size={18} className="opacity-70" />
            Reading Settings
          </div>
          <ChevronRight
            size={16}
            style={{
              transform: readingPanelOpen ? "rotate(90deg)" : "",
              transition: "transform 0.3s",
              color: "var(--text-muted)"
            }}
          />
        </button>
      </div>

      {/* ══ Font Settings Accordion ══ */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={() => setFontPanelOpen(!fontPanelOpen)}
          className="w-full flex items-center justify-between px-5 py-4 transition hover:bg-[var(--bg-hover)]"
        >
          <div className="flex items-center gap-3 font-bold text-[var(--green)]" style={{ fontSize: "14px" }}>
            <Type size={18} />
            Font Settings
          </div>
          <ChevronRight
            size={16}
            style={{
              transform: fontPanelOpen ? "rotate(90deg)" : "",
              transition: "transform 0.3s",
              color: "var(--green)"
            }}
          />
        </button>

        {fontPanelOpen && (
          <div className="px-5 py-6 space-y-8 animate-in fade-in slide-in-from-top-2">
            {/* Arabic Font Size */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[13px] text-[var(--text-primary)]">Arabic Font Size</span>
                <span className="font-bold text-[var(--green)] text-[14px]">{settings.arabicFontSize}</span>
              </div>
              <input
                type="range" min={18} max={48} step={2}
                value={settings.arabicFontSize}
                onChange={(e) => setArabicFontSize(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "var(--green)", accentColor: "var(--green)" }}
              />
            </div>

            {/* Translation Font Size */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[13px] text-[var(--text-primary)]">Translation Font Size</span>
                <span className="font-bold text-[var(--green)] text-[14px]">{settings.translationFontSize}</span>
              </div>
              <input
                type="range" min={12} max={24} step={1}
                value={settings.translationFontSize}
                onChange={(e) => setTranslationFontSize(Number(e.target.value))}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
                style={{ background: "var(--green)", accentColor: "var(--green)" }}
              />
            </div>

            {/* Arabic Font Face */}
            <div className="space-y-3">
              <span className="font-bold text-[13px] text-[var(--text-primary)]">Arabic Font Face</span>
              <div className="space-y-2">
                {ARABIC_FONTS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setArabicFont(f.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-sm font-medium"
                    style={{
                      borderColor: settings.arabicFont === f.id ? "var(--green)" : "var(--border)",
                      background: settings.arabicFont === f.id ? "var(--green-bg)" : "var(--bg-primary)",
                      color: settings.arabicFont === f.id ? "var(--green)" : "var(--text-secondary)",
                    }}
                  >
                    {f.label}
                    <ChevronRight size={14} className="opacity-50" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ══ Support Us Card (Exactly like Image) ══ */}
      <div className="mt-auto p-4">
        <div
          className="p-5 rounded-2xl space-y-4 shadow-sm"
          style={{
            background: "var(--green-bg)",
            border: "1px solid rgba(44, 164, 171, 0.1)",
          }}
        >
          <div className="space-y-2">
            <h4 className="font-black text-[15px] leading-tight" style={{ color: "var(--text-primary)" }}>
              Help spread the knowledge of Islam
            </h4>
            <p className="text-[12px] leading-relaxed font-medium" style={{ color: "var(--text-muted)" }}>
              Your regular support helps us reach our religious brothers and sisters with
              the message of Islam. Join our mission and be part of the big change.
            </p>
          </div>
          
          <button
            className="w-full py-3 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-lg"
            style={{ background: "var(--green)", fontSize: "14px" }}
          >
            Support Us <Heart size={14} fill="white" />
          </button>
        </div>
      </div>
    </aside>
  );
}