"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Surah, SurahWithAyahs } from "@/app/types";
import { fetchAllSurahs, fetchSurahAyahs } from "@/app/lib/api";

export function useSurahData() {
  const params = useParams();
  const surahId = Number(params.id);

  const [data, setData] = useState<SurahWithAyahs | null>(null);
  const [allSurahs, setAllSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllSurahs().then(setAllSurahs).catch(() => {});
  }, []);

  useEffect(() => {
    if (!surahId || surahId < 1 || surahId > 114) {
      setError("Invalid surah");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    fetchSurahAyahs(surahId)
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError("Failed to load"); setLoading(false); });
  }, [surahId]);

  // API response থেকে ayah array বের করো
  const ayahs = (() => {
    if (!data) return [];
    const arr = Object.values(data?.ayahs || {});
    return arr.map((item: any) => {
      if (item?.verse) return item;
      return Object.values(item)[0];
    }).filter(Boolean) as any[];
  })();

  return { surahId, data, allSurahs, ayahs, loading, error };
}
