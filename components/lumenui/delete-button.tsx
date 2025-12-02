"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion, useAnimation } from "motion/react";

type DeleteButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
};

const MotionButton = motion(Button as any);

export default function DeleteButton({
  label = "Delete",
  className,
  onClick,
  ...props
}: DeleteButtonProps) {
  const iconControls = useAnimation();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Run user-provided onClick first
    if (onClick) {
      onClick(e);
    }

    // Trigger icon animation
    await iconControls.start({
      rotate: [0, -12, 10, -6, 0],
      scale: [1, 0.9, 1.05, 0.98, 1],
      y: [0, 1, -1, 0],
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    });
  };

  return (
    <MotionButton
      type={props.type ?? "button"}
      variant="destructive"
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium",
        "bg-red-600 text-white hover:bg-red-700",
        "border border-red-500/80 shadow-sm",
        "focus-visible:ring-2 focus-visible:ring-red-500/60 focus-visible:ring-offset-2",
        "overflow-hidden",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <motion.span
        aria-hidden
        animate={iconControls}
        className="flex h-5 w-5 items-center justify-center"
      >
        <Trash2 className="h-4 w-4" />
      </motion.span>
      <span>{label}</span>
    </MotionButton>
  );
}
