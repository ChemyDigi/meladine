"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function EventsPage() {
  const [selectedCity, setSelectedCity] = useState("ALL");

  const events = [
    {
      id: "ev-01",
      date: "OCT 24, 2026",
      time: "23:00 - LATE",
      title: "FREQUENCY RESONANCE VOL. IV",
      city: "BERLIN",
      venue: "KRAFTWERK // MAIN HALL",
      lineup: "Kaellen V. (Live Modular), Nexus Zero, Sora Tanaka (AV Set)",
      bpm: "132.0 BPM",
      status: "TICKETS AVAILABLE",
      statusClass: "border-black text-black hover:bg-black hover:text-white",
    },
    {
      id: "ev-02",
      date: "NOV 12, 2026",
      time: "22:00 - 06:00",
      title: "DEEP PRESSURE COLLECTIVE",
      city: "COLOMBO",
      venue: "WAREHOUSE 7 // HARBOR DOCKS",
      lineup: "Nexus Zero, Maya Lin, Victor Cruz, Resident Selectors",
      bpm: "128.5 BPM",
      status: "SELLING FAST",
      statusClass: "bg-[#ed1438] text-white border-[#ed1438] hover:bg-neutral-900",
    },
    {
      id: "ev-03",
      date: "DEC 05, 2026",
      time: "21:30 - LATE",
      title: "ECHO CHAMBERS: LIVE MODULAR",
      city: "TOKYO",
      venue: "THE SUBSTATION // SHIBUYA",
      lineup: "Sora Tanaka, Kaellen V., Elena Rostova, Special Guests",
      bpm: "134.0 BPM",
      status: "WAITLIST",
      statusClass: "border-neutral-300 text-neutral-400 cursor-not-allowed",
    },
    {
      id: "ev-04",
      date: "JAN 18, 2027",
      time: "23:00 - 08:00",
      title: "SUBTERRANEAN KINETICS",
      city: "LONDON",
      venue: "THE ARCH // BERMONDSEY",
      lineup: "Maya Lin (Quadrophonic Set), Victor Cruz, Kaellen V.",
      bpm: "130.0 BPM",
      status: "TICKETS AVAILABLE",
      statusClass: "border-black text-black hover:bg-black hover:text-white",
    },
    {
      id: "ev-05",
      date: "FEB 14, 2027",
      time: "22:00 - 06:00",
      title: "ANALOGUE TRANSMISSION 005",
      city: "BERLIN",
      venue: "TRESOR CELLAR // BERLIN",
      lineup: "Kaellen V., Elena Rostova, Nexus Zero",
      bpm: "136.0 BPM",
      status: "TICKETS AVAILABLE",
      statusClass: "border-black text-black hover:bg-black hover:text-white",
    },
  ];

  const cities = ["ALL", "BERLIN", "COLOMBO", "TOKYO", "LONDON"];

  const filteredEvents =
    selectedCity === "ALL"
      ? events
      : events.filter((e) => e.city.toUpperCase() === selectedCity);

  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-neutral-200 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 text-xs font-mono tracking-widest text-[#ed1438] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed1438]" />
            LIVE EXPERIENCES // CALENDAR 2026&ndash;2027
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display uppercase tracking-tight text-black leading-[0.88]">
            UPCOMING SESSIONS
          </h1>
          <p className="mt-8 text-xl sm:text-2xl md:text-3xl font-light text-neutral-800 max-w-4xl leading-snug">
            Immersive sound takeovers, modular synthesiser showcases, and boundary-pushing acoustic nights.
          </p>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-10">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCity === city
                    ? "bg-black text-white shadow-sm"
                    : "border border-neutral-200 text-neutral-600 hover:border-black hover:text-black"
                }`}
              >
                {city === "ALL" ? "All Locations" : city}
              </button>
            ))}
          </div>
        </div>

        {/* Event List */}
        <div className="divide-y divide-neutral-200 py-6 border-b border-neutral-200">
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="py-10 group flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-neutral-50/80 px-4 -mx-4 rounded-2xl transition-all"
            >
              {/* Date & Location */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 lg:w-1/3">
                <span className="font-display text-4xl sm:text-5xl text-black tracking-tight shrink-0">
                  {ev.date}
                </span>
                <div className="text-xs font-mono text-neutral-400 uppercase">
                  <div>{ev.time}</div>
                  <div className="text-neutral-800 font-semibold mt-0.5">{ev.city}</div>
                </div>
              </div>

              {/* Title & Lineup */}
              <div className="lg:w-1/2">
                <div className="text-xs font-mono text-[#ed1438] font-bold uppercase tracking-wider mb-1">
                  {ev.venue} &bull; {ev.bpm}
                </div>
                <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-tight text-black group-hover:text-[#ed1438] transition-colors">
                  {ev.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-mono mt-2">
                  Lineup: {ev.lineup}
                </p>
              </div>

              {/* Action / Tickets */}
              <div className="lg:w-1/6 flex items-center lg:justify-end">
                <button
                  type="button"
                  onClick={() => alert(`RSVP registration opened for ${ev.title}`)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border transition-all duration-200 cursor-pointer ${ev.statusClass}`}
                >
                  {ev.status}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Venue Partnership / Host section */}
        <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="p-8 sm:p-10 rounded-2xl border border-neutral-200 bg-neutral-50">
            <span className="text-xs font-mono text-[#ed1438] uppercase tracking-widest font-bold">
              // VENUE &amp; CURATOR INQUIRIES
            </span>
            <h3 className="text-3xl sm:text-4xl font-display uppercase text-black mt-2">
              HOST A MELADINE SESSION
            </h3>
            <p className="text-sm text-neutral-600 mt-4 leading-relaxed font-normal">
              Do you manage a warehouse, industrial room, or acoustic hall? We partner with independent venues globally to bring high-displacement sound systems and curated artists.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-6 px-6 py-3 rounded-full bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-[#ed1438] transition-colors"
            >
              Contact Dispatch &rarr;
            </Link>
          </div>

          <div className="p-8 sm:p-10 rounded-2xl border border-neutral-200 bg-neutral-50">
            <span className="text-xs font-mono text-[#ed1438] uppercase tracking-widest font-bold">
              // SOUND SYSTEM SPECS
            </span>
            <h3 className="text-3xl sm:text-4xl font-display uppercase text-black mt-2">
              BESPOKE ACOUSTIC RIGS
            </h3>
            <p className="text-sm text-neutral-600 mt-4 leading-relaxed font-normal">
              Every Meladine session utilizes custom horn-loaded sub-bass drivers, analog crossover limiters, and point-source line arrays calibrated specifically for each room’s resonance.
            </p>
            <Link
              href="/about"
              className="inline-block mt-6 px-6 py-3 rounded-full border border-neutral-300 text-black text-xs font-mono uppercase tracking-wider hover:border-black transition-colors"
            >
              Read Audio Specs &rarr;
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
