"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { playPianoSound } from "@/lib/piano";

const LETTERS = ["M", "E", "L", "A", "D", "I", "N", "E"];

// Full C Major Octave Frequencies: C4 -> C5
const PIANO_NOTES = [
  261.63, // M -> C4 (Do)
  293.66, // E -> D4 (Re)
  329.63, // L -> E4 (Mi)
  349.23, // A -> F4 (Fa)
  392.0,  // D -> G4 (Sol)
  440.0,  // I -> A4 (La)
  493.88, // N -> B4 (Ti)
  523.25, // E -> C5 (High Do)
];

// Slight rotational tilts for dynamic spring pop-up
const ROTATIONS = [-3, 2.5, -2, 3, -2.5, 2, -3, 2];

export default function Hero() {
  const [revealed, setRevealed] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeClickIdx, setActiveClickIdx] = useState<number | null>(null);
  const [waveActive, setWaveActive] = useState(false);
  const [waveIdx, setWaveIdx] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  // Handle single letter piano key press
  const handleLetterClick = (i: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playPianoSound(PIANO_NOTES[i], 0.48);
    setActiveClickIdx(i);

    setTimeout(() => {
      setActiveClickIdx((curr) => (curr === i ? null : curr));
    }, 280);
  };

  // Sequential audio-wave arpeggio ripple across all 8 letters
  const triggerWave = () => {
    if (waveActive) return;
    setWaveActive(true);

    LETTERS.forEach((_, i) => {
      setTimeout(() => {
        setWaveIdx(i);
        playPianoSound(PIANO_NOTES[i], 0.32);
        if (i === LETTERS.length - 1) {
          setTimeout(() => {
            setWaveIdx(null);
            setWaveActive(false);
          }, 260);
        }
      }, i * 75);
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-white flex flex-col justify-between pt-28 sm:pt-32 pb-12 px-6 sm:px-10 lg:px-14 overflow-hidden"
    >
      {/* Background Architectural Subtle Grid (Pure White Theme) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      {/* Main Center Hero Headline & Composition (Dummy Text) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-12 md:py-20 flex flex-col items-center justify-center text-center">
        
        {/* Dummy Tag */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-mono tracking-widest text-[#ed1438] uppercase mb-6 transition-all duration-700 ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ed1438] animate-pulse" />
          UNDERGROUND SOUND LAB // DUMMY HERO
        </div>

        {/* Giant Hero Title in Condensed Display Typography with Piano Sound & Elastic Letter Pop */}
        <h1
          onClick={triggerWave}
          className="w-full text-neutral-950 font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] leading-[0.85] tracking-tight uppercase select-none text-center cursor-pointer group whitespace-nowrap pt-4 sm:pt-6 pb-2 sm:pb-4"
          title="Click each letter to play piano notes"
        >
          {LETTERS.map((letter, i) => {
            const isDirectlyHovered = hoveredIdx === i;
            const isNeighborHovered = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;
            const isWaveCurrent = waveIdx === i;
            const isClicked = activeClickIdx === i;

            let transformStyle = "";
            let colorClass = "text-neutral-950";
            let filterStyle = "";

            if (isClicked) {
              transformStyle = `translateY(-28px) scale(1.18) rotate(${ROTATIONS[i] * 1.5}deg)`;
              colorClass = "text-[#ed1438]";
              filterStyle = "drop-shadow(0 20px 26px rgba(237, 20, 56, 0.35))";
            } else if (isDirectlyHovered || isWaveCurrent) {
              transformStyle = `translateY(-20px) scale(1.12) rotate(${ROTATIONS[i]}deg)`;
              colorClass = "text-[#ed1438]";
              filterStyle = "drop-shadow(0 16px 20px rgba(237, 20, 56, 0.22))";
            } else if (isNeighborHovered) {
              transformStyle = "translateY(-7px) scale(1.04)";
              colorClass = "text-neutral-800";
            } else if (revealed) {
              transformStyle = "translateY(0) scale(1) rotate(0deg)";
            } else {
              transformStyle = `translateY(70px) scale(0.65) rotate(${ROTATIONS[i] * 2}deg)`;
            }

            const delayStyle =
              revealed && (isDirectlyHovered || isNeighborHovered || isWaveCurrent || isClicked)
                ? "0ms"
                : `${i * 55}ms`;

            return (
              <span
                key={i}
                onClick={(e) => handleLetterClick(i, e)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: transformStyle,
                  filter: filterStyle || undefined,
                  transitionDelay: delayStyle,
                }}
                className={`inline-block transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
              >
                {letter}
              </span>
            );
          })}
        </h1>

        {/* Sub-Headline & Dummy Manifesto Statement */}
        <div
          className={`mt-6 sm:mt-10 w-full max-w-3xl flex flex-col items-center text-center transition-all duration-800 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-sm sm:text-base md:text-lg font-light text-neutral-700 leading-relaxed tracking-wider max-w-2xl uppercase">
            TURNING EMOTION INTO SOUND, CRAFTING EXPERIENCES BEYOND BORDERS.
          </p>
          <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-mono max-w-lg leading-relaxed">
            [ Placeholder text for Home Hero section. Underground electronic sound research, live modular rigs, and immersive audio spaces. ]
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-black text-white text-xs md:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95"
            >
              Explore Events
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-neutral-300 text-neutral-900 text-xs md:text-sm font-semibold tracking-wider uppercase hover:border-black hover:bg-neutral-50 transition-all duration-300 active:scale-95"
            >
              Our Manifesto
            </Link>
          </div>
        </div>

        {/* Minimal Audio Frequency Bars */}
        <div className="mt-14 w-full flex items-center justify-between gap-6 pt-6 border-t border-neutral-100 max-w-5xl">
          <div className="flex items-center gap-1.5 h-6">
            <span className="w-1 bg-neutral-300 h-2 animate-pulse" />
            <span className="w-1 bg-neutral-800 h-5 animate-pulse" style={{ animationDelay: "150ms" }} />
            <span className="w-1 bg-neutral-400 h-3 animate-pulse" style={{ animationDelay: "300ms" }} />
            <span className="w-1 bg-neutral-900 h-6 animate-pulse" style={{ animationDelay: "75ms" }} />
            <span className="w-1 bg-neutral-300 h-4 animate-pulse" style={{ animationDelay: "200ms" }} />
            <span className="w-1 bg-neutral-600 h-3 animate-pulse" style={{ animationDelay: "400ms" }} />
            <span className="text-xs font-mono text-neutral-400 ml-2">FREQUENCY: 128.0 BPM</span>
          </div>
          
          <div className="text-xs font-mono text-neutral-400 hidden sm:block">
            01 // SOUND &bull; 02 // SHOWCASES &bull; 03 // MENTORSHIP
          </div>
        </div>
      </div>

      {/* Bottom Hero Anchor / Scroll Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-6 border-t border-neutral-100">
        <div>&copy; {new Date().getFullYear()} MELADINE ARCHIVE</div>
        <Link
          href="/about"
          className="group flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
        >
          <span>EXPLORE ARCHIVE</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
