"use client";

import { X, Type, AlignLeft } from "lucide-react";
import { clsx } from "clsx";
import { ArabicFont, FontSettings } from "@/app/types";
// import type { FontSettings, ArabicFont } from "@/types";

interface FontSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: FontSettings;
  onFontChange: (font: ArabicFont) => void;
  onArabicSizeChange: (size: number) => void;
  onTranslationSizeChange: (size: number) => void;
}

const ARABIC_FONTS: { id: ArabicFont; label: string; preview: string }[] = [
  { id: "uthmani", label: "KFGQPC Uthmanic", preview: "بِسْمِ اللَّهِ" },
  { id: "amiri", label: "Amiri Quran", preview: "بِسْمِ اللَّهِ" },
  { id: "scheherazade", label: "Scheherazade New", preview: "بِسْمِ اللَّهِ" },
];

const FONT_FAMILIES: Record<ArabicFont, string> = {
  uthmani: "'KFGQPC Uthmanic Script', 'Scheherazade New', serif",
  amiri: "'Amiri Quran', 'Amiri', serif",
  scheherazade: "'Scheherazade New', serif",
};

export function FontSettingsPanel({ isOpen, onClose, settings, onFontChange, onArabicSizeChange, onTranslationSizeChange }: FontSettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 w-full max-w-sm bg-bg-secondary border border-border rounded-2xl shadow-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Type size={18} className="text-gold" />
            <h2 className="text-base font-semibold text-text-primary">Font Settings</h2>
          </div>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-hover transition">
            <X size={16} />
          </button>
        </div>

        {/* Arabic Font Selection */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-text-secondary mb-3">Arabic Font Face</label>
          <div className="flex flex-col gap-2">
            {ARABIC_FONTS.map(({ id, label, preview }) => (
              <button
                key={id}
                onClick={() => onFontChange(id)}
                className={clsx(
                  "flex items-center justify-between px-4 py-3 rounded-xl border transition-all",
                  settings.arabicFont === id
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border bg-bg-tertiary text-text-secondary hover:border-border-light hover:bg-bg-hover"
                )}
              >
                <span className="text-sm">{label}</span>
                <span dir="rtl" style={{ fontFamily: FONT_FAMILIES[id], fontSize: "1.2rem", lineHeight: 1.8 }}>{preview}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Arabic Font Size */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-text-secondary">Arabic Font Size</label>
            <span className="text-xs font-mono text-gold">{settings.arabicFontSize}</span>
          </div>
          <input
            type="range" min={18} max={48} step={2}
            value={settings.arabicFontSize}
            onChange={(e) => onArabicSizeChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer"
            style={{ background: `linear-gradient(to right, #c9a84c ${((settings.arabicFontSize - 18) / 30) * 100}%, #252d42 0%)` }}
          />
        </div>

        {/* Translation Font Size */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-text-secondary flex items-center gap-1.5">
              <AlignLeft size={12} /> Translation Font Size
            </label>
            <span className="text-xs font-mono text-gold">{settings.translationFontSize}</span>
          </div>
          <input
            type="range" min={12} max={24} step={1}
            value={settings.translationFontSize}
            onChange={(e) => onTranslationSizeChange(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-border cursor-pointer"
            style={{ background: `linear-gradient(to right, #c9a84c ${((settings.translationFontSize - 12) / 12) * 100}%, #252d42 0%)` }}
          />
        </div>

        {/* Preview */}
        <div className="mt-4 p-4 bg-bg-primary rounded-xl border border-border">
          <p className="text-xs text-text-muted mb-2">Preview</p>
          <p dir="rtl" className="arabic-text text-text-arabic mb-2"
            style={{ fontFamily: FONT_FAMILIES[settings.arabicFont], fontSize: `${settings.arabicFontSize}px` }}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </p>
          <p className="text-text-secondary" style={{ fontSize: `${settings.translationFontSize}px` }}>
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>
      </div>
    </>
  );
}
