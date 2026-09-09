import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-white py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
              // 01 ARCHIVE &amp; MISSION
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-black mt-2">
              ABOUT MELADINE
            </h2>
          </div>
          <p className="max-w-md text-neutral-600 font-normal leading-relaxed text-sm md:text-base">
            Born at the intersection of raw underground techno and audio-visual engineering, Meladine cultivates sonic freedom and uncompromised sound fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-3xl font-display text-[#ed1438]">01</span>
            <h3 className="text-2xl font-display uppercase mt-4 mb-2">Sonic Experiments</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Analog synthesizers, modular rigs, and custom acoustics engineered for deep frequency immersion.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-3xl font-display text-[#ed1438]">02</span>
            <h3 className="text-2xl font-display uppercase mt-4 mb-2">Curated Showcases</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Intimate venue takeovers, warehouse performances, and borderless electronic music gatherings.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80">
            <span className="text-3xl font-display text-[#ed1438]">03</span>
            <h3 className="text-2xl font-display uppercase mt-4 mb-2">Global Community</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Uniting producers, sound designers, and visualists across continents through shared frequency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
