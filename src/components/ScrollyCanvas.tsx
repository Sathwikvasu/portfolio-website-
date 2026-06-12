"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const NUM_FRAMES = 60;

const pad = (num: number) => String(num).padStart(2, "0");

interface ScrollyCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollyCanvas({ containerRef }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Store the active index in a mutable ref to draw synchronously on resize and scroll
  const currentFrameRef = useRef(0);

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const preloadImages = async () => {
      const loadPromises = Array.from({ length: NUM_FRAMES }).map((_, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = `/sequence/frame_${pad(index)}.webp`;
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / NUM_FRAMES) * 100));
            resolve(img);
          };
          img.onerror = () => {
            console.error(`Failed to load frame ${index}`);
            reject();
          };
          loadedImages[index] = img;
        });
      });

      try {
        await Promise.all(loadPromises);
        setImages(loadedImages);
        // Add a micro-delay for smooth luxury transition out of loading state
        setTimeout(() => setIsLoaded(true), 800);
      } catch (err) {
        console.error("Error loading sequence frames", err);
      }
    };

    preloadImages();
  }, []);

  // Frame rendering function (optimized to avoid React re-render cycles)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    const img = images[index];
    if (!ctx || !img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    // Calculate aspect ratios
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let drawX = 0;
    let drawY = 0;

    // Simulate object-fit: cover
    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      drawY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      drawX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  // Track page scroll to scrub sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;
    
    // Map scroll percentage (0 to 1) to frame indices (0 to 59)
    const frameIndex = Math.min(
      NUM_FRAMES - 1,
      Math.max(0, Math.floor(latest * NUM_FRAMES))
    );

    if (currentFrameRef.current !== frameIndex) {
      currentFrameRef.current = frameIndex;
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  });

  // Handle Resize and Initial Render
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }

      renderFrame(currentFrameRef.current);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Trigger once when loaded

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images]);

  return (
    <>
      {/* Nike Premium Minimalist Loader Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="flex flex-col items-start space-y-4 max-w-md w-full px-8">
            <span className="font-sans text-white/50 text-[10px] tracking-[0.3em] uppercase font-bold">
              SATHWIK VASU // GRAPHICS PRELOAD
            </span>
            <div className="font-display font-normal text-8xl md:text-[10rem] text-[#FF5000] tracking-tighter leading-none select-none">
              {String(loadingProgress).padStart(2, "0")}
            </div>
            <div className="w-full bg-white/10 h-[2px] relative overflow-hidden">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-[#FF5000] transition-all duration-300 ease-out" 
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="font-sans text-white/40 text-[9px] tracking-wider uppercase">
              STATUS: PREPARING GRAPHICS SEQUENCE // {loadingProgress}%
            </span>
          </div>
        </div>
      )}

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full block object-cover opacity-80" 
        />
        {/* Subtle dark gradient overlay for depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/75" />
      </div>
    </>
  );
}
