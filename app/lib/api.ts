import { Surah, SurahWithAyahs, SearchResult } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function fetchAllSurahs(): Promise<Surah[]> {
  const res = await fetch(`${API_URL}/api/surahs`);
  if (!res.ok) throw new Error("Failed to fetch surahs");
  const json = await res.json();
  // আপনার API সরাসরি Array রিটার্ন করছে, তাই json.data এর প্রয়োজন নেই
  return Array.isArray(json) ? json : json.data || [];
}

export async function fetchSurah(id: number): Promise<Surah> {
  const res = await fetch(`${API_URL}/api/surahs/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch surah ${id}`);
  const json = await res.json();
  // সরাসরি json রিটার্ন করা হচ্ছে
  return json.data || json;
}

export async function fetchSurahAyahs(id: number): Promise<SurahWithAyahs> {
  const res = await fetch(`${API_URL}/api/surahs/${id}/ayahs`);
  if (!res.ok) throw new Error(`Failed to fetch ayahs for surah ${id}`);
  const json = await res.json();
  return json.data || json;
}

export async function searchAyahs(
  query: string,
  page = 1,
  limit = 20
): Promise<{ data: SearchResult[]; total: number }> {
  const params = new URLSearchParams({ q: query, page: String(page), limit: String(limit) });
  const res = await fetch(`${API_URL}/api/search?${params}`);
  if (!res.ok) throw new Error("Search failed");
  const json = await res.json();
  
  // সার্চের ক্ষেত্রে যদি ডাটা র‍্যাপ করা থাকে
  return { 
    data: json.data || json.results || [], 
    total: json.total || (json.data ? json.data.length : 0) 
  };
}

const VERSE_COUNTS: number[] = [
  7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
  111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73,
  54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60,
  49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12, 30, 52, 52,
  44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36, 25, 22, 17, 19,
  26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11, 8, 3, 9, 5, 4, 7, 3,
  6, 3, 5, 4, 5, 6,
];

export function getAudioUrl(surahId: number, verseNum: number): string {
  let globalNum = 0;
  for (let i = 0; i < surahId - 1; i++) {
    globalNum += VERSE_COUNTS[i] ?? 0;
  }
  globalNum += verseNum;
  return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNum}.mp3`;
}