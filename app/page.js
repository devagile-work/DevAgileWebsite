"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import CollaborationSection from "../components/CollaborationSection";
import Footer from "../components/Footer";
import RegisterModal from "../components/RegisterModal";

export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <div className="relative min-h-screen bg-brand-white selection:bg-brand-green/30 selection:text-brand-navy">
      {/* Navigation */}
      <Navbar onRegisterClick={handleOpenRegister} />

      {/* Main Sections */}
      <main>
        <HeroSection onRegisterClick={handleOpenRegister} />
        
        <AboutSection />
        
        <ServicesSection />
        
        <CollaborationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Popups & Modals */}
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
}
