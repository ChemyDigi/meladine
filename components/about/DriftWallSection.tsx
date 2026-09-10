"use client";

import React from "react";
import ResonanceGallery from "./ResonanceGallery";

export default function DriftWallSection() {
  return (
    <section className="relative w-full pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 mb-6 sm:mb-8">
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
