export function AppBanner() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-8 py-4 mb-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a2e1a] to-[#2d4a2d] p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-white">
          <h3 className="text-2xl font-bold mb-2">
            Download The App<br />Quran Majeed (القرآن الكريم)
          </h3>
          <p className="text-sm text-white/70 mb-5 max-w-sm">
            Download the Quran Majeed app to access the full Quran with 82+ Translations, 20+ Tafsir, and word-by-word.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white hover:bg-white/15 transition"
            >
              ▶ Download on<br /><span className="font-semibold">Google Play</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-white hover:bg-white/15 transition"
            >
              🍎 Download on<br /><span className="font-semibold">App Store</span>
            </a>
          </div>
        </div>
        <div className="hidden md:flex w-48 h-36 bg-white/5 border border-white/10 rounded-2xl items-center justify-center text-white/30 text-sm">
          App Preview
        </div>
      </div>
    </section>
  );
}
