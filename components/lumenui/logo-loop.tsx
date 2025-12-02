"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface TechLogoLoopProps {
  speed?: number; 
  className?: string;
}

type TechLogo = {
  id: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};


const ReactLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <circle cx="32" cy="32" r="4" fill="#61DAFB" />
    <g fill="none" stroke="#61DAFB" strokeWidth="2">
      <ellipse rx="18" ry="7" transform="rotate(0 32 32)" cx="32" cy="32" />
      <ellipse rx="18" ry="7" transform="rotate(60 32 32)" cx="32" cy="32" />
      <ellipse rx="18" ry="7" transform="rotate(120 32 32)" cx="32" cy="32" />
    </g>
  </svg>
);

const NextLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <rect width="64" height="64" rx="14" fill="#020817" />
    <path
      d="M20 22h8.5c5 0 8.5 3.3 8.5 8.1 0 5-3.5 7.9-8.2 7.9H25v4.9h-5V22Zm8.2 11.6c2.3 0 3.7-1.4 3.7-3.5 0-2.1-1.4-3.4-3.7-3.4H25v6.9h3.2Z"
      fill="white"
    />
    <path
      d="M34 22h3.8l10.2 20.5h-4.6L34 22Z"
      fill="white"
    />
  </svg>
);

const TailwindLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <rect width="64" height="64" rx="14" fill="#020617" />
    <path
      d="M16 28c2.4-6.2 6.5-9.3 12.2-9.3 8.6 0 9.9 6.2 14.6 7.2 3 0.6 5.6-.5 7.7-3.3-2.4 6.2-6.5 9.3-12.2 9.3-8.6 0-9.9-6.2-14.6-7.2-3-.6-5.6.5-7.7 3.3Zm0 13.4c2.4-6.2 6.5-9.3 12.2-9.3 8.6 0 9.9 6.2 14.6 7.2 3 .6 5.6-.5 7.7-3.3-2.4 6.2-6.5 9.3-12.2 9.3-8.6 0-9.9-6.2-14.6-7.2-3-.6-5.6.5-7.7 3.3Z"
      fill="#38BDF8"
    />
  </svg>
);

const TSLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <rect width="64" height="64" rx="14" fill="#1D4ED8" />
    <text
      x="32"
      y="37"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontFamily="system-ui, -apple-system, BlinkMacSystemFont"
      fontWeight="700"
    >
      TS
    </text>
  </svg>
);

const NodeLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <rect width="64" height="64" rx="14" fill="#020617" />
    <path
      d="M31.9 10 17 18.3v17.3L31.9 44l14.9-8.4V18.3L31.9 10Z"
      fill="#16A34A"
    />
    <path
      d="M31.9 18.5 22.4 23.8v9l9.5 5.3 9.5-5.3v-9l-9.5-5.3Z"
      fill="#022C22"
    />
  </svg>
);

const PrismaLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <rect width="64" height="64" rx="14" fill="#020617" />
    <path
      d="M18 43.5 29.4 12l10.6 5.7 6 17.9L35 50.5 18 43.5Z"
      fill="#0EA5E9"
    />
  </svg>
);

const PostgresLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <rect width="64" height="64" rx="14" fill="#020617" />
    <path
      d="M32 14c-8.8 0-14 5.4-14 12.1 0 4.8 2.2 8.4 5.6 9.7 1.1-2.5 3.1-4 5.7-4 2.7 0 4.7 1.5 5.8 4 3.4-1.3 5.6-4.9 5.6-9.7C40.7 19.4 36.8 14 32 14Z"
      fill="#0EA5E9"
    />
    <circle cx="26.5" cy="26.5" r="1.4" fill="#0F172A" />
    <circle cx="37.5" cy="26.5" r="1.4" fill="#0F172A" />
  </svg>
);

const GitHubLogo: TechLogo["Icon"] = (props) => (
  <svg viewBox="0 0 64 64" {...props}>
    <rect width="64" height="64" rx="14" fill="#020617" />
    <path
      d="M32 15c-9.4 0-17 7.6-17 17 0 7.5 4.9 13.9 11.7 16.1.9.2 1.3-.4 1.3-.9v-3.2c-4.8 1-5.8-2.1-5.8-2.1-.8-2-2-2.5-2-2.5-1.6-1.1.1-1.1.1-1.1 1.8.1 2.7 1.9 2.7 1.9 1.5 2.7 4.1 1.9 5.1 1.4.1-1.1.6-1.9 1.1-2.3-3.8-.4-7.8-1.9-7.8-8.4 0-1.9.7-3.5 1.9-4.8-.2-.5-.8-2.3.2-4.7 0 0 1.5-.5 4.9 1.8 1.4-.4 2.9-.6 4.4-.6 1.5 0 3 .2 4.4.6 3.4-2.3 4.9-1.8 4.9-1.8 1 2.4.4 4.2.2 4.7 1.2 1.3 1.9 2.9 1.9 4.8 0 6.5-4 8-7.8 8.4.6.5 1.2 1.6 1.2 3.3v4.9c0 .5.4 1.1 1.3.9C44.1 45.9 49 39.5 49 32 49 22.6 41.4 15 32 15Z"
      fill="#F9FAFB"
    />
  </svg>
);

const logos: TechLogo[] = [
  { id: "react", label: "React", Icon: ReactLogo },
  { id: "next", label: "Next.js", Icon: NextLogo },
  { id: "tailwind", label: "Tailwind", Icon: TailwindLogo },
  { id: "ts", label: "TypeScript", Icon: TSLogo },
  { id: "node", label: "Node.js", Icon: NodeLogo },
  { id: "prisma", label: "Prisma", Icon: PrismaLogo },
  { id: "postgres", label: "PostgreSQL", Icon: PostgresLogo },
  { id: "github", label: "GitHub", Icon: GitHubLogo },
];

export default function TechLogoLoop({
  speed = 8,
  className,
}: TechLogoLoopProps) {
  const loopLogos = [...logos, ...logos]; 

  return (
    <>
      <div
        className={cn(
          "group relative w-full overflow-hidden py-4",
          className
        )}
      >
        
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background via-background/40 to-transparent" />

        <div
          className="logo-loop flex gap-5 md:gap-8"
          style={{ animationDuration: `${speed}s` }}
        >
          {loopLogos.map((tech, i) => (
            <motion.div
              key={`${tech.id}-${i}`}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className={cn(
                "flex items-center gap-3 px-3 py-2 md:px-4 md:py-2.5",
                "rounded-2xl border border-border/60 bg-background/60",
                "shadow-sm shadow-black/10 dark:shadow-black/40",
                "backdrop-blur-xl"
              )}
            >
              <tech.Icon className="h-7 w-7 md:h-8 md:w-8" />
              <span className="text-xs md:text-sm font-medium text-foreground/90 whitespace-nowrap">
                {tech.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* local keyframes + hover pause */}
      <style jsx>{`
        .logo-loop {
          animation-name: logo-loop;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-play-state: running;
        }
        .group:hover .logo-loop {
          animation-play-state: paused;
        }
        @keyframes logo-loop {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}