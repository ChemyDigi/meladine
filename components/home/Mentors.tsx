import React from "react";

export default function Mentors() {
  const mentorList = [
    { name: "KAELLEN V.", role: "MODULAR SYNTHESIS", city: "BERLIN" },
    { name: "NEXUS ZERO", role: "ACOUSTIC ENGINEERING", city: "COLOMBO" },
    { name: "SORA T.", role: "LIVE AV PERFORMANCE", city: "TOKYO" },
    { name: "MAYA LIN", role: "SPATIAL AUDIO DESIGN", city: "LONDON" },
  ];

  return (
    <section
      id="mentors"
      className="w-full bg-white py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
              // 03 ARTISTS &amp; GUIDES
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-black mt-2">
              RESIDENT MENTORS
            </h2>
          </div>
          <p className="max-w-md text-neutral-600 font-normal leading-relaxed text-sm md:text-base">
            Leading sound architects, electronic masters, and acoustic scientists guiding the next generation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentorList.map((mentor, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-neutral-200 bg-white hover:border-black transition-all duration-300"
            >
              <div className="w-full aspect-square bg-neutral-100 rounded-xl mb-6 flex items-center justify-center font-display text-4xl text-neutral-300">
                M // 0{i + 1}
              </div>
              <h3 className="text-2xl font-display uppercase text-black">{mentor.name}</h3>
              <div className="text-xs font-mono text-[#ed1438] mt-1 font-semibold uppercase">{mentor.role}</div>
              <div className="text-xs font-mono text-neutral-400 mt-2">{mentor.city}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
