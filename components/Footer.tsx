import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-100 py-10 px-6 sm:px-10 lg:px-14">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-400">
        <div>&copy; {new Date().getFullYear()} MELADINE ARCHIVE. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            LINKEDIN
          </a>
          <a href="mailto:hello@meladine.com" className="hover:text-black transition-colors">
            CONTACT
          </a>
          <Link href="#home" className="hover:text-black transition-colors">
            TOP &uarr;
          </Link>
        </div>
      </div>
    </footer>
  );
}
