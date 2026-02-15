"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Descriptions focus on technical skills: coding, debugging, and problem solving.
 * Dimensions: 
 * Desktop: 350px width, 290px height
 * Mobile: 250px width, 215px height (scaled proportionally)
 */
const eventsDataRaw = [
  {
    name: "Byte Battle 1",
    description: "A competitive coding challenge focused on debugging and efficient problem solving.",
    photos: [
      { img: "/event/Byte_Battle_1/Screenshot 2026-01-17 235934.png" },
    ],
  },
  {
    name: "Byte Battle 2",
    description: "Technical challenges featuring Tech Bingo, AI prompts, and Bug Bash debugging.",
    photos: [
      { img: "/event/Byte_Battle_2/IMG_4618.jpg" },
    ],
  },
  {
    name: "Glitchfix",
    description: "An intense arena dedicated to real-time debugging and problem solving.",
    photos: [
      { img: "/event/Glitchfix/IMG_0689.JPG" },
    ],
  },
  {
    name: "WorkShop",
    description: "Mentorship sessions by alumni bridging the gap to professional workflows.",
    photos: [
      { img: "/event/WorkShop/20250920_103310AMbyGPSMapCamera.jpg" },
    ],
  },
];

const Event = () => {
  // Flattening the nested structure into a single list for the 3D carousel
  const eventData = useMemo(() => {
    const flattened = [];
    eventsDataRaw.forEach((event, i) => {
      event.photos.forEach((pic, j) => {
        flattened.push({
          id: `event-${i}-pic-${j}`,
          name: event.name,
          description: event.description,
          img: pic.img,
        });
      });
    });
    return flattened;
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % eventData.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + eventData.length) % eventData.length);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] text-white py-10">
      
      {/* Background Ambient Glows (Gold Solvify Theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFD700]/10 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[#FFD700]/5 blur-[60px] rounded-full pointer-events-none z-0" />

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 z-10 w-full text-center px-4"
      >
        <h1 className="font-bebas text-[clamp(2.5rem,7vw,5rem)] font-black uppercase tracking-[0.1em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Events
        </h1>
        <div className="mx-auto mt-1 h-[3px] w-[60px] bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
      </motion.div>

      {/* 3D Carousel Container - Height adjusted to 330px to accommodate taller cards and scale effect */}
      <div className="relative w-full max-w-[1200px] h-[330px] flex items-center justify-center perspective-[1200px] z-10">
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
          {eventData.map((event, index) => {
            const offset = index - activeIndex;
            const isCenter = index === activeIndex;
            const absOffset = Math.abs(offset);

            // Hide cards that are too far away for performance
            if (absOffset > 2) return null;

            return (
              <motion.div
                key={event.id}
                initial={false}
                animate={{
                  x: offset * 310, 
                  rotateY: offset * -35, 
                  z: isCenter ? 120 : -120, 
                  scale: isCenter ? 1.05 : 0.75, 
                  opacity: absOffset > 1 ? 0.3 : 1, 
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                onClick={() => setActiveIndex(index)}
                className={`absolute w-[250px] md:w-[350px] h-[215px] md:h-[290px] cursor-pointer rounded-xl overflow-hidden border-[1px] ${
                  isCenter ? "border-[#FFD700] shadow-[0_0_40px_rgba(255,215,0,0.2)]" : "border-white/10"
                } transition-shadow duration-500`}
                style={{
                  zIndex: 10 - absOffset,
                  transformStyle: "preserve-3d"
                }}
              >
                <div className="relative w-full h-full group">
                  <img
                    src={event.img}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  {/* Darker gradient for text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-0"}`} />
                  
                  {isCenter && (
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="absolute bottom-3 left-4 right-4 z-20"
                    >
                        {/* Event Name - Increased Size */}
                        <p className="font-bebas text-xl md:text-2xl tracking-widest text-[#FFD700] drop-shadow-md leading-none mb-1.5">
                            {event.name}
                        </p>
                        {/* Event Description - Increased Size & Beautified Font */}
                        <p className="font-outfit text-[12px] md:text-[14px] text-white/95 leading-relaxed font-normal tracking-wide">
                            {event.description}
                        </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="mt-6 flex items-center gap-6 z-20">
        <button 
          onClick={prevSlide}
          className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all text-white group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <div className="hidden md:flex gap-1.5">
            {eventData.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1 transition-all duration-300 rounded-full ${i === activeIndex ? "w-6 bg-[#FFD700]" : "w-1.5 bg-white/20"}`}
                />
            ))}
        </div>

        <button 
          onClick={nextSlide}
          className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all text-white group"
        >
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
        
        .perspective-1200 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
        
        @font-face {
          font-family: 'Bebas';
          src: url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        }
        
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
      `}</style>
    </div>
  );
};

export default Event;