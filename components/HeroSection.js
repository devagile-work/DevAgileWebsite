"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LogoSpinner from "./LogoSpinner";

export default function HeroSection({ onRegisterClick }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    if (session) {
      router.push("/dashboard");
    } else {
      router.push("/loginAndSignUp");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden bg-brand-white"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-green/15 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-green/10 blur-[150px] animate-pulse-glow" />
      </div>

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,48,87,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,48,87,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      {/* Top-Left Diagonal Marquee */}
      <div className="absolute top-0 left-1/2 -translate-x-1/3 rotate-[30deg] w-[200vw] py-3 bg-brand-navy text-brand-green shadow-lg z-10 overflow-hidden select-none border-y border-brand-green/20 flex whitespace-nowrap">
        <div className="animate-marquee flex whitespace-nowrap shrink-0">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 font-shareTech text-sm uppercase tracking-widest font-bold text-brand-green">
              No way back from here , you have arrived at DevAgile &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
        <div className="animate-marquee flex whitespace-nowrap shrink-0" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 font-shareTech text-sm uppercase tracking-widest font-bold text-brand-green">
              No way back from here , you have arrived at DevAgile &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Bottom-Right Diagonal Marquee */}
      <div className="absolute bottom-0 left-1/4 -translate-x-1/2 rotate-[30deg] w-[200vw] py-3 bg-brand-green text-brand-navy shadow-lg z-10 overflow-hidden select-none border-y border-brand-navy/20 flex whitespace-nowrap">
        <div className="animate-marquee flex whitespace-nowrap shrink-0">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 font-shareTech text-sm uppercase tracking-widest font-bold text-brand-navy">
              No way back from here , you have arrived at DevAgile &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
        <div className="animate-marquee flex whitespace-nowrap shrink-0" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="mx-6 font-shareTech text-sm uppercase tracking-widest font-bold text-brand-navy">
              No way back from here , you have arrived at DevAgile &nbsp;&bull;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Top Left Logo Spinner - Centered on the corner */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-0 opacity-30 md:opacity-100">
        <LogoSpinner />
      </div>

      {/* Bottom Right Logo Spinner - Centered on the corner */}
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 z-0 opacity-30 md:opacity-100">
        <LogoSpinner />
      </div>

      {/* Content Container (Centered) */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 w-full flex flex-col items-center text-center">
        
        <div className="flex flex-col items-center">
          

          {/* Logo */}
          <img
            src="/logos/completeLogo.png"
            alt="DevAgile Logo"
            className="h-24 sm:h-24 md:h-40 w-auto "
          />

          {/* Description */}
          <p className="font-roboto font-light text-lg sm:text-xl text-brand-navy/85 max-w-2xl leading-relaxed mx-auto">
            We are group of <span className="font-bold text-brand-navy">software developers</span>. 
            We launch high-impact <span className="font-bold text-brand-navy">training bootcamps</span> for tech aspirants 
            and build custom <span className="font-bold text-brand-navy">enterprise-grade software</span> for forward-thinking organizations, 
            with plans to release our own products soon.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center w-full">
            <div className="relative w-full sm:w-auto">
              <button
                onClick={handleRegisterClick}
                className="w-full font-roboto font-bold bg-brand-green text-brand-navy px-8 py-4 rounded-xl hover:bg-brand-navy hover:text-white transition-all duration-300 hover:shadow-[0_4px_20px_rgba(3,48,87,0.25)] text-center text-base"
              >
                Join our Bootcamp
              </button>
              {/* showComingSoon removed */}
            </div>
            <a
              href="#services"
              className="font-roboto font-bold border border-brand-navy/20 text-brand-navy hover:border-brand-green hover:bg-brand-green/5 px-8 py-4 rounded-xl transition-all duration-300 text-center text-base"
            >
              Explore Services
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}