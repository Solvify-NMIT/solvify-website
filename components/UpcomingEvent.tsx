"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import TextType from "./TextType";
import { useRouter } from "next/navigation";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface TimelineEvent {
    time: string;
    title: string;
    description: string;
}

export default function UpcomingEventPage() {
    const router = useRouter();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const titleRef = useRef<HTMLHeadingElement>(null);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const targetDate = new Date("2026-02-28T08:00:00").getTime();

    useEffect(() => {
        const calculateTimeLeft = (): TimeLeft => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    useEffect(() => {
        if (!titleRef.current) return;

        const element = titleRef.current;
        const originalText = "BYTE BATTLE 3.0";
        let iteration = 0;

    }, [chars]);

    const timelineEvents: TimelineEvent[] = [
        {
            time: "Round 1",
            title: "Logic Links",
            description: "A logic-based technical crossword testing understanding of fundamental computer science concepts. Interpret clues and complete the grid within the allotted time.",
        },
        {
            time: "Round 2",
            title: "Prompt Heist",
            description: "An AI-interaction challenge focused on prompt engineering, where teams craft strategic prompts to uncover hidden passwords and progress through successive levels.",
        },
        {
            time: "Round 3",
            title: "Code Weave",
            description: "A pattern-based coding round in which participants write programs to reproduce given output patterns using appropriate logic, loops, and conditional statements.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white relative">
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FFD700]/10 blur-[100px] rounded-full pointer-events-none z-0" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[#FFD700]/5 blur-[60px] rounded-full pointer-events-none z-0" />

            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 z-10">
                <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] w-full">
                    <div className="text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-6"
                        >
                            <motion.h1
                                ref={titleRef}
                                className="text-[clamp(4.5rem,10vw,9.5rem)] font-black uppercase leading-none font-bebas tracking-[0.05em]"
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                style={{
                                    backgroundImage: "linear-gradient(to right, #ffffff, #FFD700, #ffffff, #FFD700, #ffffff)",
                                    backgroundSize: "300% auto",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    filter: "drop-shadow(0px 0px 15px rgba(255, 215, 0, 0.25))",
                                }}
                            >
                                <TextType
                                    typingSpeed={75}
                                    pauseDuration={1500}
                                    showCursor
                                    cursorCharacter="_"
                                    text={["BYTE BATTLE 3.0", "HACK YOUR FUTURE"]}
                                    deletingSpeed={40}
                                    cursorBlinkDuration={0.8}
                                />
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="text-base sm:text-lg md:text-2xl text-white/70 max-w-2xl mx-auto font-montserrat font-medium leading-relaxed tracking-wide pt-4"
                            >
                                Join passionate coders for an intense, multi-round battle of brains, speed, and innovation.
                            </motion.p>
                        </motion.div>

                        {/* Interactive Premium Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-10"
                        >

                            <button
                                onClick={() => window.open('https://tinyurl.com/bytebattle', '_blank')}
                                className="group relative overflow-hidden w-full sm:w-auto px-10 py-4 bg-[#FFD700] text-[#050505] rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-[1.03] transition-all duration-300 shadow-[0_4px_25px_rgba(255,215,0,0.2)] hover:shadow-[0_4px_35px_rgba(255,215,0,0.5)] border border-transparent hover:border-white/50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Register Now
                                </span>
                                {/* Animated background fill */}
                                <div className="absolute inset-0 bg-white transform -translate-x-[101%] group-hover:translate-x-[0%] transition-transform duration-500 ease-out z-0"></div>
                            </button>


                            <button
                                onClick={() => {
                                    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className="group relative overflow-hidden w-full sm:w-auto px-10 py-4 bg-white/[0.03] text-white border border-white/10 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-[1.03] hover:border-[#FFD700]/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Details
                                </span>
                                {/* Animated background fill */}
                                <div className="absolute inset-0 bg-[#FFD700]/10 transform translate-y-[101%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out z-0"></div>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 py-16 lg:py-20 -mt-20">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center">
                        <h2 className="text-[clamp(2rem,5vw,3rem)] font-bebas tracking-[0.1em] font-bold uppercase text-white mb-2">
                            Event Starts In
                        </h2>
                        <div className="h-[3px] w-[60px] bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)] mx-auto mb-12"></div>

                        <div className="flex justify-center flex-wrap gap-8 sm:gap-12 md:gap-20 drop-shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                            {[
                                { label: "Days", value: timeLeft.days },
                                { label: "Hours", value: timeLeft.hours },
                                { label: "Minutes", value: timeLeft.minutes },
                                { label: "Seconds", value: timeLeft.seconds },
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className="text-[clamp(4.5rem,10vw,8rem)] font-black font-titillium tabular-nums tracking-wider leading-none text-[#FFD700]">
                                        {String(item.value).padStart(2, "0")}
                                    </div>
                                    <span className="text-base sm:text-xl font-bold font-montserrat tracking-widest text-white/50 uppercase mt-3">
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="details" className="relative z-10 py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bebas tracking-[0.1em] font-bold uppercase text-white mb-2">
                            Event Details
                        </h2>
                        <div className="h-[3px] w-[60px] bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)] mx-auto"></div>
                        <p className="mt-6 text-base sm:text-lg text-white/60 font-montserrat font-medium max-w-2xl mx-auto tracking-wide">
                            A day filled with coding challenges, networking, and innovation
                        </p>
                    </div>

                    <div className="relative py-12 max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
                            {timelineEvents.map((event, index) => {
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="h-full"
                                    >
                                        <div className="relative h-full flex flex-col bg-[#0a0a0a] bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl border border-[#FFD700]/50 rounded-[2rem] p-8 overflow-hidden shadow-[0_20px_60px_rgba(255,215,0,0.15)]">

                                            {/* Top Section: Giant Number & Phase Name */}
                                            <div className="flex justify-between items-start mb-8 relative z-10">
                                                <div className="flex flex-col">
                                                    <div className="inline-block px-4 py-1.5 mb-4 border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] text-xs font-bold tracking-[0.2em] font-montserrat uppercase rounded-full w-max shadow-[0_0_15px_rgba(255,215,0,0.15)]">
                                                        Phase 0{index + 1}
                                                    </div>
                                                    <h3 className="text-2xl xl:text-3xl font-black font-montserrat text-[#FFD700] tracking-tight">
                                                        {event.title}
                                                    </h3>
                                                </div>
                                                <div className="text-[#FFD700]/80 text-6xl xl:text-7xl font-black font-bebas leading-none">
                                                    0{index + 1}
                                                </div>
                                            </div>

                                            {/* Middle Section: Description */}
                                            <div className="flex-grow relative z-10">
                                                <p className="text-sm xl:text-base text-white/80 font-montserrat leading-relaxed font-medium">
                                                    {event.description}
                                                </p>
                                            </div>

                                            {/* Decorative Background Accents */}
                                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#FFD700]/10 to-transparent pointer-events-none z-0" />
                                            {/* Glowing orb inside card */}
                                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FFD700]/40 blur-[50px] rounded-full z-0" />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Prize Pool Section */}
            <section className="relative z-10 py-16 lg:py-24 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FFD700]/5 blur-[120px] rounded-full pointer-events-none z-0" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    <div className="text-center mb-16 sm:mb-24">
                        <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bebas tracking-[0.1em] font-bold uppercase text-white mb-2">
                            Prize Pool
                        </h2>
                        <div className="h-[3px] w-[60px] bg-[#FFD700] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)] mx-auto"></div>
                        <p className="mt-6 text-base sm:text-lg text-white/60 font-montserrat font-medium max-w-2xl mx-auto tracking-wide">
                            Compete against the best and win massive rewards!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-end max-w-5xl mx-auto">
                        {/* 2nd Prize */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="order-2 md:order-1 relative z-10"
                        >
                            <div className="relative flex flex-col items-center bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 pt-12 text-center overflow-hidden hover:border-zinc-400/50 transition-all duration-300 md:mb-8">
                                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-80"></div>
                                <div className="text-zinc-400 font-bebas text-5xl xl:text-6xl mb-2 drop-shadow-[0_0_15px_rgba(161,161,170,0.3)]">2ND</div>
                                <h3 className="font-montserrat text-zinc-400/80 font-bold tracking-widest uppercase text-xs xl:text-sm mb-6">Runner Up</h3>
                                <div className="text-4xl xl:text-5xl font-black font-montserrat text-white tracking-tight">₹3,000</div>
                            </div>
                        </motion.div>

                        {/* 1st Prize */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="order-1 md:order-2 z-20"
                        >
                            <div className="relative flex flex-col items-center bg-[#0a0a0a] bg-gradient-to-b from-[#FFD700]/10 to-transparent backdrop-blur-xl border border-[#FFD700]/50 rounded-[2rem] p-10 pt-14 text-center overflow-hidden shadow-[0_20px_60px_rgba(255,215,0,0.2)] md:-translate-y-4">
                                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#FFD700]/10 to-transparent pointer-events-none z-0" />
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFD700]/30 blur-[50px] rounded-full pointer-events-none z-0"></div>
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FFD700]/20 blur-[50px] rounded-full pointer-events-none z-0"></div>

                                <div className="text-[#FFD700] font-bebas text-7xl xl:text-8xl mb-2 drop-shadow-[0_0_20px_rgba(255,215,0,0.6)] leading-none relative z-10">1ST</div>
                                <h3 className="font-montserrat text-[#FFD700] font-bold tracking-widest uppercase text-sm xl:text-base mb-6 relative z-10">Champion</h3>
                                <div className="text-5xl xl:text-6xl font-black font-montserrat text-white tracking-tight drop-shadow-lg relative z-10">₹7,000</div>
                            </div>
                        </motion.div>

                        {/* 3rd Prize */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="order-3 md:order-3 relative z-10"
                        >
                            <div className="relative flex flex-col items-center bg-gradient-to-b from-white/[0.04] to-transparent backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 pt-10 text-center overflow-hidden hover:border-amber-700/50 transition-all duration-300 md:mb-12">
                                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent opacity-80"></div>
                                <div className="text-amber-600 font-bebas text-4xl xl:text-5xl mb-2 drop-shadow-[0_0_15px_rgba(217,119,6,0.2)]">3RD</div>
                                <h3 className="font-montserrat text-amber-600/80 font-bold tracking-widest uppercase text-xs xl:text-sm mb-6">2nd Runner Up</h3>
                                <div className="text-3xl xl:text-4xl font-black font-montserrat text-white tracking-tight">₹2,000</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}