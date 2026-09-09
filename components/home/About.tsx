"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

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
  { text: "—" },
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
      className="relative w-full bg-white pt-10 sm:pt-14 md:pt-16 pb-28 sm:pb-36 px-6 sm:px-10 lg:px-16 border-t border-neutral-100 overflow-hidden"
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
      <div className="absolute -right-12 sm:-right-16 md:-right-20 top-6 sm:top-10 z-0 pointer-events-none select-none opacity-[0.07] rotate-12 transition-opacity">
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
      {/* Main Content Stage: Header, Large Scroll Text, Metadata      */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-between text-center">
        {/* Top Architectural Header - Centered in Handwriting Font (Scaled Down) */}
        <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
          <span className="font-handwriting text-lg sm:text-xl md:text-2xl font-bold tracking-wide flex items-center gap-1.5 select-none -rotate-1">
            <span className="inline-block w-1 h-1 rounded-full bg-[#ed1438] animate-pulse shrink-0" />
            <span className="text-neutral-950">about</span>
            <span className="text-[#ed1438]">Meladine</span>
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
        </div>
      </div>
    </section>
  );
}
