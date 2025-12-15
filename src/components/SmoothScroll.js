// components/SmoothScroll.js
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Momentum easing
      smoothWheel: true,
      // You can add 'orientation: "vertical"' or 'gestureOrientation: "vertical"' if needed
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Add Lenis update to GSAP's ticker
    // This ensures smooth animation sync during scroll
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable GSAP lag smoothing to prevent stutter
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}