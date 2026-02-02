"use client";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ item, index, isOpen, onToggle }) {
    return (
        <div className="overflow-hidden transition-all duration-300 group">
            <button
                onClick={() => onToggle(index)}
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
            >
                <span className="font-family-apk text-2xl text-[#e9ede5] pr-8">
                    {item.question}
                </span>
                <span className="border border-[#b7b9c5] group-hover:border-[#39b7f2] rounded-sm transition-colors duration-300 p-1">
                    <ChevronDown 
                        className={`shrink-0 w-6 h-6 text-[#e9ede5] group-hover:text-[#39b7f2] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </span>
            </button>
            
            <div 
                className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                <div className="px-6 pb-6 text-[#b7b9c5] leading-relaxed">
                    {item.answer}
                </div>
            </div>
        </div>
    );
}
