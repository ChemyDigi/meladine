"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Disciplines3D, {
  DisciplineCategory,
  CATEGORIES,
} from "./Disciplines3D";
import DisciplinesStatic from "./DisciplinesStatic";
import { useStaticInstruments } from "@/lib/useMediaQuery";

interface DisciplineData {
  id: DisciplineCategory;
  number: string;
  name: string;
  subtitle: string;
}

const DISCIPLINES: Record<DisciplineCategory, DisciplineData> = {
  guitar: {
    id: "guitar",
    number: "01",
    name: "GUITAR",
    subtitle: "STRINGS & HARMONICS",
  },
  piano: {
    id: "piano",
    number: "02",
    name: "PIANO",
    subtitle: "KEYS & SYNTHESIS",
  },
  vocals: {
    id: "vocals",
    number: "03",
    name: "VOCALS",
    subtitle: "VOCAL RESONANCE & TONE",
  },
};

export default function Disciplines() {
  const [activeCategory, setActiveCategory] = useState<DisciplineCategory>("guitar");
  const activeCategoryRef = useRef<DisciplineCategory>("guitar");
  const containerTrackRef = useRef<HTMLElement>(null);

  // Phones, tablets and touch devices swap the WebGL stage for image renders.
  const staticInstruments = useStaticInstruments();

  // Scroll pinning & scroll-driven category switching with hysteresis and RAF throttling
  useEffect(() => {
    let rafId: number | null = null;

    const checkScroll = () => {
      const container = containerTrackRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = container.offsetHeight - windowH;

      if (totalScrollable <= 0) return;

      // Scrolled distance within the pinned runway
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1);

      // Deadband hysteresis prevents boundary flickering and bounce between categories:
      // Once transitioned to a category, a small scroll reversal won't bounce back.
      const currentCat = activeCategoryRef.current;
      let newCat: DisciplineCategory = currentCat;

      if (currentCat === "guitar") {
        if (progress >= 0.36) {
          newCat = progress >= 0.68 ? "vocals" : "piano";
        }
      } else if (currentCat === "piano") {
        if (progress <= 0.30) {
          newCat = "guitar";
        } else if (progress >= 0.68) {
          newCat = "vocals";
        }
      } else {
        // vocals
        if (progress <= 0.64) {
          newCat = progress <= 0.30 ? "guitar" : "piano";
        }
      }

      if (newCat !== currentCat) {
        activeCategoryRef.current = newCat;
        setActiveCategory(newCat);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkScroll();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    if (window.__lenis) {
      window.__lenis.on("scroll", handleScroll);
    }
    checkScroll();

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      if (window.__lenis) {
        window.__lenis.off("scroll", handleScroll);
      }
    };
  }, []);

  const currentIdx = CATEGORIES.indexOf(activeCategory);
  const prevIdx = (currentIdx - 1 + CATEGORIES.length) % CATEGORIES.length;
  const nextIdx = (currentIdx + 1) % CATEGORIES.length;

  const leftCategory = CATEGORIES[prevIdx];
  const rightCategory = CATEGORIES[nextIdx];

  const activeData = DISCIPLINES[activeCategory];
  const leftData = DISCIPLINES[leftCategory];
  const rightData = DISCIPLINES[rightCategory];

  // Smooth scroll to category when user clicks arrow buttons or models
  const scrollToCategory = useCallback((cat: DisciplineCategory) => {
    activeCategoryRef.current = cat;
    setActiveCategory(cat);

    const idx = CATEGORIES.indexOf(cat);
    if (idx === -1) return;

    const container = containerTrackRef.current;
    if (!container) return;

    const windowH = window.innerHeight;
    const totalScrollable = container.offsetHeight - windowH;
    if (totalScrollable <= 0) return;

    // Center of each stage: Guitar: 0.16, Piano: 0.50, Vocals: 0.84
    const targetProgress =
      idx === 0 ? 0.16 : idx === 1 ? 0.50 : 0.84;
    const containerTop = window.scrollY + container.getBoundingClientRect().top;
    const targetScroll = containerTop + totalScrollable * targetProgress;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScroll, { duration: 0.85 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  const handlePrev = () => scrollToCategory(leftCategory);
  const handleNext = () => scrollToCategory(rightCategory);

  return (
    <section
      id="disciplines"
      ref={containerTrackRef}
      className="relative w-full h-[260vh] bg-white text-neutral-900 select-none"
    >
      {/* 
        Sticky Viewport:
        Holds the screen pinned in place while the user scrolls through the 260vh runway.
        As the user scrolls, the 3D models swiftly rotate and swap between Guitar, Piano, and Vocals.
        Once the runway ends, normal scrolling resumes down to the next section.
      */}
      <div className="sticky top-0 w-full h-screen h-[100svh] min-h-[100svh] bg-white text-neutral-900 overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 px-3 sm:px-6 lg:px-8">
        {/* Background Architectural Grid Lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="curtain-grid-columns h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-neutral-100 h-full" />
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between items-center min-h-0">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-0 sm:mb-2 z-20 shrink-0">
            <span className="text-[10px] sm:text-xs md:text-sm font-mono tracking-widest text-[#ed1438] uppercase font-bold mb-0.5 sm:mb-1">
              02 ACADEMY
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight text-neutral-950 leading-[0.9]">
              CORE DISCIPLINES
            </h2>
          </div>

          {/* 3D Showcase Arena */}
          <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-0 translate-y-3 xs:translate-y-5 sm:translate-y-2 lg:translate-y-0">
            {/* ============================================================ */}
            {/* Subtle Background Concentric Acoustic Resonance Circles     */}
            {/* ============================================================ */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex items-center justify-center z-0">
              {/* Ambient acoustic soft glow */}
              <div className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(237,20,56,0.045)_0%,rgba(0,0,0,0.015)_50%,rgba(255,255,255,0)_75%)] blur-2xl" />

              {/* Inner Circle 1 */}
              <div className="absolute w-[220px] h-[220px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] rounded-full border border-neutral-200/70" />

              {/* Middle Circle 2 */}
              <div className="absolute w-[320px] h-[320px] sm:w-[520px] sm:h-[520px] md:w-[620px] md:h-[620px] rounded-full border border-neutral-200/50" />

              {/* Middle Dashed Circle 3 */}
              <div className="absolute w-[420px] h-[420px] sm:w-[700px] sm:h-[700px] md:w-[840px] md:h-[840px] rounded-full border border-dashed border-neutral-200/40" />

              {/* Outer Subtle Circle 4 */}
              <div className="absolute w-[540px] h-[540px] sm:w-[880px] sm:h-[880px] md:w-[1060px] md:h-[1060px] rounded-full border border-neutral-100/60" />

              {/* Far Outer Ambient Ring 5 */}
              <div className="hidden lg:block absolute w-[1280px] h-[1280px] rounded-full border border-neutral-100/40" />
            </div>

            {/* Handwriting Annotation */}
            <div className="absolute right-2 sm:right-6 md:right-10 lg:right-14 bottom-4 sm:bottom-auto sm:top-[60%] md:top-[62%] z-30 flex flex-col items-end text-right -rotate-2 sm:-rotate-3 select-none pointer-events-none pr-1">
              <span className="font-handwriting text-sm xs:text-base sm:text-xl md:text-2xl lg:text-[1.75rem] text-neutral-950 font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight transition-all duration-300">
                {staticInstruments ? "" : "interactive 3D "}
                {activeCategory === "guitar" ? "acoustic guitar" : activeCategory === "piano" ? "stage keyboard" : "studio mic"}
              </span>
              <span className="-mt-0.5 sm:-mt-1 font-handwriting text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-[1.15rem] text-[#ed1438] font-bold tracking-wide drop-shadow-xs whitespace-nowrap leading-tight">
                {staticInstruments ? "tap the names to switch" : "drag and explore the instruments"}
              </span>
            </div>

            {/* Three.js Interactive 3D Canvas */}
            <div className="w-full relative z-10 flex-1 flex items-center justify-center min-h-0">
              {staticInstruments === false && (
                <Disciplines3D
                  activeCategory={activeCategory}
                  onSelectCategory={scrollToCategory}
                />
              )}
              {staticInstruments === true && (
                <DisciplinesStatic
                  activeCategory={activeCategory}
                  onSelectCategory={scrollToCategory}
                />
              )}
            </div>
          </div>

          {/* The Iconic 3-Item Typography Bar */}
          <div className="relative z-20 w-full max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto grid grid-cols-[1fr_auto_1fr] items-end justify-center gap-1.5 sm:gap-6 md:gap-8 pt-0 sm:pt-2 pb-1 sm:pb-3 -translate-y-1 sm:translate-y-0">
            {/* Left Flanking Label */}
            <div className="flex flex-col items-end text-right pb-0.5 sm:pb-2">
              <button
                type="button"
                onClick={handlePrev}
                className="group flex flex-col items-end cursor-pointer transition-transform active:scale-95 text-right"
              >
                <span className="font-mono text-[8px] xs:text-[9px] sm:text-[11px] text-neutral-400 tracking-widest uppercase mb-0.5 group-hover:text-[#ed1438] transition-colors whitespace-nowrap">
                  &larr; {leftData.number}
                </span>
                <span className="font-display uppercase text-xl xs:text-2xl sm:text-4xl md:text-5xl tracking-tight text-neutral-300 group-hover:text-neutral-900 transition-colors duration-200">
                  {leftData.name}
                </span>
              </button>
            </div>

            {/* Center Active Label */}
            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                <span className="w-1.5 sm:w-2 h-0.5 bg-[#ed1438]" />
                <span className="font-mono text-[9px] xs:text-[10px] sm:text-sm font-semibold tracking-widest text-[#ed1438] uppercase whitespace-nowrap">
                  {activeData.number} · {activeData.subtitle}
                </span>
                <span className="w-1.5 sm:w-2 h-0.5 bg-[#ed1438]" />
              </div>
              <h3 className="font-display uppercase text-4xl xs:text-5xl sm:text-8xl md:text-9xl lg:text-[7.5rem] tracking-tight text-neutral-950 leading-[0.88] drop-shadow-xs transition-all duration-300 whitespace-nowrap">
                {activeData.name}
              </h3>
            </div>

            {/* Right Flanking Label */}
            <div className="flex flex-col items-start text-left pb-0.5 sm:pb-2">
              <button
                type="button"
                onClick={handleNext}
                className="group flex flex-col items-start cursor-pointer transition-transform active:scale-95 text-left"
              >
                <span className="font-mono text-[8px] xs:text-[9px] sm:text-[11px] text-neutral-400 tracking-widest uppercase mb-0.5 group-hover:text-[#ed1438] transition-colors whitespace-nowrap">
                  {rightData.number} &rarr;
                </span>
                <span className="font-display uppercase text-xl xs:text-2xl sm:text-4xl md:text-5xl tracking-tight text-neutral-300 group-hover:text-neutral-900 transition-colors duration-200">
                  {rightData.name}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
