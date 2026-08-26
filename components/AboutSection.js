"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="about" className="relative w-full bg-white py-16 sm:py-12 lg:py-16 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col md:flex-row items-center justify-between w-full">
        
        {/* LEFT SIDE: Text Content */}
        <motion.div 
          className="w-full md:w-1/2 flex flex-col items-start text-left mb-16 md:mb-0 md:pr-16 z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          <motion.h2 variants={itemVariants} className="font-shareTech text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy tracking-wide uppercase">
            About Us
          </motion.h2>
          
          {/* Underline */}
          <motion.div variants={itemVariants} className="w-24 h-[3px] bg-brand-navy mt-4 mb-8"></motion.div>
          
          {/* Paragraph */}
          <motion.p variants={itemVariants} className="font-roboto text-gray-500 italic text-base sm:text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
            DevAgile is a dynamic group of software developers driving change through education and modern technical craftsmanship. We bridge traditional learning and active software production, providing comprehensive bootcamps and building tailored software architectures from conception to deployment.
          </motion.p>
          
          
        </motion.div>

        {/* RIGHT SIDE: 3D Orbit */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative z-50 h-[350px] sm:h-[450px]">
          
          <style dangerouslySetInnerHTML={{__html: `
            .orbit-scene {
              perspective: 1000px;
              transform-style: preserve-3d;
            }
            .orbit-container-1 {
              transform: rotateX(70deg);
              transform-style: preserve-3d;
              position: absolute;
              width: 320px;
              height: 320px;
            }
            .orbit-container-2 {
              transform: rotateX(70deg) rotateZ(45deg);
              transform-style: preserve-3d;
              position: absolute;
              width: 220px;
              height: 220px;
            }
            .orbit-ring-1 {
              position: absolute;
              width: 100%;
              height: 100%;
              border: 2px dashed rgba(89, 202, 147, 0.4);
              border-radius: 50%;
              transform-style: preserve-3d;
              animation: spin-ring-1 20s linear infinite;
            }
            .orbit-ring-2 {
              position: absolute;
              width: 100%;
              height: 100%;
              border: 2px dashed rgba(3, 48, 87, 0.2);
              border-radius: 50%;
              transform-style: preserve-3d;
              animation: spin-ring-2 15s linear infinite;
            }
            @keyframes spin-ring-1 {
              0% { transform: rotateZ(0deg); }
              100% { transform: rotateZ(360deg); }
            }
            @keyframes spin-ring-2 {
              0% { transform: rotateZ(0deg); }
              100% { transform: rotateZ(-360deg); }
            }
            .orbit-planet-1 {
              position: absolute;
              border-radius: 50%;
              transform-style: preserve-3d;
              animation: spin-planet-1 20s linear infinite;
            }
            .orbit-planet-2 {
              position: absolute;
              border-radius: 50%;
              transform-style: preserve-3d;
              animation: spin-planet-2 15s linear infinite;
            }
            @keyframes spin-planet-1 {
              0% { transform: translate(-50%, -50%) rotateZ(0deg) rotateX(-70deg); }
              100% { transform: translate(-50%, -50%) rotateZ(-360deg) rotateX(-70deg); }
            }
            @keyframes spin-planet-2 {
              0% { transform: translate(-50%, -50%) rotateZ(0deg) rotateZ(-45deg) rotateX(-70deg); }
              100% { transform: translate(-50%, -50%) rotateZ(360deg) rotateZ(-45deg) rotateX(-70deg); }
            }
          `}} />

          <div className="orbit-scene flex items-center justify-center w-full h-full relative">
            
            {/* Center Big Circle */}
            <div 
              className="absolute w-32 h-32 md:w-44 md:h-44 bg-brand-navy rounded-full shadow-[0_10px_40px_rgba(3,48,87,0.5)] flex items-center justify-center overflow-hidden border-4 border-brand-green/20"
              style={{ transform: 'translateZ(0)' }}
            >
               <span className="font-shareTech text-brand-white text-3xl md:text-4xl font-bold tracking-widest uppercase">
                 
               </span>
            </div>

            {/* Orbit System 1 (Outer) */}
            <div className="orbit-container-1">
              <div className="orbit-ring-1">
                {/* Planet 1 - Top */}
                <div className="orbit-planet-1 w-10 h-10 bg-brand-green shadow-[0_0_20px_rgba(89,202,147,0.6)] flex items-center justify-center text-white" style={{ top: '0%', left: '50%' }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                {/* Planet 2 - Bottom Right */}
                <div className="orbit-planet-1 w-6 h-6 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)]" style={{ top: '75%', left: '93.3%' }}></div>
                {/* Planet 3 - Bottom Left */}
                <div className="orbit-planet-1 w-8 h-8 bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.6)]" style={{ top: '75%', left: '6.7%' }}></div>
              </div>
            </div>

            {/* Orbit System 2 (Inner) */}
            <div className="orbit-container-2">
              <div className="orbit-ring-2">
                {/* Planet A - Right */}
                <div className="orbit-planet-2 w-7 h-7 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]" style={{ top: '50%', left: '100%' }}></div>
                {/* Planet B - Left */}
                <div className="orbit-planet-2 w-5 h-5 bg-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.6)]" style={{ top: '50%', left: '0%' }}></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}