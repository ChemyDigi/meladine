"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LeftDoodleArrow, RightDoodleArrow } from "./EventDoodleArrows";

export default function EventsHero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="events-hero"
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-white overflow-hidden flex flex-col justify-center pt-28 sm:pt-32 md:pt-36 lg:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 lg:px-14 select-none"
    >
      {/* ============================================================ */}
      {/* Background Architectural Grid Lines                          */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0" aria-hidden="true">
        <div className="curtain-grid-columns h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-neutral-200 h-full" />
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* Watermark: Acoustic Guitar Blueprint Sketch (Far Left)       */}
      {/* ============================================================ */}
      <div
        className="absolute left-[-4%] sm:left-[-1%] md:left-[0%] lg:left-[0.5%] top-[2%] sm:top-[4%] lg:top-[3%] bottom-[0%] w-[250px] sm:w-[350px] md:w-[420px] lg:w-[480px] xl:w-[520px] pointer-events-none select-none opacity-[0.32] sm:opacity-[0.36] rotate-[-1deg] transition-opacity z-0"
        aria-hidden="true"
      >
        <div className="relative w-full h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
          <Image
            src="/images/Mentors/AcousticGuitar.png"
            alt="Acoustic Guitar Blueprint Watermark"
            fill
            className="object-contain object-left"
            priority
          />
        </div>
      </div>

      {/* ============================================================ */}
      {/* Floating 3D Glossy Musical Note (Bottom Left)                */}
      {/* ============================================================ */}
      <div
        className="absolute left-[18%] sm:left-[20%] md:left-[22%] lg:left-[21%] bottom-[6%] sm:bottom-[8%] lg:bottom-[10%] z-20 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="animate-notation-float -rotate-[12deg] transition-transform hover:scale-110">
          <div className="relative w-8 sm:w-10 md:w-12 aspect-[120/160]">
            <Image
              src="/images/About/Notation1.png"
              alt="Floating musical note"
              fill
              className="object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* Main Container: Split Grid (Left Text & Right Stage Hero)    */}
      {/* ============================================================ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        
        {/* ======================================================== */}
        {/* Left Column: Kicker, Events Headline, Subtitle, Text, CTA*/}
        {/* ======================================================== */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center text-center relative pt-6 sm:pt-8 lg:pt-0 pl-0 lg:pl-6 xl:pl-8">
          
          {/* Handwritten Annotation (Top-Left of text block): */}
          {/* "more than just classes real stages" */}
          <div className="absolute left-[0%] sm:left-[2%] md:left-[4%] lg:left-[0%] xl:left-[-2%] top-[4px] sm:top-[-8px] lg:top-[-16px] flex flex-col items-center select-none pointer-events-none z-20">
            <div className="font-handwriting text-xl sm:text-2xl md:text-[1.65rem] text-neutral-900 font-bold leading-[1.05] -rotate-[10deg] drop-shadow-xs text-center">
              <div>more than</div>
              <div>just classes</div>
              <div className="text-[#ed1438] -mt-0.5">real stages</div>
            </div>
            {/* Hand-drawn curly doodle arrow curving towards title */}
            <div className="w-13 sm:w-15 md:w-16 mt-0 sm:mt-1 rotate-[8deg] translate-x-3">
              <LeftDoodleArrow className="w-full h-auto drop-shadow-xs" />
            </div>
          </div>

          {/* Kicker Tag */}
          <div className="inline-flex items-center justify-center gap-2 text-[#ed1438] font-bold text-xs sm:text-sm tracking-[0.24em] uppercase font-sans mb-1.5 sm:mb-2">
            <span>//</span>
            <span>LIVE AT MELADINE</span>
          </div>

          {/* Giant Headline: EVENTS */}
          <h1 className="font-display text-neutral-950 text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[11.2rem] leading-[0.82] tracking-tight uppercase select-none transition-transform duration-300">
            EVENTS
          </h1>

          {/* Subheading with highlighted 'PERFORMANCES' in red */}
          <h2 className="font-display text-neutral-950 text-2xl sm:text-3xl md:text-4xl lg:text-[2.45rem] xl:text-[2.75rem] leading-[1.04] tracking-normal uppercase mt-3 sm:mt-4 max-w-lg font-bold">
            LIVE SESSIONS, SHOWCASES, <br />
            WORKSHOPS AND{" "}
            <span className="text-[#ed1438]">
              PERFORMANCES
            </span>
          </h2>

          {/* Descriptive Copy */}
          <p className="font-sans text-neutral-600 sm:text-neutral-500 text-sm sm:text-base md:text-[1.05rem] max-w-md sm:max-w-lg mt-3 sm:mt-4 leading-relaxed font-normal">
            A stage for learning, sharing and real musical experiences beyond the classroom.
          </p>

          {/* CTA Button */}
          <div className="mt-6 sm:mt-8">
            <Link
              href="#upcoming-events"
              className="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 group cursor-pointer"
              id="events-hero-cta"
            >
              <span>VIEW UPCOMING EVENTS</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1.5 font-bold">
                &rarr;
              </span>
            </Link>
          </div>

        </div>

        {/* ======================================================== */}
        {/* Right Column: Stage Hero Visual & Concentric Orbit Arcs  */}
        {/* ======================================================== */}
        <div
          className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center mt-8 lg:mt-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* ------------------------------------------------------ */}
          {/* Subtle Concentric Circular Stage Orbit Soundwaves       */}
          {/* ------------------------------------------------------ */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-visible"
            aria-hidden="true"
          >
            <svg
              className="w-[125%] sm:w-[135%] lg:w-[145%] aspect-square max-w-none opacity-45 sm:opacity-55"
              viewBox="0 0 800 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Concentric rings expanding outward behind the red chair */}
              <circle cx="430" cy="450" r="130" stroke="#d4d4d8" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="430" cy="450" r="220" stroke="#e4e4e7" strokeWidth="1.2" />
              <circle cx="430" cy="450" r="310" stroke="#e4e4e7" strokeWidth="1.2" strokeDasharray="4 4" />
              <circle cx="430" cy="450" r="400" stroke="#e4e4e7" strokeWidth="1.2" />
              <circle cx="430" cy="450" r="490" stroke="#f4f4f5" strokeWidth="1.2" />
            </svg>
          </div>

          {/* ------------------------------------------------------ */}
          {/* Handwritten Annotation Top Right:                      */}
          {/* "music brings people together"                         */}
          {/* ------------------------------------------------------ */}
          <div className="absolute -top-7 sm:-top-9 lg:-top-11 right-4 sm:right-8 lg:right-10 xl:right-14 z-20 flex items-center gap-1.5 sm:gap-2 select-none pointer-events-none">
            {/* Hand-drawn curved swooping arrow pointing towards stage */}
            <div className="w-11 sm:w-14 md:w-16 -rotate-12 translate-y-3">
              <RightDoodleArrow className="w-full h-auto drop-shadow-xs" />
            </div>

            <div className="font-handwriting text-xl sm:text-2xl md:text-[1.65rem] text-neutral-900 font-bold leading-[1.05] rotate-[5deg] drop-shadow-xs text-left">
              <div>music</div>
              <div>brings people</div>
              <div className="text-[#ed1438] -mt-0.5">together</div>
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* Hero Stage Image Composition                           */}
          {/* ------------------------------------------------------ */}
          <div className="relative w-full max-w-[580px] sm:max-w-[640px] lg:max-w-none aspect-[1448/1086] z-10">
            <Image
              src="/images/Events/hero.png"
              alt="Meladine Live Events Stage - Red Chair, Microphone & Amplifier"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 50vw"
              priority
              className={`object-contain transition-transform duration-700 ease-out select-none pointer-events-none ${
                isHovered ? "scale-[1.02] -translate-y-1" : "scale-100"
              }`}
            />

            {/* ---------------------------------------------------- */}
            {/* Authentic Stamped Ticket Typography Overlay          */}
            {/* Renders right onto the pink ticket in front of chair */}
            {/* ---------------------------------------------------- */}
            <div
              className="absolute right-[8%] sm:right-[10%] md:right-[11%] lg:right-[10%] bottom-[8.5%] sm:bottom-[9%] md:bottom-[10%] lg:bottom-[9%] w-[33%] sm:w-[32%] md:w-[30%] aspect-[2.1/1] -rotate-[10deg] flex flex-col justify-center items-center pointer-events-none select-none z-20"
              aria-hidden="true"
            >
              {/* Inner printed ticket content matching reference */}
              <div className="w-full h-full px-2 sm:px-3 py-1 flex items-center justify-between text-neutral-900/90 font-mono text-[6px] sm:text-[8px] md:text-[9px]">
                {/* Left ticket stub details & barcode */}
                <div className="flex flex-col items-center justify-center opacity-70">
                  <div className="font-bold tracking-tight text-[5px] sm:text-[7px] -rotate-90 origin-center whitespace-nowrap">
                    № 04291
                  </div>
                </div>

                {/* Main ticket title */}
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-display text-neutral-950 font-bold tracking-wider text-[11px] sm:text-[15px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[0.88] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                    MELADINE
                  </span>
                  <span className="font-display text-neutral-900 font-bold tracking-widest text-[9px] sm:text-[12px] md:text-[15px] lg:text-[16px] xl:text-[18px] leading-[0.88] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                    LIVE
                  </span>
                  <span className="font-sans text-[4.5px] sm:text-[6px] md:text-[7px] tracking-widest uppercase text-neutral-800 font-semibold mt-0.5">
                    PASS // ADMIT ONE
                  </span>
                </div>

                {/* Right ticket serial / barcode vertical lines */}
                <div className="flex flex-col items-end opacity-70">
                  <div className="flex items-center gap-[1px] h-4 sm:h-5">
                    <span className="w-[1px] h-full bg-neutral-900" />
                    <span className="w-[2px] h-full bg-neutral-900" />
                    <span className="w-[1px] h-full bg-neutral-900" />
                    <span className="w-[1.5px] h-full bg-neutral-900" />
                    <span className="w-[1px] h-full bg-neutral-900" />
                  </div>
                  <span className="text-[4px] sm:text-[5px] font-mono mt-0.5">STAGE A</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
