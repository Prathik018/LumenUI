"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Command } from "lucide-react";

interface CommandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Shortcut hint text like "⌘K" or "Ctrl K" */
  command?: string;

  /** Description label like "Open command palette" */
  description?: string;
}

export default function CommandButton({
  className,
  command = "⌘K",
  description = "Open command palette",
  ...props
}: CommandButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "group relative inline-flex items-center gap-3",
        "rounded-xl border border-border/70",
        "bg-gradient-to-b from-background/90 via-background to-muted/70",
        "px-4 py-2 text-sm font-medium",
        "shadow-sm hover:shadow-md",
        "transition-all duration-200 ease-out",
        "hover:border-primary/60 hover:bg-primary/5",
        "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
        "overflow-hidden", // prevent glow overflow
        className
      )}
    >
      {/* Hover Sweep Glow */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-px rounded-xl",
          "bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0",
          "translate-x-[-130%] group-hover:translate-x-[130%]",
          "transition-transform duration-500 ease-out"
        )}
      />

      {/* Left Icon */}
      <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Command className="h-4 w-4" />
      </span>

      {/* Description */}
      <span className="relative text-sm text-muted-foreground">
        {description}
      </span>

      {/* Shortcut Hint */}
      <span className="relative ml-auto hidden items-center gap-1 rounded-md border border-border/60 bg-background/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:flex">
        {command}
      </span>
    </Button>
  );
}
