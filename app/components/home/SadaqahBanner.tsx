export function SadaqahBanner() {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-center">
   
      <div className="absolute bottom-0 left-0 w-full opacity-20 pointer-events-none">
         <img src="/footer-art.png" alt="" className="w-full h-auto" /> 
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a2e1a] mb-8 leading-tight">
          Be part of<br />Sadaqah Jariyah
        </h2>
        
        <button className="px-10 py-4 bg-[#2d6a2d] text-white text-lg font-bold rounded-xl hover:bg-[#245224] transition-all shadow-lg hover:shadow-xl active:scale-95">
          I want to support
        </button>
      </div>
    </section>
  );
}