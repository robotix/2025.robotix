"use client";
import { useRef, useEffect, useState, use } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { teamData } from "@/data/team";
import { alumniData } from "@/data/alumni";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const mainRef = useRef(null);
    const logoRef = useRef(null);
    const videoRef = useRef(null);
    const gridRef = useRef(null);
    const textRef = useRef(null);
    const [gridCells, setGridCells] = useState([]);
    const [displayText1, setDisplayText1] = useState("");
    const [activeTab, setActiveTab] = useState(parseInt(alumniData[0].title));

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

                // Glow via drop-shadow filter
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

                // Reveal grid cells
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

    const handleCardMouseMove = (e) => {
        const card = e.currentTarget;
        const imageContainer = card.querySelector(".tilt-container");
        const overlay = card.querySelector(".shine-overlay");

        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (overlay) {
            gsap.to(overlay, {
                "--x": `${x}px`,
                "--y": `${y}px`,
                duration: 0.2,
                ease: "power2.out",
            });
        }

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;

        gsap.to(imageContainer, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.01, // Subtle scale up for feel
            transformPerspective: 1000, // Essential for 3D effect
            transformStyle: "preserve-3d",
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleCardMouseLeave = (e) => {
        const card = e.currentTarget;
        const imageContainer = card.querySelector(".tilt-container");

        // Reset Tilt
        gsap.to(imageContainer, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)", // Nice spring back effect
            clearProps: "transform", // Clean up to avoid stacking contexts if not needed
        });
    };

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
                        <source src="/bg_video2.mp4" type="video/mp4" />
                    </video>

                    <div className="z-20 h-screen absolute top-0 left-0 w-full p-16 flex items-center justify-center bg-black/10 flex-col">
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

                <div className="min-h-screen w-full bg-[#0b0b0e] relative p-16 pt-28 border-b border-[rgb(66,68,83)]">
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

                <div className="w-full bg-[#0b0b0e] relative p-16 pt-24">
                    <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
                    <div className="absolute right-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
                    <div className="">
                        <h3 className="font-family-grotesk-mono uppercase font-bold text-base text-[#838698] mb-6">
                            Meet the team
                        </h3>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl">
                            Coordinators
                        </h2>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {teamData[0].team.map((member, index) => (
                                <div
                                    key={index}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                    className="w-full max-w-[280px] flex flex-col gap-4 group cursor-default"
                                >
                                    {/* Image Container with 3D Tilt & Spotlight */}
                                    <div className="tilt-container relative w-full aspect-square rounded-md overflow-hidden bg-[#242733] will-change-transform">
                                        <Image
                                            src={`/team/coordinators/${member.thumbnailUrl}`}
                                            alt={member.name}
                                            fill
                                            className="object-cover" // Removed hover scale here to avoid conflict with tilt
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        {/* Spotlight Overlay: Reduced radius (350px) and subtle blue */}
                                        <div
                                            className="shine-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background:
                                                    "radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(57, 183, 242, 0.15), transparent 40%)",
                                            }}
                                        ></div>
                                    </div>

                                    <p className="font-family-apk text-lg text-[#e9ede5]">{`${member.name} ${member.surname}`}</p>
                                    <div className="flex flex-wrap">
                                        {member.social.map(
                                            (socialLink, idx) =>
                                                socialLink.link && (
                                                    <a
                                                        key={idx}
                                                        href={
                                                            socialLink.name ==
                                                            "email"
                                                                ? `mailto:${socialLink.link}`
                                                                : socialLink.link
                                                        }
                                                        target="_blank"
                                                        className="group/icon flex shrink-0 items-center gap-4 mr-6 mb-2 text-[#e9ede5] transition-colors duration-300 ease-in-out hover:text-[#39b7f2]"
                                                    >
                                                        <span className="uppercase font-family-grotesk-mono font-bold text-sm">
                                                            {socialLink.name}
                                                        </span>
                                                        <span className="h-9 w-9 flex items-center justify-center text-sm border border-[#242733] rounded-sm">
                                                            <ArrowRight className="-rotate-45 group-hover/icon:rotate-0 transition-all duration-300 ease-in-out" />
                                                        </span>
                                                    </a>
                                                )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl mt-9">
                            Heads
                        </h2>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {teamData[1].team.map((member, index) => (
                                <div
                                    key={index}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                    className="w-full max-w-[280px] flex flex-col group cursor-default"
                                >
                                    {/* Image Container with 3D Tilt & Spotlight */}
                                    <div className="tilt-container relative w-full aspect-square rounded-md overflow-hidden bg-[#242733] will-change-transform mb-4">
                                        <Image
                                            src={`/team/heads/${member.thumbnailUrl}`}
                                            alt={member.name}
                                            fill
                                            className="object-cover" // Removed hover scale here to avoid conflict with tilt
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        {/* Spotlight Overlay: Reduced radius (350px) and subtle blue */}
                                        <div
                                            className="shine-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background:
                                                    "radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(57, 183, 242, 0.15), transparent 40%)",
                                            }}
                                        ></div>
                                    </div>

                                    <p className="font-family-apk text-lg text-[#e9ede5]">{`${member.name} ${member.surname}`}</p>
                                    {member.tag && (
                                        <p className="text-[#838698] font-family-apk text-lg">
                                            {member.tag}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap mt-4">
                                        {member.social.map(
                                            (socialLink, idx) =>
                                                socialLink.link && (
                                                    <a
                                                        key={idx}
                                                        href={
                                                            socialLink.name ==
                                                            "email"
                                                                ? `mailto:${socialLink.link}`
                                                                : socialLink.link
                                                        }
                                                        target="_blank"
                                                        className="group/icon flex shrink-0 items-center gap-4 mr-6 mb-2 text-[#e9ede5] transition-colors duration-300 ease-in-out hover:text-[#39b7f2]"
                                                    >
                                                        <span className="uppercase font-family-grotesk-mono font-bold text-sm">
                                                            {socialLink.name}
                                                        </span>
                                                        <span className="h-9 w-9 flex items-center justify-center text-sm border border-[#242733] rounded-sm">
                                                            <ArrowRight className="-rotate-45 group-hover/icon:rotate-0 transition-all duration-300 ease-in-out" />
                                                        </span>
                                                    </a>
                                                )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl mt-9">
                            Sub Heads
                        </h2>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {teamData[2].team.map((member, index) => (
                                <div
                                    key={index}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                    className="w-full max-w-[280px] flex flex-col gap-4 group cursor-default"
                                >
                                    <div className="tilt-container relative w-full aspect-square rounded-md overflow-hidden bg-[#242733] will-change-transform">
                                        <Image
                                            src={`/team/subheads/${member.thumbnailUrl}`}
                                            alt={member.name}
                                            fill
                                            className="object-cover" // Removed hover scale here to avoid conflict with tilt
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />

                                        <div
                                            className="shine-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background:
                                                    "radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(57, 183, 242, 0.15), transparent 40%)",
                                            }}
                                        ></div>
                                    </div>

                                    <p className="font-family-apk text-lg text-[#e9ede5]">{`${member.name} ${member.surname}`}</p>
                                    <div className="flex flex-wrap">
                                        {member.social.map(
                                            (socialLink, idx) =>
                                                socialLink.link && (
                                                    <a
                                                        key={idx}
                                                        href={
                                                            socialLink.name ==
                                                            "email"
                                                                ? `mailto:${socialLink.link}`
                                                                : socialLink.link
                                                        }
                                                        target="_blank"
                                                        className="group/icon flex shrink-0 items-center gap-4 mr-6 mb-2 text-[#e9ede5] transition-colors duration-300 ease-in-out hover:text-[#39b7f2]"
                                                    >
                                                        <span className="uppercase font-family-grotesk-mono font-bold text-sm">
                                                            {socialLink.name}
                                                        </span>
                                                        <span className="h-9 w-9 flex items-center justify-center text-sm border border-[#242733] rounded-sm">
                                                            <ArrowRight className="-rotate-45 group-hover/icon:rotate-0 transition-all duration-300 ease-in-out" />
                                                        </span>
                                                    </a>
                                                )
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2 className="font-family-grotesk text-[#e9ede5] text-4xl mt-9">
                            Alumni
                        </h2>
                        <ul className="flex mx-auto w-fit my-5">
                            {alumniData.map((alumnus, index) => (
                                    <li
                                        key={index}
                                        className={`cursor-pointer border-y-2 border-r-2 ${index == 0 ? "border-l-2 rounded-l-lg" : ""} ${index == alumniData.length - 1 ? "rounded-r-lg" : ""} border-[#838698] p-2 text-[#838698] hover:text-[#f5f6f6] transition-colors duration-300 ease-in-out text-lg`}
                                        style={alumnus.title == activeTab ? {color: "#f5f6f6", borderColor: "#f5f6f6"} : alumnus.title == activeTab+1 ? {borderRightColor: "#f5f6f6"} : {}}
                                        onClick={()=>{setActiveTab(parseInt(alumnus.title))}}
                                    >
                                        {alumnus.title}
                                    </li>
                            ))}
                        </ul>
                        <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8 justify-items-center">
                            {(alumniData.find(alumnus => alumnus.title == activeTab)?.team || []).map((member, index) => (
                                <div
                                    key={index}
                                    onMouseMove={handleCardMouseMove}
                                    onMouseLeave={handleCardMouseLeave}
                                    className="w-full max-w-[280px] flex flex-col gap-4 group cursor-default"
                                >
                                    <div className="tilt-container relative w-full aspect-square rounded-md overflow-hidden bg-[#242733] will-change-transform">
                                        <Image
                                            src={`/alumni/${activeTab}/${member.thumbnailUrl}`}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div
                                            className="shine-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                background:
                                                    "radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(57, 183, 242, 0.15), transparent 40%)",
                                            }}
                                        ></div>
                                    </div>
                                    <p className="font-family-apk text-lg text-[#e9ede5]">{member.name}{member.surname ? ` ${member.surname}` : ""}</p>
                                    {member.social && member.social.length > 0 && (
                                        <div className="flex flex-wrap">
                                            {member.social.map(
                                                (socialLink, idx) =>
                                                    socialLink.link && (
                                                        <a
                                                            key={idx}
                                                            href={
                                                                socialLink.name ==
                                                                "email"
                                                                    ? `mailto:${socialLink.link}`
                                                                    : socialLink.link
                                                            }
                                                            target="_blank"
                                                            className="group/icon flex shrink-0 items-center gap-4 mr-6 mb-2 text-[#e9ede5] transition-colors duration-300 ease-in-out hover:text-[#39b7f2]"
                                                        >
                                                            <span className="uppercase font-family-grotesk-mono font-bold text-sm">
                                                                {socialLink.name}
                                                            </span>
                                                            <span className="h-9 w-9 flex items-center justify-center text-sm border border-[#242733] rounded-sm">
                                                                <ArrowRight className="-rotate-45 group-hover/icon:rotate-0 transition-all duration-300 ease-in-out" />
                                                            </span>
                                                        </a>
                                                    )
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
