"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Globe2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TaskSequence = {
    status: string;
    lines: string[];
};

const TASK_SEQUENCES: TaskSequence[] = [
    {
        status: "Searching the web",
        lines: [
            "Initializing web search...",
            "Scanning web pages...",
            "Visiting 5 websites...",
            "Analyzing content...",
            "Generating summary...",
        ],
    },
    {
        status: "Analyzing results",
        lines: [
            "Analyzing search results...",
            "Generating summary...",
            "Checking for relevant information...",
            "Finalizing analysis...",
            "Setting up lazy loading...",
            "Configuring caching strategies...",
            "Running performance tests...",
            "Finalizing optimizations...",
        ],
    },
    {
        status: "Enhancing UI/UX",
        lines: [
            "Initializing UI enhancement scan...",
            "Checking accessibility compliance...",
            "Analyzing component animations...",
            "Reviewing loading states...",
            "Testing responsive layouts...",
            "Optimizing user interactions...",
            "Validating color contrast...",
            "Checking motion preferences...",
            "Finalizing UI improvements...",
        ],
    },
];

const sequenceIconMap: Record<number, React.ReactElement> = {
    0: <Globe2 className="w-4 h-4" />,
    1: <Wand2 className="w-4 h-4" />,
    2: <Sparkles className="w-4 h-4" />,
};

interface LoadingRingProps {
    progress: number; // 0–100
}

const LoadingRing = ({ progress }: LoadingRingProps) => {
    const size = 52;
    const strokeWidth = 5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.min(100, Math.max(0, progress));
    const offset = circumference - (clamped / 100) * circumference;

    return (
        <div className="relative w-11 h-11">
            <svg
                viewBox={`0 0 ${size} ${size}`}
                className="w-full h-full"
                aria-label={`Loading: ${Math.round(progress)}%`}
            >
                <defs>
                    <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                </defs>

                {/* background track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(148,163,184,0.3)"
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* animated arc */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="url(#ring-gradient)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{
                        transformOrigin: "50% 50%",
                        transform: "rotate(-90deg)",
                    }}
                />
            </svg>

            {/* pulsing dot in the center */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            </motion.div>
        </div>
    );
};

export default function AILoadingState() {
    const [sequenceIndex, setSequenceIndex] = useState(0);
    const [lineIndex, setLineIndex] = useState(0);
    const [visibleLines, setVisibleLines] = useState<string[]>([]);

    const currentSequence = TASK_SEQUENCES[sequenceIndex];
    const totalLines = currentSequence.lines.length;

    // Derived "local" progress within the current sequence (0–100)
    const progress =
        totalLines > 0 ? ((lineIndex + 1) / totalLines) * 100 : 0;

    useEffect(() => {
        // initialize visible lines when sequence changes
        setVisibleLines((prev) => {
            const start = Math.max(0, lineIndex - 2);
            const slice = currentSequence.lines.slice(start, lineIndex + 1);
            return slice;
        });
    }, [sequenceIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const interval = setInterval(() => {
            setLineIndex((prev) => {
                const next = prev + 1;

                // If we finished this sequence
                if (next >= totalLines) {
                    const nextSequence = (sequenceIndex + 1) % TASK_SEQUENCES.length;
                    setSequenceIndex(nextSequence);
                    // reset line index for the new sequence
                    setVisibleLines([]);
                    return 0;
                }

                // Update visible lines (keep last 3)
                setVisibleLines((prevLines) => {
                    const newLine = currentSequence.lines[next];
                    const merged = [...prevLines, newLine];
                    return merged.slice(-3);
                });

                return next;
            });
        }, 1200);

        return () => clearInterval(interval);
    }, [sequenceIndex, totalLines, currentSequence.lines]);

    // keep visible lines in sync when lineIndex changes directly
    useEffect(() => {
        const start = Math.max(0, lineIndex - 2);
        const slice = currentSequence.lines.slice(start, lineIndex + 1);
        setVisibleLines(slice);
    }, [lineIndex, currentSequence.lines]);

    const icon = sequenceIconMap[sequenceIndex] ?? (
        <Sparkles className="w-4 h-4" />
    );

    return (
        <div className="flex items-center justify-center min-h-full w-full py-4">
            <div
                className={cn(
                    "relative w-full max-w-md rounded-2xl border",
                    "border-gray-300/70 dark:border-slate-800/80",
                    "bg-gradient-to-b from-slate-50/90 via-slate-50/80 to-slate-100/70",
                    "dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-900/90",
                    "overflow-hidden"
                )}
            >
                {/* top accent line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />

                {/* subtle glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -left-16 bottom-0 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />

                <div className="relative z-10 px-4 py-3 flex items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800/80">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-cyan-300 text-[10px] shadow-sm shadow-black/40">
                            {icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-slate-900 dark:text-slate-50">
                                AI is working on your request
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                {currentSequence.status}...
                            </span>
                        </div>
                    </div>

                    <LoadingRing progress={progress} />
                </div>

                {/* Log area */}
                <div className="relative px-4 py-3">
                    <div
                        className={cn(
                            "rounded-xl border",
                            "border-slate-200/70 dark:border-slate-800/80",
                            "bg-slate-50/70 dark:bg-slate-900/70",
                            "overflow-hidden font-mono text-[11px] leading-[1.4]"
                        )}
                    >
                        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/70 dark:border-slate-800/70">
                            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                activity log
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                step {lineIndex + 1}/{totalLines}
                            </span>
                        </div>

                        <div className="relative h-[90px] px-3 py-2">
                            {/* gradient overlay for subtle fade */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/50 to-slate-50/0 dark:from-slate-900/95 dark:via-slate-900/60 dark:to-slate-900/0" />

                            <div className="relative flex flex-col justify-end gap-1.5">
                                <AnimatePresence mode="popLayout">
                                    {visibleLines.map((line, idx) => (
                                        <motion.div
                                            key={`${sequenceIndex}-${line}-${idx}`}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.22, ease: "easeOut" }}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="mt-[1px] text-[10px] text-slate-400 dark:text-slate-500 select-none w-4 text-right">
                                                {lineIndex - (visibleLines.length - 1 - idx) + 1}
                                            </span>
                                            <span className="flex-1 text-[11px] text-slate-800 dark:text-slate-100">
                                                {line}
                                            </span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom hint */}
                <div className="border-t border-slate-200/60 dark:border-slate-800/80 px-4 py-2.5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        You can keep browsing while we prepare this.
                    </span>
                    <span className="text-[11px] text-cyan-500 dark:text-cyan-400">
                        Live · {Math.round(progress)}%
                    </span>
                </div>
            </div>
        </div>
    );
}
