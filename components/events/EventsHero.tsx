"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LeftDoodleArrow, RightDoodleArrow } from "./EventDoodleArrows";

const LETTERS = ["E", "V", "E", "N", "T", "S"];
const ROTATIONS = [-3, 2.5, -2, 3, -2.5, 2];

export default function EventsHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Trigger initial staggered pop-up on mount (identical to Mentors page)
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 80);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="events-hero"
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-white overflow-hidden flex flex-col justify-center pt-28 sm:pt-32 md:pt-36 lg:pt-28 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 lg:px-14 select-none"
    >

      {/* ============================================================ */}
      {/* Floating 3D Glossy Musical Note (Bottom Left)                */}
      {/* ============================================================ */}
      <div
        className="absolute left-[8%] sm:left-[12%] md:left-[14%] lg:left-[16%] bottom-[8%] sm:bottom-[10%] lg:bottom-[12%] z-20 pointer-events-none select-none"
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
        {/* Left Column: Events Headline, Subtitle, Text, CTA        */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center text-center relative pt-10 sm:pt-14 lg:pt-0">
          
          {/* Handwritten Annotation (Positioned safely to top-left pointing at the red E) */}
          <div className="hidden sm:flex absolute left-0 sm:left-2 md:left-4 lg:left-0 xl:left-2 top-[-24px] lg:top-[-38px] flex-col items-center select-none pointer-events-none z-20">
            <div className="font-handwriting text-xl sm:text-2xl md:text-[1.65rem] text-neutral-900 font-bold leading-[1.05] -rotate-[10deg] drop-shadow-xs text-center whitespace-nowrap">
              <div>more than</div>
              <div>just classes</div>
              <div className="text-[#ed1438] -mt-0.5">real stages</div>
            </div>
            {/* Hand-drawn curly doodle arrow curving towards title */}
            <div className="w-13 sm:w-15 md:w-16 mt-0.5 rotate-[8deg] translate-x-3">
              <LeftDoodleArrow className="w-full h-auto drop-shadow-xs" />
            </div>
          </div>

          {/* Giant Headline: EVENTS (with Mentors-style staggered pop-up entrance on page load) */}
          <h1
            className="font-display text-neutral-950 text-7xl sm:text-8xl md:text-9xl lg:text-[9.5rem] xl:text-[11.2rem] leading-[0.82] tracking-tight uppercase select-none transition-transform duration-300 flex items-center justify-center cursor-default whitespace-nowrap pt-2 sm:pt-4 pb-2 pointer-events-none"
          >
            {LETTERS.map((letter, i) => {
              const isFirstE = i === 0;

              let transformStyle = "";
              let colorClass = isFirstE ? "text-[#ed1438]" : "text-neutral-950";
              let filterStyle = isFirstE ? "drop-shadow(0 16px 20px rgba(237, 20, 56, 0.26))" : "";

              if (isFirstE) {
                // Initial 'E' pops up, stays permanently elevated, tilted, and red (identical to 'M' in Mentors)
                if (revealed) {
                  transformStyle = "translateY(-20px) scale(1.12) rotate(-3deg)";
                } else {
                  transformStyle = "translateY(70px) scale(0.65) rotate(-6deg)";
                }
              } else {
                // Remaining letters (V, E, N, T, S)
                if (revealed) {
                  transformStyle = "translateY(0) scale(1) rotate(0deg)";
                } else {
                  transformStyle = `translateY(70px) scale(0.65) rotate(${ROTATIONS[i] * 2}deg)`;
                }
              }

              return (
                <span
                  key={i}
                  style={{
                    transform: transformStyle,
                    filter: filterStyle || undefined,
                    transitionDelay: `${i * 60}ms`,
                  }}
                  className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${colorClass} ${
                    revealed ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {letter}
                </span>
              );
            })}
          </h1>

          {/* Subheading with highlighted 'PERFORMANCES' in red and generous gap */}
          <h2 className="font-display text-neutral-950 text-2xl sm:text-3xl md:text-4xl lg:text-[2.45rem] xl:text-[2.75rem] leading-[1.08] tracking-normal uppercase mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-lg font-bold">
            LIVE SESSIONS, SHOWCASES, <br />
            WORKSHOPS AND{" "}
            <span className="text-[#ed1438]">
              PERFORMANCES
            </span>
          </h2>

          {/* Descriptive Copy with generous gap */}
          <p className="font-sans text-neutral-600 sm:text-neutral-500 text-sm sm:text-base md:text-[1.05rem] max-w-md sm:max-w-lg mt-5 sm:mt-7 md:mt-8 leading-relaxed font-normal">
            A stage for learning, sharing and real musical experiences beyond the classroom.
          </p>

          {/* CTA Button with generous gap */}
          <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14">
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
          </div>

        </div>

      </div>

    </section>
  );
}
