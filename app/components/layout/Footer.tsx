const FOOTER_LINKS = [
  {
    title: "Other Pages",
    links: ["About Us", "Privacy Policy", "Our Projects", "Read Quran"],
  },
  {
    title: "Important Links",
    links: ["IRD Foundation", "Quranmazid.com", "Dua & Ruqiyah", "iHadith"],
  },
  {
    title: "Follow Us",
    links: ["Facebook", "Twitter"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#f0f4ee] border-t border-[#d4e4d0] px-4 md:px-8 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-[#2d6a2d] flex items-center justify-center">
              <span className="text-white font-bold text-xs">ق</span>
            </div>
            <span className="text-sm font-bold text-[#1a2e1a]">Quran Mazid</span>
          </div>
          <p className="text-xs text-[#5a7a5a] leading-relaxed">
            IRD Foundation is providing Islamic apps for the benefit of Mankind,
            expecting rewards from Allah Subhanawa ta'ala.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-[#1a2e1a] mb-3">{title}</h4>
            <ul className="space-y-1.5">
              {links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-xs text-[#5a7a5a] hover:text-[#2d6a2d] transition">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-4 border-t border-[#d4e4d0] text-center text-xs text-[#8aaa8a]">
        © 2026 Quran Mazid — IRD Foundation
      </div>
    </footer>
  );
}
