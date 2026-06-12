import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SATHWIK VASU // CREATIVE DEVELOPER & PROBLEM SOLVER",
  description: "Sathwik Vasu's portfolio. Inspired by Nike's bold, athletic, high-contrast editorial aesthetic. Built with Next.js and canvas scroll sequence scrubbing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable} antialiased`}>
      <body className="bg-black text-white selection:bg-[#FF5000] selection:text-white">
        {children}
      </body>
    </html>
  );
}
