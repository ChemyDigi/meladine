"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TextPressure from "./TextPressure";
import DoodleArrow from "./home/DoodleArrow";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Hide footer on 404 / events page if desired
  if (pathname === "/events") {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 3500);
  };

  return (
    <footer
      id="site-main-footer"
      className="relative w-full bg-white text-neutral-900 pt-20 sm:pt-28 pb-0 overflow-hidden select-none border-t border-neutral-100"
    >
      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Pitch Headline with Bebas Neue Condensed Display Font matching previous sections */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display uppercase tracking-tight text-neutral-950 leading-[0.95] max-w-4xl">
          Meladine, the sonic conservatory
          <span className="block mt-1 sm:mt-1.5">
            sound artists{" "}
            <span className="inline-block align-baseline mx-1 transition-transform hover:scale-110 duration-300">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block text-[#ed1438] drop-shadow-[0_0_12px_rgba(237,20,56,0.35)] translate-y-1"
              >
                <path
                  d="M9 18V5L20 3V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="6" cy="18" r="3" fill="currentColor" />
                <circle cx="17" cy="16" r="3" fill="currentColor" />
              </svg>
            </span>{" "}
            were waiting for.
          </span>
        </h2>

        {/* Showcase Composition: Callout on Left, Waitlist Bar on Right (Matching Mentors layout precisely) */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16">
          {/* Left Side: Clean Handwriting Annotation + Natural DoodleArrow Pointing to the Pill */}
          <div className="flex items-center gap-2 sm:gap-3 select-none shrink-0">
            <div className="flex flex-col items-end text-right -rotate-2">
              <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-neutral-900 font-bold whitespace-nowrap leading-tight">
                join the sound?
              </span>
              <span className="-mt-0.5 sm:-mt-1 font-handwriting text-xl sm:text-2xl md:text-3xl text-[#ed1438] font-bold whitespace-nowrap leading-tight">
                click to send
              </span>
            </div>
            {/* Exactly oriented DoodleArrow pointing horizontally right */}
            <div className="w-16 sm:w-20 md:w-24 rotate-[-4deg] shrink-0 -mr-2 sm:-mr-4">
              <DoodleArrow className="w-full h-auto drop-shadow-xs" />
            </div>
          </div>

          {/* Right Side: Waitlist Capsule Input Bar */}
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="w-full"
            >
              <div className="relative flex items-center bg-neutral-50 border border-neutral-200/90 rounded-full p-1.5 shadow-sm focus-within:border-[#ed1438]/50 focus-within:ring-2 focus-within:ring-[#ed1438]/20 transition-all">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="w-full bg-transparent px-5 py-2.5 sm:py-3 text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 font-sans focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitted}
                  className="shrink-0 bg-[#ed1438] hover:bg-[#d01030] text-white text-xs sm:text-sm font-medium px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-red-600/30 active:scale-95 disabled:opacity-80 cursor-pointer uppercase tracking-wider font-sans"
                >
                  {submitted ? "Joined!" : "Join with Music"}
                </button>
              </div>
              {submitted && (
                <p className="mt-3 text-xs text-[#ed1438] font-mono tracking-wide transition-opacity animate-fade-in text-center md:text-left pl-4">
                  Thanks for joining! We&apos;ll be in touch soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Giant Bottom Brand Name Section with Interactive Light Red TextPressure in Roboto Flex */}
      <div className="relative w-full mt-14 sm:mt-20 md:mt-24 pt-4 overflow-hidden">
        {/* Meladine Text in Very Light Red */}
        <div className="w-full h-[180px] sm:h-[260px] md:h-[340px] lg:h-[400px] relative flex items-end justify-center">
          <div className="w-full px-2 sm:px-6 -mb-6 sm:-mb-10 md:-mb-14">
            <TextPressure
              text="Meladine"
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic={false}
              textColor="#ffd6dc"
              strokeColor="#ffd6dc"
              minFontSize={48}
            />
          </div>
        </div>
      </div>

      {/* Ultra-minimal bottom metadata bar */}
      <div className="w-full border-t border-neutral-100 py-6 px-6 sm:px-10 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 text-xs font-mono text-neutral-400">
          <div>&copy; {new Date().getFullYear()} MELADINE ARCHIVE. ALL RIGHTS RESERVED.</div>

          {/* Social Icons with Permanent Official Brand Colors: Facebook, Instagram, Spotify (in middle), YouTube, TikTok */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Facebook (Official Blue Circle Badge) */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:scale-115 transition-transform p-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#1877F2"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>

            {/* Instagram (Official Multi-Color Gradient) */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:scale-115 transition-transform p-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <radialGradient id="ig-grad-fixed" cx="20%" cy="105%" r="115%">
                  <stop offset="0%" stopColor="#fdf497" />
                  <stop offset="10%" stopColor="#fdf497" />
                  <stop offset="45%" stopColor="#fd5949" />
                  <stop offset="60%" stopColor="#d6249f" />
                  <stop offset="90%" stopColor="#285AEB" />
                </radialGradient>
                <path
                  fill="url(#ig-grad-fixed)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>

            {/* Spotify (Official Vibrant Green) */}
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="hover:scale-115 transition-transform p-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#1ED760"
                  d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.215.353-.674.464-1.027.249-2.813-1.718-6.353-2.107-10.523-1.155-.403.092-.806-.16-.898-.563-.092-.403.16-.806.563-.898 4.567-1.043 8.479-.603 11.636 1.339.353.216.464.675.249 1.028zm1.47-3.264c-.27.44-.847.579-1.287.309-3.22-1.979-8.129-2.551-11.938-1.394-.495.15-1.023-.134-1.173-.629-.15-.495.134-1.023.629-1.173 4.356-1.322 9.775-.681 13.46 1.584.44.27.579.847.309 1.303zm.126-3.41c-3.861-2.293-10.231-2.505-13.914-1.387-.591.179-1.218-.16-1.398-.752-.179-.591.16-1.218.752-1.397 4.234-1.286 11.272-1.041 15.698 1.587.531.315.704 1.002.389 1.533-.315.531-1.002.704-1.527.416z"
                />
              </svg>
            </a>

            {/* YouTube (Official Red Badge with White Play Icon) */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:scale-115 transition-transform p-1"
            >
              <svg className="w-5 h-4" viewBox="0 0 24 24">
                <path
                  fill="#FF0000"
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
                />
                <polygon fill="#FFFFFF" points="9.545,15.568 15.818,12 9.545,8.432" />
              </svg>
            </a>

            {/* TikTok (Official Color Chromatic Offset Effect) */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:scale-115 transition-transform p-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                {/* Cyan Layer */}
                <path
                  fill="#25F4EE"
                  d="M13.5 1.5c1.3-.02 2.6-.01 3.9-.02.08 1.5.6 3.1 1.75 4.17 1.1 1.1 2.7 1.6 4.24 1.8v3.5c-1.44-.05-2.9-.35-4.2-.97-.57-.26-1.1-.6-1.62-.93-.01 2.9.01 5.8-.02 8.75-.08 1.4-.54 2.8-1.35 3.94-1.3 1.9-3.6 3.2-5.9 3.2-1.4.08-2.9-.3-4.1-1-2-1.2-3.4-3.4-3.65-5.7-.02-.5-.03-1-.01-1.5.18-1.9 1.1-3.7 2.6-5 1.6-1.4 4-2.1 6.1-1.7v4c-1-.3-2.1-.2-3 .4-.6.4-1.1 1-1.4 1.7-.2.5-.2 1.1-.1 1.6.2 1.6 1.8 2.9 3.5 2.8 1.5 0 2.7-1.1 3-2.5.1-.5.2-1.1.2-1.6V1.5z"
                  opacity="0.8"
                />
                {/* Red/Magenta Layer */}
                <path
                  fill="#FE2C55"
                  d="M12.5 0c1.3-.02 2.6-.01 3.9-.02.08 1.5.6 3.1 1.75 4.17 1.1 1.1 2.7 1.6 4.24 1.8v3.5c-1.44-.05-2.9-.35-4.2-.97-.57-.26-1.1-.6-1.62-.93-.01 2.9.01 5.8-.02 8.75-.08 1.4-.54 2.8-1.35 3.94-1.3 1.9-3.6 3.2-5.9 3.2-1.4.08-2.9-.3-4.1-1-2-1.2-3.4-3.4-3.65-5.7-.02-.5-.03-1-.01-1.5.18-1.9 1.1-3.7 2.6-5 1.6-1.4 4-2.1 6.1-1.7v4c-1-.3-2.1-.2-3 .4-.6.4-1.1 1-1.4 1.7-.2.5-.2 1.1-.1 1.6.2 1.6 1.8 2.9 3.5 2.8 1.5 0 2.7-1.1 3-2.5.1-.5.2-1.1.2-1.6V0z"
                  opacity="0.8"
                />
                {/* Black Overlay */}
                <path
                  fill="#000000"
                  d="M13 0.8c1.3-.02 2.6-.01 3.9-.02.08 1.5.6 3.1 1.75 4.17 1.1 1.1 2.7 1.6 4.24 1.8v3.5c-1.44-.05-2.9-.35-4.2-.97-.57-.26-1.1-.6-1.62-.93-.01 2.9.01 5.8-.02 8.75-.08 1.4-.54 2.8-1.35 3.94-1.3 1.9-3.6 3.2-5.9 3.2-1.4.08-2.9-.3-4.1-1-2-1.2-3.4-3.4-3.65-5.7-.02-.5-.03-1-.01-1.5.18-1.9 1.1-3.7 2.6-5 1.6-1.4 4-2.1 6.1-1.7v4c-1-.3-2.1-.2-3 .4-.6.4-1.1 1-1.4 1.7-.2.5-.2 1.1-.1 1.6.2 1.6 1.8 2.9 3.5 2.8 1.5 0 2.7-1.1 3-2.5.1-.5.2-1.1.2-1.6V0.8z"
                />
              </svg>
            </a>
          </div>

          {/* Designed and Developed By with Heart Icon */}
          <div className="flex items-center gap-1.5 text-neutral-400">
            <span>DESIGNED &amp; DEVELOPED BY</span>
            <span className="inline-flex items-center gap-1 font-semibold text-neutral-800 hover:text-[#ed1438] transition-colors cursor-default">
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 fill-[#ed1438] inline-block animate-pulse drop-shadow-[0_0_6px_rgba(237,20,56,0.5)]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>ALCHEMY</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
