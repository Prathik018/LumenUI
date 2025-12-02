"use client";

import { useEffect, useRef, useState, CSSProperties } from "react";

interface HoverFocusTextProps {
  sentence?: string;
  separator?: string;
  blurAmount?: number;
  animationDuration?: number;
  className?: string;
  activeScale?: number;
}

const HoverFocusText: React.FC<HoverFocusTextProps> = ({
  sentence = "True Focus On Hover",
  separator = " ",
  blurAmount = 6,
  animationDuration = 0.45,
  className = "",
  activeScale = 1.04,
}) => {
  const words = sentence.split(separator);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleLeave = () => setCurrentIndex(null);
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mouseleave", handleLeave);
    return () => el.removeEventListener("mouseleave", handleLeave);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex gap-4 justify-center items-center font-montserrat font-semibold flex-wrap ${className}`}
      style={{ outline: "none", userSelect: "none" }}
    >
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        const hasFocus = currentIndex !== null;
        const style: CSSProperties = {
          filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
          opacity: isActive ? 1 : hasFocus ? 0.55 : 0.85,
          transform: isActive ? `scale(${activeScale}) translateY(-2px)` : "scale(1) translateY(0)",
          transition: [
            `filter ${animationDuration}s cubic-bezier(0.23, 0.82, 0.15, 1)`,
            `opacity ${animationDuration}s cubic-bezier(0.23, 0.82, 0.15, 1)`,
            `transform ${animationDuration}s cubic-bezier(0.23, 0.82, 0.15, 1)`,
          ].join(", "),
          outline: "none",
          userSelect: "none",
        };

        return (
          <span
            key={index}
            className="relative text-[3rem] font-black cursor-pointer"
            style={style}
            onMouseEnter={() => setCurrentIndex(index)}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export default HoverFocusText;
