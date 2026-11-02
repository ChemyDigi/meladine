import React from "react";
import type { Metadata } from "next";
import MentorsHeader from "@/components/mentors/MentorsHeader";
import FeaturedMentor from "@/components/mentors/FeaturedMentor";
import MentorsCta from "@/components/mentors/MentorsCta";
import FloatingNotations from "@/components/mentors/FloatingNotations";

export const metadata: Metadata = {
  title: "Mentors — Meladine Music Conservatory",
  description: "Learn directly from seasoned artists and dedicated masters across guitar, vocals, and keyboard nurturing technique, musicality, and artistic expression.",
};

export default function MentorsPage() {
  return (
    <div className="relative w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24 overflow-hidden">
      {/* Scattered Floating Musical Notations with Up/Down Animation */}
      <FloatingNotations />

      {/* Header Block with Unique Elastic Letter Pop-up Animation */}
      <MentorsHeader />

      {/* Featured Mentor Showcase Section (Saliya Illangasinghe) - Full Width */}
      <FeaturedMentor />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Music Academy Contact CTA Banner with Scroll Reveal */}
        <MentorsCta />
      </div>
    </div>
  );
}
