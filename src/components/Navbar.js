import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full fixed top-0 left-0 z-20 backdrop-blur-md flex justify-between items-center px-16 py-4">
            <Link href="/">
                <img
                    src="/logo_text.png"
                    alt="Robotix Logo"
                    className="h-9 w-auto object-contain"
                />
            </Link>
            <div className="absolute left-9 top-0 h-[90%] w-[1px] bg-[rgb(66,68,83)]"></div>
            <div className="absolute -bottom-[1.5px] left-0 right-0 h-[1.5px] bg-[rgb(66,68,83)]"></div>
            <div className="absolute -bottom-[1.5px] left-9 h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute -bottom-[1.5px] left-9 h-3 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute -bottom-[1.5px] right-9 h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
            <div className="absolute -bottom-[1.5px] right-9 h-3 w-[1.5px] bg-[#b7b9c5] translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute right-9 top-0 h-[90%] w-[1px] bg-[rgb(66,68,83)]"></div>
            <ul className="flex space-x-8 list-none">
                <li className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out">
                    <Link href="/winterschool">Winterschool</Link>
                </li>
                <li className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out">
                    <Link href="/makerspace">Makerspace</Link>
                </li>
                <li className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out">
                    <Link href="/faqs">FAQs</Link>
                </li>
                <li className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out">
                    <Link href="/workshops">Workshops</Link>
                </li>
                <li className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out">
                    <Link href="/blog">Blog</Link>
                </li>
                <li className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out">
                    <Link href="/tutorials">Tutorials</Link>
                </li>
                <li className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out">
                    <Link href="/about">About Us</Link>
                </li>
            </ul>
            <Link
                href="/contact"
                className="text-sm font-grotesk-mono font-bold text-[#f5f6f6] uppercase hover:text-[#39b7f2] transition-colors duration-500 ease-in-out"
            >
                Contact Us
            </Link>
        </nav>
    );
}
