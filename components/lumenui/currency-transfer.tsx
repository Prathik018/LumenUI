"use client";

import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  InfoIcon,
  ArrowUpDown,
  Check,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CheckmarkProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.2,
        bounce: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
      opacity: { delay: i * 0.2, duration: 0.25 },
    },
  }),
};

export function Checkmark({
  size = 84,
  strokeWidth = 2.4,
  color = "rgb(16 185 129)",
  className = "",
}: CheckmarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <title>Animated Checkmark</title>
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        variants={draw as any}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 4px rgba(16,185,129,0.45))",
        }}
      />
      <motion.path
        d="M30 50L44 64L69 35"
        stroke={color}
        variants={draw as any}
        custom={1}
        style={{
          strokeWidth: strokeWidth + 0.4,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
          filter: "drop-shadow(0 0 3px rgba(16,185,129,0.55))",
        }}
      />
    </motion.svg>
  );
}

const STEPS = ["Initiated", "Converting", "Sending", "Completed"];

export default function CurrencyTransfer() {
  const [isCompleted, setIsCompleted] = useState(false);
  const transactionId = "TXN-DAB3UL494";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "w-full max-w-sm mx-auto h-[420px] overflow-hidden",
          "border border-emerald-500/10 dark:border-emerald-500/15",
          "bg-gradient-to-b from-white via-zinc-50 to-zinc-100/90 dark:from-zinc-950 dark:via-zinc-950/95 dark:to-zinc-900",
          "shadow-[0_18px_45px_rgba(15,23,42,0.42)] dark:shadow-[0_22px_60px_rgba(0,0,0,0.85)]",
          "relative rounded-2xl"
        )}
      >
        {/* Subtle glow accents */}
        <div className="pointer-events-none absolute -top-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-emerald-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-8 h-28 w-28 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />

        <CardContent className="relative flex h-full flex-col px-6 py-4">
          {/* Top: Status + meta */}
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Money Transfer
              </span>
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.span
                    key="status-completed"
                    className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                    Transfer Completed
                  </motion.span>
                ) : (
                  <motion.span
                    key="status-progress"
                    className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)] animate-pulse" />
                    Transfer in Progress
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-end text-right">
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                Arrives in {isCompleted ? "seconds" : "< 2 min"}
              </span>
              <span className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                ID: {transactionId}
              </span>
            </div>
          </div>

          {/* Middle: ring + from/to + steps */}
          <div className="flex flex-1 gap-4">
            {/* Left: Ring / icon */}
            <div className="flex w-[42%] flex-col items-center justify-center">
              <div className="relative flex h-[140px] w-[140px] items-center justify-center">
                {/* Halo */}
                <motion.div
                  className="absolute inset-3 rounded-full bg-gradient-to-br from-emerald-400/15 via-emerald-500/10 to-emerald-400/5 blur-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isCompleted ? 1 : 0.7 }}
                  transition={{ duration: 0.6 }}
                />
                {/* Inner circle / spinner vs check */}
                <AnimatePresence mode="wait">
                  {!isCompleted ? (
                    <motion.div
                      key="spinner"
                      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/95 dark:bg-zinc-950/95 shadow-[0_10px_30px_rgba(16,185,129,0.4)]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, rotate: 90 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent"
                        style={{
                          borderTopColor: "rgb(16 185 129)",
                          borderRightColor: "rgba(16,185,129,0.35)",
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-emerald-400 dark:bg-zinc-50 dark:text-emerald-500">
                        <ArrowUpDown className="h-6 w-6" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="check"
                      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/95 dark:bg-zinc-950/95 shadow-[0_10px_30px_rgba(16,185,129,0.55)]"
                      initial={{ opacity: 0, scale: 0.85, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Checkmark size={80} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Step tracker */}
              <div className="mt-3 flex w-full flex-col items-center gap-1">
                <div className="flex w-full items-center justify-between gap-1">
                  {STEPS.map((step, idx) => {
                    const isLast = idx === STEPS.length - 1;
                    const isActive = !isCompleted && idx === 2;
                    const isDone =
                      isCompleted || idx < (isCompleted ? 4 : 2);

                    return (
                      <div
                        key={step}
                        className="flex flex-1 flex-col items-center gap-1"
                      >
                        <div className="flex w-full items-center gap-1">
                          <div
                            className={cn(
                              "flex h-4 w-4 items-center justify-center rounded-full border text-[9px]",
                              isDone
                                ? "border-emerald-500 bg-emerald-500 text-white"
                                : isActive
                                ? "border-amber-400 bg-amber-400/10 text-amber-500"
                                : "border-zinc-300 bg-white text-zinc-400 dark:bg-zinc-900 dark:border-zinc-700"
                            )}
                          >
                            {isDone ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              idx + 1
                            )}
                          </div>
                          {!isLast && (
                            <div
                              className={cn(
                                "h-[2px] flex-1 rounded-full",
                                isDone
                                  ? "bg-emerald-500/80"
                                  : "bg-zinc-200 dark:bg-zinc-700"
                              )}
                            />
                          )}
                        </div>
                        <span className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: From / To blocks */}
            <div className="flex w-[58%] flex-col justify-center gap-3">
              {/* From */}
              <motion.div
                className={cn(
                  "w-full rounded-xl border bg-white/80 p-2.5 text-left",
                  "dark:bg-zinc-950/80 dark:border-zinc-800",
                  "backdrop-blur-md transition-colors"
                )}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <ArrowUpIcon className="h-3 w-3" />
                    From
                  </span>
                  <span className="rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                    USD • Card
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-300 bg-white text-sm font-semibold text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                    $
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      500.00 USD
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Chase Bank •••• 4589
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* To */}
              <motion.div
                className={cn(
                  "w-full rounded-xl border bg-white/80 p-2.5 text-left",
                  "dark:bg-zinc-950/80 dark:border-zinc-800",
                  "backdrop-blur-md transition-colors"
                )}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
              >
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <ArrowDownIcon className="h-3 w-3" />
                    To
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                    No FX fee
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-300 bg-white text-sm font-semibold text-zinc-900 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
                    €
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      460.00 EUR
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Deutsche Bank •••• 7823
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Footer: FX + meta */}
          <motion.div
            className="mt-3 flex items-center justify-between gap-3 border-t border-zinc-200/80 pt-2 text-[11px] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.35 }}
          >
            <div className="flex flex-col">
              <AnimatePresence mode="wait">
                {isCompleted ? (
                  <motion.span
                    key="fx-completed"
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Exchange rate locked at{" "}
                    <span className="font-semibold text-zinc-800 dark:text-zinc-100">
                      1 USD = 0.92 EUR
                    </span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="fx-progress"
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Calculating best FX rate...
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="mt-1 text-[10px]">
                Fee: <span className="line-through opacity-60">$4.90</span>{" "}
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  $0.00
                </span>{" "}
                with Pro
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-6 items-center gap-1 rounded-full border border-zinc-200 bg-white/60 px-2 text-[10px] font-medium text-zinc-600 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    <InfoIcon className="h-3 w-3" />
                    <span>Details</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" align="end">
                  <p className="text-[11px]">
                    {isCompleted
                      ? "Funds settled instantly on the recipient bank. Updated just now."
                      : "Your bank has authorized the payment. We’re finalizing the FX and payout."}
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
