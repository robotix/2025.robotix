"use client";
import { useEffect, useState } from "react";
import faq from "@/data/faq";
import FaqAccordion from "@/components/FaqAccordion";

export default function Faqs() {
    const [displayText, setDisplayText] = useState("");
    const [openIndex, setOpenIndex] = useState(null);
    const finalText = "FAQs";

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
                            : chars[Math.floor(Math.random() * chars.length)]
                    )
                    .join("")
            );

            if (iteration >= finalText.length) {
                clearInterval(scrambleInterval);
            }

            iteration += 1 / 3;
        }, 10);

        return () => clearInterval(scrambleInterval);
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <main className="bg-[#0b0b0e] min-h-screen relative py-16 px-20">
            <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
            <div className="absolute right-9 w-px top-0 h-full bg-[rgb(139,143,174)]"></div>
            <h1 className="text-[#e9ede5] font-family-grotesk text-[175px] border-b-[1.5px] border-b-[#666873] mb-12">
                {displayText}
            </h1>
            
            <div className="max-w-6xl mx-auto space-y-4">
                {faq.map((item, index) => (
                    <FaqAccordion
                        key={index}
                        item={item}
                        index={index}
                        isOpen={openIndex === index}
                        onToggle={toggleAccordion}
                    />
                ))}
            </div>
        </main>
    );
}
