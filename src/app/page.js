// app/page.js
"use client";
import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import WaveParticles from "../components/WaveParticles";
import GalleryCard from "../components/GalleryCard";
import { botsData } from "../data/bots";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const mainRef = useRef(null);
    const logoRef = useRef(null);
    const videoRef = useRef(null);
    const gridRef = useRef(null);
    const textRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const galleryRef = useRef(null);
    const galleryItemsRef = useRef([]);

    const [gridCells, setGridCells] = useState([]);
    const [displayText1, setDisplayText1] = useState("");
    const [displayText2, setDisplayText2] = useState("");

    const finalText1 = "Technology Robotix Society";
    const finalText2 = "Where machines dare !!";

    const hardwareAccel = {
        transform: "translateZ(0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
    };

    // --- GSAP Intro Animations (Unchanged) ---
    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                gsap.to(mainRef.current, { ease: "power3.out" });

                const timeline = gsap.timeline({ repeat: -1 });
                timeline.to(logoRef.current, {
                    rotation: 360,
                    duration: 20,
                    ease: "none",
                });

                gsap.to(logoRef.current, {
                    filter: "drop-shadow(0 0 8px rgba(57, 183, 242, 0.3))",
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                });

                gsap.to(logoRef.current, {
                    scale: 1.05,
                    duration: 3,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                });

                if (gridRef.current) {
                    const cells = Array.from(gridRef.current.children);
                    const shuffledCells = [...cells].sort(
                        () => Math.random() - 0.5,
                    );
                    gsap.to(shuffledCells, {
                        backgroundColor: "transparent",
                        duration: 0.3,
                        stagger: { each: 0.008, from: "random" },
                        ease: "power2.out",
                    });
                }
            }, mainRef);
            return () => ctx.revert();
        },
        { scope: mainRef, dependencies: [gridCells] },
    );

    // --- Text Scramble & Video (Unchanged) ---
    useEffect(() => {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iteration1 = 0;
        let iteration2 = 0;

        const scrambleInterval = setInterval(() => {
            setDisplayText1(() =>
                finalText1
                    .split("")
                    .map((char, index) => {
                        if (index < iteration1) return finalText1[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join(""),
            );
            setDisplayText2(() =>
                finalText2
                    .split("")
                    .map((char, index) => {
                        if (index < iteration2) return finalText2[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join(""),
            );
            if (
                iteration1 >= finalText1.length &&
                iteration2 >= finalText2.length
            ) {
                clearInterval(scrambleInterval);
            }
            iteration1 += 1 / 3;
            iteration2 += 1 / 3;
        }, 10);
        return () => clearInterval(scrambleInterval);
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
            setGridCells(Array.from({ length: rows * columns }, (_, i) => i));
            gridRef.current.classList.add("bg-transparent");
        };

        calculateGrid();
        window.addEventListener("resize", calculateGrid);
        return () => window.removeEventListener("resize", calculateGrid);
    }, []);

    // --- Card Hover Animations ---
    useEffect(() => {
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current];

        cards.forEach((card, index) => {
            if (!card) return;

            const handleMouseEnter = (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                // Lift and tilt effect based on position
                gsap.to(card, {
                    scale: 1.03,
                    rotationY: (e.clientX - cardCenterX) * 0.02,
                    rotationX: (cardCenterY - e.clientY) * 0.02,
                    z: 50,
                    duration: 0.6,
                    ease: "power2.out",
                });

                // Glow effect
                gsap.to(card, {
                    boxShadow:
                        "0 0 15px rgba(57, 183, 242, 0.2), 0 10px 25px rgba(0, 0, 0, 0.2)",
                    borderColor: "#39b7f2",
                    duration: 0.6,
                    ease: "power2.out",
                });

                // Animate image with slight rotation
                const img = card.querySelector("img");
                if (img) {
                    gsap.to(img, {
                        scale: 1.05,
                        rotation: index % 2 === 0 ? 5 : -5,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                }

                // Text glitch effect on title
                const title = card.querySelector("h3");
                if (title) {
                    gsap.to(title, {
                        textShadow: "0 0 5px rgba(57, 183, 242, 0.5)",
                        duration: 0.3,
                        ease: "power2.out",
                    });
                }
            };

            const handleMouseMove = (e) => {
                const cardRect = card.getBoundingClientRect();
                const cardCenterX = cardRect.left + cardRect.width / 2;
                const cardCenterY = cardRect.top + cardRect.height / 2;

                // Dynamic tilt based on mouse position
                gsap.to(card, {
                    rotationY: (e.clientX - cardCenterX) * 0.02,
                    rotationX: (cardCenterY - e.clientY) * 0.02,
                    duration: 0.3,
                    ease: "power1.out",
                });
            };

            const handleMouseLeave = () => {
                // Reset all animations
                gsap.to(card, {
                    scale: 1,
                    rotationY: 0,
                    rotationX: 0,
                    z: 0,
                    boxShadow: "none",
                    borderColor: "#424453",
                    duration: 0.6,
                    ease: "power2.inOut",
                });

                const img = card.querySelector("img");
                if (img) {
                    gsap.to(img, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: "power2.inOut",
                    });
                }

                const title = card.querySelector("h3");
                if (title) {
                    gsap.to(title, {
                        textShadow: "none",
                        duration: 0.3,
                        ease: "power2.inOut",
                    });
                }
            };

            card.addEventListener("mouseenter", handleMouseEnter);
            card.addEventListener("mousemove", handleMouseMove);
            card.addEventListener("mouseleave", handleMouseLeave);

            // Cleanup
            return () => {
                card.removeEventListener("mouseenter", handleMouseEnter);
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseleave", handleMouseLeave);
            };
        });
    }, []);

    // --- Gallery Hover Animations ---
    useEffect(() => {
        const items = galleryItemsRef.current.filter(Boolean);

        items.forEach((item) => {
            if (!item) return;

            const img = item.querySelector("img");
            if (!img) return;

            const handleMouseEnter = () => {
                gsap.to(img, {
                    scale: 1.1,
                    duration: 0.6,
                    ease: "power2.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(img, {
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.inOut",
                });
            };

            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                item.removeEventListener("mouseenter", handleMouseEnter);
                item.removeEventListener("mouseleave", handleMouseLeave);
            };
        });
    }, []);

    return (
        <>
            <main
                ref={mainRef}
                className="relative backface-hidden"
                style={{
                    WebkitFontSmoothing: "subpixel-antialiased",
                    MozOsxFontSmoothing: "grayscale",
                }}
            >
                <div className="h-screen relative">
                    <video
                        ref={videoRef}
                        className="video-bg object-cover w-full h-full absolute top-0 left-0 -z-10"
                        src="/bg_video5.mp4"
                        autoPlay
                        loop
                        muted
                    />
                    <div className="z-20 h-screen absolute top-0 left-0 w-full p-16 flex items-end justify-between bg-black/60">
                        {/* Decorative Lines */}
                        <div
                            className="absolute left-9 w-[1px] top-0 h-full bg-[rgb(66,68,83)]"
                            style={hardwareAccel}
                        ></div>
                        <div
                            className="absolute right-9 w-[1px] top-0 h-full bg-[rgb(66,68,83)]"
                            style={hardwareAccel}
                        ></div>
                        <div
                            className="absolute bottom-9 left-0 right-0 h-[1px] bg-[rgb(66,68,83)]"
                            style={hardwareAccel}
                        ></div>
                        <div
                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-[rgb(66,68,83)]"
                            style={hardwareAccel}
                        ></div>
                        <div
                            className="absolute bottom-9 left-9 h-[2px] w-3 bg-[#b7b9c5] -translate-x-1/2"
                            style={hardwareAccel}
                        ></div>
                        <div
                            className="absolute bottom-9 left-9 h-3 w-[2px] bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2"
                            style={hardwareAccel}
                        ></div>
                        <div
                            className="absolute bottom-9 right-9 h-[2px] w-3 bg-[#b7b9c5] translate-x-1/2"
                            style={hardwareAccel}
                        ></div>
                        <div
                            className="absolute bottom-9 right-9 h-3 w-[2px] bg-[#b7b9c5] translate-x-1/2 translate-y-1/2"
                            style={hardwareAccel}
                        ></div>

                        <div
                            ref={textRef}
                            className="mb-6 font-family-grotesk text-5xl text-[#e9ede5] leading-14"
                            style={hardwareAccel}
                        >
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
                            style={hardwareAccel}
                        />
                    </div>
                    <div
                        ref={gridRef}
                        className="z-10 h-screen absolute top-0 left-0 w-full overflow-hidden grid grid-cols-10 bg-[#0b0b0e]"
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
                                className="bg-[#0b0b0e] aspect-square"
                            />
                        ))}
                    </div>
                </div>
                <div className="min-h-screen bg-[#0b0b0e] relative">
                    <div className="pt-14 pl-14 mb-6 font-family-grotesk-mono text-[#838698] text-sm uppercase">
                        Events
                    </div>
                    <div className="font-family-grotesk text-4xl pl-14 max-w-1/3 text-white">
                        We believe in sharing our knowledge
                    </div>
                    <div className="flex justify-center px-10 py-20 relative z-20 pointer-events-none">
                        <div
                            ref={card1Ref}
                            className="border-[#424453] border-[1.5px] bg-[#17192160] rounded-sm p-6 flex flex-col items-center w-[250px] cursor-pointer backdrop-blur-xs pointer-events-auto"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                                ...hardwareAccel,
                            }}
                        >
                            <Image
                                src="/kraig.png"
                                alt="KRAIG"
                                width={175}
                                height={175}
                            />
                            <h3 className="font-family-grotesk text-2xl text-[#e9ede5] mt-6 mb-3">
                                K.R.A.I.G.
                            </h3>
                            <p className="text-sm text-[#b7b9c5] text-center leading-relaxed">
                                Kickstart your robotics journey with hands-on
                                fundamentals
                            </p>
                        </div>
                        <div
                            ref={card2Ref}
                            className="mx-10 border-[#424453] border-[1.5px] bg-[#17192160] rounded-sm p-6 flex flex-col items-center w-[250px] cursor-pointer backdrop-blur-xs pointer-events-auto"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                                ...hardwareAccel,
                            }}
                        >
                            <Image
                                src="/winterschool.png"
                                alt="Winter School"
                                width={175}
                                height={175}
                            />
                            <h3 className="font-family-grotesk text-2xl text-[#e9ede5] mt-6 mb-3">
                                Winter School
                            </h3>
                            <p className="text-sm text-[#b7b9c5] text-center leading-relaxed">
                                Comprehensive workshop series for advanced
                                robotics projects
                            </p>
                        </div>
                        <div
                            ref={card3Ref}
                            className="border-[#424453] border-[1.5px] bg-[#17192160] rounded-sm p-6 flex flex-col items-center w-[250px] cursor-pointer backdrop-blur-xs pointer-events-auto"
                            style={{
                                transformStyle: "preserve-3d",
                                perspective: "1000px",
                                ...hardwareAccel,
                            }}
                        >
                            <Image
                                src="/makerspace.png"
                                alt="Makerspace"
                                width={175}
                                height={175}
                            />
                            <h3 className="font-family-grotesk text-2xl text-[#e9ede5] mt-6 mb-3">
                                Makerspace
                            </h3>
                            <p className="text-sm text-[#b7b9c5] text-center leading-relaxed">
                                Collaborative workspace for prototyping and
                                innovation
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[rgb(66,68,83)]"></div>
                    <div className="absolute left-9 top-0 h-full w-px bg-[rgb(66,68,83)]"></div>
                    <div className="absolute right-9 top-0 h-full w-px bg-[rgb(66,68,83)]"></div>
                    <WaveParticles />
                </div>
                <div className="min-h-screen bg-[#0b0b0e] relative px-24 py-16">
                    <div className="uppercase font-family-grotesk-mono text-[#838698] text-md text-center mb-4">
                        Our
                    </div>
                    <div className="font-family-grotesk text-8xl text-center text-white uppercase mb-20">
                        B<span className="font-family-grotesk-screen">o</span>ts
                    </div>

                    {/* Gallery Grid */}
                    <div
                        ref={galleryRef}
                        className="grid grid-cols-12 gap-6 max-w-7xl mx-auto"
                        style={{ perspective: "1000px" }}
                    >
                        {botsData.map((bot, index) => (
                            <GalleryCard
                                key={bot.id}
                                bot={bot}
                                index={index}
                                galleryItemRef={(el) => (galleryItemsRef.current[index] = el)}
                                hardwareAccel={hardwareAccel}
                            />
                        ))}
                    </div>

                    {/* Decorative lines */}
                    <div className="absolute left-9 top-0 h-full w-px bg-[rgb(66,68,83)]"></div>
                    <div className="absolute right-9 top-0 h-full w-px bg-[rgb(66,68,83)]"></div>
                </div>
            </main>
        </>
    );
}
