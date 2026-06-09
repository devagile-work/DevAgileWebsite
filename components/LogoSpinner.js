"use client";

import Image from "next/image";

export default function LogoSpinner() {
  const technologies = [
    { name: "C++", src: "/technologies/cpp.png" },
    { name: "CSS", src: "/technologies/css.png" },
    { name: "HTML", src: "/technologies/html.png" },
    { name: "Java", src: "/technologies/java.png" },
    { name: "JavaScript", src: "/technologies/javascript.png" },
    { name: "MongoDB", src: "/technologies/mongodb.png" },
    { name: "Python", src: "/technologies/python.png" },
    { name: "React", src: "/technologies/react.png" },
  ];

  // 1. INCREASED RADIUS: Changed from 180 to 250
  const radius = 250; 
  const angleStep = 360 / technologies.length;

  return (
    // 2. INCREASED CONTAINER SIZE: Scaled up to 600px to accommodate the 250px radius (500px diameter + logo sizes)
    <div className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] flex items-center justify-center select-none group">
      {/* Glow effect behind the center */}
      <div className="absolute w-48 h-48 rounded-full bg-brand-green/10 blur-[40px] z-0 animate-pulse-glow" />

      {/* Orbit Rings (Dashed Circles) */}
      {/* 3. INCREASED ORBIT RINGS: Outer ring is now 500px (2 * 250 radius), inner ring scaled to 360px */}
      <div className="absolute w-[500px] h-[500px] border border-dashed border-brand-navy/10 rounded-full z-0 pointer-events-none" />
      <div className="absolute w-[360px] h-[360px] border border-dotted border-brand-navy/5 rounded-full z-0 pointer-events-none" />

      {/* Central Core Text removed as requested */}

      {/* Rotating Logos Container */}
      <div className="absolute inset-0 w-full h-full animate-spin-clockwise group-hover:[animation-play-state:paused] z-10">
        {technologies.map((tech, index) => {
          const angle = index * angleStep;
          return (
            <div
              key={tech.name}
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`,
                top: "50%",
                left: "50%",
              }}
              className="absolute group/logo hover:z-30"
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-brand-navy text-white text-[10px] font-bold font-shareTech rounded shadow-md opacity-0 scale-75 group-hover/logo:opacity-100 group-hover/logo:scale-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/10">
                {tech.name}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-brand-navy" />
              </div>

              {/* Logo Circle Container */}
              <div className="w-20 h-20 rounded-full bg-white border border-slate-100 p-3.5 flex items-center justify-center shadow-md hover:shadow-xl hover:border-brand-green/40 hover:scale-115 transition-all duration-300">
                <img
                  src={tech.src}
                  alt={tech.name}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full animate-spin-counter group-hover:[animation-play-state:paused]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}