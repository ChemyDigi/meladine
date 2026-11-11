"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DoodleArrow from "@/components/home/DoodleArrow";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

// Closing headline. The very first letter gets the site's signature
// "popped red letter" treatment (same as the M in MENTORS, E in EVENTS).
const HEADLINE_LINES: string[][] = [
  ["YOUR", "STAGE"],
  ["IS", "WAITING."],
];

// Same slight tilts the page headers use for their staggered entrance.
const ROTATIONS = [-3, 2.5, -2, 3, -2.5, 2, -3, 2];

// Pre-split headline with a running letter index (drives the stagger delay).
const HEADLINE = (() => {
  let idx = 0;
  return HEADLINE_LINES.map((line) =>
    line.map((word) => word.split("").map((letter) => ({ letter, idx: idx++ })))
  );
})();

// Mirrors the curtain menu order.
const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "MENTORS", href: "/mentors" },
  { label: "EVENTS", href: "/events" },
  { label: "CONTACT", href: "/contact" },
];

// Mirrors the numbering used in the Core Disciplines bar.
const DISCIPLINES = [
  { number: "01", label: "VOCALS" },
  { number: "02", label: "GUITAR" },
  { number: "03", label: "KEYBOARD" },
];

const CONTACT_EMAIL = "hello@meladine.com";
const CONTACT_PHONE_DISPLAY = "+90 544 323 7623";
const CONTACT_PHONE_HREF = "tel:+905443237623";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/meladinemusic/?__pwa=1",
    icon: (
      <svg
        className="w-4 h-4 fill-none stroke-current"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/meladinemusicconservatory",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.52-.14-2.88-.14-2.88 0-4.62 1.76-4.62 4.75v2.75H7v4h3v10h4v-10z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@meladinemusicconservatory2231",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@meladinemusic?is_from_webapp=1&sender_device=pc",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72v4.02c-.99-.3-2.12-.17-3 .42-.58.39-1.06.97-1.35 1.63-.22.5-.24 1.07-.12 1.6.21 1.56 1.75 2.85 3.32 2.82 1.52 0 2.73-1.07 3.03-2.48.1-.5.18-1.04.18-1.57V.02z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function Footer() {
  const pathname = usePathname();
  const stageRef = useRef<HTMLDivElement>(null);

  // The route on which the headline entrance last played. Keying it by pathname
  // replays the entrance after navigation (the footer persists in the layout)
  // without having to reset state inside the effect.
  const [revealedOn, setRevealedOn] = useState<string | null>(null);
  const revealed = revealedOn === pathname;

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const reveal = () => setRevealedOn(pathname);

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(reveal, 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);

    // Belt and braces: smooth-scroll libraries can starve the observer during
    // fast momentum scrolls, so also reveal from plain scroll position.
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) reveal();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.__lenis?.on("scroll", onScroll);
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.__lenis?.off("scroll", onScroll);
    };
  }, [pathname]);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      id="site-main-footer"
      className="relative w-full bg-white text-neutral-900 overflow-hidden"
    >
      {/* ============================================================ */}
      {/* Background: architectural hairline grid (shared by sections) */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0" aria-hidden="true">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* Background: blueprint treble clef watermark (bottom right)   */}
      {/* ============================================================ */}
      <div
        className="absolute -right-10 sm:-right-16 md:-right-20 bottom-16 sm:bottom-20 z-0 pointer-events-none select-none opacity-[0.07] rotate-12"
        aria-hidden="true"
      >
        <div className="relative w-[240px] sm:w-[360px] md:w-[440px] lg:w-[500px] aspect-[2/3]">
          <Image
            src="/images/Home/TrebelClef.png"
            alt=""
            fill
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 440px, 500px"
            className="object-contain"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. Final Movement: headline, annotation and admissions CTA   */}
      {/* ============================================================ */}
      <div
        ref={stageRef}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Left: section label, giant headline, supporting copy */}
          <div className="lg:col-span-7 relative">
            {/* Floating glossy notation (same asset + float as About / Mentors) */}
            <div
              className="absolute -top-6 sm:-top-8 right-2 sm:right-8 lg:right-0 z-20 pointer-events-none select-none"
              aria-hidden="true"
            >
              <div className="animate-notation-float rotate-[18deg]">
                <div className="relative w-9 sm:w-12 md:w-14 aspect-[120/160]">
                  <Image
                    src="/images/About/Notation1.png"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>
            </div>

            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#ed1438] uppercase font-bold select-none">
              {"// 05 FINAL MOVEMENT"}
            </span>

            <h2
              className="mt-3 sm:mt-4 font-display uppercase tracking-tight text-neutral-950 text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] xl:text-[8.5rem] leading-[0.88] select-none cursor-default"
              aria-label="Your stage is waiting."
            >
              {HEADLINE.map((line, lineIdx) => (
                <span key={lineIdx} className="block whitespace-nowrap">
                  {line.map((word, wordIdx) => (
                    <span
                      key={`${lineIdx}-${wordIdx}`}
                      className="inline-block mr-[0.22em] last:mr-0"
                    >
                      {word.map(({ letter, idx }) => {
                        const isLead = idx === 0;

                        let transform: string;
                        if (revealed) {
                          transform = isLead
                            ? "translateY(-14px) scale(1.12) rotate(-3deg)"
                            : "translateY(0) scale(1) rotate(0deg)";
                        } else {
                          transform = isLead
                            ? "translateY(60px) scale(0.65) rotate(-6deg)"
                            : `translateY(60px) scale(0.65) rotate(${ROTATIONS[idx % ROTATIONS.length] * 2}deg)`;
                        }

                        return (
                          <span
                            key={idx}
                            aria-hidden="true"
                            style={{
                              transform,
                              filter: isLead
                                ? "drop-shadow(0 16px 20px rgba(237, 20, 56, 0.26))"
                                : undefined,
                              transitionDelay: `${idx * 45}ms`,
                            }}
                            className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform motion-reduce:transition-none ${
                              isLead ? "text-[#ed1438]" : "text-neutral-950"
                            } ${revealed ? "opacity-100" : "opacity-0"}`}
                          >
                            {letter}
                          </span>
                        );
                      })}
                    </span>
                  ))}
                </span>
              ))}
            </h2>

            <p className="mt-6 sm:mt-8 max-w-xl text-neutral-600 font-light leading-relaxed text-sm sm:text-base md:text-lg">
              Trial sessions, auditions and private mentorship across vocals,
              guitar and keyboard. One message is all it takes to begin.
            </p>
          </div>

          {/* Right: handwritten annotation + doodle arrow pointing at the CTA */}
          <div className="lg:col-span-5 flex flex-col items-start lg:items-end gap-4 sm:gap-5">
            <div className="flex items-end gap-2 sm:gap-3 select-none pr-6 lg:pr-10">
              <div className="flex flex-col items-end text-right -rotate-2">
                <span className="font-handwriting text-xl sm:text-2xl md:text-3xl text-neutral-900 font-bold whitespace-nowrap leading-tight">
                  ready when you are?
                </span>
                <span className="-mt-0.5 sm:-mt-1 font-handwriting text-base sm:text-xl md:text-2xl text-[#ed1438] font-bold whitespace-nowrap leading-tight">
                  start with a trial session
                </span>
              </div>
              <div className="w-14 sm:w-16 md:w-20 rotate-[68deg] shrink-0 -mb-2 sm:-mb-3">
                <DoodleArrow className="w-full h-auto drop-shadow-xs" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center lg:justify-end gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap hover:bg-[#ed1438] hover:shadow-lg hover:shadow-[#ed1438]/20 active:scale-95 transition-all duration-200 cursor-pointer group shadow-sm"
              >
                <span>Book a Trial Session</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1 text-base">
                  &rarr;
                </span>
              </Link>
              <a
                href={CONTACT_PHONE_HREF}
                className="inline-flex items-center justify-center px-7 sm:px-8 py-3.5 sm:py-4 rounded-full border border-black/90 bg-white/80 text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap text-black hover:bg-black hover:text-white transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
              >
                Call the Academy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. Directory: brand, navigation, disciplines, contact        */}
      {/* ============================================================ */}
      <div className="relative z-10 border-t border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-12 sm:py-14 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-0">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col items-start">
            <Link
              href="/"
              aria-label="Meladine Home"
              className="group flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg"
            >
              <div className="relative h-16 sm:h-20 aspect-[735/1080] shrink-0">
                <Image
                  src="/images/LOGO.png"
                  alt="Meladine Music Conservatory"
                  fill
                  sizes="56px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-3xl sm:text-4xl tracking-wide text-neutral-950 leading-[0.9]">
                  MELADINE
                </span>
                <span className="text-[10px] sm:text-xs tracking-[0.28em] text-neutral-500 font-semibold uppercase mt-1">
                  Music Conservatory
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm text-neutral-500 font-light leading-relaxed">
              A living conservatory where musical passion meets practical
              learning, creativity and real-world performance.
            </p>

            {/* Socials: circular outline badges, same language as the navbar toggle */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-900 hover:bg-neutral-950 hover:border-neutral-950 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation" className="lg:col-span-2 lg:col-start-6">
            <span className="block text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3 select-none">
              {"// NAVIGATE"}
            </span>
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-display text-2xl sm:text-[1.75rem] uppercase tracking-wide text-neutral-950 hover:text-[#ed1438] transition-colors duration-200 leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Disciplines */}
          <div className="lg:col-span-2">
            <span className="block text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3 select-none">
              {"// DISCIPLINES"}
            </span>
            <ul className="flex flex-col gap-1">
              {DISCIPLINES.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 tracking-widest">
                    {item.number}
                  </span>
                  <span className="font-display text-2xl sm:text-[1.75rem] uppercase tracking-wide text-neutral-950 leading-tight">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10 flex flex-col gap-5">
            <div>
              <span className="block text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase mb-1 select-none">
                {"// ADMISSIONS & INQUIRIES"}
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-display text-xl sm:text-2xl uppercase text-neutral-950 hover:text-[#ed1438] transition-colors duration-200 break-all"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <span className="block text-[10px] sm:text-xs font-mono tracking-widest text-neutral-400 uppercase mb-1 select-none">
                {"// DIRECT ACADEMY LINE"}
              </span>
              <a
                href={CONTACT_PHONE_HREF}
                className="font-display text-xl sm:text-2xl uppercase text-neutral-950 hover:text-[#ed1438] transition-colors duration-200"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Our mentors respond within 48 hours.
            </p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. Closing curtain strip: legal, credits, back to top        */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full bg-[#ed1438] text-black overflow-hidden">
        {/* Same 12 seams the curtain menu draws across its red panels */}
        <div className="curtain-grid-columns opacity-30" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="curtain-grid-col" />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-6 text-[11px] sm:text-xs font-mono font-medium tracking-wider uppercase text-black/90 text-center sm:text-left">
          <div className="max-w-full sm:whitespace-nowrap">
            &copy; {new Date().getFullYear()} Meladine Music Conservatory. All rights reserved.
          </div>

          <div className="inline-flex items-center gap-1.5 whitespace-nowrap">
            <span>Designed &amp; developed by</span>
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 fill-white inline-block shrink-0"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="font-bold">Alchemy</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            <span>Back to top</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
              &uarr;
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
