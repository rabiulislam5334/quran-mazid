import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuranMazid – Read, Listen & Understand the Holy Quran",
  description: "Read the Holy Quran online",

  icons: {
    icon: [
      {
        url: "/quran_mazid.png",
        href: "/quran_mazid.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          @font-face {
            font-family: 'KFGQPC Uthmanic Script';
            src: url('https://cdn.jsdelivr.net/gh/goodblend/quran-fonts/fonts/hafs/v1/UthmanicHafs1_Ver17.woff2') format('woff2'),
                 url('https://cdn.jsdelivr.net/gh/goodblend/quran-fonts/fonts/hafs/v1/UthmanicHafs1_Ver17.ttf') format('truetype');
            font-display: swap;
          }
        `}</style>
      </head>
      <body
        className={`${inter.variable} bg-bg-primary text-text-primary antialiased`}
        style={{
          "--font-arabic-uthmani": "'KFGQPC Uthmanic Script', 'Scheherazade New', serif",
          "--font-amiri": "'Amiri Quran', 'Amiri', serif",
          "--font-scheherazade": "'Scheherazade New', serif",
        } as React.CSSProperties}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}