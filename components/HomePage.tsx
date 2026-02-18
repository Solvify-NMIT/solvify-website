"use client";

import React, { useState, useEffect, useCallback } from "react";

// --- SUB-COMPONENT: SEQUENTIAL DECIPHER ---
const SequentialDecipher = ({ text, startTrigger }: { text: string, startTrigger: boolean }) => {
    const [displayText, setDisplayText] = useState(text.replace(/./g, ' '));
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$#@%&";

    const decipherLogic = useCallback(() => {
        if (!startTrigger) {
            setDisplayText(text.replace(/./g, ' '));
            return;
        }

        let revealIndex = 0;
        const interval = setInterval(() => {
            revealIndex += 0.3;

            const currentString = text
                .split("")
                .map((char, i) => {
                    if (i < Math.floor(revealIndex)) return char;
                    if (i === Math.floor(revealIndex)) return chars[Math.floor(Math.random() * chars.length)];
                    return " ";
                })
                .join("");

            setDisplayText(currentString);

            if (revealIndex >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [text, startTrigger]);

    useEffect(() => {
        const cleanup = decipherLogic();
        return cleanup;
    }, [decipherLogic]);

    return <span className="inline-block min-h-[1em] whitespace-pre">{displayText}</span>;
};

// --- MAIN STATIC HOMEPAGE CONTENT ---
const HomePage = ({ startDecipher }: { startDecipher: boolean }) => {
    return (
        <div className="h-screen w-full relative flex flex-col items-center justify-center bg-[#050505]">
            <div
                className="z-10 text-center flex flex-col items-center w-full -mt-20"
            >
                {/* 1. MASSIVE MAIN TITLE */}
                <div className="relative w-full flex justify-center items-center mb-2">
                    <svg viewBox="0 0 1320 350" className="w-[95vw] max-w-[1600px] h-auto overflow-visible">
                        <text
                            x="50%"
                            y="50%"
                            dy=".35em"
                            textAnchor="middle"
                            className="font-bebas text-[200px] tracking-wide fill-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] stroke-none"
                        >
                            SOLVIFY
                        </text>
                    </svg>
                </div>

                {/* 2. SUBTITLES */}
                {/* 2. SUBTITLES */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-4 text-2xl sm:text-3xl md:text-3xl font-montserrat font-semibold tracking-widest md:tracking-[0.3em] uppercase w-full px-4">
                    <span className="text-[#FFD700] drop-shadow-[0_0_15px_rgba(255,215,0,0.4)] text-center w-full md:w-auto">
                        <SequentialDecipher text="BRIDGING GAPS" startTrigger={startDecipher} />
                    </span>

                    <span className="hidden md:inline text-gray-500 text-xl">•</span>

                    <span className="text-white text-center w-full md:w-auto mt-2 md:mt-0">
                        <SequentialDecipher text="SOLVING CHALLENGES" startTrigger={startDecipher} />
                    </span>
                </div>
            </div>
            <div className="absolute inset-0 pointer-events-none"></div>
        </div>
    );
};

export default HomePage;