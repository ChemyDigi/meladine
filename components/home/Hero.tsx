"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GuitarModel from "./GuitarModel";
import DoodleArrow from "./DoodleArrow";
import { playPianoSound } from "@/lib/piano";

const LETTERS = ["M", "E", "L", "A", "D", "I", "N", "E"];
const NOTE_LABELS = ["C", "D", "E", "F", "G", "A", "B", "C"];

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
  const [isPlayingAll, setIsPlayingAll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    const win = window as unknown as { __setMeladineHoveredLetter?: (idx: number | null) => void };
    win.__setMeladineHoveredLetter = (idx) => {
      setHoveredIdx(idx);
    };

    return () => {
      clearTimeout(timer);
      delete win.__setMeladineHoveredLetter;
    };
  }, []);

  // Handle single letter piano key press
  const handleLetterClick = (i: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playPianoSound(PIANO_NOTES[i], 0.48);
    setActiveClickIdx(i);

    setTimeout(() => {
      setActiveClickIdx((curr) => (curr === i ? null : curr));
    }, 280);
  };

  // Play all letters sequentially forward (M -> E) and then backward (E -> M), then stop
  const playAllLetters = () => {
    if (isPlayingAll) return;
    setIsPlayingAll(true);

    // Sequence of indices: 0..7 then 7..0
    const forwardIndices = Array.from({ length: PIANO_NOTES.length }, (_, i) => i);
    const backwardIndices = Array.from({ length: PIANO_NOTES.length }, (_, i) => PIANO_NOTES.length - 1 - i);
    const fullSequence = [...forwardIndices, ...backwardIndices];

    const noteInterval = 180;
    const highlightDuration = 200;

    fullSequence.forEach((idx, step) => {
      setTimeout(() => {
        playPianoSound(PIANO_NOTES[idx], 0.48);
        setActiveClickIdx(idx);

        setTimeout(() => {
          setActiveClickIdx((curr) => (curr === idx ? null : curr));
        }, highlightDuration);

        if (step === fullSequence.length - 1) {
          setTimeout(() => {
            setIsPlayingAll(false);
          }, 300);
        }
      }, step * noteInterval);
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] w-full bg-white flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-10 lg:pb-12 px-4 sm:px-8 md:px-10 lg:px-14 overflow-x-hidden overflow-y-visible"
    >
      {/* ============================================================ */}
      {/* Background Architectural Grid & Subtle Watermark Drawings    */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      {/* Top Left Watermark: Acoustic Guitar Architectural Sketch */}
      <div className="absolute -left-12 sm:-left-16 md:-left-20 top-16 sm:top-20 z-0 pointer-events-none select-none opacity-[0.14] sm:opacity-[0.16] -rotate-12 transition-opacity">
        <div className="relative w-[240px] sm:w-[380px] md:w-[480px] lg:w-[540px] aspect-[2/3]">
          <Image
            src="/images/Mentors/AcousticGuitar.png"
            alt="Acoustic Guitar Blueprint Watermark"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Right Watermark: Architectural Keyboard Sketch */}
      <div className="absolute -right-10 sm:-right-16 md:-right-20 -bottom-10 sm:-bottom-16 md:-bottom-20 z-0 pointer-events-none select-none opacity-[0.14] sm:opacity-[0.16] rotate-[8deg] transition-opacity">
        <div className="relative w-[220px] sm:w-[360px] md:w-[440px] lg:w-[500px] aspect-[1122/1402]">
          <Image
            src="/images/Mentors/Keyboard.png"
            alt="Keyboard Blueprint Watermark"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* Main Center Stage: Giant Title, 3D Guitar & Doodle Annotations*/}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto flex flex-col items-center justify-center text-center -translate-y-4 sm:-translate-y-10 md:-translate-y-16 lg:-translate-y-28 xl:-translate-y-36">
        
        {/* Layered Composition Stage: Background Text (z-10) with Foreground 3D Guitar (z-20) */}
        <div className="relative w-full flex items-center justify-center min-h-[360px] sm:min-h-[460px] md:min-h-[540px] lg:min-h-[660px] xl:min-h-[700px]">
          
          {/* Hand-Drawn Annotation 1: Pointing to 3D Guitar (Desktop >= lg) */}
          <div
            className={`hidden lg:flex absolute right-[52%] lg:right-[54%] xl:right-[55%] top-[56%] xl:top-[60%] z-30 items-center pointer-events-none select-none transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              revealed ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="flex flex-col items-end text-right -rotate-2 hover:scale-105 transition-transform">
              <div className="font-handwriting text-2xl xl:text-3xl text-neutral-950 font-bold tracking-wide drop-shadow-xs whitespace-nowrap">
                interactive 3D electric guitar
              </div>
              <div className="-mt-1 font-handwriting text-lg xl:text-xl text-[#ed1438] font-bold tracking-wide drop-shadow-xs whitespace-nowrap">
                click &amp; drag to inspect 360°
              </div>
            </div>

            <div className="w-20 sm:w-24 xl:w-28 rotate-[165deg] shrink-0 ml-1.5 sm:ml-2">
              <DoodleArrow className="w-full h-auto drop-shadow-sm" />
            </div>
          </div>

          {/* Giant Hero Title in Condensed Display Typography (Z-Index 10: Behind Guitar) */}
          <h1
            className="relative z-10 -top-14 sm:-top-24 md:-top-32 lg:-top-44 xl:-top-52 w-full text-neutral-950 font-display text-[13.5vw] xs:text-[13vw] sm:text-[12.5vw] md:text-[12vw] lg:text-[13.5rem] xl:text-[14.5rem] leading-[0.85] tracking-tight uppercase select-none text-center whitespace-nowrap pt-2 sm:pt-4 pb-2"
            title="Click each letter to play piano notes"
          >
            {LETTERS.map((letter, i) => {
              const isDirectlyHovered = hoveredIdx === i;
              const isNeighborHovered = hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1;
              const isClicked = activeClickIdx === i;

              let transformStyle = "";
              let colorClass = "text-neutral-950";
              let filterStyle = "";

              if (isClicked) {
                transformStyle = `translateY(-20px) scale(1.15) rotate(${ROTATIONS[i] * 1.5}deg)`;
                colorClass = "text-[#ed1438]";
                filterStyle = "drop-shadow(0 16px 22px rgba(237, 20, 56, 0.32))";
              } else if (isDirectlyHovered) {
                transformStyle = `translateY(-14px) scale(1.10) rotate(${ROTATIONS[i]}deg)`;
                colorClass = "text-[#ed1438]";
                filterStyle = "drop-shadow(0 14px 18px rgba(237, 20, 56, 0.20))";
              } else if (isNeighborHovered) {
                transformStyle = "translateY(-6px) scale(1.03)";
                colorClass = "text-neutral-800";
              } else if (revealed) {
                transformStyle = "translateY(0) scale(1) rotate(0deg)";
              } else {
                transformStyle = `translateY(50px) scale(0.7) rotate(${ROTATIONS[i] * 2}deg)`;
              }

              const delayStyle =
                revealed && (isDirectlyHovered || isNeighborHovered || isClicked)
                  ? "0ms"
                  : `${i * 45}ms`;

              return (
                <span key={i} className="relative inline-block px-[0.5vw] sm:px-0">
                  <span
                    data-piano-letter={i}
                    onClick={(e) => handleLetterClick(i, e)}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    style={{
                      transform: transformStyle,
                      filter: filterStyle || undefined,
                      transitionDelay: delayStyle,
                    }}
                    className={`relative inline-block cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
                      revealed ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {/* Note pitch label (C, D, E...) */}
                    <span
                      className={`absolute -top-2 sm:-top-4 md:-top-6 left-1/2 -translate-x-1/2 font-mono text-[9px] sm:text-xs md:text-sm font-semibold tracking-normal transition-colors duration-300 pointer-events-none select-none ${
                        isClicked || isDirectlyHovered ? "text-[#ed1438]" : "text-neutral-400"
                      }`}
                    >
                      {NOTE_LABELS[i]}
                    </span>
                    {letter}
                  </span>

                  {/* Desktop Hand-Drawn Annotation: Anchored to letter 'E' slot (Desktop >= lg) */}
                  {i === 7 && (
                    <span
                      className={`hidden lg:flex absolute left-[48%] lg:left-[55%] top-[55%] lg:top-[65%] z-30 items-center pointer-events-none select-none transition-all duration-800 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] normal-case tracking-normal ${
                        revealed ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
                      }`}
                    >
                      <span className="w-20 sm:w-24 lg:w-28 rotate-[-10deg] shrink-0 block">
                        <DoodleArrow className="w-full h-auto drop-shadow-sm" />
                      </span>
                      <span className="flex flex-col items-start rotate-2 ml-1 sm:ml-2 hover:scale-105 transition-transform text-left">
                        <span className="font-handwriting text-2xl sm:text-3xl text-neutral-950 font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight block">
                          ♫ 8-note octave keys
                        </span>
                        <span className="-mt-1 font-handwriting text-lg sm:text-xl text-[#ed1438] font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight block">
                          click letters to play notes
                        </span>

                        {/* Red Circle Play Button with White Play Icon */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playAllLetters();
                          }}
                          disabled={isPlayingAll}
                          aria-label="Play octave scale up and down"
                          title="Play octave scale up and down"
                          className="pointer-events-auto mt-2 flex items-center gap-2 group cursor-pointer focus:outline-none"
                        >
                          <span
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ed1438] flex items-center justify-center text-white shadow-md shadow-[#ed1438]/30 transition-all duration-200 group-hover:scale-110 group-hover:bg-[#d60f30] group-active:scale-95 ${
                              isPlayingAll ? "animate-pulse ring-4 ring-[#ed1438]/20" : ""
                            }`}
                          >
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                              <polygon points="6 4 20 12 6 20 6 4" />
                            </svg>
                          </span>
                          <span className="font-handwriting text-base sm:text-lg text-neutral-800 font-bold -rotate-1 group-hover:text-[#ed1438] transition-colors whitespace-nowrap select-none">
                            {isPlayingAll ? "playing..." : "play octave"}
                          </span>
                        </button>
                      </span>
                    </span>
                  )}
                </span>
              );
            })}
          </h1>

          {/* 3D Electric Guitar Model (Z-Index 20: Layered In Front of Text) */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="w-full max-w-[320px] xs:max-w-[360px] sm:max-w-lg md:max-w-xl lg:max-w-2xl h-[300px] xs:h-[340px] sm:h-[420px] md:h-[500px] lg:h-full pointer-events-auto translate-y-8 xs:translate-y-12 sm:translate-y-18 md:translate-y-24 lg:translate-y-36 xl:translate-y-42">
              <GuitarModel />
            </div>
          </div>

        </div>

        {/* Mobile & Tablet Interactive Bar: Shows Play Button & Hints (Visible on < lg) */}
        <div
          className={`lg:hidden relative z-30 flex flex-wrap items-center justify-center gap-2 xs:gap-3 sm:gap-4 mt-2 sm:mt-4 transition-all duration-700 delay-300 ease-out ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Quick Play Octave Button */}
          <button
            type="button"
            onClick={playAllLetters}
            disabled={isPlayingAll}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 border border-neutral-200/90 shadow-xs active:scale-95 transition-all text-xs sm:text-sm font-semibold text-neutral-900 cursor-pointer"
          >
            <span
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#ed1438] flex items-center justify-center text-white shrink-0 shadow-xs ${
                isPlayingAll ? "animate-pulse" : ""
              }`}
            >
              <svg className="w-2.5 h-2.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                <polygon points="6 4 20 12 6 20 6 4" />
              </svg>
            </span>
            <span className="font-handwriting text-base sm:text-lg font-bold text-neutral-900">
              {isPlayingAll ? "playing scale..." : "Play octave scale"}
            </span>
          </button>

          {/* Touch instructions badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100/80 text-neutral-600 text-[11px] sm:text-xs font-medium">
            <span className="text-[#ed1438]">♫</span>
            <span>Tap letters to play notes • Drag guitar 360°</span>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* Bottom Bar: Conservatory Metrics & Mentors Page CTA Gateway  */}
      {/* ============================================================ */}
      <div
        className={`relative z-20 w-full max-w-7xl mx-auto mt-4 sm:mt-0 lg:-mt-36 xl:-mt-48 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 transition-all duration-800 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Left: Conservatory Statistical Metrics */}
        <div className="w-full sm:w-auto grid grid-cols-3 sm:flex sm:items-center gap-3 sm:gap-8 justify-items-center sm:justify-items-start">
          {/* Metric 1: 19+ Years Teaching */}
          <div className="flex flex-col items-center sm:items-start group cursor-default text-center sm:text-left">
            <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-center sm:origin-left">
              19+
            </div>
            <div className="text-[11px] sm:text-xs text-neutral-500 font-sans font-medium tracking-tight mt-1">
              Years Teaching
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-neutral-200" />

          {/* Metric 2: 250+ Students */}
          <div className="flex flex-col items-center sm:items-start group cursor-default text-center sm:text-left">
            <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-center sm:origin-left">
              250+
            </div>
            <div className="text-[11px] sm:text-xs text-neutral-500 font-sans font-medium tracking-tight mt-1">
              Mentored Artists
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-neutral-200" />

          {/* Metric 3: 3 Resident Disciplines */}
          <div className="flex flex-col items-center sm:items-start group cursor-default text-center sm:text-left">
            <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-center sm:origin-left">
              3
            </div>
            <div className="text-[11px] sm:text-xs text-neutral-500 font-sans font-medium tracking-tight mt-1">
              Core Disciplines
            </div>
          </div>
        </div>

        {/* Right: Direct Mentors Gateway & Admissions CTA */}
        <div className="flex items-center justify-center w-full sm:w-auto">
          <Link
            href="/mentors"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] hover:shadow-lg active:scale-95 transition-all cursor-pointer group shadow-sm"
          >
            <span>Meet The Mentors</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
