"use client";

import React, { useState } from "react";

interface EventItem {
  id: string;
  title: string;
  category: "Showcase" | "Workshop" | "Live Session" | "Masterclass";
  date: string;
  day: string;
  month: string;
  time: string;
  stage: string;
  description: string;
  spotsLeft: number;
  featured?: boolean;
}

const UPCOMING_EVENTS: EventItem[] = [
  {
    id: "live-session-04",
    title: "Meladine Live Session Vol. 04",
    category: "Live Session",
    date: "24",
    month: "NOV",
    day: "Friday",
    time: "7:30 PM — 10:00 PM",
    stage: "Red Stage & Live Studio",
    description: "An intimate live recorded session featuring resident acoustic guitarists and vocalists in an unplugged setting.",
    spotsLeft: 14,
    featured: true,
  },
  {
    id: "modular-lab",
    title: "Modular Synthesis & Acoustic Lab",
    category: "Workshop",
    date: "02",
    month: "DEC",
    day: "Saturday",
    time: "3:00 PM — 6:30 PM",
    stage: "Acoustics Laboratory B",
    description: "Explore analog subtractive synthesis, tape loop manipulation, and harmonic overtone generation with mentor engineers.",
    spotsLeft: 8,
  },
  {
    id: "acoustic-showcase",
    title: "Winter Resident Artist Showcase",
    category: "Showcase",
    date: "15",
    month: "DEC",
    day: "Friday",
    time: "8:00 PM — 11:30 PM",
    stage: "Main Amphitheater",
    description: "Full stage performances by conservatory residents, accompanied by live chamber ensemble arrangements.",
    spotsLeft: 22,
    featured: true,
  },
  {
    id: "vocal-masterclass",
    title: "Vocal Texture & Harmonic Improvisation",
    category: "Masterclass",
    date: "20",
    month: "DEC",
    day: "Wednesday",
    time: "5:00 PM — 7:30 PM",
    stage: "Chamber Hall A",
    description: "Mastering microtonal pitch accuracy, chest-to-head resonance transitions, and polyphonic vocal harmony.",
    spotsLeft: 6,
  },
];

const CATEGORIES = ["All", "Live Session", "Showcase", "Workshop", "Masterclass"] as const;

export default function UpcomingEventsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [reservedEventId, setReservedEventId] = useState<string | null>(null);

  const filteredEvents = activeCategory === "All"
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter((e) => e.category === activeCategory);

  const handleReserve = (id: string) => {
    setReservedEventId(id);
    setTimeout(() => {
      setReservedEventId(null);
    }, 2500);
  };

  return (
    <section
      id="upcoming-events"
      className="relative w-full bg-neutral-50/60 py-20 sm:py-28 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-neutral-200/80 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <div className="inline-flex items-center gap-2 text-[#ed1438] font-bold text-xs sm:text-sm tracking-[0.22em] uppercase font-sans mb-2">
              <span>//</span>
              <span>CALENDAR &amp; LINEUP</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-neutral-950 uppercase tracking-tight">
              UPCOMING SESSIONS
            </h2>
            <p className="font-sans text-neutral-500 text-sm sm:text-base max-w-lg mt-2">
              Reserve admission passes for upcoming stage performances, masterclasses, and open recording sessions.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-neutral-950 text-white shadow-xs"
                    : "bg-white text-neutral-600 hover:text-neutral-950 border border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid / List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {filteredEvents.map((evt) => {
            const isReserved = reservedEventId === evt.id;

            return (
              <div
                key={evt.id}
                className="group relative bg-white border border-neutral-200 hover:border-neutral-900/30 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
              >
                {/* Top Row: Date Badge & Category Tag */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-18 sm:h-18 rounded-xl bg-neutral-900 text-white shrink-0 group-hover:bg-[#ed1438] transition-colors duration-300">
                      <span className="font-display text-2xl sm:text-3xl font-bold leading-none">
                        {evt.date}
                      </span>
                      <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-neutral-300 group-hover:text-white mt-0.5">
                        {evt.month}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-neutral-100 text-neutral-800">
                          {evt.category}
                        </span>
                        {evt.featured && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-50 text-[#ed1438] border border-red-200/60">
                            ★ Featured
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1.5 font-mono">
                        {evt.day} • {evt.time}
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-400 shrink-0">
                    {evt.spotsLeft} spots left
                  </span>
                </div>

                {/* Content Block */}
                <div className="mt-5">
                  <h3 className="font-display text-2xl sm:text-3xl text-neutral-950 uppercase tracking-tight group-hover:text-[#ed1438] transition-colors">
                    {evt.title}
                  </h3>
                  <p className="font-sans text-neutral-500 text-sm mt-2 leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                {/* Bottom Row: Stage & CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-neutral-100">
                  <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
                    <span className="w-2 h-2 rounded-full bg-[#ed1438] animate-pulse" />
                    <span>{evt.stage}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleReserve(evt.id)}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isReserved
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-950 text-white hover:bg-[#ed1438] active:scale-95 shadow-xs"
                    }`}
                  >
                    <span>{isReserved ? "Pass Claimed!" : "Reserve Pass"}</span>
                    <span className="font-bold">&rarr;</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
