"use client";

import { motion } from "motion/react";
import SlideTextButton from "@/components/lumenui/slide-text-button";
import FeatureBlock from "@/components/landing/FeatureBlock";
import CardFlip from "@/components/lumenui/card-flip";
import GradientButton from "@/components/lumenui/gradient-button";
import AttractButton from "@/components/lumenui/attract-button";
import AI_Prompt from "@/components/lumenui/ai-prompt";
import FileUpload from "@/components/lumenui/file-upload";
import AILoadingState from "@/components/lumenui/ai-loading";

export function HeroSection() {
  return (
    <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-between gap-8 px-4 py-8 md:py-12 lg:flex-row lg:gap-4">

      {/* Left side - Title and CTA */}
      <div className="flex w-full flex-col items-start space-y-8 text-left md:mb-42 lg:w-[45%]">
        <div>
          <h1 className="font-semibold font-montserrat text-5xl text-black leading-[1.1] tracking-tight sm:text-6xl lg:text-6xl dark:text-white">
            Build faster with stunning UI components
          </h1>

          <p className="mt-6 max-w-lg font-montserrat text-base text-black/90 tracking-tighter md:text-xl dark:text-white/80">
            A growing collection of 50+ modern UI components built using Tailwind CSS,
            shadcn/ui, and Motion refined into the lightweight, accessible LumenUI library.
          </p>
        </div>
        <div className="flex w-full flex-col justify-center sm:justify-start">
          <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:items-start sm:justify-start">
            <SlideTextButton hoverText="Click to see more" href="/docs/components/action-search-bar" />
          </div>

        </div>
        <FeatureBlock />
        <div className="mt-8 w-full space-y-2"> </div>
      </div>

      {/* Right side - Dynamic Component Preview Grid */}
      <div className="flex w-full flex-col justify-between gap-2 lg:w-[55%] lg:pl-8">

        {/* Top Row - Bento Grid Style */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid w-full grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Card Flip - Large */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ rotateY: -15, x: -20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              rotateY: 0,
              x: 0,
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/80 p-4 shadow-xl dark:border-zinc-800/50 dark:from-zinc-900/90 dark:to-black/90">
              <CardFlip />
            </div>
          </motion.div>

          {/* Gradient Button - Compact */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ rotateY: 15, x: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              rotateY: 0,
              x: 0,
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-xl dark:border-zinc-800/50 dark:from-black/90 dark:to-zinc-900/90">
              <GradientButton />
              <AttractButton />
            </div>
          </motion.div>
        </motion.div>

        {/* Middle Row - Full Width Showcase */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="w-full"
          initial={{ opacity: 0, scale: 0.95, rotateX: -10 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          whileHover={{
            scale: 1.02,
            rotateX: 0,
            transition: { duration: 0.3 }
          }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white via-zinc-50/50 to-white p-6 shadow-2xl dark:border-zinc-800/50 dark:from-zinc-900/90 dark:via-black/90 dark:to-zinc-900/90">
            <AI_Prompt />
          </div>
        </motion.div>

        {/* Bottom Row - Triple Column */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="grid w-full grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* File Upload */}
          <motion.div
            className="col-span-3 md:col-span-2"
            initial={{ rotateZ: -3, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              rotateZ: 0,
              y: 0,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/80 p-4 shadow-xl dark:border-zinc-800/50 dark:from-zinc-900/90 dark:to-black/90">
              <FileUpload />
            </div>
          </motion.div>

          {/* AI Loading State */}
          <motion.div
            className="col-span-3 md:col-span-1"
            initial={{ rotateZ: 3, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{
              rotateZ: 0,
              y: 0,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-zinc-50 to-white p-4 shadow-xl dark:border-zinc-800/50 dark:from-black/90 dark:to-zinc-900/90">
              <AILoadingState />
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Badge */}
        <motion.div
          animate={{
            opacity: 1,
            y: [0, -5, 0],
          }}
          className="absolute right-0 top-0 -mr-4 -mt-4 hidden lg:block"
          initial={{ opacity: 0, scale: 0 }}
          transition={{
            opacity: { duration: 0.5, delay: 0.8 },
            scale: { duration: 0.5, delay: 0.8, type: "spring" },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }
          }}
        >
          <div className="rounded-full border border-purple-200 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-xs font-semibold text-white shadow-lg dark:border-purple-800">
            43+ Components
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;



