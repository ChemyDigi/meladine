import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentors — Meladine Sound Collective",
  description: "Meet the resident artists, modular masters, and acoustic engineers leading Meladine sound residencies.",
};

export default function MentorsPage() {
  const mentors = [
    {
      num: "01",
      name: "KAELLEN V.",
      role: "MODULAR SYNTHESIS & VOLTAGE KINETICS",
      city: "BERLIN",
      experience: "14 YEARS RESIDENCY",
      bio: "Master of Eurorack patching, patchable analog systems, and generative algorithmic sequencing. Kaellen leads hands-on hardware laboratory sessions focused on non-repeating sonic structures.",
      tags: ["Eurorack", "Buchla", "Tape Saturation", "Generative Logic"],
    },
    {
      num: "02",
      name: "NEXUS ZERO",
      role: "ACOUSTIC SUB-PRESSURE ENGINEERING",
      city: "COLOMBO",
      experience: "12 YEARS ACOUSTICS",
      bio: "Specializing in low-frequency room response, horn-loaded sub-bass calibration, and subterranean frequency synthesis. Nexus trains artists in the physical architecture of club acoustic dynamics.",
      tags: ["Sub-Bass Physics", "Horn Acoustics", "Analog Crossovers", "Phase Tuning"],
    },
    {
      num: "03",
      name: "SORA TANAKA",
      role: "AUDIO-REACTIVE VISUAL SYSTEMS",
      city: "TOKYO",
      experience: "10 YEARS AV DIRECTION",
      bio: "Pioneering real-time generative shaders, laser projection interfaces, and TouchDesigner pipelines synchronized directly with synthesiser CV and MIDI outputs for total sensory immersion.",
      tags: ["TouchDesigner", "Laser CV", "Shaders", "Stage Architecture"],
    },
    {
      num: "04",
      name: "MAYA LIN",
      role: "SPATIAL SOUND & 360° IMMERSION",
      city: "LONDON",
      experience: "9 YEARS FIELD AUDIO",
      bio: "Working with ambisonic microphones, quadrophonic stage arrays, and psychoacoustic perception. Maya guides producers in composing for non-stereo physical spaces and sound installations.",
      tags: ["Ambisonics", "Spatial DAW", "Binaural Field", "Installation"],
    },
    {
      num: "05",
      name: "VICTOR CRUZ",
      role: "ANALOG TAPE & VINYL CUTTING",
      city: "SÃO PAULO",
      experience: "16 YEARS MASTERING",
      bio: "Lathe cutting engineer and analog mastering purist. Victor works with artists on mastering high-dynamic electronic audio for club systems and physical vinyl pressing.",
      tags: ["Lathe Cutting", "Tube Compressors", "High Dynamic", "Vinyl EQ"],
    },
    {
      num: "06",
      name: "ELENA ROSTOVA",
      role: "INDUSTRIAL RHYTHM & DRUM MACHINES",
      city: "TBILISI",
      experience: "8 YEARS HARDWARE LIVE",
      bio: "Specializing in heavy syncopated drum synthesis, analog distortion units, and live improvisational hardware sets without laptops or digital safety nets.",
      tags: ["Analog Drums", "Distortion Chains", "Hardware Sets", "135+ BPM"],
    },
  ];

  const tracks = [
    { title: "LABORATORY SESSIONS", desc: "Private 1-on-1 intensive studio residencies with full access to rare modular rigs and vintage analog hardware." },
    { title: "ACOUSTIC SOUND CHECKS", desc: "Field acoustic tuning on custom warehouse sound systems to test your tracks under extreme sub-bass conditions." },
    { title: "SHOWCASE DEBUT", desc: "Selected mentees are featured in official Meladine warehouse sessions and vinyl compilation releases." },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-neutral-200 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 text-xs font-mono tracking-widest text-[#ed1438] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed1438]" />
            FACULTY &amp; RESIDENT SCIENTISTS
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display uppercase tracking-tight text-black leading-[0.88]">
            RESIDENT MENTORS
          </h1>
          <p className="mt-8 text-xl sm:text-2xl md:text-3xl font-light text-neutral-800 max-w-4xl leading-snug">
            Guiding producers, modular synthesists, and acoustic scientists into the deep spectrum of underground frequency.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20 border-b border-neutral-200">
          {mentors.map((m) => (
            <div
              key={m.num}
              className="p-8 rounded-2xl border border-neutral-200 bg-white hover:border-black transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Avatar / Number placeholder */}
                <div className="w-full aspect-[4/3] bg-neutral-50 rounded-xl mb-6 flex flex-col items-center justify-center border border-neutral-100 group-hover:bg-neutral-100 transition-colors">
                  <span className="font-display text-6xl text-neutral-300 group-hover:text-black transition-colors">
                    M // {m.num}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 mt-2 uppercase">{m.city} CHAPTER</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-3xl font-display uppercase text-black tracking-tight">{m.name}</h3>
                  <span className="text-xs font-mono text-neutral-400">{m.experience}</span>
                </div>
                
                <div className="text-xs font-mono text-[#ed1438] font-semibold uppercase mt-1">
                  {m.role}
                </div>

                <p className="text-sm text-neutral-600 mt-4 leading-relaxed font-normal">
                  {m.bio}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-neutral-100 flex flex-wrap gap-1.5">
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider border border-neutral-200 text-neutral-600 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mentorship Program Tracks */}
        <div className="py-20 border-b border-neutral-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
                // PROGRAM CURRICULUM
              </span>
              <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-black mt-2">
                HOW THE RESIDENCY WORKS
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">APPLICATION ONLY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tracks.map((t, i) => (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-2xl bg-neutral-50 border border-neutral-200"
              >
                <span className="text-4xl font-display text-[#ed1438]">0{i + 1}</span>
                <h3 className="text-2xl font-display uppercase text-black mt-4 mb-3 tracking-tight">
                  {t.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed font-normal">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application CTA Banner */}
        <div className="pt-20 flex flex-col md:flex-row items-center justify-between gap-8 p-10 sm:p-14 rounded-3xl bg-neutral-950 text-white">
          <div>
            <span className="text-xs font-mono text-[#ed1438] uppercase tracking-widest font-bold">
              // NEXT RESIDENCY COHORT OPENS NOVEMBER 2026
            </span>
            <h2 className="text-4xl sm:text-6xl font-display uppercase mt-2">
              APPLY FOR SOUND RESIDENCY
            </h2>
            <p className="text-sm text-neutral-400 mt-3 max-w-xl font-normal leading-relaxed">
              We accept 8 artists per semester across Berlin, Colombo, Tokyo, and London. Direct one-on-one mentorship, studio keys, and release opportunities.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-black text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] hover:text-white transition-all shrink-0 shadow-lg active:scale-95 cursor-pointer"
          >
            Submit Application &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
