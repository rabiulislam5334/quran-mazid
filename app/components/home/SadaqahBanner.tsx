export function SadaqahBanner() {
  return (
    <section className="relative overflow-hidden bg-[#e8f0e4] py-14 text-center">
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 opacity-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120 L0 80 Q120 20 240 80 L240 60 Q280 20 320 60 L320 80 Q440 20 560 80 L560 120Z" fill="#2d6a2d"/>
          <path d="M700 120 L700 60 Q780 10 860 60 L860 120Z" fill="#2d6a2d"/>
          <path d="M1000 120 L1000 80 Q1080 30 1160 80 L1160 60 Q1200 20 1240 60 L1240 80 Q1320 30 1400 80 L1400 120Z" fill="#2d6a2d"/>
        </svg>
      </div>
      <div className="relative max-w-md mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1a2e1a] mb-4">
          Be part of<br />Sadaqah Jariyah
        </h2>
        <button className="px-6 py-2.5 bg-[#2d6a2d] text-white text-sm font-semibold rounded-xl hover:bg-[#245224] transition shadow-md">
          I want to support
        </button>
      </div>
    </section>
  );
}
