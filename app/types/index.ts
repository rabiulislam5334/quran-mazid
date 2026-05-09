export interface Surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: "meccan" | "medinan";
  total_verses: number;
}

export interface Ayah {
  id: number;
  surah: number;
  verse: number;
  text: string;
  translation: string;
  audio_url?: string;
}

export interface SurahWithAyahs {
  surah: Surah;
  ayahs: Ayah[];
  total: number;
  total_verses?: number;
}

export interface SearchResult {
  surah_id: number;
  surah_name: string;
  surah_transliteration: string;
  verse: number;
  text: string;
  translation: string;
  highlight: string;
}

export interface FontSettings {
  arabicFont: ArabicFont;
  arabicFontSize: number;
  translationFontSize: number;
}

export type ArabicFont = "uthmani" | "amiri" | "scheherazade";