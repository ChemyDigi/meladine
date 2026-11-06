import React from "react";
import type { Metadata } from "next";
import AboutTimelineSection from "@/components/about/AboutTimelineSection";
import AboutHeader from "@/components/about/AboutHeader";
import DriftWallSection from "@/components/about/DriftWallSection";

export const metadata: Metadata = {
  title: "About — Meladine Sound Collective",
  description: "Living Space for Musical Discovery. Meladine Music Conservatory is an independent music education community dedicated to developing musical talent, creative expression, and artistic individuality.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24 px-6 sm:px-10 lg:px-14 overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        {/* Animated Page Header */}
        <AboutHeader />
      </div>

      {/* CD Timeline Section with clean spacing */}
      <AboutTimelineSection />

      {/* Interactive 3D DriftWall Gallery */}
      <DriftWallSection />
    </div>
  );
}

