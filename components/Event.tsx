"use client";

import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const eventsDataRaw = [
  {
    name: "Byte Battle 1",
    description: "A competitive coding challenge focused on debugging and efficient problem solving.",
    photos: [
      { img: "/event/BYTE BATTLE.jpeg" },
    ],
  },
  {
    name: "Byte Battle 2",
    description: "Technical challenges featuring Tech Bingo, AI prompts, and Bug Bash debugging.",
    photos: [
      { img: "/event/BYTE BATTLE 2.jpeg" },
    ],
  },
  {
    name: "Glitchfix",
    description: "An intense arena dedicated to real-time debugging and problem solving.",
    photos: [
      { img: "/event/GLITCH FIX.jpeg" },
    ],
  },
  {
    name: "WorkShop",
    description: "Mentorship sessions by alumni bridging the gap to professional workflows.",
    photos: [
      { img: "/event/Coding Collab.jpeg" },
    ],
  },
];

const EventCard = ({ event, index, progress, total }: { event: any; index: number; progress: any; total: number }) => {
  const step = 1 / (total - 1);
  const center = index * step;

  const opacity = useTransform(progress, (p: number) => {
    const diff = Math.abs((p - center) / step);
    // Dim inactive cards, but keep them visible on the sides
    return Math.max(0.3, 1 - diff * 0.5);
  });

  const x = useTransform(progress, (p: number) => {
    const diff = (p - center) / step;
    // diff < 0 (future): positive x (right side)
    // diff > 0 (past): negative x (left side)
    // Reversed the animation so upcoming events come from the right
    return `calc(${-diff * 25}vw)`;
  });

  const scale = useTransform(progress, (p: number) => {
    const diff = Math.abs((p - center) / step);
    // Active card is full size (1), side cards are shrunk down
    return Math.max(0.6, 1 - diff * 0.3);
  });

  const rotateY = useTransform(progress, (p: number) => {
    const diff = (p - center) / step;
    // Reversed 3D inward tilt towards the center to match the new coming-from-right direction
    return diff * -15;
  });

  const zIndex = useTransform(progress, (p: number) => {
    const diff = Math.abs((p - center) / step);
    // Active card is ALWAYS on top
    return 50 - Math.round(diff * 10);
  });

  return (
    <motion.div
      style={{
        opacity,
        x,
        scale,
        rotateY,
        zIndex,
        transformOrigin: "center left",
        pointerEvents: useTransform(opacity, (val) => val < 0.1 ? "none" : "auto")
      }}
      className="absolute inset-0 flex items-center justify-center p-4 pt-40 md:pt-48 lg:pt-56" // Significantly increased top padding to distance from header
    >
      {/* Strict portrait sizing to make pictures look properly framed and attractive */}
      <div className="relative w-full max-w-[280px] md:max-w-[360px] lg:max-w-[420px] aspect-[3/4] group rounded-3xl overflow-hidden border border-[#FFD700]/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#050505] pointer-events-auto">
        <img
          src={event.img}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800";
          }}
        />
        {/* Adjusted gradient for a more 'cinematic' darker bottom that fades softer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent/10 opacity-100 pointer-events-none" />

        {/* Adjusted Text Positioning & Sizing */}
        <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-20">
          <p className="font-bebas text-3xl md:text-5xl lg:text-6xl tracking-widest text-[#FFD700] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none mb-2 md:mb-3">
            {event.name}
          </p>
          <div className="h-[2px] w-12 bg-[#FFD700]/50 mb-3 md:mb-4"></div>
          <p className="font-outfit text-xs md:text-base lg:text-lg text-white/90 leading-relaxed font-light tracking-wide line-clamp-3">
            {event.description}
          </p>
        </div>
      </div >
    </motion.div >
  );
};

const EventSection = () => {
  const eventData = useMemo(() => {
    const flattened: any[] = [];
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

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
    restDelta: 0.001
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#050505] text-white"
      style={{ height: `${eventData.length * 100}vh` }}
    >
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden">

        {/* Background Ambient Glows (Gold Solvify Theme) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFD700]/10 blur-[120px] rounded-full pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[#FFD700]/5 blur-[80px] rounded-full pointer-events-none z-0" />

        {/* Title Section Fixed at Top */}
        <div className="absolute top-[8%] left-0 w-full text-center z-20 px-4">
          <h1 className="font-bebas text-[clamp(2.5rem,7vw,5rem)] font-black uppercase tracking-[0.1em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Events
          </h1>
          <div className="mx-auto mt-2 h-[3px] w-[60px] bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
        </div>

        {/* Cards Container - added 3D perspective to map the rotation visually */}
        <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none perspective-[1500px]">
          {eventData.map((ev, i) => (
            <EventCard
              key={ev.id}
              event={ev}
              index={i}
              progress={smoothProgress}
              total={eventData.length}
            />
          ))}
        </div>



      </div>

      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');
        
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

export default EventSection;