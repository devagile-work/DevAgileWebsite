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

      {/* Collapsible Design Tokens Drawer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-12 bg-brand-white">
        <div className="border border-brand-navy/5 bg-brand-navy/[0.02] backdrop-blur-sm rounded-xl p-4">
          <button
            onClick={() => setShowDesignSystem(!showDesignSystem)}
            className="flex items-center justify-between w-full font-shareTech text-xs font-bold uppercase tracking-widest text-brand-navy/80 hover:text-brand-green transition-colors focus:outline-none"
          >
            <span>[View Active Design Tokens & Fonts]</span>
            <span>{showDesignSystem ? "[-]" : "[+]"}</span>
          </button>
          
          {showDesignSystem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 pt-6 border-t border-brand-navy/5 animate-fade-in">
              <div className="space-y-3">
                <h4 className="font-shareTech text-sm font-bold text-brand-navy uppercase tracking-wider">
                  Font Configurations
                </h4>
                <div className="space-y-1">
                  <p className="font-shareTech text-base text-brand-navy">
                    font-shareTech: ShareTech Regular (Headers)
                  </p>
                  <p className="font-roboto font-light text-sm text-brand-navy/70">
                    font-roboto font-light: Roboto Light 300 (Sub-text)
                  </p>
                  <p className="font-roboto font-normal text-sm text-brand-navy/70">
                    font-roboto font-normal: Roboto Regular 400 (Body text)
                  </p>
                  <p className="font-roboto font-bold text-sm text-brand-navy/70">
                    font-roboto font-bold: Roboto Bold 700 (Emphasis)
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-shareTech text-sm font-bold text-brand-navy uppercase tracking-wider">
                  Active Brand Colors
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-shareTech font-bold">
                  <div className="p-3 rounded-lg bg-brand-navy text-white">
                    #033057<br />brand-navy
                  </div>
                  <div className="p-3 rounded-lg bg-brand-green text-brand-navy">
                    #59CA93<br />brand-green
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-slate-200 text-brand-navy">
                    #FFFFFF<br />brand-white
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Popups & Modals */}
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
}
