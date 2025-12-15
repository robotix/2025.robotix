"use client";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const mainRef = useRef(null);
    const logoRef = useRef(null);
    const videoRef = useRef(null);
    const gridRef = useRef(null);
    const textRef = useRef(null);
    const [gridCells, setGridCells] = useState([]);
    const [displayText1, setDisplayText1] = useState("");

    const finalText1 = "We believe in sharing knowledge";

    const hardwareAccel = {
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
    };

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                // Subtle rotation timeline for logo
                const timeline = gsap.timeline({ repeat: -1 });
                timeline.to(logoRef.current, {
                    rotation: 360,
                    duration: 20,
                    ease: "none",
                });

                // Glow via drop-shadow filter (no opacity change)
                gsap.to(logoRef.current, {
                    filter: "drop-shadow(0 0 8px rgba(57, 183, 242, 0.3))",
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });

                // Pulsing scale
                gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });

                // Reveal grid cells randomly to transparent
                if (gridRef.current) {
                    const cells = Array.from(gridRef.current.children);
                    const shuffled = [...cells].sort(() => Math.random() - 0.5);
                    gsap.to(shuffled, {
                        backgroundColor: "transparent",
                        duration: 0.3,
                        stagger: { each: 0.008, from: "random" },
                        ease: "power2.out",
                    });
                }
            }, mainRef);

            return () => ctx.revert();
        },
        { scope: mainRef, dependencies: [gridCells] }
    );

    useEffect(() => {
        // Parallel text scramble for two lines
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iter1 = 0;

        const id = setInterval(() => {
            setDisplayText1(
                finalText1
                    .split("")
                    .map((ch, i) =>
                        i < iter1
                            ? finalText1[i]
                            : chars[Math.floor(Math.random() * chars.length)]
                    )
                    .join("")
            );

            if (iter1 >= finalText1.length) {
                clearInterval(id);
            }

            iter1 += 1 / 3;
        }, 10);

        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (videoRef.current) videoRef.current.playbackRate = 0.5;

        const calculateGrid = () => {
            if (!gridRef.current) return;
            const w = gridRef.current.offsetWidth;
            const h = gridRef.current.offsetHeight;
            const columns = 10;
            const cellSize = w / columns;
            const rows = Math.ceil(h / cellSize);
            const cells = Array.from({ length: rows * columns }, (_, i) => i);
            setGridCells(cells);
        };

        calculateGrid();
        window.addEventListener("resize", calculateGrid);

        let isScrolling = false;
        const handleWheel = (e) => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    window.scrollBy({ top: e.deltaY * 0.5, behavior: "auto" });
                    isScrolling = false;
                });
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("resize", calculateGrid);
        };
    }, []);

    return (
        <>
            <main ref={mainRef} className="relative">
                <div className="h-screen relative">
                    <video
                        ref={videoRef}
                        className="video-bg object-cover w-full h-full absolute top-0 left-0 -z-10"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src="/teaser.mp4" type="video/mp4" />
                    </video>

                    <div className="z-20 h-screen absolute top-0 left-0 w-full p-16 flex items-center justify-center bg-black/80 flex-col">
                        <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
                        <div className="absolute right-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-9 left-0 right-0 h-px bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgb(66,68,83)]"></div>
                        <div className="absolute bottom-9 left-9 h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
                        <div className="absolute bottom-9 left-9 h-3 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2"></div>
                        <div className="absolute bottom-9 right-9 h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
                        <div className="absolute bottom-9 right-9 h-3 w-[1.5px] bg-[#b7b9c5] translate-x-1/2 translate-y-1/2"></div>

                        <div className="uppercase text-[#838698] mb-6 text-sm font-family-grotesk-mono">
                            Our mission
                        </div>
                        <div
                            ref={textRef}
                            className="mb-6 font-family-grotesk text-4xl text-[#e9ede5] leading-14"
                        >
                            {displayText1}
                        </div>
                    </div>

                    <div
                        ref={gridRef}
                        className="z-10 h-screen absolute top-0 left-0 w-full overflow-hidden grid grid-cols-10 bg-transparent"
                        style={{
                            gridAutoRows: `${
                                gridRef.current
                                    ? gridRef.current.offsetWidth / 10
                                    : 0
                            }px`,
                        }}
                    >
                        {gridCells.map((cell) => (
                            <div
                                key={cell}
                                className="bg-transparent aspect-square"
                            />
                        ))}
                    </div>
                </div>

                <div className="min-h-screen w-full bg-[#0b0b0e] relative p-16 pt-28    ">
                    <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
                    <div className="absolute right-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
                    <div className="flex justify-between items-start text-[#e9ede5]">
                        <div className="w-[30vw] font-family-grotesk text-4xl sticky top-32">
                            Who are we?
                        </div>
                        <div
                            className="w-[50vw] font-family-apk text-3xl leading-11"
                            style={hardwareAccel}
                        >
                            Technology Robotix Society (TRS) is an official
                            society under the Technology Students' Gymkhana, IIT
                            Kharagpur, dedicated to the advancement of robotics
                            and Artificial Intelligence in the campus and
                            beyond. We are a society that boasts of a dedicated
                            team which works extensively in these disciplines,
                            channeling scores of young talented minds into this
                            exciting field. With its reach expanding steadily
                            each year, TRS has cemented its position as one of
                            the nerve centres of amateur robotics in India,
                            paving the way for world-class Robotics R&D.
                        </div>
                    </div>
                    <div className="flex justify-between items-start text-[#e9ede5] mt-16">
                        <div className="w-[30vw] font-family-grotesk text-4xl sticky top-32">
                            What do we do?
                        </div>
                        <div
                            className="w-[50vw] font-family-apk text-3xl leading-11"
                            style={hardwareAccel}
                        >
                            We are involved in various initiatives throughout
                            the year, spanning the fields of software, manually
                            controlled machines, and autonomous robots. Our
                            primary agenda is to spread the culture of robotics
                            through intra and inter-collegiate workshops,
                            hackathons, and events like KRAIG. We facilitate
                            year-long theory and practical sessions where first
                            years learn to build "one-hour-robots," leading up
                            to our flagship Winterschool—hands-on sessions
                            christened as "The most productive weeks in a
                            fresher's life." Our senior members continue to take
                            robotics to avenues hitherto thought unreachable,
                            inspiring the community to better the best every
                            year.
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
