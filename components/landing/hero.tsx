"use client";

import { motion } from "motion/react";
import SlideTextButton from "@/components/lumenui/slide-text-button";
import FeatureBlock from "@/components/landing/FeatureBlock";
import CardFlip from "@/components/lumenui/card-flip";
import ActivityCard from "@/components/lumenui/activity-card";
import FileUpload from "@/components/lumenui/file-upload";
import AILoadingState from "@/components/lumenui/ai-loading";
import AIVoice from "@/components/lumenui/ai-voice";
import PaymentFlowCard from "@/components/lumenui/paymentflow-card-stack";
import CurrencyTransfer from "@/components/lumenui/currency-transfer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Code, Copy, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative w-full bg-white dark:bg-black transition-colors duration-500">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.08]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* 1. HERO SECTION - Product Value Proposition */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 py-20 pt-32 lg:py-32">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-semibold font-montserrat text-4xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl max-w-5xl text-black dark:text-white"
          >
            Build faster with stunning UI components
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-3xl font-montserrat text-lg text-black/80 tracking-normal md:text-xl dark:text-white/70"
          >
            A growing collection of 43+ modern UI components built using Tailwind CSS,
            shadcn/ui, and Motion refined into the lightweight, accessible LumenUI library.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <SlideTextButton
              hoverText="Explore Components"
              href="/docs/components/action-search-bar"
            />

          </motion.div>
        </div>
      </section>

      {/* 2. FEATURE BLOCK - Technology Stack */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h2 className="mb-8 text-center font-montserrat text-2xl font-semibold text-black/70 dark:text-white/60">
            Built with modern technologies
          </h2>
          <FeatureBlock />
        </motion.div>
      </section>

      {/* 3. COMPONENT PREVIEW - Showcase */}
      <section
        id="components-preview"
        className="relative z-10 container mx-auto max-w-7xl px-4 py-20 lg:py-28"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center font-montserrat text-4xl font-semibold text-black dark:text-white"
        >
          Beautiful Components, Ready to Use
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Flip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/80 p-6 shadow-xl dark:border-zinc-800/50 dark:from-zinc-900/90 dark:to-black/90 hover:shadow-2xl transition-shadow"
          >
            <CardFlip />
          </motion.div>

          {/* AI Voice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-xl dark:border-zinc-800/50 dark:from-black/90 dark:to-zinc-900/90 hover:shadow-2xl transition-shadow"
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="flex h-[320px] w-full max-w-[280px] items-center justify-center">
                <AIVoice />
              </div>
            </div>
          </motion.div>

          {/* Payment Flow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/80 p-6 shadow-xl dark:border-zinc-800/50 dark:from-zinc-900/90 dark:to-black/90 hover:shadow-2xl transition-shadow"
          >
            <PaymentFlowCard />
          </motion.div>

          {/* Activity Card - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white via-zinc-50/50 to-white p-6 shadow-xl dark:border-zinc-800/50 dark:from-zinc-900/90 dark:via-black/90 dark:to-zinc-900/90 hover:shadow-2xl transition-shadow"
          >
            <ActivityCard />
          </motion.div>

          {/* Currency Transfer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-xl dark:border-zinc-800/50 dark:from-black/90 dark:to-zinc-900/90 hover:shadow-2xl transition-shadow"
          >
            <CurrencyTransfer />
          </motion.div>

          {/* File Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="md:col-span-2 relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-white to-zinc-50/80 p-6 shadow-xl dark:border-zinc-800/50 dark:from-zinc-900/90 dark:to-black/90 hover:shadow-2xl transition-shadow"
          >
            <FileUpload />
          </motion.div>

          {/* AI Loading State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative overflow-hidden rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-zinc-50 to-white p-6 shadow-xl dark:border-zinc-800/50 dark:from-black/90 dark:to-zinc-900/90 hover:shadow-2xl transition-shadow flex items-center justify-center min-h-[200px]"
          >
            <AILoadingState />
          </motion.div>
        </div>
      </section>

      {/* 4. HOW IT WORKS - Step-by-step guide */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 py-20 lg:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center font-montserrat text-4xl font-semibold text-black dark:text-white"
        >
          How It Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-xl border border-zinc-200/50 bg-white/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800/50 dark:bg-black/40 dark:hover:bg-zinc-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 mb-6">
              <Code className="h-6 w-6" />
            </div>
            <h3 className="font-montserrat text-2xl font-semibold text-black dark:text-white mb-4">
              1. Browse Components
            </h3>
            <p className="font-montserrat text-base text-black/70 dark:text-white/60">
              Explore our extensive library of 43+ beautifully crafted components. Each component is designed with accessibility and performance in mind.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-xl border border-zinc-200/50 bg-white/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800/50 dark:bg-black/40 dark:hover:bg-zinc-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 mb-6">
              <Copy className="h-6 w-6" />
            </div>
            <h3 className="font-montserrat text-2xl font-semibold text-black dark:text-white mb-4">
              2. Copy & Paste
            </h3>
            <p className="font-montserrat text-base text-black/70 dark:text-white/60">
              Simply copy the component code from our documentation and paste it directly into your project. No complex installation required.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-xl border border-zinc-200/50 bg-white/50 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl dark:border-zinc-800/50 dark:bg-black/40 dark:hover:bg-zinc-900/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 mb-6">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-montserrat text-2xl font-semibold text-black dark:text-white mb-4">
              3. Customize & Ship
            </h3>
            <p className="font-montserrat text-base text-black/70 dark:text-white/60">
              Customize the components to match your brand using Tailwind CSS classes. Then ship your product faster than ever before.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA SECTION - Call to Action */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 p-12 md:p-20 shadow-2xl text-center"
        >
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="2" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pattern)" />
            </svg>
          </div>

          <div className="relative z-10">
            <h2 className="font-montserrat text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-montserrat">
              Copy, paste, and customize beautiful components to ship your product faster. No complex setup required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <SlideTextButton
                hoverText="Get Started Now"
                href="/docs"
                className="bg-white text-purple-700 hover:bg-zinc-100 dark:bg-white dark:text-purple-700 dark:hover:bg-zinc-100"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. FAQ SECTION - Frequently Asked Questions */}
      <section className="relative z-10 container mx-auto max-w-7xl px-4 py-20 lg:py-28">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center font-montserrat text-4xl font-semibold text-black dark:text-white"
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
            <AccordionItem
              value="item-1"
              className="rounded-xl border border-zinc-200/50 bg-white/50 px-6 dark:border-zinc-800/50 dark:bg-black/40"
            >
              <AccordionTrigger className="font-montserrat text-lg font-medium text-black dark:text-white hover:no-underline py-6">
                Is LumenUI free to use?
              </AccordionTrigger>
              <AccordionContent className="font-montserrat text-base text-black/70 dark:text-white/60 pb-6">
                Yes! LumenUI is completely free and open-source. You can use it in personal and commercial projects without any restrictions. We believe in making beautiful UI accessible to everyone.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="rounded-xl border border-zinc-200/50 bg-white/50 px-6 dark:border-zinc-800/50 dark:bg-black/40"
            >
              <AccordionTrigger className="font-montserrat text-lg font-medium text-black dark:text-white hover:no-underline py-6">
                Do I need to install LumenUI as an npm package?
              </AccordionTrigger>
              <AccordionContent className="font-montserrat text-base text-black/70 dark:text-white/60 pb-6">
                No, LumenUI is not a traditional npm package. It's a collection of copy-paste components. You simply copy the component code you need and paste it into your project, giving you full control over the code.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="rounded-xl border border-zinc-200/50 bg-white/50 px-6 dark:border-zinc-800/50 dark:bg-black/40"
            >
              <AccordionTrigger className="font-montserrat text-lg font-medium text-black dark:text-white hover:no-underline py-6">
                What technologies does LumenUI use?
              </AccordionTrigger>
              <AccordionContent className="font-montserrat text-base text-black/70 dark:text-white/60 pb-6">
                LumenUI is built with React, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion. These modern technologies ensure your components are performant, accessible, and easy to customize.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="rounded-xl border border-zinc-200/50 bg-white/50 px-6 dark:border-zinc-800/50 dark:bg-black/40"
            >
              <AccordionTrigger className="font-montserrat text-lg font-medium text-black dark:text-white hover:no-underline py-6">
                Can I customize the components?
              </AccordionTrigger>
              <AccordionContent className="font-montserrat text-base text-black/70 dark:text-white/60 pb-6">
                Absolutely! Since you own the code, you have complete freedom to customize every aspect of the components. Modify colors, animations, layouts, and functionality to perfectly match your design system.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="rounded-xl border border-zinc-200/50 bg-white/50 px-6 dark:border-zinc-800/50 dark:bg-black/40"
            >
              <AccordionTrigger className="font-montserrat text-lg font-medium text-black dark:text-white hover:no-underline py-6">
                Are the components accessible?
              </AccordionTrigger>
              <AccordionContent className="font-montserrat text-base text-black/70 dark:text-white/60 pb-6">
                Yes! We prioritize accessibility in all our components. Built on top of shadcn/ui primitives, our components follow WCAG guidelines and include proper ARIA attributes, keyboard navigation, and screen reader support.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </section>
    </div>
  );
}

export default HeroSection;


