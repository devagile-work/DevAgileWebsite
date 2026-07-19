"use client";

import ServicesGrid from "./services/ServicesGrid";
import ReviewsCarousel from "./services/ReviewsCarousel";

export default function ServicesSection() {
  return (
    <section id="services" className="min-h-screen w-full flex flex-col justify-center bg-brand-white relative overflow-hidden py-16 sm:py-24">
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(3,48,87,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(3,48,87,0.01)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
      
      {/* Background shape */}
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-green/10 blur-[120px] z-0 animate-pulse-glow" />

      <div className="max-w-[100vw] mx-auto relative z-10 overflow-hidden">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 lg:mb-10 space-y-3 px-10 md:px-16 lg:px-24">
          <h2 className="font-shareTech text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-navy uppercase">
            Our Services
          </h2>
          <div className="h-1 w-20 bg-brand-green mx-auto rounded-full" />
          <p className="font-roboto font-light text-brand-navy/80 text-sm sm:text-base leading-relaxed pt-2">
            We provide full-cycle software services to companies looking to develop custom digital assets.
          </p>
        </div>

        <ServicesGrid />

      </div>
    </section>
  );
}
