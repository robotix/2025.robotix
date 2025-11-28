import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Technology Robotix Society",
  description: "We are the focal point of robotics at IIT Kharagpur.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
