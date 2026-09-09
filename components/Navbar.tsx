"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export default function Navbar({ isMenuOpen, onToggleMenu }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-transparent transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-6 md:py-8 flex items-center justify-between">
        
        {/* Top Left: Scaled-up Logo (Hidden when menu is open) */}
        <Link
          href="/"
          onClick={() => {
            if (isMenuOpen) onToggleMenu();
          }}
          className={`group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg transition-all duration-300 ${
            isMenuOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
          }`}
          aria-label="Meladine Home"
        >
          <div className="relative h-14 sm:h-16 md:h-20 w-10 sm:w-12 md:w-15 flex items-center shrink-0">
            <Image
              src="/images/LOGO.png"
              alt="Meladine Logo"
              fill
              className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Right Side: Contact Us CTA & Hamburger / Close Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Contact Us CTA Button (Hidden when menu is open) */}
          <Link
            href="/contact"
            onClick={() => {
              if (isMenuOpen) onToggleMenu();
            }}
            className={`inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-black/90 bg-white/80 backdrop-blur-xs text-xs md:text-sm font-semibold tracking-wider uppercase text-black hover:bg-black hover:text-white transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 cursor-pointer ${
              isMenuOpen ? "opacity-0 pointer-events-none scale-95" : "opacity-100 scale-100"
            }`}
            id="nav-contact-cta"
          >
            Contact Us
          </Link>

          {/* Menu Toggle Button: Always a circle (rounded-full) */}
          <button
            type="button"
            onClick={onToggleMenu}
            className={`group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 focus:outline-none cursor-pointer ${
              isMenuOpen
                ? "bg-black text-white hover:bg-neutral-900 border border-black focus-visible:ring-2 focus-visible:ring-white"
                : "border border-black/80 bg-white/80 backdrop-blur-xs text-black hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-black"
            }`}
            aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="curtain-navigation-overlay"
            id="nav-hamburger-btn"
          >
            {isMenuOpen ? (
              /* Close 'X' Icon */
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 rotate-0 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              /* Hamburger Icon */
              <div className="w-5 h-3.5 flex flex-col justify-between items-center">
                <span className="w-full h-0.5 bg-current rounded-full transition-all duration-300 group-hover:translate-x-0.5" />
                <span className="w-full h-0.5 bg-current rounded-full transition-all duration-300" />
                <span className="w-3/4 self-end h-0.5 bg-current rounded-full transition-all duration-300 group-hover:w-full" />
              </div>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
