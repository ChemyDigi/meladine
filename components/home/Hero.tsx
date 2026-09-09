"use client";

import React from "react";
import Link from "next/link";
import InstrumentScene from "./InstrumentScene";

export default function Hero() {
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

      {/* Main Center Hero Headline & Composition */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-6 md:py-10 flex flex-col items-start justify-center">
        {/* Subtle Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-50/80 text-xs font-medium tracking-wider text-neutral-800 uppercase mb-4 sm:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-black" />
          Audio Experience &amp; Creative Sound Lab
        </div>

        {/* Giant Hero Title in Condensed Display Typography */}
        <h1 className="w-full text-neutral-950 font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[13.5rem] leading-[0.88] tracking-tight uppercase select-none">
          MELADINE
        </h1>

        {/* 2-Column Composition: Manifesto + Interactive 3D Guitar */}
        <div className="mt-8 md:mt-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Manifesto & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-neutral-800 leading-snug tracking-tight">
              TURNING EMOTION INTO SOUND, CRAFTING EXPERIENCES BEYOND BORDERS.
            </p>
            <p className="mt-4 text-sm md:text-base text-neutral-500 font-normal leading-relaxed">
              Meladine is an underground electronic music collective, sound engineering laboratory, and cultural platform uniting artists, sonic innovators, and live performance spaces.
            </p>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/events"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-black text-white text-xs md:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Explore Events
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-neutral-300 text-neutral-900 text-xs md:text-sm font-semibold tracking-wider uppercase hover:border-black hover:bg-neutral-50 transition-all duration-300 active:scale-95 cursor-pointer"
              >
                Our Manifesto
              </Link>
            </div>

            {/* Minimal Audio Frequency Bars */}
            <div className="mt-10 flex items-center justify-between gap-6 pt-6 border-t border-neutral-100">
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
                01 // SOUND &bull; 02 // STAGES &bull; 03 // MENTORS
              </div>
            </div>
          </div>

          {/* Right Column: Stationary 3D Guitar Scene (Moved up to show in hero view) */}
          <div className="lg:col-span-6 w-full h-[460px] sm:h-[540px] lg:h-[640px] flex items-center justify-center order-1 lg:order-2 lg:-mt-36 xl:-mt-48 relative z-20 pointer-events-auto">
            <InstrumentScene />
          </div>

        </div>
      </div>

      {/* Bottom Hero Anchor / Scroll Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-6 border-t border-neutral-100">
        <div>&copy; {new Date().getFullYear()} MELADINE ARCHIVE</div>
        <Link
          href="#about"
          className="group flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
        >
          <span>SCROLL DOWN</span>
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
