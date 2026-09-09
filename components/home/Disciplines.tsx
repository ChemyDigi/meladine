"use client";

import React, { useState } from "react";
import Disciplines3D, {
  DisciplineCategory,
  CATEGORIES,
} from "./Disciplines3D";

interface DisciplineData {
  id: DisciplineCategory;
  number: string;
  name: string;
  subtitle: string;
}

const DISCIPLINES: Record<DisciplineCategory, DisciplineData> = {
  guitar: {
    id: "guitar",
    number: "01",
    name: "GUITAR",
    subtitle: "STRINGS & HARMONICS",
  },
  piano: {
    id: "piano",
    number: "02",
    name: "PIANO",
    subtitle: "KEYS & SYNTHESIS",
  },
  vocals: {
    id: "vocals",
    number: "03",
    name: "VOCALS",
    subtitle: "VOCAL RESONANCE & TONE",
  },
};

export default function Disciplines() {
  const [activeCategory, setActiveCategory] = useState<DisciplineCategory>("guitar");

  const currentIdx = CATEGORIES.indexOf(activeCategory);
  const prevIdx = (currentIdx - 1 + CATEGORIES.length) % CATEGORIES.length;
  const nextIdx = (currentIdx + 1) % CATEGORIES.length;

  const leftCategory = CATEGORIES[prevIdx];
  const rightCategory = CATEGORIES[nextIdx];

  const activeData = DISCIPLINES[activeCategory];
  const leftData = DISCIPLINES[leftCategory];
  const rightData = DISCIPLINES[rightCategory];

  const handlePrev = () => setActiveCategory(leftCategory);
  const handleNext = () => setActiveCategory(rightCategory);

  return (
    <section
      id="disciplines"
      className="relative w-full bg-white text-neutral-900 pt-20 sm:pt-28 md:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-10 z-20">
          <span className="text-xs sm:text-sm font-mono tracking-widest text-[#ed1438] uppercase font-bold mb-1.5">
            // 01 ACADEMY
          </span>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-neutral-950 leading-[0.9]">
            CORE DISCIPLINES
          </h2>
        </div>

        {/* 3D Showcase Arena */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center">
          {/* Subtle center ambient acoustic glow */}
          <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex items-center justify-center">
            <div className="w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(237,20,56,0.035)_0%,rgba(255,255,255,0)_70%)] blur-2xl" />
          </div>

          {/* Round Circle Left Arrow (Red) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Instrument"
            className="absolute left-2 sm:left-6 md:left-10 lg:left-14 top-[42%] -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#ed1438] text-white flex items-center justify-center shadow-lg shadow-[#ed1438]/30 hover:bg-[#c91030] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Round Circle Right Arrow (Red) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Instrument"
            className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-[42%] -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-[#ed1438] text-white flex items-center justify-center shadow-lg shadow-[#ed1438]/30 hover:bg-[#c91030] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Handwriting Annotation: Positioned below right arrow, refined delicate scale with slight rotation */}
          <div className="absolute right-2 sm:right-6 md:right-10 lg:right-14 top-[58%] sm:top-[60%] md:top-[62%] z-30 flex flex-col items-end text-right -rotate-2 sm:-rotate-3 select-none pointer-events-none pr-1">
            <span className="font-handwriting text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] text-neutral-950 font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight">
              interactive 3D {activeCategory === "guitar" ? "electric guitar" : activeCategory === "piano" ? "stage keyboard" : "studio mic"}
            </span>
            <span className="-mt-0.5 sm:-mt-1 font-handwriting text-xs sm:text-sm md:text-base lg:text-[1.15rem] text-[#ed1438] font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight">
              drag and explore the instruments
            </span>
          </div>

          {/* Three.js Interactive 3D Canvas */}
          <div className="w-full relative z-10">
            <Disciplines3D
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* The Iconic 3-Item Typography Bar (Exact Composition of the Reference Image) */}
          <div className="relative z-20 w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto grid grid-cols-[1fr_auto_1fr] items-end justify-center gap-3 sm:gap-6 md:gap-8 pt-2 sm:pt-4 pb-4">
            {/* Left Flanking Label */}
            <div className="flex flex-col items-end text-right pb-1 sm:pb-2">
              <button
                type="button"
                onClick={handlePrev}
                className="group flex flex-col items-end cursor-pointer transition-transform active:scale-95 text-right"
              >
                <span className="font-mono text-[9px] sm:text-[11px] text-neutral-400 tracking-widest uppercase mb-0.5 group-hover:text-[#ed1438] transition-colors whitespace-nowrap">
                  &larr; // {leftData.number}
                </span>
                <span className="font-display uppercase text-2xl sm:text-4xl md:text-5xl tracking-tight text-neutral-300 group-hover:text-neutral-900 transition-colors duration-200">
                  {leftData.name}
                </span>
              </button>
            </div>

            {/* Center Active Label (Prominent Bebas Neue) */}
            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-0.5 bg-[#ed1438]" />
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#ed1438] uppercase whitespace-nowrap">
                  {activeData.number} // {activeData.subtitle}
                </span>
                <span className="w-2 h-0.5 bg-[#ed1438]" />
              </div>
              <h3 className="font-display uppercase text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] tracking-tight text-neutral-950 leading-[0.88] drop-shadow-xs transition-all duration-300 whitespace-nowrap">
                {activeData.name}
              </h3>
            </div>

            {/* Right Flanking Label */}
            <div className="flex flex-col items-start text-left pb-1 sm:pb-2">
              <button
                type="button"
                onClick={handleNext}
                className="group flex flex-col items-start cursor-pointer transition-transform active:scale-95 text-left"
              >
                <span className="font-mono text-[9px] sm:text-[11px] text-neutral-400 tracking-widest uppercase mb-0.5 group-hover:text-[#ed1438] transition-colors whitespace-nowrap">
                  // {rightData.number} &rarr;
                </span>
                <span className="font-display uppercase text-2xl sm:text-4xl md:text-5xl tracking-tight text-neutral-300 group-hover:text-neutral-900 transition-colors duration-200">
                  {rightData.name}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
