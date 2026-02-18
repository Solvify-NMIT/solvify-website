"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Brain, Terminal, Cpu, Clock, Trophy, Users, MapPin, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";


// --- Components ---

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        // Set target date to Feb 27, 2026, 10:00 AM
        const targetDate = new Date("2026-02-27T10:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                setHasStarted(true);
                clearInterval(interval);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (hasStarted) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
            >
                <h1 className="text-4xl md:text-6xl font-black text-[#FF0000] animate-pulse tracking-widest">
                    THE BATTLE HAS BEGUN.
                </h1>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <p className="text-[#FFD700] text-xl md:text-2xl uppercase tracking-[0.3em] mb-8 font-goldman">Battle Begins In</p>
            <div className="flex gap-4 md:gap-8">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="flex flex-col items-center">
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4 w-20 md:w-32 flex items-center justify-center backdrop-blur-sm">
                            <span className="text-3xl md:text-5xl font-michroma font-bold text-white">
                                {String(value).padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-white/40 text-xs uppercase tracking-wider mt-2 font-jetbrains">{unit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LevelSection = ({ level, title, description, icon: Icon, color, index, criteria, children }: { level: string; title: string; description: string; icon: React.ElementType; color: string; index: number; criteria: string[]; children: React.ReactNode }) => {
    return (
        <motion.section
            id={`level-${level}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="min-h-[80vh] flex flex-col justify-center px-4 md:px-20 py-20 relative border-t border-white/5"
        >
            {/* Background text removed */}

            <div className="relative z-10 max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
                <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg bg-${color}-500/20 text-${color}-400 border border-${color}-500/30`}>
                            <Icon size={32} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bebas tracking-wide text-white">
                            LEVEL {level}: <span className={`text-${color}-500`}>{title}</span>
                        </h2>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8 font-montserrat">
                        {description}
                    </p>

                    <div className="space-y-4">
                        <h3 className="text-white/80 font-bold uppercase tracking-wider text-xl font-bebas">Evaluation Criteria:</h3>
                        <ul className="space-y-2">
                            {criteria.map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-400 font-montserrat">
                                    <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500`} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} bg-black/40 rounded-xl border border-white/10 h-[400px] flex items-center justify-center overflow-hidden relative group`}>
                    {children}
                </div>
            </div>
        </motion.section>
    )
}

const FAQAccordion = () => {
    const rules = [
        "Each team must consist of exactly two members.",
        "All tasks must be completed within time limits.",
        "No internet or external assistance unless specified.",
        "Any unfair means will lead to disqualification.",
        "Organizer decisions are final."
    ];

    return (
        <div className="space-y-4 w-full max-w-2xl mx-auto">
            {rules.map((rule, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-start gap-3 hover:bg-white/10 transition-colors"
                >
                    <div className="mt-1 text-[#FFD700]">
                        <Check size={16} />
                    </div>
                    <p className="text-gray-300 text-sm md:text-base font-montserrat">{rule}</p>
                </motion.div>
            ))}
        </div>
    )
}

import { LogicLinksVisual, PromptHeistVisual, CodeWeaveVisual } from "@/components/ByteBattleVisuals";

export default function ByteBattlePage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scrollToLevel = () => {
        const element = document.getElementById('level-1');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#FFD700] selection:text-black overflow-x-hidden">
            {/* Progress Bar */}
            <motion.div
                style={{ scaleX }}
                className="fixed top-0 left-0 right-0 h-1 bg-[#FFD700] origin-left z-50"
            />

            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

                <div className="z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="font-public-sans text-[clamp(2.5rem,12vw,8rem)] leading-[0.9] text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-x-[0.85] origin-center inline-block">
                            BYTE <span className="text-outline">BATTLE</span> <span className="text-[#FFD700]">3.0</span>
                        </h1>
                        <p className="font-goldman italic font-bold text-[#FFD700] text-xs md:text-xl tracking-[0.3em] md:tracking-[0.5em] mb-8">
                            GEEKMAYHEM 2026: TECHNICAL SHOWDOWN
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <CountdownTimer />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="mt-12"
                    >
                        <button onClick={scrollToLevel} className="px-10 py-4 bg-[#FFD700] text-black font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] clip-path-polygon font-goldman">
                            REGISTER NOW
                        </button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* Levels */}
            <LevelSection
                level="1"
                title="LOGIC LINKS"
                description="A logic-based technical crossword that tests your understanding of core computer science domains. Decode the clues, fill the grid, and beat the clock."
                icon={Brain}
                color="blue"
                index={1}
                criteria={['Accuracy of Responses', 'Correct Entry Count', 'Speed of Completion']}
            >
                <LogicLinksVisual />
            </LevelSection>

            <LevelSection
                level="2"
                title="PROMPT HEIST"
                description="An AI-interaction challenge. Craft intelligent prompts to break constraints and unlock hidden passwords. Progress through increasingly difficult security levels."
                icon={Terminal}
                color="green"
                index={2}
                criteria={['Levels Successfully Unlocked', 'Prompt Strategy Effectiveness', 'Time Efficient Progression']}
            >
                <PromptHeistVisual />
            </LevelSection>

            <LevelSection
                level="3"
                title="CODE WEAVE"
                description="A pattern-based coding challenge where logic meets precision. Recreate complex output patterns using nested loops, conditionals, and structured logic."
                icon={Cpu}
                color="purple"
                index={3}
                criteria={['Patterns Successfully Solved', 'Generated Output Accuracy', 'Logical Code Efficiency']}
            >
                <CodeWeaveVisual />
            </LevelSection>

            {/* Prizes Section */}
            <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a] border-t border-white/5">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="font-bebas text-5xl md:text-6xl text-white mb-16 tracking-wide">
                        PRIZE <span className="text-[#FFD700]">POOL</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            { rank: "2nd", prize: "₹3,000", color: "silver", scale: 0.9 },
                            { rank: "1st", prize: "₹7,000", color: "#FFD700", scale: 1.1 },
                            { rank: "3rd", prize: "₹2,000", color: "#cd7f32", scale: 0.9 },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className={`relative bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300 ${i === 1 ? 'z-10 bg-white/10 border-[#FFD700]/30 shadow-[0_0_30px_rgba(255,215,0,0.1)]' : ''}`}
                                style={{ scale: item.scale }}
                            >
                                <Trophy size={48} color={item.color} className="mb-4" />
                                <h3 className="text-2xl font-bold text-white mb-2 font-montserrat">{item.rank} Prize</h3>
                                <p className="text-4xl font-montserrat font-bold" style={{ color: item.color }}>{item.prize}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="inline-block px-8 py-3 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] font-goldman tracking-widest">
                        TOTAL PRIZE POOL: ₹12,000
                    </div>
                </div>
            </section>

            {/* Rules & Details */}
            <section className="py-24 px-4 bg-black">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

                    {/* Rules */}
                    <div>
                        <h2 className="font-bebas text-4xl text-white mb-8"><span className="text-[#FFD700]">Rules</span></h2>
                        <FAQAccordion />
                    </div>

                    {/* Venue & Contact */}
                    <div className="mt-20">
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-lg p-6 border border-white/10 flex items-start gap-4">
                                <MapPin className="text-[#FFD700] mt-1" />
                                <div>
                                    <h4 className="font-bold text-white text-lg font-montserrat">Venue</h4>
                                    <p className="text-gray-400 font-montserrat">CSE Lab 6, Room 204<br />NMIT</p>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-lg p-6 border border-white/10 flex items-start gap-4">
                                <Users className="text-[#FFD700] mt-1" />
                                <div>
                                    <h4 className="font-bold text-white text-lg font-montserrat">EVENT COORDINATORS</h4>
                                    <p className="text-gray-400 font-montserrat">Ujjwal S – 6363653933</p>
                                    <p className="text-gray-400 font-montserrat">Tejaswini Hegde P – 8088600447</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Final CTA removed as per request */}


            <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@1,700&family=Goldman&family=JetBrains+Mono&family=Michroma&family=Public+Sans:wght@900&display=swap');

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
          .clip-path-polygon {
            clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%);
          }
          .text-outline {
            -webkit-text-stroke: 2px white;
            color: transparent;
          }
           html {
            scroll-behavior: smooth;
          }
        `}</style>
        </div>
    );
}
