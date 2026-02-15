"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { 
  Code2, 
  Palette, 
  PenTool, 
  Users2, 
  Settings, 
  Share2,
  Zap
} from "lucide-react";

const domains = [
  {
    id: "SLV-001",
    title: "TECHNICAL",
    subtitle: "Core Architecture",
    description: "The architects of Solvify. We handle everything from web development and app creation to integrating AI and solving complex logic challenges.",
    icon: <Code2 className="w-5 h-5" />,
    specs: ["Latency: <50ms", "Stack: Full-Stack", "Auth: Encrypted"],
    coords: "40.7128° N"
  },
  {
    id: "SLV-002",
    title: "DESIGN",
    subtitle: "UI/UX Dynamics",
    description: "Visualizers who bring the club's identity to life. We focus on UI/UX, branding, motion graphics, and ensuring every touchpoint is immersive.",
    icon: <Palette className="w-5 h-5" />,
    specs: ["DPI: 300+", "UX: Fluid-Motion", "Type: Variable"],
    coords: "74.0060° W"
  },
  {
    id: "SLV-003",
    title: "CONTENT",
    subtitle: "Logic Narrative",
    description: "Translating tech into stories. Our domain handles technical writing, blogging, and documentation to make innovation accessible to everyone.",
    icon: <PenTool className="w-5 h-5" />,
    specs: ["Syntax: Markdown", "SEO: Optimized", "Tone: Technical"],
    coords: "34.0522° N"
  },
  {
    id: "SLV-004",
    title: "PR",
    subtitle: "External Interface",
    description: "Building bridges. We connect Solvify with industry experts, other communities, and handle corporate relations to expand our ecosystem.",
    icon: <Users2 className="w-5 h-5" />,
    specs: ["Nodes: 500+", "Protocol: TCP/IP", "Relay: Active"],
    coords: "118.2437° W"
  },
  {
    id: "SLV-005",
    title: "OPERATIONS",
    subtitle: "Process Engine",
    description: "The backbone of every event. We manage logistics, timelines, and execution to ensure our projects run with clockwork precision.",
    icon: <Settings className="w-5 h-5" />,
    specs: ["Uptime: 99.9%", "Load: Optimized", "Sync: Real-time"],
    coords: "51.5074° N"
  },
  {
    id: "SLV-006",
    title: "SOCIAL MEDIA",
    subtitle: "Signal Broadcast",
    description: "Managing the buzz. We curate our digital footprint across platforms, engaging the community and keeping everyone updated with the latest trends.",
    icon: <Share2 className="w-5 h-5" />,
    specs: ["Freq: 2.4GHz", "Pulse: Social", "Stream: Live"],
    coords: "0.1278° W"
  },
];

const Domains = () => {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative w-full bg-[#030303] text-white py-32 px-4 overflow-hidden font-mono">
      
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* Background Technical Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden select-none">
         <div className="absolute top-10 left-10 text-[10px] text-white/20 uppercase tracking-[0.5em]">SYSTEM_VERSION_4.0.1</div>
         <div className="absolute bottom-10 right-10 text-[10px] text-white/20 uppercase tracking-[0.5em]">AUTH_SOLVIFY_CORE</div>
      </div>

      <div className="relative z-10 text-center mb-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="inline-block px-4 py-1 mb-4 border border-[#FFD700]/30 rounded-sm text-[10px] text-[#FFD700] tracking-[0.3em]"
        >
          CORE COMPONENTS // REV_06
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-bebas text-[clamp(2.5rem,8vw,5rem)] font-black uppercase tracking-tighter text-white"
        >
          OUR <span className="text-[#FFD700] italic">DOMAINS</span>
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Domain Grid System - No Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain) => {
            return (
              <motion.div 
                key={domain.id} 
                className="relative group cursor-crosshair"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Technical Frame */}
                <div className="absolute inset-0 border border-white/10 group-hover:border-[#FFD700]/50 transition-colors duration-500" />
                
                {/* Corner Marks */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#FFD700]/40 group-hover:border-[#FFD700]" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#FFD700]/40 group-hover:border-[#FFD700]" />

                <div className="p-8 bg-white/[0.02] backdrop-blur-md group-hover:bg-[#FFD700]/[0.03] transition-all duration-500 h-full flex flex-col">
                  {/* ID Tag */}
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] text-white/30 tracking-widest font-mono">ID: {domain.id}</span>
                    <div className="text-[#FFD700] opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all">
                      {domain.icon}
                    </div>
                  </div>

                  <h2 className="font-bebas text-3xl tracking-tight text-white mb-1 group-hover:text-[#FFD700] transition-colors uppercase">
                    {domain.title}
                  </h2>
                  <div className="text-[10px] text-[#FFD700]/60 mb-4 tracking-[0.2em] font-bold uppercase italic">
                    {domain.subtitle}
                  </div>
                  
                  <p className="font-montserrat text-sm leading-relaxed text-white/50 group-hover:text-white/80 transition-colors mb-8 flex-grow">
                    {domain.description}
                  </p>

                  {/* Technical Specs Overlay (Active on hover) */}
                  <div className="grid grid-cols-1 gap-2 border-t border-white/10 pt-4">
                    {domain.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 bg-[#FFD700]/40" />
                        <span className="text-[9px] uppercase tracking-tighter text-white/30 group-hover:text-[#FFD700]/80 transition-colors">
                          {spec}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Decorative Coordinate */}
                  <div className="absolute bottom-2 right-2 text-[8px] text-white/10 font-mono group-hover:text-[#FFD700]/20">
                    LOC_{domain.coords}
                  </div>
                </div>

                {/* Laser Scanner Line Effect */}
                <motion.div 
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-[#FFD700]/20 group-hover:bg-[#FFD700]/50 pointer-events-none z-30"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Design Specs */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-8 text-[9px] text-white/20 uppercase tracking-widest">
           <div>SCALE: 1:25</div>
           <div>COORD: GLOBAL_GRID</div>
           <div>STATUS: OPERATIONAL</div>
        </div>
        <div className="flex items-center gap-2 text-[#FFD700]/40 text-[9px]">
           <Zap className="w-3 h-3" />
           POWER_LEVEL: STABLE
        </div>
      </div>

    </div>
  );
};

export default Domains;