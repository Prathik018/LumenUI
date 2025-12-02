"use client";

import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AI_Voice() {
    const [submitted, setSubmitted] = useState(false);
    const [time, setTime] = useState(0);
    const [isDemo, setIsDemo] = useState(true);

    // Timer logic
    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (submitted) {
            intervalId = setInterval(() => {
                setTime((t) => t + 1);
            }, 1000);
        } else {
            setTime(0);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [submitted]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    /**
     * Demo loop – auto toggles listening on/off until user clicks.
     */
    useEffect(() => {
        if (!isDemo) return;

        let timeoutId: NodeJS.Timeout;
        const runAnimation = () => {
            setSubmitted(true);
            timeoutId = setTimeout(() => {
                setSubmitted(false);
                timeoutId = setTimeout(runAnimation, 1000);
            }, 3000);
        };

        const initialTimeout = setTimeout(runAnimation, 150);
        return () => {
            clearTimeout(timeoutId);
            clearTimeout(initialTimeout);
        };
    }, [isDemo]);

    const handleClick = () => {
        if (isDemo) {
            setIsDemo(false);
            setSubmitted(false);
        } else {
            setSubmitted((prev) => !prev);
        }
    };

    const labelText = submitted ? "Listening..." : "Click to speak";

    return (
        <div className="w-full py-4">
            <div
                className={cn(
                    "relative mx-auto flex w-full max-w-xs flex-col items-center gap-4 rounded-2xl border",
                    "border-zinc-200/70 bg-gradient-to-b from-zinc-50/90 via-zinc-50/70 to-zinc-100/80",
                    "dark:border-zinc-800/80 dark:from-zinc-950/95 dark:via-zinc-950/90 dark:to-zinc-900/90",
                    "px-4 py-4"
                )}
            >
                {/* Top accent line & glow */}
                <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-sky-500/70 to-transparent" />
                <div className="pointer-events-none absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />

                {/* Header row */}
                <div className="flex w-full items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-semibold tracking-[0.12em] text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900">
                            AI
                        </span>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">
                                Voice input
                            </span>
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                                Hands-free talking to your model
                            </span>
                        </div>
                    </div>

                    <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-white/70 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                        Beta
                    </span>
                </div>

                {/* Main mic button + halo */}
                <button
                    type="button"
                    onClick={handleClick}
                    aria-pressed={submitted}
                    className={cn(
                        "group relative flex h-20 w-20 items-center justify-center rounded-full",
                        "outline-none ring-0 transition-all duration-200",
                        submitted
                            ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                            : "bg-zinc-900/90 text-zinc-50 hover:bg-zinc-900 dark:bg-zinc-50/90 dark:text-zinc-900 dark:hover:bg-zinc-50"
                    )}
                >
                    {/* Halo ring */}
                    <div
                        className={cn(
                            "pointer-events-none absolute inset-0 -z-10 rounded-full border border-sky-400/60",
                            "shadow-[0_0_32px_rgba(56,189,248,0.9)] transition-opacity duration-300",
                            submitted ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {/* Pulsing outer ring when listening */}
                    <div
                        className={cn(
                            "pointer-events-none absolute inset-0 -z-20 rounded-full border border-sky-400/40",
                            submitted ? "animate-voice-pulse" : "opacity-0"
                        )}
                    />

                    {/* Mic icon / stop state */}
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black/80 dark:bg-white/90">
                        {submitted ? (
                            <div className="flex h-3 w-3 items-center justify-center rounded-[3px] bg-zinc-50 dark:bg-zinc-900" />
                        ) : (
                            <Mic className="h-5 w-5" />
                        )}
                    </div>
                </button>

                {/* Time + status */}
                <div className="flex flex-col items-center gap-1">
                    <span
                        className={cn(
                            "font-mono text-sm tabular-nums transition-colors duration-200",
                            submitted
                                ? "text-zinc-900 dark:text-zinc-50"
                                : "text-zinc-500 dark:text-zinc-400"
                        )}
                    >
                        {formatTime(time)}
                    </span>
                    <p
                        className={cn(
                            "text-xs text-zinc-600 dark:text-zinc-300 flex items-center gap-1"
                        )}
                    >
                        <span
                            className={cn(
                                "inline-block h-1.5 w-1.5 rounded-full",
                                submitted
                                    ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]"
                                    : "bg-zinc-400"
                            )}
                        />
                        {labelText}
                    </p>
                </div>

                {/* Waveform bars */}
                <div className="mt-1 flex h-6 w-full items-center justify-center">
                    <div className="flex h-5 w-64 items-end justify-center gap-[2px]">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-[2px] rounded-full bg-zinc-400/25 dark:bg-zinc-500/25",
                                    submitted ? "animate-voice-bar" : "h-[3px]"
                                )}
                                style={
                                    submitted
                                        ? {
                                              animationDelay: `${i * 0.04}s`,
                                          }
                                        : undefined
                                }
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom hint */}
                <div className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                    Press <span className="font-medium">Space</span> to hold and talk
                </div>

                <style jsx>{`
                    @keyframes voice-pulse {
                        0% {
                            transform: scale(1);
                            opacity: 0.9;
                        }
                        70% {
                            transform: scale(1.25);
                            opacity: 0;
                        }
                        100% {
                            transform: scale(1.25);
                            opacity: 0;
                        }
                    }
                    .animate-voice-pulse {
                        animation: voice-pulse 1.6s ease-out infinite;
                    }

                    @keyframes voice-bar {
                        0%,
                        100% {
                            height: 4px;
                            opacity: 0.4;
                        }
                        40% {
                            height: 20px;
                            opacity: 1;
                        }
                        60% {
                            height: 10px;
                            opacity: 0.7;
                        }
                    }
                    .animate-voice-bar {
                        animation: voice-bar 0.9s ease-in-out infinite;
                    }
                `}</style>
            </div>
        </div>
    );
}
