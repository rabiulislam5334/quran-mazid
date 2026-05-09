"use client";
import { Home, BookOpen, Bookmark, Grid, Settings } from "lucide-react";
import Link from "next/link";

export function MobileBottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#112311] border-t dark:border-white/10 z-[60] px-4 py-2">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center p-2 text-gray-500 hover:text-[var(--green)]">
          <Home size={20} />
          <span className="text-[10px] mt-1">Home</span>
        </Link>
        <Link href="/surah/1" className="flex flex-col items-center p-2 text-[var(--green)]">
          <BookOpen size={20} />
          <span className="text-[10px] mt-1">Read</span>
        </Link>
        <button className="flex flex-col items-center p-2 text-gray-500">
          <Bookmark size={20} />
          <span className="text-[10px] mt-1">Bookmark</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-500">
          <Grid size={20} />
          <span className="text-[10px] mt-1">Sura List</span>
        </button>
        <button className="flex flex-col items-center p-2 text-gray-500">
          <Settings size={20} />
          <span className="text-[10px] mt-1">Settings</span>
        </button>
      </div>
    </div>
  );
}