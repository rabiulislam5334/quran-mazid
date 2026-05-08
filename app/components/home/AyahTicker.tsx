"use client";

import { useState, useEffect } from "react";

const AYAH_TICKER = [
  { text: "And We will drive the criminals to Hell in thirst.", ref: "Maryam : 86" },
  { text: "Indeed, with hardship will be ease.", ref: "Ash-Sharh : 6" },
  { text: "So remember Me; I will remember you.", ref: "Al-Baqarah : 152" },
  { text: "Allah does not burden a soul beyond that it can bear.", ref: "Al-Baqarah : 286" },
];

export function AyahTicker() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % AYAH_TICKER.length), 4000);
    return () => clearInterval(t);
  }, []);

  const ticker = AYAH_TICKER[idx];

  return (
    <div className="min-h-[72px] flex flex-col items-center justify-center mb-10">
      <p className="text-sm text-[#3a5a3a] max-w-sm text-center leading-relaxed transition-all duration-500">
        {ticker.text}
      </p>
      <p className="text-xs text-[#5a7a5a] mt-1">[ {ticker.ref} ]</p>
    </div>
  );
}
