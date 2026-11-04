"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Equalizer soundwave columns (13 distinct bars with natural cluster gaps)
  const soundwaveColumns = [
    // Left cluster (Bass)
    { cx: 102, peak: 5, bottom: 9 },
    { cx: 135, peak: 3, bottom: 10 },
    { cx: 167, peak: 1, bottom: 11 }, // Left peak
    { cx: 198, peak: 4, bottom: 11 },

    // Isolated accent bar (creates airy gap)
    { cx: 263, peak: 5, bottom: 8 },

    // Center cluster (Mid - main spectrum)
    { cx: 329, peak: 4, bottom: 12 },
    { cx: 362, peak: 2, bottom: 13 },
    { cx: 394, peak: 0, bottom: 13 }, // Center highest peak
    { cx: 427, peak: 2, bottom: 13 },
    { cx: 459, peak: 4, bottom: 12 },

    // Right cluster (Treble)
    { cx: 545, peak: 5, bottom: 10 },
    { cx: 577, peak: 2, bottom: 11 }, // Right peak
    { cx: 609, peak: 6, bottom: 10 },
  ];

  // Hide footer on 404 / events page if desired
  if (pathname === "/events") {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3500);
  };

  return (
    <footer
      id="site-main-footer"
      className="relative w-full bg-white text-neutral-900 pt-16 sm:pt-20 md:pt-24 pb-0 overflow-hidden select-none"
    >
      {/* ============================================================ */}
      {/* 1. Decorative Background Elements (Treble Clef)              */}
      {/* ============================================================ */}

      {/* Left: Soft Pink Treble Clef Blueprint Watermark */}
      <div className="absolute -left-6 sm:left-2 md:left-8 lg:left-14 top-6 sm:top-10 md:top-12 z-0 pointer-events-none select-none opacity-20 transition-opacity">
        <div className="relative w-36 sm:w-48 md:w-60 lg:w-72 aspect-[2/3]">
          <Image
            src="/images/Home/TrebelClef.png"
            alt="Treble Clef Watermark"
            fill
            className="object-contain filter hue-rotate-320 brightness-110"
            priority
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Main Pitch Headline & Waitlist Interactive Form           */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Pitch Headline with Red Music Note Accent */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-neutral-950 leading-[1.05] max-w-4xl">
          MELADINE, THE SONIC CONSERVATORY
          <span className="block mt-1 sm:mt-2">
            SOUND ARTISTS{" "}
            <span className="inline-block align-baseline mx-1.5 text-[#ed1438] drop-shadow-[0_0_10px_rgba(237,20,56,0.35)] translate-y-0.5">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="inline-block w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
              >
                <path d="M19 3H9c-1.1 0-2 .9-2 2v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h10v6.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V3z" />
              </svg>
            </span>{" "}
            WERE WAITING FOR.
          </span>
        </h2>

        {/* Small Red Accent Bar under Headline */}
        <div className="w-16 sm:w-20 h-1 bg-[#ed1438] rounded-full mx-auto mt-4 sm:mt-5" />

        {/* Waitlist Composition: "Join the sound?" | [ ✉ example@gmail.com ] [ JOIN WITH MUSIC → ] */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 mt-8 sm:mt-11 md:mt-14">
          {/* Left: "Join the sound?" in handwriting with hand-drawn red underline */}
          <div className="flex items-center select-none shrink-0">
            <div className="relative flex flex-col items-center sm:items-end">
              <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-neutral-900 font-bold whitespace-nowrap leading-tight">
                Join the sound?
              </span>
              {/* Hand-drawn red underline swoop */}
              <svg
                className="w-28 sm:w-32 h-2.5 text-[#ed1438] -mt-0.5 overflow-visible"
                viewBox="0 0 100 12"
                fill="none"
              >
                <path
                  d="M2 4C28 10 72 10 98 4"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Vertical Divider Line */}
            <div className="hidden sm:block h-8 w-px bg-neutral-300 mx-5 lg:mx-6 shrink-0" />
          </div>

          {/* Right: Email Input Capsule & Red Action Button */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col xs:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto"
          >
            {/* Input Capsule with Mail Icon */}
            <div className="relative flex items-center bg-white border border-neutral-300 rounded-full px-4 py-2 sm:py-2.5 shadow-xs focus-within:border-[#ed1438] focus-within:ring-2 focus-within:ring-[#ed1438]/20 transition-all w-full xs:w-auto">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-600 mr-2.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.6"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 font-sans focus:outline-none w-full xs:w-48 sm:w-56 md:w-60"
              />
            </div>

            {/* Red Action Button */}
            <button
              type="submit"
              disabled={submitted}
              className="w-full xs:w-auto shrink-0 bg-[#ed1438] hover:bg-[#d01030] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-7 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 shadow-md hover:shadow-red-600/30 active:scale-95 disabled:opacity-80 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              {submitted ? (
                "JOINED!"
              ) : (
                <>
                  <span>JOIN WITH MUSIC</span>
                  <span className="text-base font-normal leading-none -translate-y-px">
                    →
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {submitted && (
          <p className="mt-4 text-xs sm:text-sm text-[#ed1438] font-mono tracking-wide transition-opacity animate-fade-in text-center">
            Thanks for joining! We&apos;ll be in touch soon.
          </p>
        )}
      </div>

      {/* ============================================================ */}
      {/* 3. Dark Bottom Wave Ribbon with Brand, Socials & Credits     */}
      {/* ============================================================ */}
      <div className="relative w-full mt-16 sm:mt-20 md:mt-24">
        {/* Soft Pink Audio Equalizer Soundwave - Anchored directly above wave curve with airy gaps and subtle opacity */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-7 sm:-top-9 md:-top-11 lg:-top-13 z-0 pointer-events-none select-none w-[340px] xs:w-[440px] sm:w-[560px] md:w-[680px] lg:w-[740px] max-w-[94vw]">
          <svg
            viewBox="0 0 720 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="eqBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fca5b7" />
                <stop offset="100%" stopColor="#f68d9f" />
              </linearGradient>
            </defs>
            {soundwaveColumns.map((col, cIdx) =>
              Array.from({ length: col.bottom - col.peak + 1 }, (_, i) => {
                const d = col.peak + i;
                const y = 22 + d * 11.2;
                const isPeak = d === col.peak;
                return (
                  <rect
                    key={`${cIdx}-${d}`}
                    x={col.cx - 9}
                    y={y}
                    width={18}
                    height={4.5}
                    rx={2.25}
                    fill="url(#eqBarGrad)"
                    fillOpacity={isPeak ? 0.46 : 0.36}
                  />
                );
              })
            )}
          </svg>
        </div>

        {/* Sleek SVG Wave with Glowing Red Accent Border */}
        <div className="relative w-full overflow-hidden leading-none z-10 -mb-1">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-12 sm:h-16 md:h-20 lg:h-24 block"
            preserveAspectRatio="none"
          >
            {/* Glowing Red Accent Curve along the top edge */}
            <path
              d="M0 58 C 120 25, 200 18, 320 30 C 460 48, 600 70, 720 70 C 860 70, 960 30, 1060 30 C 1180 30, 1280 62, 1380 62 C 1400 62, 1420 58, 1440 54"
              stroke="#ed1438"
              strokeWidth="4"
              fill="none"
            />
            {/* Dark Charcoal / Black Wave Fill */}
            <path
              d="M0 58 C 120 25, 200 18, 320 30 C 460 48, 600 70, 720 70 C 860 70, 960 30, 1060 30 C 1180 30, 1280 62, 1380 62 C 1400 62, 1420 58, 1440 54 L 1440 90 L 0 90 Z"
              fill="#111111"
            />
          </svg>
        </div>

        {/* Solid Dark Bottom Footer Bar */}
        <div className="w-full bg-[#111111] text-white pt-2 sm:pt-4 pb-8 sm:pb-10 px-6 sm:px-10 md:px-14 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Left: Meladine Logo + Brand Title (Enlarged) */}
            <div className="flex items-center gap-3.5 sm:gap-4 md:gap-5 select-none shrink-0">
              <div className="relative h-14 sm:h-16 md:h-20 lg:h-[84px] aspect-[735/1080] shrink-0">
                <Image
                  src="/images/LOGO.png"
                  alt="Meladine Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-wider text-white leading-[0.9]">
                  MELADINE
                </span>
                <span className="text-xs sm:text-sm md:text-[15px] tracking-[0.28em] text-neutral-300 font-semibold uppercase leading-tight mt-1 sm:mt-1.5">
                  SONIC CONSERVATORY
                </span>
              </div>
            </div>

            {/* Center: White Circular Social Outline Badges */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/meladinemusicconservatory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 hover:border-[#ed1438] flex items-center justify-center text-white hover:text-[#ed1438] hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.88-.14-2.88 0-4.62 1.76-4.62 4.75v2.75H7v4h3v10h4v-10z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/meladinemusic/?__pwa=1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 hover:border-[#ed1438] flex items-center justify-center text-white hover:text-[#ed1438] hover:scale-110 transition-all"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* Spotify */}
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 hover:border-[#ed1438] flex items-center justify-center text-white hover:text-[#ed1438] hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.586 14.424c-.18.295-.563.387-.857.208-2.35-1.435-5.308-1.76-8.79-.964-.336.077-.672-.134-.749-.47-.077-.336.134-.672.47-.75 3.805-.87 7.075-.497 9.718 1.118.294.18.387.563.208.858zm1.228-2.73c-.226.367-.709.483-1.076.257-2.69-1.653-6.79-2.13-9.972-1.165-.413.125-.853-.112-.978-.525-.125-.413.112-.853.525-.978 3.633-1.103 8.147-.568 11.244 1.335.367.226.483.709.257 1.076zm.105-2.852c-3.228-1.916-8.553-2.093-11.631-1.159-.494.15-1.018-.134-1.168-.628-.15-.494.134-1.018.628-1.168 3.538-1.074 9.42-.87 13.12 1.326.444.263.589.838.326 1.282-.263.444-.838.589-1.275.347z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@meladinemusicconservatory2231"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 hover:border-[#ed1438] flex items-center justify-center text-white hover:text-[#ed1438] hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@meladinemusic?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/60 hover:border-[#ed1438] flex items-center justify-center text-white hover:text-[#ed1438] hover:scale-110 transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72v4.02c-.99-.3-2.12-.17-3 .42-.58.39-1.06.97-1.35 1.63-.22.5-.24 1.07-.12 1.6.21 1.56 1.75 2.85 3.32 2.82 1.52 0 2.73-1.07 3.03-2.48.1-.5.18-1.04.18-1.57V.02z" />
                </svg>
              </a>
            </div>

            {/* Right: Copyright & Alchemy Attribution (Clean Left-Aligned Stack) */}
            <div className="flex flex-col items-start text-left text-xs tracking-wider font-mono text-neutral-300 shrink-0">
              <div className="text-white/90 font-medium whitespace-nowrap">
                &copy; {new Date().getFullYear()} MELADINE ARCHIVE. ALL RIGHTS RESERVED.
              </div>
              <div className="flex items-center justify-start gap-1.5 text-white font-bold text-[11px] sm:text-xs tracking-widest mt-2 sm:mt-2.5 whitespace-nowrap">
                <span>DESIGNED &amp; DEVELOPED BY</span>
                <span className="text-[#ed1438] inline-flex items-center select-none -translate-y-px">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5 fill-[#ed1438] inline-block shrink-0"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
                <span className="text-white tracking-widest">
                  ALCHEMY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
