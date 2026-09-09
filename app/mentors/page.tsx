import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import MentorsHeader from "@/components/mentors/MentorsHeader";
import FeaturedMentor from "@/components/mentors/FeaturedMentor";

export const metadata: Metadata = {
  title: "Mentors — Meladine Sound Collective",
  description: "Meet the resident artists, modular masters, and acoustic engineers leading Meladine sound residencies.",
};

export default function MentorsPage() {
  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24">
      {/* Header Block with Unique Elastic Letter Pop-up Animation */}
      <MentorsHeader />

      {/* Featured Mentor Showcase Section (Saliya Illangasinghe) - Full Width */}
      <FeaturedMentor />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">

        {/* Music Academy Contact CTA Banner */}
        <div className="pt-6 sm:pt-8 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 sm:p-14 rounded-3xl bg-neutral-950 text-white">
          <div>
            <span className="text-xs font-mono text-[#ed1438] uppercase tracking-widest font-bold">
              ADMISSIONS &amp; LESSON INQUIRIES
            </span>
            <h2 className="text-4xl sm:text-6xl font-display uppercase mt-2">
              START YOUR MUSICAL JOURNEY
            </h2>
            <p className="text-sm text-neutral-400 mt-3 max-w-xl font-normal leading-relaxed">
              Join Meladine Conservatory for personalized guitar, vocal, and keyboard lessons. Connect with our faculty and book your introductory consultation.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-white text-black text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] hover:text-white transition-all shrink-0 shadow-lg active:scale-95 cursor-pointer"
          >
            Contact Us &rarr;
          </Link>
        </div>

      </div>
    </div>
  );
}
