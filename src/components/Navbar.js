"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const navLinks = [
        { href: "/winterschool", label: "Winterschool" },
        { href: "/makerspace", label: "Makerspace" },
        { href: "/faqs", label: "FAQs" },
        { href: "/workshops", label: "Workshops" },
        { href: "/blog", label: "Blog" },
        { href: "/tutorials", label: "Tutorials" },
        { href: "/about", label: "About Us" },
    ];

    return (
        <nav
            className="w-full fixed top-0 left-0 z-30 backdrop-blur-md flex justify-between items-stretch px-16"
            style={{
                WebkitTransform: "translate3d(0, 0, 0)",
                transform: "translate3d(0, 0, 0)",
                willChange: "transform, backdrop-filter",
            }}
        >
            {/* Logo container defines the height for the whole nav via py-4 */}
            <Link href="/" className="py-4 flex items-center">
                <img
                    src="/logo_text.png"
                    alt="Robotix Logo"
                    className="h-9 w-auto object-contain"
                />
            </Link>

            {/* Absolute Decorative Lines */}
            <div className="absolute left-9 top-0 h-[90%] w-px bg-[rgb(66,68,83)]"></div>
            <div className="absolute -bottom-[1.5px] left-0 right-0 h-[1.5px] bg-[rgb(66,68,83)]"></div>
            <div className="absolute -bottom-[1.5px] left-9 h-[1.5px] w-3 bg-[#b7b9c5] -translate-x-1/2"></div>
            <div className="absolute -bottom-[1.5px] left-9 h-3 w-[1.5px] bg-[#b7b9c5] -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute -bottom-[1.5px] right-9 h-[1.5px] w-3 bg-[#b7b9c5] translate-x-1/2"></div>
            <div className="absolute -bottom-[1.5px] right-9 h-3 w-[1.5px] bg-[#b7b9c5] translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute right-9 top-0 h-[90%] w-px bg-[rgb(66,68,83)]"></div>

            {/* THE NAV LIST */}
            <ul className="flex items-stretch space-x-8 list-none">
                {navLinks.map((link) => (
                    <li
                        key={link.href}
                        className="relative text-sm font-grotesk-mono font-bold uppercase transition-colors duration-500 ease-in-out flex items-center border-b-2 border-transparent text-[#f5f6f6] hover:text-[#39b7f2]"
                    >
                        <Link href={link.href} className="flex items-center h-full">
                            {link.label}
                        </Link>
                        {pathname === link.href && (
                            <div className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#39b7f2]"></div>
                        )}
                    </li>
                ))}
            </ul>

            {/* Contact Us - Also wrapped in flex items-center to match */}
            <Link
                href="/contact"
                className={`text-sm font-grotesk-mono font-bold uppercase transition-colors duration-500 ease-in-out flex items-center
                    ${pathname === "/contact" ? "text-[#39b7f2]" : "text-[#f5f6f6] hover:text-[#39b7f2]"}`}
            >
                Contact Us
            </Link>
        </nav>
    );
}