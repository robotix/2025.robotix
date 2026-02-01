"use client";
import { useEffect, useState } from "react";
import faq from "@/data/faq";
import { ChevronDown } from "lucide-react";

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
                    <div 
                        key={index}
                        className="overflow-hidden transition-all duration-300 group"
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                        >
                            <span className="font-family-apk text-2xl text-[#e9ede5] pr-8">
                                {item.question}
                            </span>
                            <span className="border border-[#b7b9c5] group-hover:border-[#39b7f2] rounded-sm transition-colors duration-300 p-1">
                            <ChevronDown 
                                className={`shrink-0 w-6 h-6 text-[#e9ede5] group-hover:text-[#39b7f2] transition-transform duration-300 ${
                                    openIndex === index ? "rotate-180" : ""
                                }`}
                            />
                            </span>
                        </button>
                        
                        <div 
                            className={`overflow-hidden transition-all duration-300 ${
                                openIndex === index ? "max-h-96" : "max-h-0"
                            }`}
                        >
                            <div className="px-6 pb-6 text-[#b7b9c5] leading-relaxed">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
