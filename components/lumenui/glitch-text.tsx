"use client";

import React, { FC, useState, CSSProperties } from "react";
import { motion } from "motion/react";

interface GlitchMotionTextProps {
  text?: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
  children?: string;
}

const GlitchMotionText: FC<GlitchMotionTextProps> = ({
  text = "Glitch Text",
  children,
  speed = 0.5,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const active = enableOnHover ? isHovered : true;

  const displayText = children ?? text;

  const baseClass =
    "relative inline-block select-none cursor-pointer font-black text-[clamp(2rem,10vw,8rem)] tracking-widest text-foreground";

  const sharedOverlayStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    whiteSpace: "nowrap",
    overflow: "hidden",
    mixBlendMode: "screen",
  };

  const redStyle: CSSProperties = {
    ...sharedOverlayStyle,
    textShadow: enableShadows ? "-3px 0 #ff005c" : "none",
  };

  const cyanStyle: CSSProperties = {
    ...sharedOverlayStyle,
    textShadow: enableShadows ? "3px 0 #00f6ff" : "none",
  };

  return (
    <div
      className={`${baseClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{displayText}</span>

      <motion.span
        style={redStyle}
        initial={{
          x: 0,
          y: 0,
          skewX: "0deg",
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
        }}
        animate={
          active
            ? {
                x: [0, -2, 3, -4, 1, 0],
                y: [0, -1, 2, -3, 1, 0],
                skewX: ["0deg", "4deg", "-5deg", "3deg", "-2deg", "0deg"],
                clipPath: [
                  "inset(0 0 80% 0)",
                  "inset(10% 0 60% 0)",
                  "inset(40% 0 30% 0)",
                  "inset(60% 0 10% 0)",
                  "inset(20% 0 50% 0)",
                  "inset(0 0 80% 0)",
                ],
                opacity: [0.8, 1, 0.6, 1, 0.7, 0.9],
              }
            : {
                x: 0,
                y: 0,
                skewX: "0deg",
                clipPath: "inset(0 0 100% 0)",
                opacity: 0,
              }
        }
        transition={{
          duration: speed * 2,
          repeat: active ? Infinity : 0,
          repeatType: "mirror",
        }}
      >
        {displayText}
      </motion.span>

      <motion.span
        style={cyanStyle}
        initial={{
          x: 0,
          y: 0,
          skewX: "0deg",
          clipPath: "inset(100% 0 0 0)",
          opacity: 0,
        }}
        animate={
          active
            ? {
                x: [0, 3, -2, 4, -1, 0],
                y: [0, 2, -3, 1, -1, 0],
                skewX: ["0deg", "-4deg", "5deg", "-3deg", "2deg", "0deg"],
                clipPath: [
                  "inset(70% 0 0 0)",
                  "inset(50% 0 10% 0)",
                  "inset(25% 0 40% 0)",
                  "inset(5% 0 65% 0)",
                  "inset(30% 0 25% 0)",
                  "inset(70% 0 0 0)",
                ],
                opacity: [0.7, 1, 0.5, 1, 0.8, 0.9],
              }
            : {
                x: 0,
                y: 0,
                skewX: "0deg",
                clipPath: "inset(100% 0 0 0)",
                opacity: 0,
              }
        }
        transition={{
          duration: speed * 3,
          repeat: active ? Infinity : 0,
          repeatType: "mirror",
        }}
      >
        {displayText}
      </motion.span>
    </div>
  );
};

export default GlitchMotionText;
