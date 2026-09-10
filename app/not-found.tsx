import React from "react";
import Link from "next/link";

export const metadata = {
  title: "404 — Signal Not Found | Meladine Music Conservatory",
  description: "The requested frequency has drifted out of resonance or this chamber has not yet been composed.",
};

export default function NotFound() {
  return (
    <div
      id="not-found-page"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white px-6 sm:px-10 lg:px-14 py-12 select-none"
    >
      {/* Architectural Background Grid Lines */}
      <div className="curtain-grid-columns pointer-events-none opacity-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="curtain-grid-col" />
        ))}
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto my-auto flex flex-col items-center text-center">
        {/* Giant Architectural 404 Display */}
        <div className="relative">
          <h1 className="font-display text-[7rem] sm:text-[11rem] md:text-[15rem] lg:text-[18rem] text-neutral-950 font-normal leading-none tracking-tighter select-none drop-shadow-sm">
            404
          </h1>
        </div>

        {/* Headline & Description */}
        <h2 className="mt-2 sm:mt-4 font-display uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl text-neutral-950 leading-tight">
          CHAMBER SILENT // LOST HARMONIC
        </h2>

        <p className="mt-3 sm:mt-4 max-w-lg mx-auto text-neutral-600 font-light text-sm sm:text-base md:text-lg leading-relaxed">
          The frequency you are searching for has drifted beyond audible resonance or this sector is currently undergoing acoustic recalibration.
        </p>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center">
          {/* Primary Action Button: Return Home */}
          <Link
            href="/"
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#ed1438] text-white font-semibold text-xs sm:text-sm uppercase tracking-widest shadow-lg shadow-[#ed1438]/25 hover:bg-[#d60f30] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Return to Homepage</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
