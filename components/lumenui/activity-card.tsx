"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ActivityData {
  label: string;
  value: number; // percent
  color: string;
  size: number;
  current: number;
  target: number;
  unit: string;
  description: string;
}

interface CircleProgressProps {
  data: ActivityData;
  index: number;
}

const activities: ActivityData[] = [
  {
    label: "DEEP WORK",
    value: 80,
    color: "#6366F1",
    size: 200,
    current: 5.2,
    target: 6,
    unit: "hrs",
    description: "Time spent in distraction-free focus blocks",
  },
  {
    label: "CREATIVE",
    value: 62,
    color: "#EC4899",
    size: 160,
    current: 2.5,
    target: 4,
    unit: "hrs",
    description: "Design, writing, exploration & ideation",
  },
  {
    label: "COMMUNICATION",
    value: 45,
    color: "#22C55E",
    size: 120,
    current: 14,
    target: 30,
    unit: "msgs",
    description: "Replies across email, chat & comments",
  },
];

const CircleProgress = ({ data, index }: CircleProgressProps) => {
  const strokeWidth = 16;
  const radius = (data.size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = ((100 - data.value) / 100) * circumference;

  const gradientId = `gradient-${data.label.toLowerCase().replace(/\s+/g, "-")}`;
  const gradientUrl = `url(#${gradientId})`;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
    >
      <div className="relative">
        <svg
          width={data.size}
          height={data.size}
          viewBox={`0 0 ${data.size} ${data.size}`}
          className="transform -rotate-90"
          aria-label={`${data.label} ring – ${data.value}%`}
        >
          <title>{`${data.label} ring – ${data.value}%`}</title>

          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{
                  stopColor: data.color,
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor:
                    data.color === "#6366F1"
                      ? "#A855F7"
                      : data.color === "#EC4899"
                      ? "#F97316"
                      : "#4ADE80",
                  stopOpacity: 1,
                }}
              />
            </linearGradient>
          </defs>

          {/* Track */}
          <circle
            cx={data.size / 2}
            cy={data.size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-zinc-200/70 dark:text-zinc-800/60"
          />

          {/* Progress */}
          <motion.circle
            cx={data.size / 2}
            cy={data.size / 2}
            r={radius}
            fill="none"
            stroke={gradientUrl}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progress }}
            transition={{
              duration: 1.8,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            strokeLinecap="round"
            style={{
              filter: "drop-shadow(0 0 8px rgba(0,0,0,0.2))",
            }}
          />
        </svg>
      </div>
    </motion.div>
  );
};

const DetailedActivityInfo = () => {
  return (
    <motion.div
      className="flex flex-col gap-5 ml-8"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {activities.map((activity) => (
        <motion.div
          key={activity.label}
          className="flex flex-col gap-1.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              {activity.label}
            </span>
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide"
              style={{
                color: activity.color,
                backgroundColor: `${activity.color}20`,
              }}
            >
              {activity.value}% today
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span
              className="text-2xl font-semibold leading-none"
              style={{ color: activity.color }}
            >
              {activity.current}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              / {activity.target} {activity.unit}
            </span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {activity.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function AppleActivityCard({
  title = "Daily Focus Rings",
  className,
}: {
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl",
        "bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950",
        "border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm",
        className
      )}
    >
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute -top-20 -left-24 h-40 w-40 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-6">
        <motion.div
          className="flex items-center justify-between gap-3"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-white">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              A quick snapshot of how you’re spending your energy today.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Live for today</span>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-6">
          <div className="relative w-[180px] h-[180px] mx-auto sm:mx-0">
            {activities.map((activity, index) => (
              <CircleProgress
                key={activity.label}
                data={activity}
                index={index}
              />
            ))}

            {/* Center label */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Today
              </span>
             
            </motion.div>
          </div>

          <DetailedActivityInfo />
        </div>
      </div>
    </div>
  );
}
