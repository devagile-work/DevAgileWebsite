"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "../components/SplashScreen";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import FeaturedProjects from "../components/services/FeaturedProjects";
import CollaborationSection from "../components/CollaborationSection";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className={`relative min-h-screen bg-brand-white selection:bg-brand-green/30 selection:text-brand-navy ${showSplash ? 'h-screen overflow-hidden' : ''}`}>
        {/* Navigation */}
      <Navbar onRegisterClick={handleOpenRegister} />

      {/* Main Sections */}
      <main className="overflow-hidden">
        <ScrollReveal direction="none" delay={100}>
          <HeroSection onRegisterClick={handleOpenRegister} />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <AboutSection />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <ServicesSection />
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <FeaturedProjects />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={200}>
          <CollaborationSection />
        </ScrollReveal>
      </main>

      {/* Footer is now globally rendered in layout.js */}

      {/* Popups & Modals */}
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
    </>
  );
}
