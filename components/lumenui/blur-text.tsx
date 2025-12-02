"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, Transition, Easing } from "framer-motion";

export type AnimateBy = "words" | "letters";
export type Direction = "top" | "bottom";

export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: AnimateBy;
  direction?: Direction;
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    const frames: Array<string | number> = [];
    frames.push(from[k] ?? (typeof steps[0][k] === "number" ? 0 : ""));
    steps.forEach((s) => {
      frames.push(s[k] ?? frames[frames.length - 1]);
    });
    keyframes[k] = frames;
  });
  return keyframes;
};

export default function BlurText({
  text = "Hello World!",
  delay = 40,
  className = "",
  animateBy = "letters",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = "easeOut",
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  const elements = useMemo(
    () => (animateBy === "words" ? text.split(" ") : Array.from(text || "")),
    [text, animateBy]
  );

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = Math.max(0.001, stepDuration * (stepCount - 1));
  const times = Array.from(
    { length: stepCount },
    (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1))
  );

  const keyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  const spanTransition: Transition = {
    duration: totalDuration,
    times,
    delay: 0,
    ease: easing,
  };

  return (
    <p
      ref={ref as any}
      className={`blur-text ${className} flex flex-wrap font-montserrat 
      text-[40px] leading-tight font-semibold`} 
      aria-label={text}
      role="text"
    >
      {elements.map((segment, index) => {
        const token = segment === " " ? "\u00A0" : segment;
        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? keyframes : fromSnapshot}
            transition={{
              ...spanTransition,
              delay: (index * delay) / 1000,
            }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity",
            }}
            aria-hidden
          >
            {token}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
}
