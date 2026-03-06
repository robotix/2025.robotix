"use client";
import { useState } from "react";
import faq from "@/data/faq";
import FaqAccordion from "@/components/FaqAccordion";
import useScrambleText from "@/hooks/useScrambleText";

export default function Faqs() {
    const displayText = useScrambleText("FAQs");
    const [openIndex, setOpenIndex] = useState(null);

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
            
            <div className="max-w-5xl mx-auto space-y-4">
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
