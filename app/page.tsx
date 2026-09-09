"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CurtainMenu from "@/components/CurtainMenu";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Events from "@/components/home/Events";
import Mentors from "@/components/home/Mentors";
import Contact from "@/components/home/Contact";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white text-neutral-900 selection:bg-[#ed1438] selection:text-white">
      {/* Top Navigation Bar with Transparent Background */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        isMenuOpen={isMenuOpen}
      />

      {/* Fullscreen Curtain Menu Overlay (#ed1438) with Top-to-Bottom Curtain Drop */}
      <CurtainMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <main className="w-full bg-white">
        {/* Full White Home Page Hero Section */}
        <Hero />

        {/* Home Sections */}
        <About />
        <Events />
        <Mentors />
        <Contact />
      </main>

      {/* Common Minimal White Footer */}
      <Footer />
    </div>
  );
}
