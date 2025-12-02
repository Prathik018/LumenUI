"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface CarouselCardProps {
  items?: CarouselItem[]; // optional
  className?: string;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Fast Payments",
    description: "Lightning-quick transactions with near-zero latency.",
    icon: <Zap className="h-8 w-8 text-primary" />,
  },
  {
    title: "Secure Checkout",
    description: "End-to-end encryption and real-time fraud detection.",
    icon: <ShieldCheck className="h-8 w-8 text-emerald-400" />,
  },
  {
    title: "Any Payment Method",
    description: "Cards, wallets, UPI, and more in a single integration.",
    icon: <CreditCard className="h-8 w-8 text-sky-400" />,
  },
];

export default function CarouselCard({
  items = DEFAULT_ITEMS,
  className,
}: CarouselCardProps) {
  const [index, setIndex] = useState(0);

  // extra safety: if someone passes [] explicitly
  if (!items || items.length === 0) {
    return (
      <div
        className={cn(
          "relative w-full max-w-md mx-auto rounded-2xl border border-border/60 bg-card/80 p-6 text-center text-sm text-muted-foreground",
          className
        )}
      >
        No carousel items provided.
      </div>
    );
  }

  const safeIndex = ((index % items.length) + items.length) % items.length;

  const next = () => setIndex((prev) => (prev + 1) % items.length);
  const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

  const currentItem = items[safeIndex];

  return (
    <div
      className={cn(
        "relative w-full max-w-md mx-auto overflow-hidden rounded-2xl",
        // Theme-aware background + border
        "bg-gradient-to-br from-background via-background to-muted border border-border/70",
        className
      )}
    >
      {/* Nav buttons */}
      <button
        type="button"
        onClick={prev}
        className={cn(
          "absolute left-2 top-1/2 -translate-y-1/2 z-20",
          "flex h-8 w-8 items-center justify-center rounded-full",
          "bg-muted/70 hover:bg-muted",
          "text-foreground border border-border/70",
          "transition"
        )}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={next}
        className={cn(
          "absolute right-2 top-1/2 -translate-y-1/2 z-20",
          "flex h-8 w-8 items-center justify-center rounded-full",
          "bg-muted/70 hover:bg-muted",
          "text-foreground border border-border/70",
          "transition"
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Card content */}
      <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            {currentItem.icon && (
              <div className="mb-3 flex items-center justify-center text-3xl">
                {currentItem.icon}
              </div>
            )}

            <h3 className="text-xl font-semibold text-foreground">
              {currentItem.title}
            </h3>

            <p className="mt-2 max-w-[260px] text-sm text-muted-foreground">
              {currentItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className="group"
          >
            <motion.div
              className={cn(
                "h-2 w-2 rounded-full",
                i === safeIndex
                  ? "bg-primary"
                  : "bg-muted-foreground/40"
              )}
              animate={{ scale: i === safeIndex ? 1.2 : 1 }}
              transition={{ duration: 0.15 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
