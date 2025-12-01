"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SlideTextButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  hoverText?: string;
  href?: string;
  className?: string;
  variant?: "default" | "ghost";
}

export default function SlideTextButton({
  text = "Browse Components",
  hoverText,
  href = "",
  className,
  variant = "default",
  ...props
}: SlideTextButtonProps) {
  const slideText = hoverText ?? text;
  const variantStyles =
    variant === "ghost"
      ? "border border-black/10 text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
      : "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90";

  return (
    <motion.div
      animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
      className="relative"
      initial={{ x: 200, opacity: 0 }}
    >
      <Link
        className={cn(
          "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-xl px-1 font-medium text-md tracking-tighter transition-all duration-400 md:min-w-40",
          variantStyles,
          className
        )}
        href={href}
        {...props}
      >
        {/* VIEWPORT — fixes the clipping */}
        <span className="relative inline-block w-full overflow-hidden">

          {/* SLIDER — moves left on hover */}
          <span className="flex w-[200%] transition-transform duration-400 ease-in-out group-hover:-translate-x-1/2">

            {/* Default Text */}
            <span className="flex w-1/2 items-center justify-center gap-2">
              <span className="font-medium">{text}</span>
            </span>

            {/* Hover Text (fully visible now) */}
            <span className="flex w-1/2 items-center justify-center gap-2">
              <span className="font-medium">{slideText}</span>
            </span>

          </span>
        </span>
      </Link>
    </motion.div>
  );
}
