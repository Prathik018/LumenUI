"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

interface AITextLoadingProps {
    texts?: string[];
    className?: string;
    interval?: number;
}

export default function AITextLoading({
    texts = ["Thinking...", "Processing...", "Analyzing...", "Computing...", "Almost there..."],
    className,
    interval = 1500,
}: AITextLoadingProps) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        if (!texts.length) return;
        const timer = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }, interval);

        return () => clearInterval(timer);
    }, [interval, texts.length]);

    const currentText = texts[currentTextIndex] ?? "";

    return (
        <div className={cn("flex items-center justify-center py-4", className)}>
            <motion.div
                className="inline-flex items-center gap-3 rounded-full border border-zinc-200/90 bg-zinc-50/90 px-3.5 py-2 dark:border-zinc-800/90 dark:bg-zinc-900/90"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                {/* Left AI badge */}
                <motion.span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-semibold tracking-[0.12em] text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                >
                    AI
                </motion.span>

                {/* Text with shimmer + transitions */}
                <AnimatePresence mode="wait">
                    <motion.span
                        key={currentTextIndex}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="relative text-sm font-medium"
                    >
                        <span className="shimmer-text bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 bg-clip-text text-transparent dark:from-zinc-100 dark:via-zinc-400 dark:to-zinc-100">
                            {currentText}
                        </span>
                    </motion.span>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex items-center gap-1">
                    {[0, 1, 2].map((dot) => (
                        <motion.span
                            key={dot}
                            className="h-1.5 w-1.5 rounded-full bg-zinc-400/80 dark:bg-zinc-500"
                            animate={{ opacity: [0.25, 1, 0.25], y: [0, -1.5, 0] }}
                            transition={{
                                duration: 0.9,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: dot * 0.15,
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            <style jsx>{`
                .shimmer-text {
                    background-size: 200% 100%;
                    animation: shimmer-text 2.4s linear infinite;
                }
                @keyframes shimmer-text {
                    0% {
                        background-position: 200% 0;
                    }
                    100% {
                        background-position: -200% 0;
                    }
                }
            `}</style>
        </div>
    );
}
