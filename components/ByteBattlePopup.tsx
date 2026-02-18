"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ByteBattlePopup = ({ onVisibilityChange }: { onVisibilityChange?: (visible: boolean) => void }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [stage, setStage] = useState<"typing" | "glitch" | "final">("typing");
    const [typedText, setTypedText] = useState("");
    const fullText = [
        "> Initializing GeekMayhem Protocol...",
        "> Scanning Participants...",
        "> Activating Battle Arena...",
        "> BYTE BATTLE 3.0 READY."
    ];
    const router = useRouter();

    useEffect(() => {
        // Show popup after a short delay on page load
        const timeout = setTimeout(() => {
            setIsVisible(true);
            onVisibilityChange?.(true);
            startTypingSequence();
        }, 1500); // Wait for main page intro to settle slightly

        return () => clearTimeout(timeout);
    }, []);

    const startTypingSequence = async () => {
        for (let line of fullText) {
            setTypedText((prev) => prev + line + "\n");
            await new Promise((r) => setTimeout(r, 600)); // Delay between lines
        }
        await new Promise((r) => setTimeout(r, 1000)); // Longer pause to read "READY"
        setStage("final");
    };

    const handleEnterBattle = () => {
        setIsVisible(false);
        onVisibilityChange?.(false);
        router.push("/events/byte-battle");
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    {/* Container */}
                    <div
                        className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[#FFD700]/30 bg-black shadow-[0_0_50px_rgba(255,215,0,0.15)]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255, 209, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 209, 0, 0.05) 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}
                    >

                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setIsVisible(false);
                                onVisibilityChange?.(false);
                            }}
                            className="absolute top-4 right-4 z-20 text-white/50 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 p-6 md:p-8 flex flex-col items-center text-center">

                            {stage === "typing" && (
                                <div className="font-jetbrains text-[#00ff00] text-left w-full h-[250px] p-4 bg-black border border-green-900/50 rounded-lg shadow-inner shadow-green-900/20 text-sm">
                                    <div className="whitespace-pre-line leading-relaxed">
                                        {typedText}
                                        <motion.span
                                            animate={{ opacity: [0, 1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="inline-block w-2.5 h-5 bg-[#00ff00] ml-1 align-middle"
                                        />
                                    </div>
                                </div>
                            )}

                            {stage === "glitch" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
                                    <h1 className="text-6xl md:text-8xl font-black font-public-sans text-white mix-blend-difference animate-pulse">
                                        BYTE BATTLE
                                    </h1>
                                </div>
                            )}

                            {stage === "final" && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", duration: 0.8 }}
                                    className="w-full"
                                >
                                    {/* Icon / Brand */}
                                    <div className="mb-4 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-[#FFD700] blur-[40px] opacity-20 animate-pulse" />
                                            <img
                                                src="/Components%20for%20Website/solvify_logo.png"
                                                alt="Solvify Logo"
                                                className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                                            />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className="font-bebas text-4xl sm:text-5xl md:text-6xl text-white mb-2 tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                        BYTE <span className="text-outline">BATTLE</span> <span className="text-[#FFD700]">3.0</span>
                                    </h2>
                                    <p className="text-[#FFD100] font-goldman italic text-xs tracking-[0.2em] mb-6 uppercase">
                                        GEEKMAYHEM 2026: TECHNICAL SHOWDOWN
                                    </p>

                                    {/* Description */}
                                    <p className="text-gray-300 mb-6 max-w-sm mx-auto leading-relaxed font-montserrat text-sm">
                                        Enter the ultimate multi-round technical showdown.<br />
                                        <span className="text-[#FFD700] font-semibold">Logic. AI. Code. Strategy. Speed.</span>
                                    </p>

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-6 text-sm border-t border-b border-white/10 py-4 font-montserrat">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white/50 text-xs uppercase tracking-wider font-bold">Prize Pool</span>
                                            <span className="text-[#FFD700] font-bold text-xl font-michroma">₹12,000</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white/50 text-xs uppercase tracking-wider font-bold">Team Size</span>
                                            <span className="text-white font-bold"><span className="font-michroma">2</span> <span className="font-jetbrains">Members</span></span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white/50 text-xs uppercase tracking-wider font-bold">Venue</span>
                                            <span className="text-white font-bold font-jetbrains">CSE Lab <span className="font-michroma">6</span></span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-white/50 text-xs uppercase tracking-wider font-bold">Fee</span>
                                            <span className="text-white font-bold font-michroma">₹100</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={handleEnterBattle}
                                            className="px-9 py-3.5 bg-[#FFD700] text-black font-bold text-base uppercase tracking-wider hover:bg-white hover:text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] clip-path-polygon font-goldman"
                                        >
                                            REGISTER NOW
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Background Effects */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
                            <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FFD700]/50 to-transparent" />
                            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#FFD700]/50 to-transparent" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ByteBattlePopup;

// Add Global Style just to be safe if this component is used elsewhere
<style jsx global>{`
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Chakra+Petch:ital,wght@1,700&family=Goldman&family=JetBrains+Mono&family=Michroma&family=Public+Sans:wght@900&display=swap');

  .font-bebas {
    font-family: 'Bebas Neue', sans-serif;
  }

  .font-public-sans {
    font-family: 'Public Sans', sans-serif;
  }
  .font-chakra {
    font-family: 'Chakra Petch', sans-serif;
  }
  .font-goldman {
    font-family: 'Goldman', cursive;
  }
  .font-michroma {
    font-family: 'Michroma', sans-serif;
  }
  .font-jetbrains {
    font-family: 'JetBrains Mono', monospace;
  }
  .text-outline {
    -webkit-text-stroke: 2px white;
    color: transparent;
  }
  .clip-path-polygon {
    clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
  }
`}</style>
