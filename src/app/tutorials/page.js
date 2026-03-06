"use client";

import useScrambleText from "@/hooks/useScrambleText";

export default function Tutorials() {
    const displayText = useScrambleText("Tutorials");

    return (
        <main className="bg-[#0b0b0e] min-h-screen relative py-16">
            <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
            <div className="absolute right-9 w-px top-0 h-full bg-[rgb(139,143,174)]"></div>
            <h1 className="text-[#e9ede5] mx-16 font-family-grotesk text-[175px] border-b-[1.5px] border-b-[#666873] mb-12">
                {displayText}
            </h1>
        </main>
    );
}
