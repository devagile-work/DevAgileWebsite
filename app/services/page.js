"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import RegisterModal from "@/components/RegisterModal";
import ScrollReveal from "@/components/ScrollReveal";
import ServicesSection from "@/components/ServicesSection";
import FeaturedProjects from "@/components/services/FeaturedProjects";

export default function ServicesPage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  // Animation variants for the masked text slide-up effect
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      }
    }
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-white selection:bg-brand-green/30 selection:text-brand-navy">
      <Navbar onRegisterClick={handleOpenRegister} />
      
      <main className="pt-24 lg:pt-32 pb-0 relative">
        
        {/* Services Page Hero */}
        <div className="w-full bg-brand-white flex flex-col justify-center">
          <section className="px-6 md:px-12 lg:px-24 text-center max-w-5xl mx-auto pb-16 pt-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex flex-col items-center justify-center"
            >
              {/* Title wrapped in overflow-hidden lines */}
              <h1 className="font-shareTech text-4xl sm:text-5xl lg:text-7xl font-bold text-brand-navy leading-tight uppercase mb-6 mt-16">
                <span className="block overflow-hidden pb-1">
                  <motion.span variants={lineVariants} className="block">Empowering Businesses</motion.span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <motion.span variants={lineVariants} className="block">
                    with <span className="text-brand-green">Next-Gen</span> Tech
                  </motion.span>
                </span>
              </h1>
              
              {/* Paragraph wrapped in overflow-hidden */}
              <div className="overflow-hidden mb-10 max-w-3xl mx-auto">
                <motion.p variants={lineVariants} className="font-roboto text-lg md:text-xl text-brand-navy/70 leading-relaxed">
                  We partner with forward-thinking companies to design, develop, and scale world-class software solutions. Let&apos;s transform your vision into reality.
                </motion.p>
              </div>

              {/* Buttons */}
              <motion.div variants={lineVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={handleOpenRegister}
                  className="bg-brand-navy text-white px-8 py-3 rounded-full font-shareTech font-bold text-lg uppercase tracking-wider hover:bg-brand-green hover:text-brand-navy transition-colors duration-300 shadow-lg"
                >
                  Start a Project
                </button>
                <a 
                  href="#services"
                  className="bg-brand-white text-brand-navy border-2 border-brand-navy/10 px-8 py-3 rounded-full font-shareTech font-bold text-lg uppercase tracking-wider hover:border-brand-navy transition-colors duration-300"
                >
                  Explore Services
                </a>
              </motion.div>
            </motion.div>
          </section>
        </div>

        {/* Existing Services Section Component */}
        <div className="w-full bg-[#F4F7FA] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] relative z-10">
          <ServicesSection />
        </div>

        {/* Development Process / Why Choose Us */}
        <div className="w-full bg-brand-navy shadow-[0_-20px_50px_rgba(0,0,0,0.1)] relative z-20">
          <section className="py-20 text-white text-center px-6 md:px-12 lg:px-24 relative overflow-hidden flex-1 flex flex-col justify-center">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-green/5 blur-[100px] rounded-full pointer-events-none"></div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="relative z-10"
            >
              <div className="overflow-hidden mb-4">
                <motion.h2 variants={lineVariants} className="font-shareTech text-3xl md:text-4xl font-bold uppercase">
                  Our Development Workflow
                </motion.h2>
              </div>
              <motion.div variants={lineVariants} className="h-1 w-20 bg-brand-green mx-auto rounded-full mb-12" />
              
              <motion.div variants={lineVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 max-w-6xl mx-auto">
                {[
                  { step: "01", title: "Discovery", desc: "We analyze your business needs and define technical requirements." },
                  { step: "02", title: "Design", desc: "Creating intuitive UI/UX and scalable system architectures." },
                  { step: "03", title: "Development", desc: "Agile sprints with clean, production-grade code." },
                  { step: "04", title: "Deployment", desc: "Seamless launch, CI/CD, and ongoing maintenance." }
                ].map((s, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <div className="w-20 h-20 rounded-full border border-brand-green/30 flex items-center justify-center font-shareTech text-3xl font-bold text-brand-green mb-6 group-hover:bg-brand-green group-hover:text-brand-navy group-hover:border-brand-green transition-all duration-500 shadow-[0_0_15px_rgba(89,202,147,0.1)] group-hover:shadow-[0_0_30px_rgba(89,202,147,0.4)]">
                      {s.step}
                    </div>
                    <h3 className="font-shareTech text-xl font-bold uppercase mb-3 text-white group-hover:text-brand-green transition-colors duration-300">{s.title}</h3>
                    <p className="font-roboto font-light text-white/60 text-sm leading-relaxed max-w-[200px]">{s.desc}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </section>
        </div>

        {/* Featured Projects */}
        <div className="w-full bg-[#F4F7FA] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] relative z-30">
          <FeaturedProjects />
        </div>

        {/* CTA Section */}
        <div className="w-full bg-brand-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)] relative z-40">
          <section className="py-10 md:py-16 px-6 md:px-12 lg:px-24 text-center mt-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="bg-[#F4F7FA] rounded-[2.5rem] p-10 md:p-16 max-w-5xl mx-auto shadow-sm border border-brand-navy/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-brand-navy/5 transform -skew-y-12 scale-150 group-hover:rotate-12 transition-transform duration-[2000ms] ease-out z-0"></div>

              <div className="relative z-10">
                <div className="overflow-hidden mb-6">
                  <motion.h2 variants={lineVariants} className="font-shareTech text-3xl md:text-5xl font-bold text-brand-navy uppercase">
                    Ready to Accelerate Your Growth?
                  </motion.h2>
                </div>
                
                <div className="overflow-hidden mb-10 max-w-2xl mx-auto">
                  <motion.p variants={lineVariants} className="font-roboto text-lg md:text-xl text-brand-navy/70 leading-relaxed">
                    Join startups, enterprises, and visionary founders who trust DevAgile to build their digital backbone. Let&apos;s discuss your next big idea.
                  </motion.p>
                </div>
                
                <motion.div variants={lineVariants}>
                  <button 
                    onClick={handleOpenRegister}
                    className="bg-brand-green text-brand-navy px-10 py-4 rounded-full font-shareTech font-bold text-lg md:text-xl uppercase tracking-wider hover:bg-brand-navy hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(89,202,147,0.3)] hover:shadow-[0_15px_40px_rgba(3,48,87,0.4)] hover:-translate-y-1 inline-block"
                  >
                    Schedule a Consultation
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />
    </div>
  );
}
