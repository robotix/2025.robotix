"use client";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainRef = useRef(null);
    const logoRef = useRef(null);
    const videoRef = useRef(null);
    const gridRef = useRef(null);
    const textRef = useRef(null);
    const [gridCells, setGridCells] = useState([]);
    const [displayText1, setDisplayText1] = useState("");
    const [displayText2, setDisplayText2] = useState("");

    const finalText1 = "Technology Robotix Society";
    const finalText2 = "Where machines dare !!";

    useGSAP(
        () => {
            // Enable smooth scrolling
            const ctx = gsap.context(() => {
                // Smooth scroll effect
                gsap.to(mainRef.current, {
                    ease: "power3.out",
                });

                // Logo animations
                const timeline = gsap.timeline({ repeat: -1 });

                // Subtle rotation
                timeline.to(logoRef.current, {
                    rotation: 360,
                    duration: 20,
                    ease: "none",
                });

                // Glowing effect using filter
                gsap.to(logoRef.current, {
                    filter: "drop-shadow(0 0 8px rgba(57, 183, 242, 0.3))",
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });

                // Subtle scale pulsing
                gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });

                // Animate grid cells to transparent randomly
                if (gridRef.current) {
                    const cells = Array.from(gridRef.current.children);
                    const shuffledCells = [...cells].sort(() => Math.random() - 0.5);
                    
                    gsap.to(shuffledCells, {
                        backgroundColor: "transparent",
                        duration: 0.3,
                        stagger: {
                            each: 0.008,
                            from: "random",
                        },
                        ease: "power2.out",
                    });
                }
            }, mainRef);

            return () => ctx.revert();
        },
        { scope: mainRef, dependencies: [gridCells] }
    );

    useEffect(() => {
        // Text scramble effect for both lines in parallel
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iteration1 = 0;
        let iteration2 = 0;
        
        const scrambleInterval = setInterval(() => {
            // First line scramble
            setDisplayText1(() => 
                finalText1
                    .split("")
                    .map((char, index) => {
                        if (index < iteration1) {
                            return finalText1[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            // Second line scramble
            setDisplayText2(() => 
                finalText2
                    .split("")
                    .map((char, index) => {
                        if (index < iteration2) {
                            return finalText2[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration1 >= finalText1.length && iteration2 >= finalText2.length) {
                clearInterval(scrambleInterval);
            }

            iteration1 += 1 / 3;
            iteration2 += 1 / 3;
        }, 10);

        return () => clearInterval(scrambleInterval);
    }, []);

    useEffect(() => {
        // Set video playback speed to 0.5x
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }

        // Calculate grid cells
        const calculateGrid = () => {
            if (!gridRef.current) return;
            
            const containerWidth = gridRef.current.offsetWidth;
            const containerHeight = gridRef.current.offsetHeight;
            
            const columns = 10;
            const cellSize = containerWidth / columns;
            const rows = Math.ceil(containerHeight / cellSize);
            
            const cells = [];
            for (let i = 0; i < rows * columns; i++) {
                cells.push(i);
            }
            
            setGridCells(cells);
            gridRef.current.classList.add("bg-transparent");
        };

        calculateGrid();
        window.addEventListener('resize', calculateGrid);

        // Smooth scroll using CSS
        const smoothScrollHandler = (e) => {
            e.preventDefault();
            const target = e.deltaY;
            window.scrollBy({
                top: target,
                behavior: "smooth",
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
                        behavior: "auto",
                    });
                    isScrolling = false;
                });
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener('resize', calculateGrid);
        };
    }, []);

    return (
        <>
            <main ref={mainRef} className="relative">
                <div className="h-screen relative">
                    <video
                        ref={videoRef}
                        className="video-bg object-cover w-full h-full absolute top-0 left-0 -z-10"
                        src="/bg_video2.mp4"
                        autoPlay
                        loop
                        muted
                    />
                    <div className="z-20 h-screen absolute top-0 left-0 w-full p-16 flex items-end justify-between">
                        <div className="absolute left-9 w-[1px] top-0 h-full bg-[rgb(66,68,83)]"></div>
                        <div className="absolute right-9 w-[1px] top-0 h-full bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-9 left-0 right-0 h-[1px] bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-9 left-9 h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
                        <div className="absolute bottom-9 left-9 h-3 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2"></div>
                        <div className="absolute bottom-9 right-9 h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
                        <div className="absolute bottom-9 right-9 h-3 w-[1.5px] bg-[#b7b9c5] translate-x-1/2 translate-y-1/2"></div>

                        <div ref={textRef} className="mb-6 font-family-grotesk text-5xl text-[#e9ede5] leading-14">
                            {displayText1}
                            <br />
                            {displayText2}
                        </div>
                        <Image
                            ref={logoRef}
                            src="/logo.png"
                            alt="Robotix Logo"
                            width={175}
                            height={175}
                            className="mb-6"
                        />
                    </div>
                    <div 
                        ref={gridRef}
                        className="z-10 h-screen absolute top-0 left-0 w-full overflow-hidden grid grid-cols-10 bg-[#0b0b0e]"
                        style={{ 
                            gridAutoRows: `${gridRef.current ? gridRef.current.offsetWidth / 10 : 0}px` 
                        }}
                    >
                        {gridCells.map((cell) => (
                            <div
                                key={cell}
                                className="bg-[#0b0b0e] aspect-square"
                            />
                        ))}
                    </div>
                </div>
                <div className="min-h-screen w-full bg-[#0b0b0e]"></div>
            </main>
        </>
    );
}
