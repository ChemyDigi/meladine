"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function MentorsCta() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const isVisible = rect.top < vh * 0.88 && rect.bottom > 60;
      setVisible((prev) => (prev !== isVisible ? isVisible : prev));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.__lenis?.on("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.__lenis?.off("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`pt-6 sm:pt-8 md:pt-10 flex flex-col md:flex-row items-center justify-between gap-8 p-10 sm:p-14 rounded-3xl bg-neutral-950 text-white transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-[0.96]"
      }`}
    >
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
        CONTACT US &rarr;
      </Link>
    </div>
  );
}
