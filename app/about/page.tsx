import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import AboutTimelineSection from "@/components/about/AboutTimelineSection";

export const metadata: Metadata = {
  title: "About — Meladine Sound Collective",
  description: "Learn about Meladine, our underground electronic sound manifesto, acoustic laboratories, and global creative chapters.",
};

export default function AboutPage() {
  const pillars = [
    {
      num: "01",
      title: "SONIC RESONANCE",
      desc: "We explore physical acoustic pressure and low-frequency resonance, crafting audio environments that bypass intellect and communicate directly through bodily sensation.",
    },
    {
      num: "02",
      title: "ANALOGUE IMPERFECTION",
      desc: "Rejecting sterile digital quantization, our studios center on voltage-controlled oscillators, magnetic tape saturation, and bespoke valve circuitry with living harmonics.",
    },
    {
      num: "03",
      title: "BORDERLESS COMMUNITY",
      desc: "Connecting independent producers, synthesists, sound engineers, and visual artists across continents through unified frequency and collaborative physical residencies.",
    },
  ];

  const chapters = [
    { city: "BERLIN", venue: "KRAFTWERK ANNEX", role: "Modulation & Modular Synth Laboratory", year: "EST. 2022" },
    { city: "COLOMBO", venue: "DISTRICT 7 WAREHOUSE", role: "Acoustic Sub-Pressure Testing Facility", year: "EST. 2023" },
    { city: "TOKYO", venue: "THE SUBSTATION", role: "Spatial Audio & AV Reactive Research", year: "EST. 2024" },
    { city: "LONDON", venue: "THE ARCH RESIDENCY", role: "Vinyl Mastering & Sound Archive", year: "EST. 2025" },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* Page Tag & Title */}
        <div className="border-b border-neutral-200 pb-12">
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display uppercase tracking-tight text-black leading-[0.88]">
            ABOUT MELADINE
          </h1>
          <p className="mt-8 text-xl sm:text-2xl md:text-3xl font-light text-neutral-800 max-w-4xl leading-snug">
            Meladine is an independent underground sound laboratory and creative collective uniting music producers, acoustic scientists, and visual innovators.
          </p>
        </div>

        {/* Narrative & Origin Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-b border-neutral-200">
          <div className="lg:col-span-4">
            <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase block mb-2">
              ORIGINS &bull; 2022&ndash;PRESENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-display uppercase text-black">
              BORN IN CONCRETE &amp; VOLTAGE
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-col gap-6 text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
            <p>
              Founded in 2022 as a subterranean gathering of sound designers in repurposed industrial spaces, Meladine emerged from a singular conviction: that modern electronic music had become sanitized by digital perfection.
            </p>
            <p>
              We established acoustic laboratories equipped with modular Eurorack systems, restored vintage consoles, and high-displacement sub-bass arrays designed to test the physical thresholds of sound. Today, Meladine operates across Berlin, Colombo, Tokyo, and London as a beacon for uncompromised underground culture.
            </p>
          </div>
        </div>
      </div>

      {/* Black Background CD Timeline Section */}
      <AboutTimelineSection />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* Core Pillars */}
        <div className="py-20 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
                // ARCHITECTURAL PILLARS
              </span>
              <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-black mt-2">
                OUR SONIC PRINCIPLES
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">CORE DOCTRINE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="p-8 sm:p-10 rounded-2xl border border-neutral-200 bg-neutral-50/60 hover:border-black transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-display text-[#ed1438]">{p.num}</span>
                  <h3 className="text-2xl sm:text-3xl font-display uppercase text-black mt-4 mb-3 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">{p.desc}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-neutral-200/80 text-xs font-mono text-neutral-400 uppercase">
                  MELADINE ARCHIVE &bull; PRINCIPLE {p.num}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Chapters */}
        <div className="py-20 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
                // WORLDWIDE HUBS
              </span>
              <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-black mt-2">
                GLOBAL CHAPTERS
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">PHYSICAL SPACES</span>
          </div>

          <div className="divide-y divide-neutral-200">
            {chapters.map((ch, idx) => (
              <div
                key={idx}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-neutral-50 px-4 -mx-4 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="font-display text-3xl sm:text-4xl text-neutral-300 group-hover:text-[#ed1438] transition-colors w-12">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display uppercase text-black tracking-tight">
                      {ch.city} &mdash; {ch.venue}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-1">{ch.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 justify-between md:justify-end">
                  <span className="text-xs font-mono text-neutral-400">{ch.year}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono border border-neutral-200 group-hover:border-black transition-colors">
                    ACTIVE FACILITY
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Block */}
        <div className="pt-20 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl sm:text-4xl font-display uppercase text-black">
              EXPERIENCE THE FREQUENCY IN PERSON
            </h3>
            <p className="text-sm text-neutral-500 mt-2 font-mono">
              Join upcoming warehouse sessions or apply for residency mentorship.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/events"
              className="px-6 py-3.5 rounded-full bg-black text-white text-xs md:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Upcoming Events
            </Link>
            <Link
              href="/mentors"
              className="px-6 py-3.5 rounded-full border border-neutral-300 text-neutral-900 text-xs md:text-sm font-semibold tracking-wider uppercase hover:border-black transition-all duration-300"
            >
              Meet Mentors
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
