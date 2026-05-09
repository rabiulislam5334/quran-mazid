export function SadaqahBanner() {
  return (
    <section 
      className="relative overflow-hidden py-20 text-center transition-colors duration-300"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Footer Art - Dark mode এ হালকা অপাসিটি কমানো হয়েছে */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none dark:invert">
         <img src="/footer-art.png" alt="" className="w-full h-auto" /> 
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight" style={{ color: "var(--text-primary)" }}>
          Be part of<br />Sadaqah Jariyah
        </h2>
        
        <button 
          className="px-10 py-4 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-95"
          style={{ background: "var(--green)" }}
        >
          I want to support
        </button>
      </div>
    </section>
  );
}