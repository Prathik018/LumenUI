"use client";

import * as React from "react";
import { motion } from "motion/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Fingerprint, Check, Clock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  discountedPrice: number;
}

function PriceTag({ price, discountedPrice }: PriceTagProps) {
  const discount = Math.round(((price - discountedPrice) / price) * 100);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-semibold tracking-tight font-montserrat bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
          ${discountedPrice}
        </span>
        <span className="text-lg line-through text-zinc-400 dark:text-zinc-500">
          ${price}
        </span>
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[11px] font-medium dark:bg-emerald-900/20 dark:text-emerald-300 border border-emerald-100/70 dark:border-emerald-500/20">
          <Sparkles className="h-3 w-3" />
          <span>{discount}% off</span>
        </div>
        <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100 mt-1">
          Lifetime access
        </span>
        <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
          One-time payment
        </span>
      </div>
    </div>
  );
}

interface DrawerDemoProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  price?: number;
  discountedPrice?: number;
}

const drawerVariants = {
  hidden: { y: "100%", opacity: 0, scale: 0.98 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
      mass: 0.9,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delayChildren: 0.12, staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 28 } },
};

export default function SmoothDrawer({
  title = "LumenUI",
  description = "A collection of high-end animated UI components for React, Next.js, and Tailwind. Build polished interfaces with zero design effort.",
  primaryButtonText = "Get lifetime access",
  secondaryButtonText = "Maybe later",
  onPrimaryAction,
  onSecondaryAction,
  price = 169,
  discountedPrice = 99,
}: DrawerDemoProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="rounded-xl text-sm px-4 py-2">
          Open Drawer
        </Button>
      </DrawerTrigger>

      <DrawerContent className="border-0 bg-transparent pt-4 pb-8">
        <motion.div
          variants={drawerVariants as any}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-lg px-3"
        >
          {/* Glass-style card */}
          <motion.div
            variants={cardVariants as any}
            className={cn(
              "relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.18)]",
              "dark:border-zinc-800/80 dark:bg-zinc-900/90 backdrop-blur-xl px-5 py-5 space-y-5"
            )}
          >
            {/* Accent gradient strip */}
            <motion.div
              className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-500"
              layoutId="lumen-ui-accent-strip"
            />

            {/* Notice */}
            <motion.div
              variants={itemVariants as any}
              className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400"
            >
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100/90 px-2 py-1 dark:bg-zinc-800/90">
                <Clock className="h-3 w-3" />
                <span>Limited-time pricing</span>
              </div>
              <span className="hidden sm:inline text-zinc-400 dark:text-zinc-500">
                Instant access • Secure payment
              </span>
            </motion.div>

            {/* Header */}
            <motion.div variants={itemVariants as any}>
              <DrawerHeader className="px-0 pb-0 pt-1 space-y-3">
                <DrawerTitle className="text-2xl tracking-tight font-montserrat font-semibold">
                  {title}
                </DrawerTitle>

                <DrawerDescription className="px-0 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {description}
                </DrawerDescription>
              </DrawerHeader>
            </motion.div>

            {/* Pricing */}
            <motion.div variants={itemVariants as any}>
              <PriceTag price={price} discountedPrice={discountedPrice} />
            </motion.div>

            {/* Features */}
            <motion.div
              variants={itemVariants as any}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[13px] text-zinc-600 dark:text-zinc-300"
            >
              {[
                "Animated components",
                "Lifetime updates",
                "Commercial license",
                "Optimized for Next.js",
              ].map((feature) => (
                <div key={feature} className="inline-flex items-center gap-1.5">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants as any}>
              <DrawerFooter className="flex flex-col gap-2 px-0 pb-0 pt-2">
                <Link href="#" className="w-full">
                  <Button
                    className="relative h-11 w-full rounded-xl bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 font-semibold text-sm tracking-tight overflow-hidden"
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0"
                      whileHover={{ x: ["-120%", "120%"], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    <span className="relative z-10 inline-flex items-center gap-2">
                      {primaryButtonText}
                      <motion.div
                        animate={{ y: [0, -1.5, 0] }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          repeatDelay: 0.8,
                          ease: "easeInOut",
                        }}
                      >
                        <Fingerprint className="h-4 w-4" />
                      </motion.div>
                    </span>
                  </Button>
                </Link>

                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={onSecondaryAction}
                    className="h-10 w-full rounded-xl border-zinc-200 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800/80"
                  >
                    {secondaryButtonText}
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </motion.div>
          </motion.div>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}
