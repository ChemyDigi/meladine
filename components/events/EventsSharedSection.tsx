"use client";

import React from "react";
import Link from "next/link";

interface PastEventCard {
  id: string;
  day: string;
  month: string;
  year: string;
  title: string;
  href?: string;
}

const PAST_EVENTS: PastEventCard[] = [
  {
    id: "student-recital",
    day: "12",
    month: "AUG",
    year: "2023",
    title: "STUDENT RECITAL",
    href: "#",
  },
  {
    id: "mentor-session",
    day: "05",
    month: "DEC",
    year: "2023",
    title: "MENTOR SESSION",
    href: "#",
  },
  {
    id: "band-night",
    day: "18",
    month: "MAR",
    year: "2023",
    title: "BAND NIGHT",
    href: "#",
  },
];

export default function EventsSharedSection() {
  return (
    <section
      id="events-shared"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-8 md:px-12 lg:px-14 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* ============================================================ */}
        {/* Section Header: Title, Subtitle, & View All CTA             */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 pb-8 sm:pb-12">
          {/* Main Title */}
          <div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.92] text-neutral-950">
              EVENTS <br />
              WE&apos;VE <span className="text-[#ed1438]">SHARED</span>
            </h2>
          </div>

          {/* Description & View All Button */}
          <div className="flex flex-col items-start lg:items-end gap-4 max-w-2xl">
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed text-left lg:text-right">
              From intimate acoustic sessions to large-scale showcases, here are some of the
              <br className="hidden sm:inline" />{" "}
              memorable moments we&apos;ve created together with our students, mentors and guests.
            </p>

            <Link
              href="#upcoming-events"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 hover:border-neutral-900 hover:text-neutral-950 hover:bg-neutral-50 transition-all whitespace-nowrap shrink-0 group self-start lg:self-end"
            >
              <span>VIEW ALL EVENTS</span>
              <span className="transform group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Main Featured Showcase Card (Empty Media Slot)               */}
        {/* ============================================================ */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800/90 shadow-2xl min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex items-end sm:items-center group">
          {/* Ambient stage glow & vignette (ready for background photo/video) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-neutral-950/60 z-10 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -top-24 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* ======================================================== */}
          {/* EMPTY MEDIA CONTAINER FOR FEATURED EVENT                */}
          {/* Place your <video> or <Image> tag inside this div       */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full z-0 flex items-center justify-end pr-8 md:pr-16 opacity-30 group-hover:opacity-40 transition-opacity"
            aria-label="Event Media Slot"
          >
            {/* Subtle empty placeholder hint */}
            <div className="hidden md:flex flex-col items-center gap-2 text-neutral-500 border border-dashed border-neutral-700/60 rounded-2xl p-8 max-w-sm text-center">
              <svg
                className="w-8 h-8 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                Featured Event Media Slot
              </span>
              <span className="text-[11px] text-neutral-500 leading-tight">
                Add your event showcase video or photo here
              </span>
            </div>
          </div>

          {/* Card Content Overlay */}
          <div className="relative z-20 p-6 sm:p-10 md:p-12 max-w-xl">
            {/* Date Badge: Large red day with stacked month/year */}
            <div className="flex items-center gap-3">
              <span className="font-display text-4xl sm:text-5xl md:text-6xl text-[#ed1438] font-bold leading-none">
                28
              </span>
              <div className="flex flex-col text-[11px] sm:text-xs font-semibold text-neutral-300 tracking-wider uppercase leading-tight">
                <span>MAY</span>
                <span>2024</span>
              </div>
            </div>

            {/* Event Title */}
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase leading-tight mt-4 sm:mt-5">
              ACOUSTIC STAGE SHOWCASE
            </h3>

            {/* Event Summary */}
            <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed mt-3 max-w-md">
              An evening of soulful performances by our guitar and vocal students,
              bringing original music and cover pieces to life on stage.
            </p>

            {/* Action Pill Button */}
            <button
              type="button"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-neutral-600/90 bg-black/40 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider text-neutral-200 hover:border-white hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <span>VIEW EVENT PHOTOS</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3-Column Grid for Recitals, Sessions & Nights (Empty Cards)  */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mt-6">
          {PAST_EVENTS.map((event) => (
            <div
              key={event.id}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800/90 min-h-[220px] sm:min-h-[240px] md:min-h-[250px] p-6 sm:p-7 flex flex-col justify-end group cursor-pointer shadow-lg hover:border-neutral-700 transition-all duration-300"
            >
              {/* Ambient dark gradient overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-neutral-900/40 z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* ==================================================== */}
              {/* EMPTY MEDIA SLOT FOR EVENT CARD                     */}
              {/* Place your <video> or <Image> tag inside this slot   */}
              {/* ==================================================== */}
              <div
                className="absolute inset-0 z-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity"
                aria-label={`${event.title} media slot`}
              >
                <div className="w-12 h-12 rounded-full border border-dashed border-neutral-700 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom Details Row */}
              <div className="relative z-20 flex items-end justify-between gap-4">
                {/* Date & Title */}
                <div className="flex flex-col">
                  {/* Date badge */}
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-3xl sm:text-4xl text-white font-bold leading-none">
                      {event.day}
                    </span>
                    <div className="flex flex-col text-[10px] font-semibold text-neutral-400 tracking-wider uppercase leading-tight">
                      <span>{event.month}</span>
                      <span>{event.year}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-display text-xl sm:text-2xl text-white tracking-wide uppercase leading-tight mt-1.5 group-hover:text-[#ed1438] transition-colors">
                    {event.title}
                  </h4>
                </div>

                {/* Circular Arrow Action Button */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-neutral-600/80 flex items-center justify-center text-white group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
