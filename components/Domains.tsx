"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { 
  Code2, 
  Palette, 
  PenTool, 
  Users2, 
  Settings, 
  Share2 
} from "lucide-react";

// Data matching the 6 domains of Solvify
const domains = [
  {
    id: 1,
    title: "TECHNICAL",
    subtitle: "Core Development",
    description: "The architects of Solvify. We handle everything from web development and app creation to integrating AI and solving complex logic challenges.",
    icon: <Code2 className="w-6 h-6" />,
    color: "#FFD700",
  },
  {
    id: 2,
    title: "DESIGN",
    subtitle: "Visual Storytelling",
    description: "Visualizers who bring the club's identity to life. We focus on UI/UX, branding, motion graphics, and ensuring every touchpoint is immersive.",
    icon: <Palette className="w-6 h-6" />,
    color: "#FFD700",
  },
  {
    id: 3,
    title: "CONTENT",
    subtitle: "The Narrative Voice",
    description: "Translating tech into stories. Our domain handles technical writing, blogging, and documentation to make innovation accessible to everyone.",
    icon: <PenTool className="w-6 h-6" />,
    color: "#FFD700",
  },
  {
    id: 4,
    title: "PR",
    subtitle: "Global Networking",
    description: "Building bridges. We connect Solvify with industry experts, other communities, and handle corporate relations to expand our ecosystem.",
    icon: <Users2 className="w-6 h-6" />,
    color: "#FFD700",
  },
  {
    id: 5,
    title: "OPERATIONS",
    subtitle: "Strategic Engine",
    description: "The backbone of every event. We manage logistics, timelines, and execution to ensure our projects run with clockwork precision.",
    icon: <Settings className="w-6 h-6" />,
    color: "#FFD700",
  },
  {
    id: 6,
    title: "SOCIAL MEDIA",
    subtitle: "Digital Pulse",
    description: "Managing the buzz. We curate our digital footprint across platforms, engaging the community and keeping everyone updated with the latest trends.",
    icon: <Share2 className="w-6 h-6" />,
    color: "#FFD700",
  },
];

const Domains = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative w-full bg-[#050505] text-white py-24 px-4 overflow-hidden">
      
      {/* Section Header */}
      <div className="relative z-10 text-center mb-24">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bebas text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-widest text-white"
        >
          OUR <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">DOMAINS</span>
        </motion.h1>
        <div className="mx-auto mt-4 h-[3px] w-[100px] bg-[#FFD700] shadow-[0_0_15px_rgba(255,215,0,0.4)]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        
        {/* The Central Vertical Line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10 z-0">
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="w-full h-full bg-gradient-to-b from-[#FFD700] via-[#FFD700] to-[#E5C100] shadow-[0_0_15px_rgba(255,215,0,0.5)]"
          />
        </div>

        {/* Domain Timeline Items */}
        <div className="flex flex-col gap-24">
          {domains.map((domain, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={domain.id} 
                className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* The Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-[#050505] border-2 border-[#FFD700] z-20 flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.4)]">
                   <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                </div>

                {/* Content Card Area */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-16' : 'md:pr-16'} pl-12 pr-4`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#FFD700]/30 transition-all duration-500 group"
                  >
                    {/* Badge / Subtitle */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                      {domain.icon}
                      {domain.subtitle}
                    </div>

                    <h2 className="font-bebas text-3xl md:text-4xl tracking-wider text-white mb-4 group-hover:text-[#FFD700] transition-colors">
                      {domain.title}
                    </h2>
                    
                    <p className="font-montserrat text-sm md:text-base leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                      {domain.description}
                    </p>

                    {/* Decorative Corner Element */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 border-t-2 border-r-2 border-[#FFD700] rounded-tr-xl" />
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for the other side on desktop */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Watermark removed as requested */}
    </div>
  );
};

export default Domains;