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

    // Sequence of indices: 0..7 (forward: M, E, L, A, D, I, N, E) then 7..0 (backward: E, N, I, D, A, L, E, M)
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
      className="relative min-h-screen w-full bg-white flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 px-6 sm:px-10 lg:px-14 overflow-hidden"
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
      <div className="absolute -left-12 sm:-left-16 md:-left-20 top-16 sm:top-20 z-0 pointer-events-none select-none opacity-[0.16] -rotate-12 transition-opacity">
        <div className="relative w-[340px] sm:w-[440px] md:w-[540px] aspect-[2/3]">
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
      <div className="absolute -right-12 sm:-right-16 md:-right-20 -bottom-16 sm:-bottom-20 z-0 pointer-events-none select-none opacity-[0.16] rotate-[8deg] transition-opacity">
        <div className="relative w-[320px] sm:w-[420px] md:w-[500px] aspect-[1122/1402]">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto -translate-y-16 sm:-translate-y-24 md:-translate-y-32 lg:-translate-y-40 xl:-translate-y-48 flex flex-col items-center justify-center text-center">
        
        {/* Layered Composition Stage: Background Text (z-10) with Foreground 3D Guitar (z-20) */}
        <div className="relative w-full flex items-center justify-center min-h-[440px] sm:min-h-[540px] md:min-h-[620px] lg:min-h-[700px]">
          
          {/* Hand-Drawn Annotation 1: Pointing to 3D Guitar (Left Side) */}
          <div
            className={`hidden lg:flex absolute right-[52%] sm:right-[53%] md:right-[54%] lg:right-[55%] xl:right-[55%] top-[56%] xl:top-[60%] z-30 items-center pointer-events-none select-none transition-all duration-800 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              revealed ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            {/* 2 lines right-aligned text starting from the arrow head */}
            <div className="flex flex-col items-end text-right -rotate-2 hover:scale-105 transition-transform">
              <div className="font-handwriting text-2xl xl:text-3xl text-neutral-950 font-bold tracking-wide drop-shadow-xs whitespace-nowrap">
                interactive 3D electric guitar
              </div>
              <div className="-mt-1 font-handwriting text-lg xl:text-xl text-[#ed1438] font-bold tracking-wide drop-shadow-xs whitespace-nowrap">
                click &amp; drag to inspect 360°
              </div>
            </div>

            {/* DoodleArrow pointing left towards text, tail towards guitar */}
            <div className="w-20 sm:w-24 xl:w-28 rotate-[165deg] shrink-0 ml-1.5 sm:ml-2">
              <DoodleArrow className="w-full h-auto drop-shadow-sm" />
            </div>
          </div>

          {/* Giant Hero Title in Condensed Display Typography (Z-Index 10: Behind Guitar) */}
          <h1
            className="relative z-10 -top-24 sm:-top-36 md:-top-44 lg:-top-52 w-full text-neutral-950 font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] leading-[0.85] tracking-tight uppercase select-none text-center whitespace-nowrap pt-4 sm:pt-6 pb-2 sm:pb-4"
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
                transformStyle = `translateY(-28px) scale(1.18) rotate(${ROTATIONS[i] * 1.5}deg)`;
                colorClass = "text-[#ed1438]";
                filterStyle = "drop-shadow(0 20px 26px rgba(237, 20, 56, 0.35))";
              } else if (isDirectlyHovered) {
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
                revealed && (isDirectlyHovered || isNeighborHovered || isClicked)
                  ? "0ms"
                  : `${i * 55}ms`;

              return (
                <span key={i} className="relative inline-block">
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
                    <span
                      className={`absolute -top-3 sm:-top-5 md:-top-7 left-1/2 -translate-x-1/2 font-mono text-[10px] sm:text-xs md:text-sm font-semibold tracking-normal transition-colors duration-300 pointer-events-none select-none ${
                        isClicked || isDirectlyHovered ? "text-[#ed1438]" : "text-neutral-400"
                      }`}
                    >
                      {NOTE_LABELS[i]}
                    </span>
                    {letter}
                  </span>

                  {/* Hand-Drawn Annotation: Anchored to letter 'E' slot, NOT moved by letter 'E' transform */}
                  {i === 7 && (
                    <span
                      className={`hidden lg:flex absolute left-[45%] sm:left-[50%] lg:left-[55%] top-[55%] sm:top-[60%] lg:top-[65%] z-30 items-center pointer-events-none select-none transition-all duration-800 delay-400 ease-[cubic-bezier(0.16,1,0.3,1)] normal-case tracking-normal ${
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
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-full pointer-events-auto translate-y-16 sm:translate-y-22 md:translate-y-30 lg:translate-y-36 xl:translate-y-42">
              <GuitarModel />
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* Bottom Bar: Conservatory Metrics & Mentors Page CTA Gateway  */}
      {/* ============================================================ */}
      <div
        className={`relative z-20 w-full max-w-7xl mx-auto -mt-24 sm:-mt-32 md:-mt-44 lg:-mt-56 xl:-mt-64 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-800 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Left: Conservatory Statistical Metrics (Direct Mentors Design) */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Metric 1: 16+ Years Teaching */}
          <div className="flex flex-col group cursor-default">
            <div className="text-3xl sm:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-left">
              16+
            </div>
            <div className="text-xs text-neutral-500 font-sans font-medium tracking-tight mt-1">
              Years Teaching
            </div>
          </div>

          <div className="w-px h-10 bg-neutral-200" />

          {/* Metric 2: 250+ Students */}
          <div className="flex flex-col group cursor-default">
            <div className="text-3xl sm:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-left">
              250+
            </div>
            <div className="text-xs text-neutral-500 font-sans font-medium tracking-tight mt-1">
              Mentored Artists
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-neutral-200" />

          {/* Metric 3: 3 Resident Disciplines */}
          <div className="hidden sm:flex flex-col group cursor-default">
            <div className="text-3xl sm:text-4xl font-display font-bold text-[#ed1438] leading-none group-hover:scale-105 transition-transform duration-200 origin-left">
              3
            </div>
            <div className="text-xs text-neutral-500 font-sans font-medium tracking-tight mt-1">
              Core Disciplines
            </div>
          </div>
        </div>



        {/* Right: Direct Mentors Gateway & Admissions CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/mentors"
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] hover:shadow-lg active:scale-95 transition-all cursor-pointer group shadow-sm"
          >
            <span>Meet The Mentors</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

