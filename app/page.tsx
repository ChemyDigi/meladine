import React from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Disciplines from "@/components/home/Disciplines";
import Mentors from "@/components/home/Mentors";

export default function HomePage() {
  return (
    <div className="w-full bg-white text-neutral-900 selection:bg-[#ed1438] selection:text-white">
      {/* Full White Home Page Hero Section */}
      <Hero />

      {/* Modular Home Sections */}
      <About />
      <Disciplines />
      <Mentors />
    </div>
  );
}
