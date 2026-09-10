"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface WordItem {
  text: string;
  isHighlight?: boolean;
}

const WORDS: WordItem[] = [
  { text: "MELADINE", isHighlight: true },
  { text: "IS" },
  { text: "A" },
  { text: "LIVING" },
  { text: "CONSERVATORY" },
  { text: "FOUNDED" },
  { text: "BY" },
  { text: "TOURING", isHighlight: true },
  { text: "ARTISTS", isHighlight: true },
  { text: "CULTIVATING" },
  { text: "REAL" },
  { text: "STAGECRAFT,", isHighlight: true },
  { text: "ANALOG" },
  { text: "TONE," },
  { text: "AND" },
  { text: "FEARLESS" },
  { text: "SONIC", isHighlight: true },
  { text: "FREEDOM.", isHighlight: true },
];

interface CharData {
  char: string;
  globalIndex: number;
  isHighlight?: boolean;
}

interface WordWithChars {
  word: string;
  isHighlight?: boolean;
  chars: CharData[];
}

let runningIndex = 0;
const PROCESSED_WORDS: WordWithChars[] = WORDS.map((item) => {
  const chars: CharData[] = Array.from(item.text).map((char) => {
    const charObj: CharData = {
      char,
      globalIndex: runningIndex,
      isHighlight: item.isHighlight,
    };
    runningIndex++;
    return charObj;
  });

  return {
    word: item.text,
    isHighlight: item.isHighlight,
    chars,
  };
});

const TOTAL_CHARS = runningIndex;

interface AboutNotationItem {
  id: string;
  src: string;
  top: string;
  left?: string;
  right?: string;
  sizeClass: string;
  width: number;
  height: number;
  rotation: string;
  delay: string;
  duration: string;
}

const ABOUT_NOTATIONS: AboutNotationItem[] = [
  // Upper Left: Floating above/beside "MELADINE"
  {
    id: "about-note-1",
    src: "/images/About/Notation1.png",
    top: "16%",
    left: "5%",
    sizeClass: "w-11 sm:w-14 md:w-18 lg:w-20",
    width: 130,
    height: 173,
    rotation: "-rotate-[14deg]",
    delay: "0s",
    duration: "2.8s",
  },
  // Lower Right: Near bottom right flank
  {
    id: "about-note-4",
    src: "/images/About/Notation2.png",
    top: "72%",
    right: "7%",
    sizeClass: "w-10 sm:w-13 md:w-17 lg:w-20",
    width: 120,
    height: 168,
    rotation: "rotate-[14deg]",
    delay: "-0.8s",
    duration: "2.9s",
  },
];

export default function About() {
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateScrollProgress = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Start coloring immediately as the top of the text enters the lower screen
      const startY = windowHeight * 0.85;
      // Complete coloring as the text reaches the upper third of the screen
      const endY = windowHeight * 0.22;

      // Calculate real-time progress during scroll
      const rawProgress = (startY - rect.top) / (startY - endY);
      const clamped = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clamped);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      id="about"
      className="relative w-full bg-white pt-20 sm:pt-28 md:pt-36 lg:pt-40 pb-6 sm:pb-8 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* ============================================================ */}
      {/* Background Architectural Hairline Grid Overlay               */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* Architectural Watermark Drawing: Microphone Blueprint Sketch */}
      {/* ============================================================ */}
      <div className="absolute -right-12 sm:-right-16 md:-right-20 top-12 sm:top-16 md:top-20 z-0 pointer-events-none select-none opacity-[0.07] rotate-12 transition-opacity">
        <div className="relative w-[340px] sm:w-[460px] md:w-[560px] aspect-[1122/1402]">
          <Image
            src="/images/Mentors/Microphone.png"
            alt="Microphone Architectural Sketch Watermark"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* Floating Musical Notations with Up/Down Floating Animation   */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
      >
        {ABOUT_NOTATIONS.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
            }}
          >
            <div className={`${item.rotation} opacity-100 transition-opacity duration-500`}>
              <div
                style={{
                  animation: `notationFloat ${item.duration} ease-in-out infinite`,
                  animationDelay: item.delay,
                }}
                className="will-change-transform"
              >
                <div className={item.sizeClass}>
                  <Image
                    src={item.src}
                    alt=""
                    width={item.width}
                    height={item.height}
                    className="w-full h-auto object-contain drop-shadow-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================ */}
      {/* Main Content Stage: Header, Large Scroll Text, Metadata      */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-between text-center">
        {/* Top Architectural Header */}
        <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8 select-none">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-[#ed1438] uppercase font-bold">
            {"// 01 ABOUT MELADINE"}
          </span>
        </div>

        {/* Center: Large Bebas Neue Display Text Revealing Color Letter-by-Letter */}
        <div ref={textRef} className="my-auto max-w-6xl mx-auto py-4 sm:py-8 text-center">
          <p className="font-display uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] leading-[0.98] sm:leading-[0.95] select-none text-center">
            {PROCESSED_WORDS.map((wordItem, wordIdx) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap mx-[0.16em]">
                {wordItem.chars.map((charObj) => {
                  const charThreshold = charObj.globalIndex / TOTAL_CHARS;
                  const isColored = scrollProgress >= charThreshold;

                  let colorStyle = "text-neutral-300 opacity-25";

                  if (isColored) {
                    if (charObj.isHighlight) {
                      colorStyle = "text-[#ed1438] opacity-100 drop-shadow-xs";
                    } else {
                      colorStyle = "text-neutral-950 opacity-100";
                    }
                  }

                  return (
                    <span
                      key={charObj.globalIndex}
                      className={`inline-block transition-colors duration-75 ease-out will-change-transform ${colorStyle}`}
                    >
                      {charObj.char}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>

          {/* CTA Redirecting to /about */}
          <div className="mt-10 sm:mt-14 flex items-center justify-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] hover:shadow-lg hover:shadow-[#ed1438]/20 active:scale-95 transition-all duration-200 cursor-pointer group shadow-sm"
            >
              <span>Explore Our Story</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1 text-base">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
