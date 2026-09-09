"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import DoodleArrow from "./DoodleArrow";

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
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        
        {/* Centerpiece Container: Giant Typography + Centered Image + Doodle Arrow */}
        <div className="relative w-full flex flex-col items-center justify-center my-2 sm:my-4">
          
          {/* Hand-drawn Loopy Arrow + "meet Nishan Saliya" handwriting starting from the tail */}
          <div className="absolute right-[2%] sm:right-[5%] md:right-[9%] lg:right-[13%] bottom-[10%] sm:bottom-[14%] md:bottom-[18%] lg:bottom-[22%] translate-x-8 sm:translate-x-12 md:translate-x-16 z-30 flex flex-col items-start pointer-events-none">
            <div className="w-20 sm:w-26 md:w-36 lg:w-40 rotate-[190deg]">
              <DoodleArrow className="w-full h-auto drop-shadow-sm" />
            </div>
            <div className="-mt-3 sm:-mt-5 ml-14 sm:ml-20 md:ml-28 lg:ml-32 font-handwriting text-xl sm:text-2xl md:text-3xl text-neutral-950 font-bold -rotate-3 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
              meet Nishan Saliya
            </div>
            <div className="-mt-1 sm:-mt-2 ml-14 sm:ml-20 md:ml-28 lg:ml-32 font-handwriting text-lg sm:text-xl md:text-2xl text-[#ed1438] font-bold -rotate-2 tracking-wide select-none drop-shadow-xs whitespace-nowrap">
              Guitar specialist
            </div>
          </div>

          {/* Giant Background Display Title: MELADINE */}
          <h1 className="w-full text-neutral-950 font-display text-7xl sm:text-9xl md:text-[11rem] lg:text-[14rem] leading-[0.85] tracking-tight uppercase select-none -translate-y-6 sm:-translate-y-12 md:-translate-y-18 lg:-translate-y-24">
            MELADINE
          </h1>

          {/* Center Artist Image (Saliya.png) */}
          <div className="relative -mt-16 sm:-mt-28 md:-mt-36 lg:-mt-44 z-20 w-[240px] sm:w-[340px] md:w-[420px] lg:w-[480px] aspect-[1122/1402] pointer-events-none drop-shadow-2xl">
            <Image
              src="/images/home/saliya.png"
              alt="Meladine Artist Saliya"
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>

        {/* Sub-Headline & Manifesto Statement */}
        <div className="-mt-4 sm:-mt-8 md:-mt-12 z-20 w-full max-w-4xl flex flex-col items-center text-center">
          <p className="text-sm sm:text-base md:text-lg font-light text-neutral-700 leading-relaxed tracking-wider max-w-2xl">
            TURNING EMOTION INTO SOUND, CRAFTING EXPERIENCES BEYOND BORDERS.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/events"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-black text-white text-xs md:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95"
            >
              Explore Events
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-neutral-300 text-neutral-900 text-xs md:text-sm font-semibold tracking-wider uppercase hover:border-black hover:bg-neutral-50 transition-all duration-300 active:scale-95"
            >
              Our Manifesto
            </Link>
          </div>
        </div>

        {/* Minimal Audio Frequency Bars */}
        <div className="mt-10 w-full flex items-center justify-between gap-6 pt-6 border-t border-neutral-100 max-w-5xl">
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
            01 // SOUND &bull; 02 // SHOWCASES &bull; 03 // MENTORSHIP
          </div>
        </div>
      </div>

      {/* Bottom Hero Anchor / Scroll Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-neutral-400 uppercase tracking-widest pt-6 border-t border-neutral-100">
        <div>&copy; {new Date().getFullYear()} MELADINE ARCHIVE</div>
        <Link
          href="/about"
          className="group flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
        >
          <span>EXPLORE ARCHIVE</span>
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
