"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Cpu, Terminal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ByteBattleCard = () => {
    const router = useRouter();

    const handleCardClick = () => {
        router.push("/events/byte-battle");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto my-16 px-4"
        >

            {/* Section Title */}
            <div className="flex items-center gap-4 mb-8">
                <h2 className="font-bebas text-4xl md:text-5xl text-white tracking-wider">
                    Upcoming <span className="text-[#FFD700]">Events</span>
                </h2>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-[#FFD700]/50 to-transparent"></div>
            </div>

            <motion.div
                whileHover={{ scale: 1.02 }}
                onHoverStart={(e) => { }}
                onHoverEnd={(e) => { }}
                onClick={handleCardClick}
                className="group relative w-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] transition-all duration-500"
            >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/5 to-[#FFD700]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex flex-col md:flex-row h-full">

                    {/* Left Side: Visuals & Info */}
                    <div className="relative md:w-2/5 h-64 md:h-auto overflow-hidden bg-black">
                        {/* Background Image / Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-black" />

                        {/* Tech Pattern Overlay */}
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: "radial-gradient(#FFD700 1px, transparent 1px)",
                                backgroundSize: "20px 20px"
                            }}
                        />

                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col items-center justify-center p-6 h-full text-center">

                            {/* Icon */}
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="mb-6 relative"
                            >
                                <div className="absolute inset-0 bg-[#FFD700] blur-2xl opacity-20" />
                                <img
                                    src="/Components%20for%20Website/solvify_logo.png"
                                    alt="Solvify Logo"
                                    className="w-20 h-20 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                                />
                            </motion.div>

                            {/* Title */}
                            <h3 className="text-4xl md:text-5xl font-bebas text-white mb-2 tracking-wide drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                                BYTE BATTLE 3.0
                            </h3>

                            {/* Description */}
                            <div className="mb-8">
                                <span className="text-[#FFD700] font-bold font-montserrat text-sm tracking-widest block">
                                    GEEKMAYHEM 2026
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="md:w-3/5 p-8 flex flex-col justify-center relative">

                        <div className="mb-6">
                            <h4 className="text-xl font-bold font-montserrat text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                                A 3-Round Technical Showdown
                            </h4>
                            <p className="text-gray-400 text-sm leading-relaxed font-montserrat">
                                Test your skills in Logic, AI Prompt Engineering, and Advanced Coding.
                                Compete for glory and prizes.
                            </p>
                        </div>

                        {/* Rounds Pills */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-montserrat text-[#FFD700] flex items-center gap-2">
                                <Brain size={12} /> Logic Links
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-montserrat text-[#FFD700] flex items-center gap-2">
                                <Terminal size={12} /> Prompt Heist
                            </span>
                            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-montserrat text-[#FFD700] flex items-center gap-2">
                                <Cpu size={12} /> Code Weave
                            </span>
                        </div>

                        {/* Bottom Row: Prize & CTA */}
                        <div className="flex items-center justify-between mt-auto">
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-1 font-montserrat">
                                    Total Prize Pool
                                </p>
                                <p className="text-2xl font-bold text-white group-hover:text-[#FFD700] transition-colors font-montserrat">
                                    ₹12,000
                                </p>
                            </div>

                            <div className="flex items-center gap-2 text-[#FFD700] font-bold tracking-wide group-hover:translate-x-1 transition-transform font-montserrat">
                                <span>Click to Enter</span>
                                <ArrowRight size={20} />
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default ByteBattleCard;
