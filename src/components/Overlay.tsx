"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface OverlayProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function Overlay({ containerRef }: OverlayProps) {
  // Bind scroll transitions to the parent 500vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Section 1: Center Aligned (0% to 25% scroll range)
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -150]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.23], [1, 1, 0]);

  // Section 2: Left Aligned (25% to 55% scroll range)
  const y2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.53], [150, 0, 0, -150]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.53], [0, 1, 1, 0]);

  // Section 3: Right Aligned (55% to 85% scroll range)
  const y3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.83], [150, 0, 0, -150]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.83], [0, 1, 1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      
      {/* SECTION 1: Center Aligned (0%) */}
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-center px-6"
      >
        <div className="max-w-6xl space-y-6">
          <span className="font-sans text-[#FF5000] text-xs md:text-sm tracking-[0.4em] uppercase block font-black">
            CREATIVE PORTFOLIO // MMXXVI
          </span>
          
          <h1 className="font-display font-normal text-7xl md:text-[11rem] lg:text-[14rem] text-white tracking-tighter uppercase leading-[0.8] select-none">
            SATHWIK VASU
          </h1>
          
          <p className="font-sans text-white text-xs md:text-sm tracking-[0.25em] uppercase font-bold">
            Creative Developer &amp; Problem Solver
          </p>
          
          {/* Subtle line decoration */}
          <div className="w-16 h-[2px] bg-[#FF5000] mx-auto my-4" />
          
          {/* Scroll prompt indicator */}
          <div className="pt-16 flex flex-col items-center space-y-3">
            <span className="font-sans text-white/40 text-[9px] tracking-[0.3em] uppercase animate-pulse font-bold">
              SCROLL TO SCRUB
            </span>
            <div className="w-[1px] h-16 bg-[#FF5000]" />
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: Left Aligned (30%) */}
      <motion.div
        style={{ y: y2, opacity: opacity2 }}
        className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center px-8 md:px-24 max-w-4xl mr-auto"
      >
        <div className="space-y-6">
          <span className="font-sans text-[#FF5000] text-[10px] md:text-xs tracking-[0.3em] uppercase font-black">
            01 // ATHLETIC ENGINE
          </span>
          
          <h2 className="font-display font-normal text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-[0.85] select-none">
            SPEED AND <br />
            STABILITY.
          </h2>
          
          <div className="w-24 h-[4px] bg-[#FF5000]" />
          
          <p className="font-sans text-white/60 text-xs md:text-sm max-w-md leading-relaxed tracking-wide font-light">
            Pushing browser performance to the threshold. Direct WebP scrubbing running on canvas bypassing typical HTML elements. Fluid, responsive, and completely optimized to execute at 60fps.
          </p>
        </div>
      </motion.div>

      {/* SECTION 3: Right Aligned (60%) */}
      <motion.div
        style={{ y: y3, opacity: opacity3 }}
        className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center px-8 md:px-24 max-w-4xl ml-auto text-right items-end"
      >
        <div className="space-y-6">
          <span className="font-sans text-[#FF5000] text-[10px] md:text-xs tracking-[0.3em] uppercase font-black">
            02 // EDITORIAL CODE
          </span>
          
          <h2 className="font-display font-normal text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter uppercase leading-[0.85] select-none">
            PRECISION IN <br />
            EVERY BLOCK.
          </h2>
          
          <div className="w-24 h-[4px] bg-[#FF5000] ml-auto" />
          
          <p className="font-sans text-white/60 text-xs md:text-sm max-w-md leading-relaxed tracking-wide font-light">
            Minimal styling, bold condensed headers, sharp rectangular grids, and strong negative space. Every line of code is structured to perform with absolute speed and reliability.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
