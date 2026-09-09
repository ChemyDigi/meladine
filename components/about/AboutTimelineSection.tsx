"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Milestone {
  year: string;
  tagline: string;
  rotation: number;
  // Exact polar coordinates along the orbit ring:
  // angle in degrees: 0 is 3 o'clock (right), -90 is 12 o'clock (top), etc.
  angleDeg: number;
}

const MILESTONES: Milestone[] = [
  {
    year: "2010",
    tagline: "THE BIRTH OF MELADINE",
    rotation: 0,
    angleDeg: -60, // Top-right of orbit (fully visible below navbar, with dot and text)
  },
  {
    year: "2012",
    tagline: "FIRST SIGNED ARTIST",
    rotation: -42,
    angleDeg: -30, // Upper-right along the circle
  },
  {
    year: "2015",
    tagline: "EXPANDED GLOBALLY",
    rotation: -84,
    angleDeg: 0, // 3 o'clock (center right)
  },
  {
    year: "2018",
    tagline: "HIT 1 BILLION STREAMS",
    rotation: -126,
    angleDeg: 30, // Lower-right
  },
  {
    year: "2020",
    tagline: "LAUNCHED OUR LABEL",
    rotation: -168,
    angleDeg: 60, // Bottom-right
  },
];

export default function AboutTimelineSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [continuousRotation, setContinuousRotation] = useState(0);
  const containerTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerTrackRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = container.offsetHeight - windowH;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Smooth CD rotation from 0 to -210 degrees
      const rotation = progress * -210;
      setContinuousRotation(rotation);

      // Select active milestone based on scroll position
      const step = progress * (MILESTONES.length - 1);
      const rounded = Math.min(Math.round(step), MILESTONES.length - 1);
      setActiveIdx(rounded);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (window.__lenis) {
        window.__lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  const currentMilestone = MILESTONES[activeIdx];

  const scrollToMilestone = (idx: number) => {
    if (!containerTrackRef.current) return;
    const distance = containerTrackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTrackRef.current.offsetTop + (distance * idx) / (MILESTONES.length - 1);

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // Orbit ring radius percentage relative to the center container (118% circle -> radius = 59%)
  const ORBIT_RADIUS_PCT = 59;

  return (
    <div
      ref={containerTrackRef}
      className="relative w-full h-[500vh] bg-white font-sans"
    >
      {/* 
        Sticky Viewport:
        Holds the screen in place while the user scrolls through the 500vh runway
      */}
      <div className="sticky top-0 w-full h-screen min-h-[720px] max-h-screen bg-white text-neutral-900 overflow-hidden select-none flex flex-col justify-between py-10 px-6 sm:px-12 lg:px-20">

        {/* Subtle radial ambient background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_50%,rgba(245,245,247,0.9)_0%,rgba(255,255,255,1)_70%)]" />

        {/* Main Center Stage */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center">

          {/* Left Side: Consistent typography with website (font-display Bebas Neue & font-sans Inter) */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 max-w-sm xl:max-w-md hidden md:flex flex-col">
            <span className="text-sm sm:text-base font-mono tracking-[0.35em] text-[#ed1438] font-bold uppercase mb-3 block">
              OUR JOURNEY
            </span>
            <h2 className="text-6xl sm:text-6xl lg:text-6xl xl:text-8xl font-display uppercase tracking-tight text-black leading-[0.9]">
              A DISC<br />OF HISTORY
            </h2>

            <p className="mt-6 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed max-w-xs xl:max-w-sm">
              From a small dream to a global sound. <br />Scroll through the years and see <br />how music brought us here.
            </p>

          </div>

          {/* Center Stage: Large CD Disc + Orbit Ring (Sized to fit perfectly within viewport height) */}
          <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px] xl:w-[620px] xl:h-[620px]">

            {/* The Light Orbital Guide Line: Exact 118% circle centered at (50%, 50%) */}
            <div className="absolute w-[118%] h-[118%] rounded-full border border-neutral-300 pointer-events-none" />

            {/* The Large CD Disc */}
            <div
              className="relative w-full h-full rounded-full overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.22),0_10px_30px_rgba(0,0,0,0.12)] transition-transform duration-200 ease-out z-20 cursor-pointer"
              style={{ transform: `rotate(${continuousRotation}deg)` }}
              onClick={() => scrollToMilestone((activeIdx + 1) % MILESTONES.length)}
              title="Click or scroll to rotate to next milestone"
            >
              <Image
                src="/images/about/abouttimeline_centered.png"
                alt="A Disc of History"
                fill
                priority
                sizes="(max-width: 768px) 360px, (max-width: 1200px) 680px, 720px"
                className="object-contain pointer-events-none select-none"
              />

              {/* Center Disc Overlay Year & Tagline - Positioned higher and rotates WITH the CD */}
              <div className="absolute top-[14%] left-1/2 -translate-x-1/2 text-center pointer-events-none z-30 transition-opacity duration-300 w-full px-4">
                <span className="text-4xl sm:text-5xl md:text-6xl font-display uppercase tracking-tight text-neutral-900 block leading-none">
                  {currentMilestone.year}
                </span>
                <span className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-neutral-800 block mt-1 font-bold">
                  {currentMilestone.tagline}
                </span>
                <div className="w-10 sm:w-14 h-[2px] bg-neutral-900/80 mx-auto mt-2" />
              </div>

              {/* Left Side: Handwritten Signature Slogan (Rotates with CD, positioned clearly on the metallic sheen) */}
              <div className="absolute left-[3%] sm:left-[6%] top-[50%] -translate-y-1/2 -rotate-12 pointer-events-none z-30 text-left select-none max-w-[130px] sm:max-w-[170px]">
                <p className="font-signature text-4xl sm:text-5xl lg:text-4xl text-neutral-800 leading-[0.82] drop-shadow-xs tracking-wide">
                  More Than<br />
                  <span className="text-3xl sm:text-4xl lg:text-4xl text-[#ed1438]">Music</span>
                </p>
              </div>

              {/* Right Side: Meladine Logo & Collective Tag (Rotates with CD, centered in outer metallic band) */}
              <div className="absolute right-[4%] sm:right-[7%] top-[50%] -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center text-center select-none w-28 sm:w-36">
                <div className="relative w-14 h-16 sm:w-16 sm:h-20 lg:w-20 lg:h-24 mb-1.5 drop-shadow-sm">
                  <Image
                    src="/images/LOGO.png"
                    alt="Meladine Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 
              ORBITAL TIMELINE MILESTONE NODES:
              Calculated mathematically on the orbit circle so the dot lies EXACTLY ON THE LIGHT LINE!
            */}
            {MILESTONES.map((milestone, idx) => {
              const rad = (milestone.angleDeg * Math.PI) / 180;
              // Circle center is 50%, 50%
              const dotLeftPct = 50 + ORBIT_RADIUS_PCT * Math.cos(rad);
              const dotTopPct = 50 + ORBIT_RADIUS_PCT * Math.sin(rad);

              const isActive = activeIdx === idx;
              const isPast = activeIdx > idx;
              const isTop = idx === 0;

              return (
                <div
                  key={milestone.year}
                  className="absolute z-30 pointer-events-auto"
                  style={{
                    left: `${dotLeftPct}%`,
                    top: `${dotTopPct}%`,
                    // Center the bullet dot precisely on the line intersection
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <button
                    onClick={() => scrollToMilestone(idx)}
                    className="relative flex items-center group cursor-pointer"
                  >
                    {/* The Bullet Dot sitting exactly centered on the light orbit line */}
                    <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                      <span
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${isActive
                          ? "bg-[#ed1438] ring-4 ring-[#ed1438]/25 scale-125 shadow-md"
                          : isPast
                            ? "bg-black"
                            : "bg-neutral-300 group-hover:bg-black"
                          }`}
                      />
                    </div>

                    {/* Milestone Text (Year & Tagline) */}
                    <div
                      className={`absolute whitespace-nowrap transition-all duration-300 ${isTop
                        ? "left-6 top-1/2 -translate-y-1/2 text-left pl-1"
                        : "left-6 top-1/2 -translate-y-1/2 text-left pl-1"
                        }`}
                    >
                      <span
                        className={`text-2xl sm:text-3xl font-display uppercase tracking-tight block transition-colors leading-none ${isActive
                          ? "text-[#ed1438] scale-105 origin-left"
                          : isPast
                            ? "text-black"
                            : "text-neutral-400 group-hover:text-black"
                          }`}
                      >
                        {milestone.year}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-mono tracking-[0.2em] uppercase block mt-0.5 ${isActive
                          ? "text-neutral-900 font-bold"
                          : "text-neutral-500"
                          }`}
                      >
                        {milestone.tagline}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}

          </div>

        </div>

        {/* Bottom Footer Details */}

      </div>
    </div>
  );
}
