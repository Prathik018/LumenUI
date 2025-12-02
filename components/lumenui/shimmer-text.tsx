"use client";

import React, { FC } from "react";
import { motion } from "motion/react";

interface ShimmerTextProps {
  text?: string;
  speed?: number;
  className?: string;
  children?: string;
}

const ShimmerText: FC<ShimmerTextProps> = ({
  text = "Shimmer Text",
  children,
  speed = 2.2,
  className = "",
}) => {
  const displayText = children ?? text;

  return (
    <div
      className={`relative inline-block select-none font-montserrat font-semibold text-[clamp(2rem,10vw,6rem)] text-neutral-700 ${className}`}
    >
      <span>{displayText}</span>

      <motion.span
        className="absolute inset-0 bg-clip-text text-transparent pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0) 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPositionX: ["-200%", "200%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
        }}
      >
        {displayText}
      </motion.span>
    </div>
  );
};

export default ShimmerText;
