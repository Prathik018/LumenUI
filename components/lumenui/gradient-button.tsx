"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type ColorVariant = "emerald" | "purple" | "orange";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  variant?: ColorVariant;
}

const VARIANT_STYLES: Record<
  ColorVariant,
  {
    bg: string;
    border: string;
    text: string;
    pillBg: string;
    glow: string;
    hoverRing: string;
  }
> = {
  emerald: {
    bg: "bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500",
    border: "border-emerald-300/70 dark:border-emerald-400/60",
    text: "text-emerald-950 dark:text-emerald-50",
    pillBg: "bg-emerald-100/80 dark:bg-emerald-900/70",
    glow: "rgba(16, 185, 129, 0.45)",
    hoverRing: "ring-emerald-300/60 dark:ring-emerald-400/60",
  },
  purple: {
    bg: "bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600",
    border: "border-purple-300/70 dark:border-purple-400/60",
    text: "text-violet-950 dark:text-violet-50",
    pillBg: "bg-violet-100/80 dark:bg-violet-900/70",
    glow: "rgba(139, 92, 246, 0.45)",
    hoverRing: "ring-purple-300/60 dark:ring-purple-400/60",
  },
  orange: {
    bg: "bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500",
    border: "border-orange-300/70 dark:border-orange-400/60",
    text: "text-orange-950 dark:text-orange-50",
    pillBg: "bg-orange-100/80 dark:bg-orange-900/70",
    glow: "rgba(249, 115, 22, 0.45)",
    hoverRing: "ring-orange-300/60 dark:ring-orange-400/60",
  },
};

const MotionButton = motion(Button as any);

export default function GradientButton({
  label = "Welcome",
  icon,
  className,
  variant = "orange",
  ...props
}: GradientButtonProps) {
  const styles = VARIANT_STYLES[variant];

  return (
    <MotionButton
      {...props}
      type={props.type ?? "button"}
      variant="ghost"
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn(
        "relative inline-flex h-11 items-center justify-center gap-2",
        "rounded-2xl px-4 py-2",
        "border overflow-hidden group",
        // base visual
        styles.bg,
        styles.border,
        styles.text,
        // focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        styles.hoverRing,
        "ring-offset-background",
        "shadow-sm transition-all duration-200 ease-out",
        className
      )}
      style={{
        boxShadow: `0 0 18px ${styles.glow}`,
      }}
    >
      {/* inner glass layer */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-px rounded-2xl",
          "bg-gradient-to-b from-white/40 via-white/10 to-white/0",
          "dark:from-white/10 dark:via-white/5 dark:to-white/0",
          "backdrop-blur-sm"
        )}
      />

      {/* hover gradient glow (no shimmer / no movement) */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-px rounded-2xl",
          "opacity-0 group-hover:opacity-100",
          "transition-opacity duration-250 ease-out",
          "bg-radial from-white/35 via-transparent to-transparent",
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5), transparent 60%)",
        }}
      />

      {/* content */}
      <span className="relative flex items-center gap-2">
        {icon && (
          <span
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-xl border border-white/60",
              "shadow-sm text-current",
              styles.pillBg
            )}
          >
            {icon}
          </span>
        )}

        <span className="relative text-sm font-medium tracking-tight">
          {label}
        </span>
      </span>
    </MotionButton>
  );
}
