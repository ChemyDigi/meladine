"use client";

import React from "react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-full bg-white py-24 sm:py-32 px-6 sm:px-10 lg:px-14 border-t border-neutral-100"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6">
            <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
              04 CONNECT
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-display uppercase tracking-tight text-black mt-2">
              CONTACT US
            </h2>
            <p className="mt-6 text-neutral-600 max-w-md leading-relaxed text-sm md:text-base">
              For bookings, studio inquiries, mentorship applications, or press requests, connect directly with our collective dispatch.
            </p>

            <div className="mt-10 flex flex-col gap-4 font-mono text-sm">
              <div>
                <span className="text-neutral-400 block text-xs">DIRECT INQUIRIES</span>
                <a href="mailto:hello@meladine.com" className="text-lg font-semibold text-black hover:text-[#ed1438] transition-colors">
                  hello@meladine.com
                </a>
              </div>
              <div>
                <span className="text-neutral-400 block text-xs">STUDIO PHONE</span>
                <span className="text-base text-neutral-800">+90 544 323 7623</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-xs">HEADQUARTERS</span>
                <span className="text-base text-neutral-800">Colombo &bull; Berlin &bull; Worldwide</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-10 rounded-2xl bg-neutral-50 border border-neutral-200">
            <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-600 mb-2">Message / Inquiry</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project or event..."
                  className="w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-black text-white text-xs md:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 active:scale-98 shadow-sm cursor-pointer"
              >
                Send Transmission
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
