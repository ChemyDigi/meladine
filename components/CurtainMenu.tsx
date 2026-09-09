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
  { label: "EVENTS", href: "/events" },
  { label: "MENTORS", href: "/mentors" },
  { label: "CONTACT", href: "/contact" },
];

export default function CurtainMenu({ isOpen, onClose }: CurtainMenuProps) {
  // Lock body scroll and listen for ESC key when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
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
      className={`fixed inset-0 z-40 overflow-hidden select-none transition-[visibility,opacity] duration-500 ${
        isOpen
          ? "visible opacity-100 pointer-events-auto"
          : "invisible opacity-0 pointer-events-none delay-500"
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
              className="flex-1 h-full bg-[#ed1438] will-change-transform"
              style={{
                transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
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
        Fades and slides smoothly into view once curtain begins dropping
      */}
      <div
        className={`relative z-10 w-full h-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 pt-28 sm:pt-32 pb-6 md:pb-8 transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0 delay-200" : "opacity-0 -translate-y-4 delay-0"
        }`}
      >
        {/* Top spacer to preserve alignment with the fixed top navbar */}
        <div className="w-full max-w-7xl mx-auto h-4" aria-hidden="true" />

        {/* 
          CENTER NAVIGATION LINKS
          Bold condensed typography matching reference image:
          HOME, ABOUT, EVENTS, MENTORS, CONTACT
        */}
        <div className="flex-1 flex flex-col items-center justify-center my-auto">
          <nav aria-label="Main Curtain Navigation" className="w-full text-center">
            <ul className="flex flex-col items-center justify-center gap-1 sm:gap-2 md:gap-3">
              {NAV_LINKS.map((link, idx) => {
                const linkDelay = isOpen ? 200 + idx * 50 : 0;
                return (
                  <li
                    key={link.label}
                    className="overflow-hidden"
                    style={{
                      transitionDelay: `${linkDelay}ms`,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group block py-1 px-4 text-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-normal tracking-tight uppercase transition-all duration-300 hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
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
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-center gap-4 sm:gap-10 text-xs sm:text-sm font-medium text-black/90 pb-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Instagram
          </a>
          <span className="hidden sm:inline text-black/30">•</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            LinkedIn
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
