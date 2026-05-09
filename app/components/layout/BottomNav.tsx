import { BookOpen, Search, Settings } from "lucide-react";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-t flex items-center justify-around z-40 lg:hidden px-4">
      
      {/* মেনু বাটন */}
      <button className="flex flex-col items-center p-2 rounded-xl bg-gray-50 text-[var(--green)]">
        <div className="grid grid-cols-2 gap-0.5">
          <div className="w-1.5 h-1.5 bg-current rounded-full"/>
          <div className="w-1.5 h-1.5 bg-current rounded-full"/>
          <div className="w-1.5 h-1.5 bg-current rounded-full"/>
          <div className="w-1.5 h-1.5 bg-current rounded-full"/>
        </div>
      </button>

      {/* সার্চ বাটন */}
      <button className="p-2 text-gray-400">
        <Search size={22} />
      </button>

      {/* লাইব্রেরি/বুক বাটন */}
      <button className="p-2 text-gray-400">
        <BookOpen size={22} />
      </button>

      {/* সেটিংস বাটন */}
      <button className="p-2 text-gray-400">
        <Settings size={22} />
      </button>
      
    </div>
  );
}