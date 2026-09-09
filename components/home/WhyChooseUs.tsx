"use client";

import React from "react";
import Image from "next/image";

interface PillarItem {
  num: string;
  headline: string;
  summary: string;
}

const PILLARS: PillarItem[] = [
  {
    num: "01",
    headline: "Adult & Lifelong Cohorts",
    summary:
      "Dedicated evening and weekend masterclasses for working adults and late bloomers. Zero age limits.",
  },
  {
    num: "02",
    headline: "Touring Artist Mentors",
    summary:
      "Guided directly by Wings co-founder Saliya Illangasinghe and active concert performers.",
  },
  {
    num: "03",
    headline: "Stage-Ready Analog Gear",
    summary:
      "Hands-on with real tube amplifier headroom, 88-key weighted hammer pianos, and studio mics.",
  },
  {
    num: "04",
    headline: "Intuition Over Rote Drills",
    summary:
      "Ear training, fretboard freedom, and spontaneous jamming rather than rigid exam sheet reading.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="relative w-full bg-white py-20 sm:py-28 px-6 sm:px-10 lg:px-14 border-t border-neutral-100 overflow-hidden"
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
      {/* Architectural Watermark Drawing: Microphone Line Sketch     */}
      {/* ============================================================ */}
      <div className="absolute -right-16 sm:-right-20 top-8 z-0 pointer-events-none select-none opacity-[0.06] rotate-12 transition-opacity">
        <div className="relative w-[340px] sm:w-[460px] md:w-[560px] aspect-[1122/1402]">
          <Image
            src="/images/Mentors/Microphone.png"
            alt="Microphone Blueprint Architectural Sketch"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* Section Header & Architectural Metadata                     */}
      {/* ============================================================ */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 sm:mb-18">
          <div>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-neutral-950 leading-[0.9]">
              WHY MELADINE
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-neutral-600 font-light leading-relaxed text-sm sm:text-base">
              Most academies prepare students for standardized grade examinations. Meladine trains musicians
              for the stage, the recording studio, and a lifetime of intuitive creative expression.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4 Pillars: Open Architectural Columns (No Boxes, Light Text)*/}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="flex flex-col group cursor-default"
            >
              {/* Massive Numeral */}
              <div className="font-display text-6xl sm:text-7xl lg:text-8xl text-neutral-300 group-hover:text-[#ed1438] transition-colors duration-300 leading-none select-none">
                {pillar.num}
              </div>

              {/* Headline */}
              <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#ed1438] leading-tight transition-colors duration-300 mt-4">
                {pillar.headline}
              </h3>

              {/* Light, concise text */}
              <p className="text-neutral-600 text-sm leading-relaxed font-light mt-3">
                {pillar.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
