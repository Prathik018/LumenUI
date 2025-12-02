"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CreditCard,
  ShieldCheck,
  Globe2,
  Zap,
  ArrowRightLeft,
  User,
  Building2,
  Server,
} from "lucide-react";

interface Specification {
  label: string;
  value: string;
}

interface Product {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  specs: Specification[];
}

// Payments-focused products (no images)
const products: Product[] = [
  {
    id: "instant-checkout",
    title: "Instant Checkout",
    subtitle: "One-tap payments, optimized for conversion.",
    tag: "Consumer",
    specs: [
      { label: "Auth Rate", value: "98.2%" },
      { label: "Latency", value: "<300ms" },
      { label: "Methods", value: "25+" },
      { label: "Coverage", value: "Global" },
    ],
  },
  {
    id: "merchant-terminal",
    title: "Merchant Terminal",
    subtitle: "In-store, QR, and tap-to-pay flows.",
    tag: "In-Store",
    specs: [
      { label: "Hardware", value: "Optional" },
      { label: "Modes", value: "Tap / QR" },
      { label: "Uptime", value: "99.99%" },
      { label: "Regions", value: "40+" },
    ],
  },
  {
    id: "treasury-engine",
    title: "Treasury Engine",
    subtitle: "Multi-currency balances and real-time FX.",
    tag: "Treasury",
    specs: [
      { label: "Currencies", value: "30+" },
      { label: "FX Spread", value: "Dynamic" },
      { label: "Ledger", value: "Real-time" },
      { label: "Limit", value: "Custom" },
    ],
  },
  {
    id: "payout-network",
    title: "Payout Network",
    subtitle: "Mass payouts to teams and creators.",
    tag: "Payouts",
    specs: [
      { label: "Destinations", value: "190+" },
      { label: "Rails", value: "Card / Bank" },
      { label: "Frequency", value: "On-demand" },
      { label: "Compliance", value: "Built-in" },
    ],
  },
];

interface CardProps {
  product: Product;
  index: number;
  totalCards: number;
  isExpanded: boolean;
}

const getProductIcon = (id: string) => {
  if (id.includes("checkout")) return <CreditCard className="w-4 h-4" />;
  if (id.includes("terminal")) return <Zap className="w-4 h-4" />;
  if (id.includes("treasury")) return <ShieldCheck className="w-4 h-4" />;
  if (id.includes("payout")) return <Globe2 className="w-4 h-4" />;
  return <CreditCard className="w-4 h-4" />;
};

const Card = ({ product, index, totalCards, isExpanded }: CardProps) => {
  // Collapsed (stacked) positions
  const collapsedX = index * 10 - (totalCards - 1) * 5;
  const collapsedY = index * 8;
  const collapsedRotate = index * 3 - (totalCards - 1) * 1.5;
  const collapsedScale = 1 - index * 0.03;

  // Expanded (fanned) positions
  const cardWidth = 320;
  const overlap = 230;
  const totalExpandedWidth =
    cardWidth + (totalCards - 1) * (cardWidth - overlap);
  const centerOffset = totalExpandedWidth / 2;
  const expandedX =
    index * (cardWidth - overlap) - centerOffset + cardWidth / 2;
  const expandedY = 0;
  const expandedRotate = 0;
  const expandedScale = 1;

  const icon = getProductIcon(product.id);

  return (
    <motion.div
      initial={{
        x: collapsedX,
        y: collapsedY,
        rotate: collapsedRotate,
        scale: collapsedScale,
        opacity: 0,
      }}
      animate={{
        x: isExpanded ? expandedX : collapsedX,
        y: isExpanded ? expandedY : collapsedY,
        rotate: isExpanded ? expandedRotate : collapsedRotate,
        scale: isExpanded ? expandedScale : collapsedScale,
        opacity: 1,
        zIndex: totalCards - index,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 26,
        mass: 0.8,
      }}
      className={cn(
        "absolute inset-0 w-[320px] rounded-2xl p-[1px]",
        "bg-gradient-to-br from-white/40 via-slate-100/20 to-slate-300/20",
        "dark:from-slate-800/70 dark:via-slate-900/50 dark:to-black/30",
        "border border-white/40 dark:border-slate-800/60",
        "backdrop-blur-xl transform-gpu",
        "transition-all duration-500 ease-out"
      )}
      style={{
        left: "50%",
        marginLeft: "-160px",
      }}
    >
      {/* inner layer */}
      <div className="relative h-full w-full rounded-[1rem] bg-gradient-to-b from-white/85 via-slate-50/80 to-slate-100/90 dark:from-slate-900/85 dark:via-slate-950/90 dark:to-black/95 border border-slate-200/70 dark:border-slate-700/70 overflow-hidden">
        {/* top accent */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        {/* glow blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 -right-8 h-24 w-24 rounded-full bg-amber-400/25 blur-3xl" />
          <div className="absolute bottom-[-40px] left-[-40px] h-28 w-28 rounded-full bg-orange-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 flex h-full flex-col p-4">
          {/* Header: tag + icon */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-amber-600 dark:text-amber-400">
              {product.tag}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 shadow-sm shadow-black/40">
              {icon}
            </div>
          </div>

          {/* Animated flow area instead of image */}
          <div className="mb-3 rounded-lg border border-slate-200/70 dark:border-slate-700/70 bg-gradient-to-r from-slate-50/80 via-slate-100/70 to-slate-50/80 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-slate-950/80 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200">
                Payment flow
              </span>
              <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                <ArrowRightLeft className="w-3 h-3" />
                Live
              </span>
            </div>

            {/* Flow icons + line */}
            <div className="mt-1 flex items-center gap-3">
              {/* Left node: Customer */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900 text-[11px]">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                  Customer
                </span>
              </div>

              {/* Line + runner + gateway node */}
              <div className="flex-1 flex flex-col gap-1">
                <div className="relative flex items-center gap-2">
                  {/* line */}
                  <div className="relative flex-1 h-[2px] rounded-full bg-slate-300/60 dark:bg-slate-700/70 overflow-hidden">
                    {/* moving stripes */}
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, rgba(249,115,22,0.7) 0, rgba(249,115,22,0.7) 8px, transparent 8px, transparent 16px)",
                        animation: "payment-flow-stripes 1.3s linear infinite",
                      }}
                    />

                    {/* moving transaction dot */}
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]"
                      initial={{ left: "0%" }}
                      animate={{ left: ["0%", "50%", "100%"] }}
                      transition={{
                        duration: 1.7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Gateway node */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-amber-300 text-[10px] border border-amber-400/40">
                    <Server className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex justify-between text-[9px] text-slate-500 dark:text-slate-400">
                  <span>Tokenization</span>
                  <span>Risk / 3DS</span>
                </div>
              </div>

              {/* Right node: Bank / Settlement */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 text-[11px] border border-emerald-400/60">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9px] text-slate-500 dark:text-slate-400">
                  Bank
                </span>
              </div>
            </div>
          </div>

          {/* Title + subtitle */}
          <div className="space-y-1 mb-3">
            <h2 className="text-[17px] font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              {product.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
              {product.subtitle}
            </p>
          </div>

          {/* Specs */}
          <dl className="grid grid-cols-2 gap-x-3 gap-y-2 mt-auto">
            {product.specs.map((spec) => (
              <div key={spec.label} className="flex flex-col gap-0.5">
                <dt className="text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {spec.label}
                </dt>
                <dd className="text-xs font-medium text-slate-900 dark:text-slate-50">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* CTA Row */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Tap to {isExpanded ? "collapse" : "compare"} flows.
            </span>
            <div className="relative group/icon">
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-amber-500/30 via-amber-500/15 to-transparent opacity-0 scale-90 group-hover/icon:opacity-100 group-hover/icon:scale-100 transition-all duration-200" />
              <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-slate-50 dark:bg-slate-50 dark:text-slate-900">
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/icon:translate-x-0.5 group-hover/icon:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface CardStackProps {
  className?: string;
}

export default function CardStackExample({ className }: CardStackProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <>
      <button
        className={cn(
          "relative mx-auto cursor-pointer",
          "min-h-[460px] w-full max-w-[90vw]",
          "md:max-w-[1200px]",
          "appearance-none bg-transparent border-0 p-0",
          "flex items-center justify-center mb-8",
          "[perspective:1600px]",
          className
        )}
        onClick={handleToggle}
        aria-label="Toggle payment card stack"
        aria-pressed={isExpanded}
        type="button"
      >
        {products.map((product, index) => (
          <Card
            key={product.id}
            product={product}
            index={index}
            totalCards={products.length}
            isExpanded={isExpanded}
          />
        ))}
      </button>

      {/* local keyframes for line flow */}
      <style jsx>{`
        @keyframes payment-flow-stripes {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 40px 0;
          }
        }
      `}</style>
    </>
  );
}
