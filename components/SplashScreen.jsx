"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    // Stage 0: Initial cinematic entry
    
    // Stage 1: Fade out logo and text smoothly
    const t1 = setTimeout(() => setStage(1), 2500); 
    
    // Stage 2: Open the doors (Panels slide out)
    const t2 = setTimeout(() => {
      setStage(2);
      document.body.style.overflow = "unset";
    }, 3200); 

    // Unmount completely
    const t3 = setTimeout(() => onComplete(), 4200); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  const text = "DevAgile";

  // Sleek, cinematic text stagger
  const sentence = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  // Subtle blur and slide reveal
  const letter = {
    hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Premium easing curve for the doors (starts fast, slows down smoothly)
  const doorEase = [0.22, 1, 0.36, 1];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-transparent">
      
      {/* Left Panel - Navy */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-brand-navy shadow-2xl"
        initial={{ x: "0%" }}
        animate={stage < 2 ? { x: "0%" } : { x: "-100%" }}
        transition={{ duration: 1, ease: doorEase }}
      />
      
      {/* Right Panel - Navy (Creates a seamless background until split) */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-brand-navy shadow-2xl"
        initial={{ x: "0%" }}
        animate={stage < 2 ? { x: "0%" } : { x: "100%" }}
        transition={{ duration: 1, ease: doorEase }}
      />

      {/* Central Laser Accent Line */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-brand-green z-10 origin-top shadow-[0_0_15px_rgba(0,255,100,0.5)]"
        style={{ transform: "translateX(-50%)" }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={
          stage === 0
            ? { scaleY: 1, opacity: [0, 0.8, 0.3] } // Shoots down, then dims
            : stage === 1
            ? { opacity: 1, filter: "brightness(1.5)" } // Flashes before split
            : { opacity: 0, scaleY: 0 } // Disappears when doors open
        }
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Background Glow behind Logo */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[100px] pointer-events-none z-10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={stage < 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Center Content Wrapper */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-6"
        initial={{ opacity: 1 }}
        animate={
          stage < 1 
            ? { opacity: 1, y: 0 } 
            : { opacity: 0, y: -20, filter: "blur(10px)" } // Sleek exit animation
        }
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/logos/darkModeICON.png"
            alt="DevAgile Logo"
            className="w-24 h-24 object-contain drop-shadow-xl"
          />
        </motion.div>
        
        {/* Animated Text */}
        <motion.h1
          className="text-5xl font-light text-brand-white tracking-[0.2em] flex font-shareTech"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {text.split("").map((char, index) => (
            <motion.span 
              key={char + "-" + index} 
              variants={letter}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </motion.div>
    </div>
  );
}