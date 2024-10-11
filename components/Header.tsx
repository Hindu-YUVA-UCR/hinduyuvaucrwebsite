"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube } from "react-icons/bs";
import "../styles/Header.css";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // This matches Tailwind's 'md' breakpoint
    };
    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "events", "team", "join"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 0 && rect.bottom >= 0;
        }
        return false;
      });
      setActiveSection(currentSection || "");

    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="z-50 header-logo">
          <Image src="/HinduYUVA-NBUCR.png" alt="Logo" width={100} height={80} />
        </div>
        <nav className="header-links z-50 text-2xl text-center mr-[18%]">
          <Link href="#home" className={`header-link ${activeSection === "about" ? "active" : ""}`}>Home</Link>
          <Link href="#about" className={`header-link ${activeSection === "about" ? "active" : ""}`}>About Us</Link>
          <Link href="#events" className={`header-link ${activeSection === "events" ? "active" : ""}`}>Our Work</Link>
          <Link href="#team" className={`header-link ${activeSection === "team" ? "active" : ""}`}>Team</Link>
          <Link href="#join" className={`header-link ${activeSection === "join" ? "active" : ""}`}>Get Involved</Link>
        </nav>
        
      </div>
    </header>
  );
}