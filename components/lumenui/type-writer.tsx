"use client";

import React, { FC, useEffect, useState } from "react";
import { motion } from "motion/react";

interface TypewriterTextProps {
  text?: string;
  speed?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  className?: string;
}

const TypewriterText: FC<TypewriterTextProps> = ({
  text = "Typewriter Text Effect",
  speed = 0.08,
  loop = false,
  cursor = true,
  cursorChar = "|",
  className = "",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!text) return;

    setIndex(0);
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex += 1;

      if (currentIndex > text.length) {
        if (loop) {
          currentIndex = 0;
        } else {
          clearInterval(interval);
          return;
        }
      }

      setIndex(currentIndex);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [text, speed, loop]);

  const displayed = text.slice(0, index);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span className="font-montserrat font-semibold text-[clamp(1.5rem,5vw,3rem)] text-foreground">
        {displayed}
      </span>
      {cursor && (
        <motion.span
          className="ml-[2px] inline-block align-baseline text-foreground font-mono"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  );
};

export default TypewriterText;
