"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({
  title = "Configuring your workspace",
  subtitle = "We’re syncing your settings and preparing your environment",
  size = "md",
  className,
  ...props
}: LoaderProps) {
  const sizeConfig = {
    sm: {
      circle: 52,
      stroke: 4,
      titleClass: "text-sm font-medium",
      subtitleClass: "text-xs text-muted-foreground",
      gap: "gap-3",
      maxWidth: "max-w-52",
      pillPadding: "px-2.5 py-1",
      pillText: "text-[10px]",
    },
    md: {
      circle: 72,
      stroke: 4.5,
      titleClass: "text-base font-medium",
      subtitleClass: "text-sm text-muted-foreground",
      gap: "gap-4",
      maxWidth: "max-w-64",
      pillPadding: "px-3 py-1.5",
      pillText: "text-[11px]",
    },
    lg: {
      circle: 88,
      stroke: 5,
      titleClass: "text-lg font-semibold",
      subtitleClass: "text-sm md:text-base text-muted-foreground",
      gap: "gap-5",
      maxWidth: "max-w-72",
      pillPadding: "px-3.5 py-1.5",
      pillText: "text-xs",
    },
  } as const;

  const cfg = sizeConfig[size];
  const radius = (cfg.circle - cfg.stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        "text-black/90 dark:text-white/90",
        cfg.gap,
        "p-6",
        className
      )}
      role="status"
      aria-live="polite"
      {...props}
    >
      {/* 3D loader core */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: cfg.circle,
          height: cfg.circle,
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateX: [18, 14, 18],
          rotateY: [-22, -18, -22],
        }}
        transition={{
          duration: 3.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: [0.4, 0, 0.6, 1],
        }}
        aria-hidden
      >
        {/* Soft glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/8 blur-xl"
          animate={{ opacity: [0.12, 0.25, 0.12] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Base ring */}
        <svg
          width={cfg.circle}
          height={cfg.circle}
          viewBox={`0 0 ${cfg.circle} ${cfg.circle}`}
          className="absolute inset-0"
        >
          <circle
            cx={cfg.circle / 2}
            cy={cfg.circle / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-black/10 dark:text-white/12"
            strokeWidth={cfg.stroke}
          />
        </svg>

        {/* Animated arc */}
        <motion.svg
          width={cfg.circle}
          height={cfg.circle}
          viewBox={`0 0 ${cfg.circle} ${cfg.circle}`}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <circle
            cx={cfg.circle / 2}
            cy={cfg.circle / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-black/80 dark:text-white/80"
            strokeWidth={cfg.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * 0.65}
          />
        </motion.svg>

        {/* Orbiting node */}
        <motion.div
          className="absolute rounded-full bg-black dark:bg-white"
          style={{
            width: cfg.stroke * 1.4,
            height: cfg.stroke * 1.4,
            top: 0,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="w-full h-full rounded-full bg-current shadow-[0_0_10px_rgba(0,0,0,0.25)] dark:shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
        </motion.div>

        {/* Center core */}
        <motion.div
          className="relative rounded-full bg-black dark:bg-white"
          style={{
            width: cfg.stroke * 2.6,
            height: cfg.stroke * 2.6,
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 1.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent dark:from-black/20" />
        </motion.div>
      </motion.div>

      {/* Status pill */}
      <motion.div
        className={cn(
          "inline-flex items-center justify-center rounded-full border border-black/10 dark:border-white/15",
          "bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-sm",
          "text-[11px] font-mono tracking-[0.12em] uppercase text-black/60 dark:text-white/60",
          "shadow-[0_0_0_1px_rgba(0,0,0,0.02)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
          cfg.pillPadding
        )}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <motion.span
          className="mr-1.5 inline-flex rounded-full bg-black/60 dark:bg-white/70"
          style={{ width: 6, height: 6 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <span className="select-none">Preparing</span>
      </motion.div>

      {/* Text block */}
      <motion.div
        className={cn("text-center space-y-1.5", cfg.maxWidth)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        <h2
          className={cn(
            cfg.titleClass,
            "tracking-[-0.02em] text-black/90 dark:text-white/90"
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            cfg.subtitleClass,
            "tracking-[-0.01em] text-black/55 dark:text-white/60"
          )}
        >
          {subtitle}
        </p>
      </motion.div>

      {/* Screen reader text */}
      <span className="sr-only">Loading, please wait…</span>
    </div>
  );
}
