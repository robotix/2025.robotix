"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Linkedin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
    const parentRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(
        () => {
            const parent = parentRef.current;
            const image = imageRef.current;

            if (!parent || !image) return;

            const handleMouseMove = (e) => {
                const rect = parent.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const deltaX = e.clientX - centerX;
                const deltaY = e.clientY - centerY;

                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                const maxDistance = Math.sqrt(
                    (rect.width / 2) ** 2 + (rect.height / 2) ** 2
                );

                const displacement = Math.min(distance / maxDistance, 1) * 10;

                const angle = Math.atan2(deltaY, deltaX);
                const moveX = Math.cos(angle) * displacement;
                const moveY = Math.sin(angle) * displacement;

                gsap.to(image, {
                    x: moveX,
                    y: moveY,
                    duration: 0.8,
                    ease: "power3.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(image, {
                    x: 0,
                    y: 0,
                    duration: 2,
                    ease: "elastic.out(1, 0.3)",
                });
            };

            parent.addEventListener("mousemove", handleMouseMove);
            parent.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                parent.removeEventListener("mousemove", handleMouseMove);
                parent.removeEventListener("mouseleave", handleMouseLeave);
            };
        },
        { scope: parentRef }
    );

    return (
        <footer className="w-full bg-[#0b0b0e] relative">
            <div className="absolute left-9 top-0 h-full w-[1px] bg-[rgb(66,68,83)]"></div>
            <div className="absolute -top-[1.5px] left-0 right-0 h-[1.5px] bg-[rgb(66,68,83)]"></div>
            <div className="absolute -top-[1.5px] left-9 h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute -top-[1.5px] left-9 h-1.5 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute -top-[1.5px] right-9 h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
            <div className="absolute -top-[1.5px] right-9 h-1.5 w-[1.5px] bg-[#b7b9c5] translate-x-1/2"></div>
            <div className="absolute right-9 top-0 h-full w-[1px] bg-[rgb(66,68,83)]"></div>

            <div className="absolute -top-[1.5px] left-[calc(36px+0.4*(100%-72px))] h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute -top-[1.5px] left-[calc(36px+0.4*(100%-72px))] h-1.5 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute -top-[1.5px] right-[calc(36px+0.4*(100%-72px))] h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
            <div className="absolute -top-[1.5px] right-[calc(36px+0.4*(100%-72px))] h-1.5 w-[1.5px] bg-[#b7b9c5] translate-x-1/2"></div>
            
            <div className="absolute bottom-[88px] left-[calc(36px+0.4*(100%-72px))] h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute bottom-[88px] left-[calc(36px+0.4*(100%-72px))] h-1.5 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute bottom-[88px] right-[calc(36px+0.4*(100%-72px))] h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
            <div className="absolute bottom-[88px] right-[calc(36px+0.4*(100%-72px))] h-1.5 w-[1.5px] bg-[#b7b9c5] translate-x-1/2"></div>

            <div className="absolute bottom-[88px] left-9 h-[1.5px] w-1.5 bg-[#b7b9c5]"></div>
            <div className="absolute bottom-[88px] left-9 h-3 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute bottom-[88px] right-9 h-[1.5px] w-1.5 bg-[#b7b9c5]"></div>
            <div className="absolute bottom-[88px] right-9 h-3 w-[1.5px] bg-[#b7b9c5] translate-x-1/2 translate-y-1/2"></div>

            <div className="flex border-b border-[rgb(66,68,83)] mx-9">
                <div className="shrink-0 w-2/5 px-9 py-16 border-r border-[rgb(66,68,83)] flex flex-col justify-center">
                    <div className="flex gap-4 mb-8">
                        <Link href="https://www.linkedin.com/company/technology-robotix-society" target="_blank" className="text-[#f5f6f6] hover:text-[#49b7e1] transition-colors duration-500 ease-in-out">
                            <Linkedin size={32} />
                        </Link>
                        <Link href="https://www.facebook.com/robotixiitkgp" target="_blank" className="text-[#f5f6f6] hover:text-[#49b7e1] transition-colors duration-500 ease-in-out">
                            <Facebook size={32} />
                        </Link>
                        <Link href="https://www.instagram.com/robotix_iitkgp" target="_blank" className="text-[#f5f6f6] hover:text-[#49b7e1] transition-colors duration-500 ease-in-out">
                            <Instagram size={32} />
                        </Link>
                    </div>
                    <p className="text-4xl font-family-grotesk text-[#f5f6f6]">Are you geared up?</p>
                    <p className="text-3xl font-family-grotesk-mono text-[#49b7e1]">#robotixiitkgp</p>
                </div>
                <div
                    ref={parentRef}
                    className="shrink-0 w-1/5 flex items-center justify-center"
                >
                    <Image
                        ref={imageRef}
                        src="/logo.png"
                        alt="Robotix Logo"
                        width={110}
                        height={110}
                        className="object-contain"
                    />
                </div>
                <ul className="shrink-0 w-2/5 px-9 py-16 border-l border-[rgb(66,68,83)] grid grid-cols-2 gap-x-12 gap-y-4">
                    <li>
                        <Link
                            href="/winterschool"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            Winterschool
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/makerspace"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            Makerspace
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/faqs"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            FAQs
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/workshops"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            Workshops
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/blog"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/tutorials"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            Tutorials
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/about"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className="text-3xl font-family-grotesk text-[#f5f6f6] hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
                        >
                            Contact Us
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="p-8 text-[#838698] font-family-grotesk-mono uppercase mx-9">
                © 2025 Technology Robotix Society, IIT Kharagpur
            </div>
        </footer>
    );
}
