import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

// --- Encryption/Decryption Effect Hook ---
const useDecryption = (target: string, speed = 50) => {
    const [displayText, setDisplayText] = useState("");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                target
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return letter;
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= target.length) {
                clearInterval(interval);
            }
            iterations += 1 / 3;
        }, speed);
        return () => clearInterval(interval);
    }, [target, speed]);

    return displayText;
};

// --- Level 1: Logic Links (Technical Crossword) ---
export const LogicLinksVisual = () => {
    // 5x5 Grid Data (Deterministic)
    const gridData = Array.from({ length: 25 }, (_, i) => {
        const char = String.fromCharCode(65 + (i % 26));
        // Pseudo-random "filled" cells
        const isFilled = (i * 7) % 10 > 3;
        return { id: i, char, isFilled };
    });

    const [hoveredCell, setHoveredCell] = useState<number | null>(null);

    return (
        <motion.div
            className="w-full h-full flex items-center justify-center bg-black/20 relative overflow-hidden" // Reduced padding and opacity
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Subtle Grid Pulse Background */}
            <div className="absolute inset-0 bg-blue-500/5 animate-pulse" /> {/* Brighter pulse */}

            {/* Red Scanning Line */}
            {/* Red Static Highlight Line */}
            <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[2px] bg-red-500/80 shadow-[0_0_10px_red] z-20 pointer-events-none" />

            <div className="grid grid-cols-5 gap-3 relative z-10 p-2"> {/* Removed border/bg, increased gap */}
                {gridData.map((cell, i) => (
                    <DecryptionCell
                        key={i}
                        cell={cell}
                        isHovered={hoveredCell === i}
                        onHover={() => setHoveredCell(i)}
                        onLeave={() => setHoveredCell(null)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const DecryptionCell = ({ cell, isHovered, onHover, onLeave }: any) => {
    const [char, setChar] = useState("");
    const finalChar = cell.char;
    const isFilled = cell.isFilled;

    useEffect(() => {
        if (!isFilled) return;

        let frames = 0;
        const chars = "010101XYZ@#$";
        const interval = setInterval(() => {
            if (frames < 15) { // Run for ~750ms
                setChar(chars[Math.floor(Math.random() * chars.length)]);
                frames++;
            } else {
                setChar(finalChar);
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [isFilled, finalChar]);

    // Path Lighting Logic: Highlight row and col
    // A simple hacky path finding: just highlight adjacent or same row/col is too much logic for this view.
    // Let's just do a glow on the cell itself.

    return (
        <motion.div
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className={`w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center text-sm sm:text-lg md:text-xl font-bold font-mono border-2 transition-all duration-300 cursor-default
            ${isFilled
                    ? isHovered
                        ? 'border-blue-400 bg-blue-500/50 text-white shadow-[0_0_25px_rgba(59,130,246,0.8)] scale-110 z-10'
                        : 'border-blue-500/40 bg-blue-500/20 text-blue-200'
                    : 'border-white/5 bg-transparent text-white/10'}`}
        >
            {isFilled ? char : ''}
        </motion.div>
    );
};


// --- Level 2: Prompt Heist (AI Interaction) ---
export const PromptHeistVisual = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [glitch, setGlitch] = useState(false);
    const [integrity, setIntegrity] = useState(100);

    useEffect(() => {
        // Boot sequence
        const sequence = [
            { text: "> SYSTEM BOOT SEQUENCE...", delay: 500 },
            { text: "> ESTABLISHING CONNECTION...", delay: 1500 },
            { text: "> ACCESS LEVEL 1 GRANTED.", delay: 2500, color: "text-green-500" },
            { text: "> FIREWALL: ACTIVE", delay: 3500, color: "text-red-400" },
        ];

        let timeouts: NodeJS.Timeout[] = [];

        sequence.forEach(({ text, delay, color }, index) => {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, `<span class="${color || 'text-white/70'}">${text}</span>`]);
            }, delay);
            timeouts.push(timeout);
        });

        // Simulating integrity fluctuation
        const intInterval = setInterval(() => {
            setIntegrity(prev => Math.max(20, Math.min(100, prev + (Math.random() * 20 - 10))));
        }, 1000);

        return () => {
            timeouts.forEach(clearTimeout);
            clearInterval(intInterval);
        };
    }, []);

    // Simulate Glitch on click or random
    const triggerGlitch = () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 300);
        setIntegrity(prev => Math.max(0, prev - 15));
    };

    return (
        <div
            className={`w-full h-full bg-black/40 font-mono text-sm md:text-base p-6 relative overflow-hidden ${glitch ? 'animate-pulse bg-red-900/20' : ''}`} // Brighter bg, larger text
            onClick={triggerGlitch}
        >
            {/* Scanline */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-20" />

            {/* Status Bar */}
            <div className="absolute top-4 right-4 w-32">
                <div className="flex justify-between text-[10px] text-green-400/80 mb-1">
                    <span>FIREWALL</span>
                    <span>{Math.round(integrity)}%</span>
                </div>
                <div className="h-1 bg-green-900/50 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full ${integrity < 40 ? 'bg-red-500' : 'bg-green-500'}`}
                        animate={{ width: `${integrity}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                    />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-2">
                    {lines.map((line, i) => (
                        <TypewriterLine key={i} html={line} />
                    ))}
                    <div className="flex items-center text-green-500">
                        <span className="mr-2">&gt;</span>
                        <span className="animate-pulse w-2 h-4 bg-green-500 block"></span>
                    </div>
                </div>

                {/* Side Panel: Directory/Nodes */}
                <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-green-500/20 pt-4 md:pt-0 md:pl-4 space-y-4 opacity-70">
                    <div className="space-y-1">
                        <div className="text-[10px] text-green-300 uppercase tracking-wider mb-2">/ROOT/SYSTEM</div>
                        {['kernel.sys', 'auth.log', 'shadow.db', 'config.ini'].map((file, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 2 + (i * 0.2) }}
                                className="flex items-center gap-2 text-[10px] text-green-500/60"
                            >
                                <span>📄</span> {file}
                            </motion.div>
                        ))}
                    </div>
                    <div className="space-y-1">
                        <div className="text-[10px] text-green-300 uppercase tracking-wider mb-2">NODES</div>
                        <div className="grid grid-cols-3 gap-1">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1 + (i % 3) * 0.5, repeat: Infinity, delay: (i * 0.2) % 1 }}
                                    className="w-2 h-2 bg-green-500/50 rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Glitch Overlay */}
            {glitch && (
                <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center z-50">
                    <h2 className="text-red-500 font-bold text-2xl tracking-[0.5em] animate-bounce">ERROR</h2>
                </div>
            )}
        </div>
    );
};

const TypewriterLine = ({ html }: { html: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="break-all"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

// --- Level 3: Code Weave (Pattern Generation) ---
export const CodeWeaveVisual = () => {
    const codeSnippet = [
        `function weave(pattern) {`,
        `  // Scanning sector 7G`,
        `  for (let i = 0; i < n; i++) {`,
        `    let layer = "";`,
        `    if (i % 2 === 0) {`,
        `      layer = "10101";`,
        `    } else {`,
        `      layer = "01010";`,
        `    }`,
        `    output.push(layer);`,
        `  }`,
        `  return output.join("\\n");`,
        `}`
    ];

    const [hoveredLine, setHoveredLine] = useState<number | null>(null);

    return (
        <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col md:flex-row">
            {/* Matrix Rain Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden flex justify-around">
                {Array.from({ length: 15 }).map((_, i) => (
                    <MatrixColumn key={i} delay={i * 0.5} />
                ))}
            </div>

            {/* Code Block - 50% Width */}
            <div className="w-full md:w-1/2 p-6 font-mono text-[10px] md:text-sm z-10 relative overflow-y-auto border-r border-purple-500/20 bg-black/40">
                {/* Scanline Light */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-8 bg-purple-500/20 border-b border-purple-500/50 blur-[2px] pointer-events-none"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {codeSnippet.map((line, i) => (
                    <div
                        key={i}
                        className={`py-0.5 px-2 rounded cursor-pointer transition-colors duration-200 flex gap-2
                        ${hoveredLine === i ? 'bg-purple-500/30 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]' : 'text-purple-300/80 hover:text-purple-100'}`}
                        onMouseEnter={() => setHoveredLine(i)}
                        onMouseLeave={() => setHoveredLine(null)}
                    >
                        <span className="text-white/30 select-none w-4 text-right">{i + 1}</span>
                        <span className="whitespace-pre overflow-hidden text-ellipsis">{line}</span>
                    </div>
                ))}
            </div>

            {/* Pattern Visualization (Right Side) - Increased Area & Brightness */}
            <div className="flex-1 flex items-center justify-center p-8 bg-purple-900/10 backdrop-blur-sm z-10 relative min-h-[250px] md:min-h-auto border-t md:border-t-0 md:border-l border-purple-500/20">
                <div className="absolute inset-0 bg-purple-500/5 animate-pulse pointer-events-none" />
                <div className="grid grid-cols-4 gap-4"> {/* Increased gap */}
                    {Array.from({ length: 16 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className={`w-8 h-8 rounded-md transition-all duration-300 border border-purple-500/30
                            ${(hoveredLine !== null && (i + hoveredLine) % 3 === 0)
                                    ? 'bg-purple-400 shadow-[0_0_25px_purple] scale-125 border-white'
                                    : 'bg-purple-900/40 shadow-[0_0_5px_rgba(168,85,247,0.1)]'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const MatrixColumn = ({ delay }: { delay: number }) => {
    const [chars, setChars] = useState<string[]>([]);

    useEffect(() => {
        setChars(Array.from({ length: 20 }, () => String.fromCharCode(0x30A0 + Math.random() * 96)));
    }, []);

    return (
        <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: "120vh", opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: delay, ease: "linear" }}
            className="flex flex-col text-[10px] text-green-500/50 font-mono leading-tight"
        >
            {chars.map((char, i) => (
                <span key={i}>{char}</span>
            ))}
        </motion.div>
    );
};
