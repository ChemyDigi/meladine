"use client";

import React, { useState } from "react";
import Image from "next/image";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export default function UpcomingEventsSection() {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value || saving || submitted) return;

    setSaving(true);
    setError("");
    try {
      await addDoc(collection(getDb(), "eventSubscribers"), {
        email: value,
        source: "events-page",
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setTimeout(() => {
        setIsSubscribing(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to save subscriber", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section
      id="upcoming-events"
      className="relative w-full bg-white py-16 sm:py-24 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-14 overflow-hidden"
    >
      {/* Background Treble Clef Blueprint Watermark (Right side) */}
      <div
        className="absolute right-4 sm:right-8 md:right-12 lg:right-16 top-0 sm:top-2 md:top-4 pointer-events-none select-none opacity-[0.12] lg:opacity-[0.15] transition-opacity z-0"
        aria-hidden="true"
      >
        <div className="relative w-[130px] sm:w-[160px] md:w-[200px] lg:w-[240px] aspect-[2/3]">
          <Image
            src="/images/Home/TrebelClef.png"
            alt="Treble Clef Watermark"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ============================================================ */}
        {/* Section Header: Tag, Upcoming Events Title & Description    */}
        {/* ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 pb-10 sm:pb-14">
          <div>

            {/* Giant Heading */}
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.88] uppercase">
              <span className="text-neutral-950 block">UPCOMING</span>
              <span className="text-[#ed1438] block">EVENTS</span>
            </h2>
          </div>

          {/* Subtitle text */}
          <div className="max-w-xl lg:pb-2">
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Stay tuned for our next live session, workshop or showcase.
              <br className="hidden sm:inline" /> We&apos;ll be sharing updates soon.
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Teaser Announcement Card (Warm Blush Pink Container)         */}
        {/* ============================================================ */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#fff6f6] border border-[#fde4e4] shadow-xs p-6 sm:p-10 lg:p-12 overflow-hidden flex flex-col sm:flex-row items-center sm:items-center justify-between gap-8 sm:gap-0">
          
          {/* Left: Illustrated Doodle Calendar with Music Note */}
          <div className="flex items-center justify-center shrink-0 sm:pl-4 sm:pr-8 lg:pr-12">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 transition-transform hover:scale-105 duration-300">
              <svg
                viewBox="0 0 160 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-xs"
              >
                {/* Calendar Pages Back Layer Shadow */}
                <rect
                  x="30"
                  y="40"
                  width="98"
                  height="102"
                  rx="14"
                  fill="none"
                  stroke="#fca5a5"
                  strokeWidth="2.5"
                  transform="rotate(3 79 91)"
                />
                
                {/* Calendar Main Sheet Front Layer */}
                <rect
                  x="24"
                  y="34"
                  width="100"
                  height="104"
                  rx="16"
                  fill="#ffffff"
                  stroke="#ed1438"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Calendar Top Header Divider Line */}
                <path
                  d="M24 58H124"
                  stroke="#ed1438"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Spiral Wire Loops at Top (4 rings) */}
                {/* Loop 1 */}
                <path
                  d="M44 26C44 23 48 23 48 26V42C48 45 44 45 44 42V26Z"
                  stroke="#ed1438"
                  strokeWidth="2.8"
                  fill="#ffffff"
                />
                {/* Loop 2 */}
                <path
                  d="M64 26C64 23 68 23 68 26V42C68 45 64 45 64 42V26Z"
                  stroke="#ed1438"
                  strokeWidth="2.8"
                  fill="#ffffff"
                />
                {/* Loop 3 */}
                <path
                  d="M84 26C84 23 88 23 88 26V42C88 45 84 45 84 42V26Z"
                  stroke="#ed1438"
                  strokeWidth="2.8"
                  fill="#ffffff"
                />
                {/* Loop 4 */}
                <path
                  d="M104 26C104 23 108 23 108 26V42C108 45 104 45 104 42V26Z"
                  stroke="#ed1438"
                  strokeWidth="2.8"
                  fill="#ffffff"
                />

                {/* Musical Beamed Eighth Notes inside Calendar */}
                <g transform="translate(6, 6)">
                  {/* Note stem 1 */}
                  <line
                    x1="64"
                    y1="82"
                    x2="64"
                    y2="108"
                    stroke="#ed1438"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Note stem 2 */}
                  <line
                    x1="82"
                    y1="76"
                    x2="82"
                    y2="102"
                    stroke="#ed1438"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  {/* Top connector beam */}
                  <polygon
                    points="62,82 84,76 84,83 62,89"
                    fill="#ed1438"
                  />
                  {/* Left Note Head */}
                  <ellipse
                    cx="58"
                    cy="110"
                    rx="7.5"
                    ry="5.5"
                    transform="rotate(-20 58 110)"
                    fill="none"
                    stroke="#ed1438"
                    strokeWidth="3.2"
                  />
                  {/* Right Note Head */}
                  <ellipse
                    cx="76"
                    cy="104"
                    rx="7.5"
                    ry="5.5"
                    transform="rotate(-20 76 104)"
                    fill="none"
                    stroke="#ed1438"
                    strokeWidth="3.2"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Middle Vertical Divider Line */}
          <div
            className="hidden sm:block w-[1px] h-32 lg:h-36 bg-neutral-300 shrink-0 mx-2 lg:mx-8"
            aria-hidden="true"
          />

          {/* Right: Text Information & Notify Action */}
          <div className="flex-1 flex flex-col items-start sm:pl-6 lg:pl-10 text-left w-full">
            {/* Tag: NEW EXPERIENCES AHEAD */}
            <span className="text-[#ed1438] font-bold text-xs sm:text-sm uppercase tracking-wider block">
              NEW EXPERIENCES AHEAD
            </span>

            {/* Heading with 3 Radiant Doodle Burst Rays */}
            <div className="flex items-center gap-2.5 mt-2 flex-wrap">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-neutral-950 uppercase tracking-tight leading-tight">
                SOMETHING EXCITING IS COMING.
              </h3>
              
              {/* 3 Red Doodle Burst Rays */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 text-[#ed1438] shrink-0 -mt-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  className="w-full h-full"
                >
                  <line x1="3" y1="19" x2="9" y2="13" />
                  <line x1="12" y1="8" x2="16" y2="2" />
                  <line x1="16" y1="13" x2="22" y2="10" />
                </svg>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed mt-2.5 max-w-xl">
              We&apos;re currently planning our next event. Follow us or subscribe
              to get notified when new events are announced.
            </p>

            {/* Notification Interactive Button / Inline Form */}
            <div className="mt-5 w-full">
              {!isSubscribing ? (
                <button
                  type="button"
                  onClick={() => setIsSubscribing(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group"
                >
                  {/* Notification Bell Icon */}
                  <svg
                    className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span>NOTIFY ME</span>
                  <span className="text-sm transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full sm:flex-1 px-4 py-2.5 rounded-full border border-neutral-300 bg-white text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-[#ed1438] transition-colors"
                  />
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={saving || submitted}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#ed1438] text-white hover:bg-[#c90f2e] disabled:opacity-70 disabled:cursor-default text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {submitted ? "Subscribed!" : saving ? "Saving…" : "Subscribe"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubscribing(false)}
                      className="px-3 py-2.5 rounded-full text-xs text-neutral-500 hover:text-neutral-900"
                    >
                      ✕
                    </button>
                  </div>
                </form>
              )}

              {submitted && (
                <p className="text-xs text-[#ed1438] font-semibold mt-2">
                  ✓ You&apos;re all set! We will notify you as soon as the next event is announced.
                </p>
              )}

              {error && (
                <p className="text-xs text-[#ed1438] font-semibold mt-2">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
