"use client";
import { useEffect, useState } from "react";

export default function Contact() {
    const [displayText, setDisplayText] = useState("");
    const finalText = "Get in touch";

    useEffect(() => {
        const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let iteration = 0;

        const scrambleInterval = setInterval(() => {
            setDisplayText(
                finalText
                    .split("")
                    .map((char, index) =>
                        index < iteration
                            ? finalText[index]
                            : char === " "
                            ? " "
                            : chars[Math.floor(Math.random() * chars.length)]
                    )
                    .join("")
            );

            if (iteration >= finalText.length) {
                clearInterval(scrambleInterval);
            }

            iteration += 1 / 3;
        }, 50);

        return () => clearInterval(scrambleInterval);
    }, []);

    return (
        <main className="bg-[#0b0b0e] min-h-screen relative py-16 px-20">
            <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
            <div className="absolute right-9 w-px top-0 h-full bg-[rgb(139,143,174)]"></div>
            <h1 className="text-[#e9ede5] font-family-grotesk text-[175px] border-b-[1.5px] border-b-[#666873] mb-12">
                {displayText}
            </h1>

            <div className="flex justify-center py-24 px-16">
                <div className="w-1/2"></div>
                <div className="w-1/2 max-w-4xl relative">
                    <iframe 
                        width="100%" 
                        height="470" 
                        frameBorder="0" 
                        scrolling="no" 
                        marginHeight="0" 
                        marginWidth="0" 
                        id="gmap_canvas" 
                        src="https://maps.google.com/maps?width=520&amp;height=470&amp;hl=en&amp;q=Technology%20Robotix%20Society%20Kharagpur+()&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        className="rounded-lg"
                    ></iframe>
                    <div 
                        className="absolute inset-0 rounded-lg pointer-events-none" 
                        style={{ backgroundColor: 'rgba(11, 11, 14, 0.15)' }}
                    ></div>
                </div>
            </div>
        </main>
    );
}
