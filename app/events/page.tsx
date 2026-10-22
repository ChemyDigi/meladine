import React from "react";
import type { Metadata } from "next";
import EventsHero from "@/components/events/EventsHero";
import EventsSharedSection from "@/components/events/EventsSharedSection";
import UpcomingEventsSection from "@/components/events/UpcomingEventsSection";

export const metadata: Metadata = {
  title: "Events & Live Sessions — Meladine",
  description:
    "Live sessions, showcases, workshops and performances at Meladine. A stage for learning, sharing and real musical experiences beyond the classroom.",
};

export default function EventsPage() {
  return (
    <div className="w-full bg-white text-neutral-900">
      {/* Hero Section */}
      <EventsHero />

      {/* Events We've Shared Showcase Section */}
      <EventsSharedSection />

      {/* Upcoming Events, Calendar & Pass Reservations */}
      <UpcomingEventsSection />
    </div>
  );
}
