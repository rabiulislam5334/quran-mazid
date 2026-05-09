"use client";
import { X, Search } from "lucide-react";
import Link from "next/link";
import { Surah } from "@/app/types";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  surahs: Surah[];
}

export function Sidebar({ isOpen, onClose, surahs }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex lg:hidden">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-[300px] h-full bg-white dark:bg-[#112311] flex flex-col shadow-2xl">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--green)]">Surahs</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Surah..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-white/5 rounded-xl outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {surahs && surahs.length > 0 ? (
            surahs.map((surah) => (
              <Link 
                href={`/surah/${surah.id}`} 
                key={surah.id}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 group transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-white/10 rounded-lg text-xs font-bold">
                    {surah.id}
                  </span>
                  <div>
                    
                    <p className="font-bold text-sm">
                      {surah.name_simple || (surah as any).transliteration || "Unknown Surah"}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase">
                      {surah.revelation_place || (surah as any).type} • {surah.verses_count || (surah as any).total_verses} Verses
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-arabic text-[var(--green)]">
                    {surah.name_arabic}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400 text-sm">
              No surahs found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}