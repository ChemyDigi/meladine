"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Residency Application",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  const studios = [
    { city: "BERLIN", address: "Kraftwerk Annex, Köpenicker Str. 70", coords: "52°30'38\"N 13°25'08\"E", email: "berlin@meladine.com" },
    { city: "COLOMBO", address: "Warehouse 7, District Docks", coords: "6°55'55\"N 79°51'52\"E", email: "colombo@meladine.com" },
    { city: "TOKYO", address: "The Substation, Shibuya-ku", coords: "35°39'36\"N 139°42'02\"E", email: "tokyo@meladine.com" },
    { city: "LONDON", address: "The Arch Residency, Bermondsey", coords: "51°29'56\"N 0°04'30\"W", email: "london@meladine.com" },
  ];

  return (
    <div className="w-full bg-white text-neutral-900 pt-32 sm:pt-40 pb-24 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-neutral-200 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 text-xs font-mono tracking-widest text-[#ed1438] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ed1438]" />
            DISPATCH // TRANSMISSION PORTAL
          </div>
          <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display uppercase tracking-tight text-black leading-[0.88]">
            CONTACT US
          </h1>
          <p className="mt-8 text-xl sm:text-2xl md:text-3xl font-light text-neutral-800 max-w-4xl leading-snug">
            Direct channels for residency applications, live event bookings, press inquiries, and acoustic collaborations.
          </p>
        </div>

        {/* Main Form & Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-20 border-b border-neutral-200">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-12">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold block mb-3">
                // DIRECT INQUIRIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-display uppercase text-black">
                WE RECEIVE ALL TRANSMISSIONS
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed font-normal">
                Whether you are seeking artist booking availability, applying for a modular residency, or proposing venue acoustic integration, our collective responds within 48 hours.
              </p>

              <div className="mt-10 flex flex-col gap-6 font-mono text-sm">
                <div>
                  <span className="text-xs text-neutral-400 uppercase block">GENERAL COLLECTIVE DISPATCH</span>
                  <a
                    href="mailto:hello@meladine.com"
                    className="text-xl font-display uppercase text-black hover:text-[#ed1438] transition-colors"
                  >
                    hello@meladine.com
                  </a>
                </div>

                <div>
                  <span className="text-xs text-neutral-400 uppercase block">BOOKINGS &amp; TOURS</span>
                  <a
                    href="mailto:bookings@meladine.com"
                    className="text-xl font-display uppercase text-black hover:text-[#ed1438] transition-colors"
                  >
                    bookings@meladine.com
                  </a>
                </div>

                <div>
                  <span className="text-xs text-neutral-400 uppercase block">DIRECT STUDIO PHONE</span>
                  <a
                    href="tel:+905443237623"
                    className="text-xl font-display uppercase text-black hover:text-[#ed1438] transition-colors"
                  >
                    +90 544 323 7623
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-500">
              <span className="text-neutral-900 font-semibold block mb-1">DATA ENCRYPTION</span>
              All submissions are routed directly through secure dispatch terminals. No commercial newsletters or spam transmissions.
            </div>
          </div>

          {/* Right Column: Interactive Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 border border-neutral-200 shadow-xs">
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-display">
                    ✓
                  </div>
                  <h3 className="text-4xl font-display uppercase text-black">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-neutral-600 font-mono text-sm mt-3 max-w-md mx-auto">
                    Thank you, {formData.name}. Your dispatch regarding &quot;{formData.category}&quot; has been logged in our studio queue. We will respond shortly to {formData.email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", category: "Residency Application", message: "" });
                    }}
                    className="mt-8 px-6 py-3 rounded-full border border-black text-xs font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-600 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-600 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm text-neutral-900 placeholder:text-neutral-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-2">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm text-neutral-900 cursor-pointer"
                    >
                      <option>Residency Application</option>
                      <option>Event Booking &amp; Live Sets</option>
                      <option>Acoustic Studio Hire</option>
                      <option>Press &amp; Media Requests</option>
                      <option>General Sound Transmission</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-600 mb-2">
                      Message / Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Include your portfolio, soundcloud links, room specifications, or event dates..."
                      className="w-full px-4 py-3.5 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm text-neutral-900 placeholder:text-neutral-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#ed1438] transition-all duration-300 active:scale-98 shadow-sm cursor-pointer"
                  >
                    Send Transmission &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Global Studio Locations Grid */}
        <div className="pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#ed1438] uppercase font-bold">
                // PHYSICAL LABS &amp; RESIDENCIES
              </span>
              <h2 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-black mt-2">
                STUDIO DIRECTORY
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">WORLDWIDE ACCESS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studios.map((st) => (
              <div
                key={st.city}
                className="p-6 rounded-2xl border border-neutral-200 bg-white hover:border-black transition-all duration-300"
              >
                <div className="text-xs font-mono text-[#ed1438] uppercase font-bold">
                  {st.city} CHAPTER
                </div>
                <h3 className="text-2xl font-display uppercase text-black mt-2">
                  {st.address}
                </h3>
                <div className="text-xs font-mono text-neutral-400 mt-2">
                  {st.coords}
                </div>
                <div className="mt-4 pt-4 border-t border-neutral-100">
                  <a
                    href={`mailto:${st.email}`}
                    className="text-xs font-mono text-neutral-800 hover:text-[#ed1438] transition-colors"
                  >
                    {st.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
