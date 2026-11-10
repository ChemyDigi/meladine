"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface CurtainMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "MENTORS", href: "/mentors" },
  { label: "EVENTS", href: "/events" },
  { label: "CONTACT", href: "/contact" },
];

export default function CurtainMenu({ isOpen, onClose }: CurtainMenuProps) {
  // Lock body scroll, pause Lenis, and listen for ESC key when menu is open
  useEffect(() => {
    if (isOpen) {
      window.__lenis?.stop();
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.__lenis?.start();
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      window.__lenis?.start();
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose]);

  const columnCount = 8;
  const columns = Array.from({ length: columnCount });

  return (
    <div
      id="curtain-navigation-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-40 overflow-hidden select-none ${isOpen
        ? "visible opacity-100 pointer-events-auto"
        : "invisible opacity-0 pointer-events-none delay-750"
        }`}
    >
      {/* 
        CURTAIN BACKGROUND PANELS (TOP TO BOTTOM ANIMATION)
        Staggered vertical blinds dropping from top to bottom like a closing curtain
      */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {columns.map((_, index) => {
          const delayMs = isOpen ? index * 35 : (columnCount - 1 - index) * 20;
          return (
            <div
              key={index}
              className="flex-1 h-full bg-[#ed1438] will-change-transform scale-x-[1.02] -mr-[1px]"
              style={{
                transform: isOpen ? "translateY(0%)" : "translateY(-101%)",
                transition: "transform 600ms cubic-bezier(0.76, 0, 0.24, 1)",
                transitionDelay: `${delayMs}ms`,
              }}
            />
          );
        })}
      </div>

      {/* 
        ARCHITECTURAL VERTICAL GRID LINES (Exact reference match)
        12 subtle vertical division lines spanning the full viewport height
      */}
      <div className="curtain-grid-columns pointer-events-none opacity-30">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="curtain-grid-col" />
        ))}
      </div>

      {/* 
        CURTAIN CONTENT LAYER
        Fits 100% of the screen in one view without scrolling
      */}
      <div
        className={`relative z-10 w-full h-full h-dvh max-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 md:pt-10 pb-1.5 sm:pb-2 overflow-hidden select-none transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0 delay-200" : "opacity-0 -translate-y-4 delay-0"
          }`}
      >
        {/* Minimal top spacer under navbar button */}
        <div className="w-full max-w-7xl mx-auto h-0.5 sm:h-1 shrink-0" aria-hidden="true" />

        {/* 
          CENTER NAVIGATION LINKS
          Even larger monumental condensed typography with wider gaps filling the screen:
          HOME, ABOUT, MENTORS, EVENTS, CONTACT
        */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto min-h-0">
          <nav aria-label="Main Curtain Navigation" className="w-full text-center">
            <ul className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3 xl:gap-3.5">
              {NAV_LINKS.map((link, idx) => {
                const linkDelay = isOpen ? 200 + idx * 50 : 0;
                return (
                  <li
                    key={link.label}
                    className="leading-none overflow-visible"
                    style={{
                      transitionDelay: `${linkDelay}ms`,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group block py-1 px-3 sm:px-4 text-black text-[clamp(2.5rem,8vh,4.5rem)] md:text-[clamp(3.3rem,13vh,12.5rem)] font-display font-normal leading-[0.86] tracking-tight uppercase transition-all duration-300 hover:text-white hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-1">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* 
          BOTTOM FOOTER CREDITS & CONTACT INFO
          Minimalist metadata matching the reference image layout
        */}
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-8 md:gap-10 text-[11px] sm:text-xs md:text-sm font-medium text-black/90 pt-1 pb-1 shrink-0">
          <a
            href="https://www.instagram.com/meladinemusic/?__pwa=1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Instagram
          </a>
          <span className="hidden sm:inline text-black/30">•</span>
          <a
            href="https://www.facebook.com/meladinemusicconservatory"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Facebook
          </a>
          <span className="hidden sm:inline text-black/30">•</span>
          <a
            href="mailto:hello@meladine.com"
            className="hover:text-white transition-colors duration-200"
          >
            hello@meladine.com
          </a>
        </div>
      </div>
    </div>
  );
}
