"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import DoodleArrow from "./DoodleArrow";

export default function Mentors() {
  return (
    <section
      id="mentors"
      className="relative w-full bg-white py-20 sm:py-28 md:py-32 px-6 sm:px-10 lg:px-14 overflow-hidden"
    >
      {/* Background Architectural Hairline Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-100 h-full" />
          ))}
        </div>
      </div>

      {/* Architectural Watermark Drawing: Treble Clef Blueprint Sketch */}
      <div className="absolute -left-16 sm:-left-24 md:-left-32 lg:-left-44 xl:-left-52 top-4 sm:top-8 md:top-12 lg:top-14 z-0 pointer-events-none select-none opacity-[0.07] -rotate-12 transition-opacity">
        <div className="relative w-[300px] sm:w-[400px] md:w-[480px] lg:w-[560px] xl:w-[640px] aspect-[2/3]">
          <Image
            src="/images/Home/TrebelClef.png"
            alt="Treble Clef Architectural Blueprint Watermark"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start w-full">
        {/* Section Header (Left Aligned) */}
        <div className="w-full flex flex-col items-start text-left mb-2 sm:mb-4 md:mb-6">
          <div className="flex items-center gap-2 mb-2 select-none">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-[#ed1438] uppercase font-bold">
              {"// 03 RESIDENT FACULTY"}
            </span>
          </div>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-neutral-950 leading-[0.88]">
            READY TO MEET THE <span className="block">MENTORS?</span>
          </h2>

          <p className="mt-3 max-w-2xl text-neutral-600 font-light leading-relaxed text-sm sm:text-base md:text-lg">
            Guided directly by touring artists and active performers bringing authentic stagecraft to your sound.
          </p>
        </div>

        {/* Showcase Composition: Callout on the Left, Chair on the Right (Shifted Further Up) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-6 sm:gap-10 md:gap-8 lg:gap-12 -mt-8 sm:-mt-16 md:-mt-28 lg:-mt-40 xl:-mt-52 md:translate-x-4 lg:translate-x-8 xl:translate-x-12">

          {/* Left Side: Callout */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-5 z-20 shrink-0">
            {/* Handwriting Annotation + Arrow pointing close to the chair */}
            <div className="flex items-center gap-2 sm:gap-3 select-none">
              <div className="flex flex-col items-end text-right -rotate-2">
                <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-neutral-900 font-bold whitespace-nowrap leading-tight">
                  curious behind the sound?
                </span>
                <span className="-mt-0.5 sm:-mt-1 font-handwriting text-xl sm:text-2xl md:text-3xl text-[#ed1438] font-bold whitespace-nowrap leading-tight">
                  click the chair
                </span>
              </div>
              <div className="w-16 sm:w-20 md:w-24 lg:w-28 rotate-[-4deg] shrink-0 -mr-2 sm:-mr-4 md:-mr-6">
                <DoodleArrow className="w-full h-auto drop-shadow-xs" />
              </div>
            </div>
          </div>

          {/* Right Side: Chair Image with Grayscale & Question Mark */}
          <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] aspect-[1122/1402] flex items-center justify-center">
            <Link
              href="/mentors"
              aria-label="Reveal mentor faculty on mentors page"
              className="group relative w-full h-full flex items-center justify-center cursor-pointer select-none transition-transform duration-500 hover:scale-105 active:scale-95"
            >
              {/* Mentor Chair Silhouette with Grey Overlay */}
              <div className="relative z-10 w-full h-full drop-shadow-2xl transition-all duration-700">
                <Image
                  src="/images/Mentors/Chair.png"
                  alt="Meladine Conservatory Mentor Chair"
                  fill
                  className="object-contain filter grayscale contrast-110 brightness-90 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-700"
                  priority
                />
              </div>

              {/* Standalone Question Mark '?' Icon Centered on Chair */}
              <div className="absolute z-30 flex items-center justify-center pointer-events-none">
                <span className="font-display text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.7)] group-hover:text-[#ed1438] group-hover:drop-shadow-[0_10px_30px_rgba(237,20,56,0.6)] group-hover:scale-115 transition-all duration-300 select-none leading-none">
                  ?
                </span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
