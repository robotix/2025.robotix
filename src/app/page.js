"use client";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainRef = useRef(null);

    useGSAP(() => {
        // Enable smooth scrolling
        const ctx = gsap.context(() => {
            // Smooth scroll effect
            gsap.to(mainRef.current, {
                ease: "power3.out"
            });
        }, mainRef);

        return () => ctx.revert();
    }, { scope: mainRef });

    useEffect(() => {
        // Smooth scroll using CSS
        const smoothScrollHandler = (e) => {
            e.preventDefault();
            const target = e.deltaY;
            window.scrollBy({
                top: target,
                behavior: "smooth"
            });
        };

        // For smoother experience
        let isScrolling = false;
        const handleWheel = (e) => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    window.scrollBy({
                        top: e.deltaY * 0.5,
                        behavior: "auto"
                    });
                    isScrolling = false;
                });
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        
        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <>
            <main ref={mainRef} className="relative">
                <div className="h-screen relative">
                    <video
                        className="video-bg object-cover w-full h-full absolute top-0 left-0 -z-10"
                        src="/bg_video4.mp4"
                        autoPlay
                        loop
                        muted
                    />
                    <div className="h-screen absolute top-0 left-0 w-full">
                        <div className="absolute left-9 w-[1px] top-0 h-full bg-[rgb(66,68,83)]"></div>
                        <div className="absolute right-9 w-[1px] top-0 h-full bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-9 left-0 right-0 h-[1px] bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-9 left-9 h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
                        <div className="absolute bottom-9 left-9 h-3 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2"></div>
                        <div className="absolute bottom-9 right-9 h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
                        <div className="absolute bottom-9 right-9 h-3 w-[1.5px] bg-[#b7b9c5] translate-x-1/2 translate-y-1/2"></div>
                    </div>
                </div>
                <div className="min-h-screen w-full"></div>
                <div className="min-h-screen w-full"></div>
            </main>
        </>
    );
}
