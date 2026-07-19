"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar({ onRegisterClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [coords, setCoords] = useState({ left: 0, width: 0 });
  
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (e, index) => {
    setHoveredIdx(index);
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement.getBoundingClientRect();
    setCoords({
      left: rect.left - parentRect.left,
      width: rect.width,
    });
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
  };

  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Collaboration", href: "#collaboration" },
    { name: "Services", href: "#services" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-brand-navy/5 py-1 shadow-sm"
          : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        {/* Left Side: Logo & Links Group */}
        <div className="flex items-center gap-8">
          {/* Logo with Company Icon */}
          <a href="#home" className="flex items-center gap-2.5 font-shareTech text-2xl font-bold tracking-wide group/logo">
            <img
              src="/logos/icon.png"
              alt="DevAgile Icon"
              className="w-7 h-7 md:w-8 md:h-8 object-contain transition-transform duration-300"
            />
          </a>

          {/* Desktop Links (Left Aligned next to Logo) */}
          <div className="hidden md:flex items-center gap-1 relative">
            {/* Sliding Pill Indicator */}
            <div
              style={{
                left: `${coords.left}px`,
                width: `${coords.width}px`,
                opacity: hoveredIdx !== null ? 1 : 0,
              }}
              className="absolute top-1/2 -translate-y-1/2 h-8 bg-brand-green/20 rounded-md transition-all duration-300 ease-out pointer-events-none z-0"
            />

            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={(e) => handleMouseEnter(e, idx)}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 font-roboto text-sm font-medium text-brand-navy/70 hover:text-brand-navy px-3 py-1.5 rounded-md transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Register CTA */}
        <div className="hidden md:block relative">
          <button
            onClick={handleRegisterClick}
            className="font-roboto text-sm font-bold bg-brand-navy text-white px-5 py-2 rounded-md hover:bg-brand-green hover:text-brand-navy hover:shadow-[0_4px_15px_rgba(89,202,147,0.3)] transition-all duration-300"
          >
            Register
          </button>
          {showComingSoon && (
            <div className="absolute top-12 -translate-x-1/2 bg-brand-green text-brand-navy text-sm py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap animate-bounce font-roboto font-bold z-50 pointer-events-none">
              Coming Soon
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-4 border-transparent border-b-brand-green"></div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-brand-navy/80 hover:text-brand-green transition-colors focus:outline-none p-1"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-brand-navy/20 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4 border-b border-slate-100">
          <button
            onClick={() => setIsOpen(false)}
            className="text-brand-navy/80 hover:text-brand-green transition-colors focus:outline-none p-2 bg-slate-50 rounded-full"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center gap-6 mt-8 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-roboto text-lg font-medium text-brand-navy hover:text-brand-green transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
          <div className="relative w-full mt-4 flex flex-col items-center">
            <button
              onClick={handleRegisterClick}
              className="w-full font-roboto text-sm font-bold bg-brand-navy text-white px-5 py-3 rounded-lg hover:bg-brand-green hover:text-brand-navy transition-all duration-300 text-center shadow-sm"
            >
              Register
            </button>
            {showComingSoon && (
              <div className="absolute -top-12 bg-brand-green text-brand-navy text-sm py-1.5 px-3 rounded-lg shadow-lg whitespace-nowrap animate-bounce font-roboto font-bold z-50 pointer-events-none">
                Coming Soon
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-green"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
