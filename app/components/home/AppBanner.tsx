export function AppBanner() {
  return (
    <section 
      className="max-w-[1400px] mx-auto px-4 md:px-6 py-10 mb-10 transition-colors duration-300"
      style={{ background: "transparent" }}
    >
      <div 
        className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-20 flex flex-col md:flex-row items-center gap-12 min-h-[500px]"
        style={{
          background: "linear-gradient(to right, #112311, #1a2e1a)",
          border: "1px solid var(--border)"
        }}
      >
        <div className="flex-[1.2] text-white z-10 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
            Download The App<br /> 
            <span className="text-white/90">Quran Majeed (القرآن الكريم)</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-white/70 mb-10 max-w-2xl leading-relaxed">
            Download the Quran Majeed app to access the full Quran with 82+ Translations, 
            20+ Tafsir, and word-by-word.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-5">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12 md:h-14" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12 md:h-14" />
            </a>
          </div>
        </div>

        {/* এই ডিভটি মোবাইলে হাইড থাকবে (hidden) এবং বড় স্ক্রিনে দেখাবে (md:flex) */}
        <div className="hidden md:flex relative flex-1 w-full h-[550px] justify-end items-center">
          <img 
            src="/mockup-desktop-light.webp" 
            alt="Desktop Preview" 
            className="absolute -right-10 md:-right-20 top-1/2 -translate-y-1/2 w-[110%] max-w-none rounded-xl shadow-2xl dark:brightness-75"
          />
          <img 
            src="/mockup-mobile-light.webp" 
            alt="Mobile Preview" 
            className="absolute right-0 md:right-10 bottom-[-20px] w-[280px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] z-20 dark:brightness-90"
          />
        </div>
      </div>
    </section>
  );
}