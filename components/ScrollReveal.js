"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({ 
  children, 
  className = "", 
  animation = "fade-up", // options: fade-up, fade, slide-left, slide-right, scale, blur
  delay = 0,
  duration = 0.8
}) {
  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    "fade": {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    "scale": {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    "blur": {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay: delay / 1000, ease: "easeOut" }}
      variants={variants[animation] || variants["fade-up"]}
    >
      {children}
    </motion.div>
  );
}
