import type { Metadata } from "next";
import { Inter, Bebas_Neue, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "600", "700"],
  variable: "--font-handwriting",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meladine — Underground Sound & Experience",
  description: "Meladine turns emotion into sound, crafting experiences beyond borders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebasNeue.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 font-sans">
        <SmoothScroll>
          <Navigation />
          <main className="flex-1 w-full bg-white">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
