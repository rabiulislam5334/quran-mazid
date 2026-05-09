export function AppBanner() {
  return (
    // width বাড়ানোর জন্য 'max-w-6xl' পরিবর্তন করে 'max-w-[1400px]' বা 'max-w-7xl' করা হয়েছে
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 py-10 mb-10">
      
      {/* ভেতরের কন্টেইনারের width এবং height বাড়ানোর জন্য p-20 এবং min-h যোগ করা হয়েছে */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-[#112311] to-[#1a2e1a] p-8 md:p-20 flex flex-col md:flex-row items-center gap-12 min-h-[500px]">
        
        {/* Left Side: Content (width বাড়াতে flex-[1.2] ব্যবহার করা হয়েছে) */}
        <div className="flex-[1.2] text-white z-10">
          <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
            Download The App<br /> 
            <span className="text-white/90">Quran Majeed (القرآن الكريم)</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl leading-relaxed">
            Download the Quran Majeed app to access the full Quran with 82+ Translations, 
            20+ Tafsir, and word-by-word.
          </p>

          <div className="flex flex-wrap gap-5">
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-14" />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-14" />
            </a>
          </div>
        </div>

        {/* Right Side: Mockup Images (width বাড়ানো হয়েছে) */}
        <div className="relative flex-1 w-full h-[400px] md:h-[550px] flex justify-end items-center">
          {/* Desktop Mockup */}
          <img 
            src="/mockup-desktop-light.webp" 
            alt="Desktop Preview" 
            className="absolute -right-10 md:-right-20 top-1/2 -translate-y-1/2 w-[110%] max-w-none rounded-xl shadow-2xl opacity-40 md:opacity-100"
          />
          
          {/* Mobile Mockup */}
          <img 
            src="/mockup-mobile-light.webp" 
            alt="Mobile Preview" 
            className="absolute right-0 md:right-10 bottom-[-20px] w-[45%] md:w-[280px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] z-20"
          />
        </div>

      </div>
    </section>
  );
}