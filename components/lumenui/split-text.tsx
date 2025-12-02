"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";

export interface SplitTextProps {
  text?: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  duration?: number;
  bounceIntensity?: number;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onComplete?: () => void;
  ariaHidden?: boolean;
}

const defaultDelay = 40;
const defaultDuration = 0.6;
const defaultBounce = 0.6;

export default function SplitText({
  text = "Hello, World!",
  className = "",
  tag = "p",
  delay = defaultDelay,
  duration = defaultDuration,
  bounceIntensity = defaultBounce,
  threshold = 0.1,
  rootMargin = "0px",
  textAlign = "left",
  onComplete,
  ariaHidden = true,
}: SplitTextProps) {
  const prefersReduced = useReducedMotion();
  const Tag = tag as keyof JSX.IntrinsicElements;
  const chars = useMemo(() => Array.from(text || ""), [text]);
  const containerRef = useRef<HTMLElement | null>(null);
  const [mountedKey, setMountedKey] = useState(0);

  useEffect(() => {
    setMountedKey((k) => k + 1);
  }, [text]);

  const stagger = Math.max(0, delay) / 1000;
  const springStiffness = Math.max(120, 400 * Math.min(1, Math.max(0, bounceIntensity)));
  const springDamping = Math.max(6, 26 - 18 * Math.min(1, Math.max(0, bounceIntensity)));

  const charVariants: Variants = prefersReduced
    ? {
      hidden: { opacity: 0, y: 6 },
      visible: { opacity: 1, y: 0, transition: { duration: Math.min(0.15, duration) } },
    }
    : {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: springStiffness,
          damping: springDamping,
          duration: Math.max(0.08, duration),
        },
      },
    };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.span
      key={`${mountedKey}-${text?.length}-${tag}`}
      ref={(el) => {
        containerRef.current = el;
      }}
      role="text"
      aria-label={text}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold, margin: rootMargin }}
      variants={containerVariants}
      onAnimationComplete={onComplete}
      style={{ display: "inline-block", textAlign, fontSize: "2rem", fontWeight: "semi-bold" }}
      className={`split-parent overflow-hidden font-montserrat inline-block whitespace-pre-wrap text-black dark:text-white ${className}`}
      aria-hidden={ariaHidden ? true : undefined}
    >
      <Tag aria-hidden style={{ display: "inline-block", lineHeight: "inherit" }}>
        {chars.map((ch, i) => {
          const content = ch === " " ? "\u00A0" : ch;
          return (
            <motion.span
              aria-hidden
              key={`char-${i}-${content}`}
              data-split-index={i}
              className="inline-block"
              variants={charVariants}
              style={{ display: "inline-block", willChange: "transform, opacity" }}
            >
              {content}
            </motion.span>
          );
        })}
      </Tag>
    </motion.span>
  );
}



