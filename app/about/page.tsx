import React from "react";
import type { Metadata } from "next";
import AboutTimelineSection from "@/components/about/AboutTimelineSection";
import AboutHeader from "@/components/about/AboutHeader";
import DriftWallSection from "@/components/about/DriftWallSection";

export const metadata: Metadata = {
  title: "About — Meladine Sound Collective",
  description: "Learn about Meladine, our underground electronic sound manifesto, acoustic laboratories, and global creative chapters.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24 px-6 sm:px-10 lg:px-14">
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

