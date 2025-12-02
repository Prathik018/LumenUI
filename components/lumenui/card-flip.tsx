"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  className?: string;
}

export default function CardFlip({
  title = "AI Workspace",
  subtitle = "Bring all your tools into one place",
  description = "A unified canvas for chat, files, notes, and automations. Designed for fast, focused work.",
  features = ["Unified inbox", "Command palette", "Realtime sync", "Keyboard-first UX"],
  className,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn(
        "relative w-full max-w-[280px] h-[320px] group [perspective:1600px]",
        className
      )}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative w-full h-full",
          "[transform-style:preserve-3d]",
          "transition-transform duration-700",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            // Use semantic tokens instead of hard-coded light/dark colors
            "bg-gradient-to-br from-background via-background to-muted",
            "border border-border",
            "transition-all duration-700",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          {/* subtle background decoration (use primary instead of orange) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <div className="relative flex h-full flex-col justify-between p-5">
            {/* Top pill + icon */}
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                New Space
              </span>
              <div className="relative flex items-center justify-center rounded-full bg-foreground text-background h-7 w-7">
                <Repeat2 className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Title & subtitle */}
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-semibold text-foreground leading-snug tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-snug line-clamp-3">
                {subtitle}
              </p>
            </div>

            {/* Bottom row */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-muted-foreground">
                  Hover to preview details
                </span>
                <div className="flex gap-1.5 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] text-muted-foreground">
                    Realtime, synced, multiplayer
                  </span>
                </div>
              </div>

              <div className="relative group/icon">
                <div
                  className={cn(
                    "absolute inset-[-6px] rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent",
                    "opacity-0 group-hover/icon:opacity-100",
                    "scale-90 group-hover/icon:scale-100",
                    "transition-all duration-300"
                  )}
                />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-foreground text-background">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/icon:translate-x-0.5 group-hover/icon:scale-110" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-5",
            // Back uses inverted / elevated card look
            "bg-gradient-to-br from-background/95 via-background to-background",
            "border border-border",
            "flex flex-col",
            "transition-all duration-700",
            !isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          {/* Back decoration */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute -right-10 bottom-10 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="relative flex-1 space-y-5">
            <div className="space-y-1.5">
              <h3 className="text-lg font-semibold text-foreground leading-snug tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-snug">
                {description}
              </p>
            </div>

            <div className="space-y-2.5 mt-3">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className={cn(
                    "flex items-center gap-2 text-sm text-foreground",
                    "transition-all duration-400"
                  )}
                  style={{
                    transform: isFlipped ? "translateX(0)" : "translateX(-8px)",
                    opacity: isFlipped ? 1 : 0,
                    transitionDelay: `${index * 90 + 160}ms`,
                  }}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/10">
                    <ArrowRight className="h-3 w-3 text-primary" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative pt-4 mt-4 border-t border-border/70">
            <button
              type="button"
              className={cn(
                "group/start relative flex items-center justify-between",
                "w-full rounded-xl px-3 py-2.5",
                "bg-muted/70 hover:bg-muted",
                "border border-border hover:border-primary/70",
                "transition-all duration-200"
              )}
            >
              <span className="text-sm font-medium text-foreground group-hover/start:text-primary-foreground">
                Open workspace
              </span>
              <div className="relative">
                <div
                  className={cn(
                    "absolute inset-[-6px] rounded-lg bg-gradient-to-br from-primary/30 via-primary/10 to-transparent",
                    "opacity-0 group-hover/start:opacity-100",
                    "scale-90 group-hover/start:scale-100",
                    "transition-all duration-200"
                  )}
                />
                <ArrowRight className="relative z-10 h-4 w-4 text-primary transition-transform duration-200 group-hover/start:translate-x-0.5 group-hover/start:scale-110" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
