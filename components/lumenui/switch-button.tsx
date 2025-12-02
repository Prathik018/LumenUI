"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";

interface SwitchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "default" | "lg";
  showLabel?: boolean;
}

export default function SwitchButton({
  className,
  size = "default",
  showLabel = true,
  ...props
}: SwitchButtonProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";

  const sizes = {
    sm: "h-8 px-3 text-xs",
    default: "h-10 px-4 text-sm",
    lg: "h-11 px-5 text-sm",
  };

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      type={props.type ?? "button"}
      onClick={handleThemeToggle}
      className={cn(
        "relative inline-flex items-center gap-2",
        "rounded-full border border-zinc-200/80 dark:border-zinc-700/80",
        "bg-zinc-50/90 dark:bg-zinc-900/90",
        "hover:shadow-md",
        "transition-all duration-200 ease-out",
        "overflow-hidden",
        "focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        sizes[size],
        className
      )}
      {...props}
    >
      {/* subtle background gradient */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full",
          "bg-gradient-to-r from-zinc-100 via-zinc-50 to-zinc-100",
          "dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900"
        )}
      />

      {/* animated highlight on hover */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-0",
          "bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.5),transparent_55%)]",
          "dark:bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_55%)]",
          "group-hover:opacity-100 transition-opacity duration-300"
        )}
      />

      {/* Icon + slider pill */}
      <motion.span
        className={cn(
          "relative flex items-center justify-center rounded-full",
          "border border-zinc-200/80 dark:border-zinc-700/80",
          "bg-white/80 dark:bg-zinc-900/90",
          "shadow-sm"
        )}
        layout
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{
          padding: size === "sm" ? "3px 7px" : "4px 8px",
        }}
      >
        <AnimatePresence initial={false} mode="wait">
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ y: 6, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -6, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <Moon
                className={cn(
                  "transition-colors",
                  size === "sm" && "h-3.5 w-3.5",
                  size === "default" && "h-4 w-4",
                  size === "lg" && "h-5 w-5",
                  "text-indigo-300"
                )}
              />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ y: -6, opacity: 0, rotate: 90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 6, opacity: 0, rotate: -90 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <Sun
                className={cn(
                  "transition-colors",
                  size === "sm" && "h-3.5 w-3.5",
                  size === "default" && "h-4 w-4",
                  size === "lg" && "h-5 w-5",
                  "text-amber-500"
                )}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>

      {/* Label */}
      {showLabel && (
        <span className="relative ml-1 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-200">
          <motion.span
            key={isDark ? "dark-label" : "light-label"}
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-1"
          >
            {isDark ? "Dark mode" : "Light mode"}
          </motion.span>
        </span>
      )}
    </Button>
  );
}
