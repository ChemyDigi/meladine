"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  onOpenMenu: () => void;
  isMenuOpen: boolean;
}

export default function Navbar({ onOpenMenu, isMenuOpen }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-transparent transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-6 md:py-8 flex items-center justify-between">
        
        {/* Top Left: Logo & Brand Name */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg"
          aria-label="Meladine Home"
        >
          <div className="relative h-9 md:h-11 w-7 md:w-9 flex items-center shrink-0">
            <Image
              src="/images/LOGO.png"
              alt="Meladine Logo"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <span className="font-display text-2xl md:text-3xl tracking-wider text-neutral-950 select-none">
            MELADINE
          </span>
        </Link>

        {/* Right Side: Contact Us CTA & Hamburger Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Contact Us CTA Button */}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-black/90 bg-white/80 backdrop-blur-xs text-xs md:text-sm font-semibold tracking-wider uppercase text-black hover:bg-black hover:text-white transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
            id="nav-contact-cta"
          >
            Contact Us
          </Link>

          {/* Hamburger Menu Toggle Button */}
          <button
            type="button"
            onClick={onOpenMenu}
            className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/80 bg-white/80 backdrop-blur-xs text-black hover:bg-black hover:text-white transition-all duration-300 shadow-xs hover:shadow-md active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
            aria-label="Open Navigation Menu"
            aria-expanded={isMenuOpen}
            aria-controls="curtain-navigation-overlay"
            id="nav-hamburger-btn"
          >
            <div className="w-5 h-3.5 flex flex-col justify-between items-center">
              <span className="w-full h-0.5 bg-current rounded-full transition-all duration-300 group-hover:translate-x-0.5" />
              <span className="w-full h-0.5 bg-current rounded-full transition-all duration-300" />
              <span className="w-3/4 self-end h-0.5 bg-current rounded-full transition-all duration-300 group-hover:w-full" />
            </div>
          </button>
        </div>

      </div>
    </header>
  );
}
