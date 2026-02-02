"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function TeamMemberCard({ 
    member, 
    imagePath, 
    onMouseMove, 
    onMouseLeave,
    showTag = false 
}) {
    return (
        <div
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="w-full max-w-[280px] flex flex-col gap-4 group cursor-default"
        >
            {/* Image Container with 3D Tilt & Spotlight */}
            <div className="tilt-container relative w-full aspect-square rounded-md overflow-hidden bg-[#242733] will-change-transform">
                <Image
                    src={imagePath}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Spotlight Overlay */}
                <div
                    className="shine-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background:
                            "radial-gradient(350px circle at var(--x, 50%) var(--y, 50%), rgba(57, 183, 242, 0.15), transparent 40%)",
                    }}
                ></div>
            </div>

            <p className="font-family-apk text-lg text-[#e9ede5]">
                {member.name}{member.surname ? ` ${member.surname}` : ""}
            </p>
            
            {showTag && member.tag && (
                <p className="text-[#838698] font-family-apk text-lg">
                    {member.tag}
                </p>
            )}
            
            {member.social && member.social.length > 0 && (
                <div className="flex flex-wrap">
                    {member.social.map(
                        (socialLink, idx) =>
                            socialLink.link && (
                                <a
                                    key={idx}
                                    href={
                                        socialLink.name === "email"
                                            ? `mailto:${socialLink.link}`
                                            : socialLink.link
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
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
    );
}
