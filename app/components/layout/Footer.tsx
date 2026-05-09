"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Other Pages",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Our Projects", href: "/projects" },
      { name: "Read Quran", href: "/surah/1" },
    ],
  },
  {
    title: "Important Links",
    links: [
      { name: "IRD Foundation", href: "https://irdfoundation.com" },
      { name: "Quranmazid.com", href: "https://quranmazid.com" },
      { name: "Dua & Ruqiyah", href: "#" },
      { name: "iHadith", href: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { name: "Facebook", href: "https://facebook.com" },
      { name: "Twitter", href: "https://twitter.com" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#f8faf7] border-t border-[#e2ede0] px-4 md:px-8 py-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Brand Section */}
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10">
              <img 
                src="/quran_mazid.png" 
                alt="Quran Mazid Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-black text-[#1a2e1a] tracking-tight">
              Quran Mazid
            </span>
          </Link>
          <p className="text-[15px] text-[#5a7a5a] leading-relaxed max-w-sm">
            IRD Foundation is providing Islamic apps for the benefit of Mankind,
            expecting rewards from Allah Subhanawa ta'ala.
          </p>
        </div>

        {/* Link columns */}
        {FOOTER_LINKS.map(({ title, links }) => (
          <div key={title}>
            <h4 className="text-[15px] font-bold text-[#1a2e1a] mb-6 uppercase tracking-wider">
              {title}
            </h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-[14px] text-[#5a7a5a] hover:text-[#2d6a2d] transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-[#e2ede0] text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#8aaa8a]">
          <p>© 2026 Quran Mazid — IRD Foundation</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-[#2d6a2d]">Terms</Link>
            <Link href="/privacy" className="hover:text-[#2d6a2d]">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}