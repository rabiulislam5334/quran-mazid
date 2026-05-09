"use client";

import { BookOpen, Type, ChevronRight } from "lucide-react";
import { ArabicFont, FontSettings } from "@/app/types";

const ARABIC_FONTS: { id: ArabicFont; label: string }[] = [
  { id: "uthmani", label: "KFGQ" },
  { id: "amiri", label: "Amiri" },
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
      className="hidden lg:flex flex-col w-[260px] flex-shrink-0 overflow-y-auto"
      style={{
        background: "var(--bg-secondary)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      {/* Reading Settings */}
      <div className="border-b" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={() => setReadingPanelOpen(!readingPanelOpen)}
          className="w-full flex items-center justify-between px-4 py-3.5 transition"
          style={{ color: "var(--text-secondary)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "")
          }
        >
          <div
            className="flex items-center gap-2.5 font-medium"
            style={{ fontSize: "14px" }}
          >
            <BookOpen size={15} />
            Reading Settings
          </div>
          <ChevronRight
            size={14}
            style={{
              color: "var(--text-muted)",
              transform: readingPanelOpen ? "rotate(90deg)" : "",
              transition: "transform 0.2s",
            }}
          />
        </button>
      </div>

      {/* Font Settings */}
      <div>
        <button
          onClick={() => setFontPanelOpen(!fontPanelOpen)}
          className="w-full flex items-center justify-between px-4 py-3.5 border-b transition"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="flex items-center gap-2.5 font-semibold"
            style={{ color: "var(--gold)", fontSize: "14px" }}
          >
            <Type size={15} />
            Font Settings
          </div>
          <ChevronRight
            size={14}
            style={{
              color: "var(--text-muted)",
              transform: fontPanelOpen ? "rotate(90deg)" : "",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {fontPanelOpen && (
          <div className="px-4 py-4 space-y-5">
            {/* Arabic font size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                  Arabic Font Size
                </span>
                <span
                  className="font-mono font-bold"
                  style={{ color: "var(--gold)", fontSize: "13px" }}
                >
                  {settings.arabicFontSize}
                </span>
              </div>
              <input
                type="range"
                min={18}
                max={48}
                step={2}
                value={settings.arabicFontSize}
                onChange={(e) => setArabicFontSize(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--green)", cursor: "pointer" }}
              />
            </div>

            {/* Translation font size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                  Translation Font Size
                </span>
                <span
                  className="font-mono font-bold"
                  style={{ color: "var(--gold)", fontSize: "13px" }}
                >
                  {settings.translationFontSize}
                </span>
              </div>
              <input
                type="range"
                min={12}
                max={24}
                step={1}
                value={settings.translationFontSize}
                onChange={(e) => setTranslationFontSize(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: "var(--green)", cursor: "pointer" }}
              />
            </div>

            {/* Arabic font face */}
            <div>
              <div className="mb-2">
                <span style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                  Arabic Font Face
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                {ARABIC_FONTS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setArabicFont(f.id)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg border transition"
                    style={{
                      border:
                        settings.arabicFont === f.id
                          ? "1px solid var(--green)"
                          : "1px solid var(--border)",
                      background:
                        settings.arabicFont === f.id
                          ? "var(--green-bg)"
                          : "var(--bg-tertiary)",
                      color:
                        settings.arabicFont === f.id
                          ? "var(--green-active)"
                          : "var(--text-secondary)",
                      fontSize: "13px",
                    }}
                  >
                    <span className="font-medium">{f.label}</span>
                    <ChevronRight size={12} style={{ color: "var(--text-muted)" }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Support Us */}
      <div
        className="mx-4 mb-4 mt-auto p-4 rounded-xl"
        style={{
          background: "var(--green-bg)",
          border: "1px solid rgba(45,106,45,0.3)",
        }}
      >
        <p
          className="font-semibold mb-1"
          style={{ color: "var(--text-primary)", fontSize: "13px" }}
        >
          Help spread the knowledge of Islam
        </p>
        <p
          className="leading-relaxed mb-3"
          style={{ color: "var(--text-muted)", fontSize: "11px" }}
        >
          Your regular support helps us reach our religious brothers and sisters with
          the message of Islam. Join our mission and be part of the big change.
        </p>
        <button
          className="w-full py-2 text-white font-semibold rounded-lg transition"
          style={{ background: "var(--green)", fontSize: "13px" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.85")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          Support Us
        </button>
      </div>
    </aside>
  );
}
