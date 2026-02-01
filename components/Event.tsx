"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// This imports your actual local data
import events from "@/lib/data/events.json";

const Event = () => {
  // Flatten your nested JSON structure (Events -> Photos) into a single list
  // so that every poster becomes a separate slide in the 3D carousel.
  const eventData = useMemo(() => {
    const flattened: { id: string; name: string; img: string }[] = [];
    events.forEach((event: any, i: number) => {
      event.photos.forEach((pic: any, j: number) => {
        flattened.push({
          id: `event-${i}-pic-${j}`,
          name: event.name,
          img: pic.img, // This uses your exact local paths from events.json
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
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] text-white py-20">
      
      {/* Background Ambient Glows (Gold Solvify Theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFD700]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FFD700]/5 blur-[80px] rounded-full pointer-events-none z-0" />

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 z-10 w-full text-center"
      >
        <h1 className="font-bebas text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-[0.1em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          Events
        </h1>
        <div className="mx-auto mt-2 h-[4px] w-[80px] bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
      </motion.div>

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-[1400px] h-[500px] flex items-center justify-center perspective-[1200px] z-10">
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
                  x: offset * 280, 
                  rotateY: offset * -45, 
                  z: isCenter ? 150 : -150, 
                  scale: isCenter ? 1.15 : 0.85, 
                  opacity: absOffset > 1 ? 0.4 : 1, 
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                onClick={() => setActiveIndex(index)}
                className={`absolute w-[300px] md:w-[350px] aspect-[3/4] cursor-pointer rounded-2xl overflow-hidden border-[1px] ${
                  isCenter ? "border-[#FFD700] shadow-[0_0_50px_rgba(255,215,0,0.3)]" : "border-white/10"
                } transition-shadow duration-500`}
                style={{
                    zIndex: 10 - absOffset,
                    transformStyle: "preserve-3d"
                }}
              >
                <div className="relative w-full h-full group">
                  <img
                    src={event.img} // THIS REFERENCES YOUR LOCAL IMAGES
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback just in case a path is broken
                      e.currentTarget.src = "https://via.placeholder.com/400x600?text=Poster+Missing";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isCenter ? "opacity-100" : "opacity-0"}`} />
                  
                  {isCenter && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-6 left-6 right-6"
                    >
                        <p className="font-bebas text-2xl tracking-widest text-[#FFD700] drop-shadow-md">
                            {event.name}
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
      <div className="mt-12 flex items-center gap-8 z-20">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all text-white group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <div className="flex gap-2">
            {eventData.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 transition-all duration-300 rounded-full ${i === activeIndex ? "w-8 bg-[#FFD700]" : "w-2 bg-white/20"}`}
                />
            ))}
        </div>

        <button 
          onClick={nextSlide}
          className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all text-white group"
        >
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <style>{`
        .perspective-1200 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
    </div>
  );
};

export default Event;