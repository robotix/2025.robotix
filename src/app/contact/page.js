"use client";
import { ArrowRight } from "lucide-react";
import useScrambleText from "@/hooks/useScrambleText";

export default function Contact() {
    const displayText = useScrambleText("Get in touch");

    return (
        <main className="bg-[#0b0b0e] min-h-screen relative py-16">
            <div className="absolute left-9 w-px top-0 h-full bg-[rgb(66,68,83)]"></div>
            <div className="absolute right-9 w-px top-0 h-full bg-[rgb(139,143,174)]"></div>
            <h1 className="text-[#e9ede5] px-16 font-family-grotesk text-[175px] border-b-[1.5px] border-b-[#666873] mb-12">
                {displayText}
            </h1>

            <div className="flex justify-center py-12 px-18">
                <div className="w-1/2 ">
                        <div className="uppercase font-family-grotesk-mono text-[#838698] mb-4">Socials</div>
                        <ul className="flex flex-col gap-2 text-[#f5f6f6] font-family-grotesk text-3xl">
                            <li className="hover:text-[#39b7f2] transition-colors duration-300 cursor-pointer group">
                                <a href="https://www.linkedin.com/company/technology-robotix-society" target="_blank" className="flex items-center gap-4">
                                    LinkedIn
                                    <span className="rounded-sm p-1 border border-[#242733] group-hover:border-[#39b7f2] transition-colors duration-300">
                                        <ArrowRight className="text-[#f5f6f6] group-hover:text-[#39b7f2] transition-all duration-300 -rotate-45 group-hover:rotate-0" size={24} />
                                    </span>
                                </a>
                            </li>
                            <li className="hover:text-[#39b7f2] transition-colors duration-300 cursor-pointer group">
                                <a href="https://www.facebook.com/robotixiitkgp" target="_blank" className="flex items-center gap-4">
                                    Facebook
                                    <span className="rounded-sm p-1 border border-[#242733] group-hover:border-[#39b7f2] transition-colors duration-300">
                                        <ArrowRight className="text-[#f5f6f6] group-hover:text-[#39b7f2] transition-all duration-300 -rotate-45 group-hover:rotate-0" size={24} />
                                    </span>
                                </a>
                            </li>
                            <li className="hover:text-[#39b7f2] transition-colors duration-300 cursor-pointer group">
                                <a href="https://www.instagram.com/robotix_iitkgp" target="_blank" className="flex items-center gap-4">
                                    Instagram
                                    <span className="rounded-sm p-1 border border-[#242733] group-hover:border-[#39b7f2] transition-colors duration-300">
                                        <ArrowRight className="text-[#f5f6f2] group-hover:text-[#39b7f2] transition-all duration-300 -rotate-45 group-hover:rotate-0" size={24} />
                                    </span>
                                </a>
                            </li>
                        </ul>
                </div>
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
