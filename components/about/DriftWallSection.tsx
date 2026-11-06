"use client";

import React from "react";
import Image from "next/image";
import ResonanceGallery from "./ResonanceGallery";

export default function DriftWallSection() {
  return (
    <section className="relative w-full pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 bg-white overflow-hidden select-none">
      {/* Architectural Background Grid Lines */}
      <div className="curtain-grid-columns pointer-events-none opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="curtain-grid-col" />
        ))}
      </div>

      {/* Architectural Watermark Drawing: Scaled-up Microphone Blueprint Sketch */}
      <div className="absolute right-0 sm:right-4 md:right-8 lg:right-12 top-6 sm:top-10 md:top-14 z-0 pointer-events-none select-none opacity-[0.1] sm:opacity-[0.16] md:opacity-[0.18] rotate-12 transition-opacity">
        <div className="relative w-[260px] sm:w-[500px] md:w-[620px] lg:w-[720px] aspect-[1122/1402]">
          <Image
            src="/images/Mentors/Microphone.png"
            alt="Microphone Blueprint Architectural Sketch"
            fill
            className="object-contain object-top"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mb-6 sm:mb-8">
        {/* Section Header (Center Aligned in single line) */}
        <div className="w-full flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2 select-none">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#ed1438] uppercase font-bold">
              {"// 02 GALLERY ARCHIVE"}
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-neutral-950 leading-none whitespace-nowrap">
            MOMENTS &amp; RESONANCE
          </h2>

          <p className="mt-3 max-w-2xl mx-auto text-neutral-600 font-light leading-relaxed text-sm sm:text-base md:text-lg">
            Interactive drifting gallery of live performances, acoustic trials, and laboratory experiments.
          </p>
        </div>
      </div>

      {/* Modern Resonance Deck & Contact Sheet Gallery */}
      <ResonanceGallery />
    </section>
  );
}
