"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  accent?: string;
}

export default function Loader({
  title = "Configuring your workspace",
  subtitle = "We're syncing your settings and preparing your environment",
  size = "md",
  accent = "emerald",
  className,
  ...props
}: LoaderProps) {
  const sizes = {
    sm: { box: 64, ring: 48, text: "text-sm", gap: "gap-3" },
    md: { box: 96, ring: 64, text: "text-base", gap: "gap-4" },
    lg: { box: 128, ring: 88, text: "text-lg", gap: "gap-5" },
  } as const;

  const cfg = sizes[size];

  const accentBg = `from-${accent}-400/60 to-${accent}-600/40`;
  const accentText = `text-${accent}-600 dark:text-${accent}-400`;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center",
        cfg.gap,
        "p-5 sm:p-6",
        "bg-gradient-to-b from-white/40 dark:from-black/30 rounded-2xl",
        className
      )}
      {...props}
    >
      {/* Layered rings + focal mark */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: cfg.box, height: cfg.box }}
        aria-hidden
      >
        {/* Outer soft glow */}
        <motion.div
          className={cn(
            "absolute rounded-full blur-3xl opacity-60",
            `bg-gradient-to-br ${accentBg}`
          )}
          style={{ width: cfg.box * 1.6, height: cfg.box * 1.6 }}
          animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.06, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Three rotating rings */}
        <motion.svg
          width={cfg.box}
          height={cfg.box}
          viewBox={`0 0 ${cfg.box} ${cfg.box}`}
          className="relative"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2].map((i) => {
            const stroke = 2 + i * 1.2;
            const inset = 6 + i * 6;
            const dash = (cfg.box - inset * 2) * Math.PI * 0.45;

            return (
              <circle
                key={i}
                cx={cfg.box / 2}
                cy={cfg.box / 2}
                r={(cfg.box - inset * 2) / 2}
                fill="none"
                stroke="url(#g)"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={dash}
                strokeDashoffset={i === 1 ? dash * 0.6 : dash * 0.2}
                opacity={0.95 - i * 0.18}
              />
            );
          })}

          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#10B981" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.95" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Removed Orbiting Nodes Here */}
      </div>

      {/* Pill + skeleton text */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          className={cn(
            "inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold",
            "bg-white/60 dark:bg-zinc-900/70 border border-black/6 dark:border-white/6",
            accentText
          )}
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
        >
          <span className="mr-2 w-2 h-2 rounded-full bg-current animate-pulse" />
          <span className="select-none uppercase tracking-wider text-[11px]">
            Preparing
          </span>
        </motion.div>

        <motion.h3
          className={cn(
            cfg.text,
            "mt-3 font-semibold text-black/90 dark:text-white/90"
          )}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.26 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className={cn(
            "mt-1 text-sm text-zinc-600 dark:text-zinc-400 max-w-[28rem] px-4 sm:px-0"
          )}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mt-3 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34 }}
        >
          <div className="w-36 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-white/40 to-white/0 dark:from-black/30"
              animate={{ x: [-80, 80] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="w-10 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </motion.div>
      </div>

      <span className="sr-only">Loading {title}</span>
    </div>
  );
}
