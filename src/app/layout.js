// app/layout.js
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll"; // Import the wrapper
import "./globals.css";

export const metadata = {
    title: "Technology Robotix Society",
    description: "We are the focal point of robotics at IIT Kharagpur.",
    icons: [
        { rel: "icon", url: "/logo.ico" },
        { rel: "icon", type: "image/png", url: "/logo.png" },
    ],
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {/* Wrap everything in SmoothScroll to apply it globally */}
                <SmoothScroll>
                    <Navbar />
                    {children}
                    <Footer />
                </SmoothScroll>
            </body>
        </html>
    );
}
