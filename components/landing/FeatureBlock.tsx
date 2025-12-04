"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import Nextjs from "@/components/icons/nextjs";
import ReactIcon from "@/components/icons/react";
import ShadcnIcon from "@/components/icons/shadcn";

export default function Features() {
  return (
    <div className="w-full max-w-none flex justify-start items-center z-10 mx-auto overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-6 md:gap-8 w-max py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.1,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={cn(
            "text-blue-600 dark:text-blue-400 relative flex flex-col items-center gap-2"
          )}
        >
          <svg
            viewBox="0 0 54 33"
            className="w-8 h-8"
            aria-labelledby="tailwindcss-icon-title"
            role="img"
          >
            <title id="tailwindcss-icon-title">TailwindCSS</title>
            <g clipPath="url(#prefix__clip0)">
              <path
                fill="#38bdf8"
                fillRule="evenodd"
                d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
                clipRule="evenodd"
              />
            </g>
          </svg>
          <span className="text-xs text-center mt-1 whitespace-nowrap text-black dark:text-white">
            Tailwind CSS
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.4,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={cn(
            "text-yellow-500 dark:text-[#F5EA1E] relative flex flex-col items-center gap-2"
          )}
        >
          <Image
            src="/motion.png"
            alt="Motion"
            className="rounded-full"
            width={32}
            height={32}
          />
          <span className="text-xs text-center mt-1 whitespace-nowrap text-black dark:text-white">
            Motion
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.5,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={cn(
            "text-black dark:text-white flex flex-col items-center gap-2 relative"
          )}
        >
          <ShadcnIcon
            className="w-8 h-8 text-black dark:text-white"
            aria-label="Shadcn/ui"
          />
          <span className="text-xs text-center mt-1 whitespace-nowrap">
            shadcn/ui
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={cn(
            "text-black dark:text-white flex flex-col items-center gap-2 relative"
          )}
        >
          <Nextjs className="w-8 h-8" aria-label="Next.js" />
          <span className="text-xs text-center mt-1 whitespace-nowrap">
            Next.js
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: 0.7,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={cn(
            "text-black dark:text-white flex flex-col items-center gap-2 relative"
          )}
        >
          <ReactIcon className="w-8 h-8" aria-label="React" />
          <span className="text-xs text-center mt-1 whitespace-nowrap">
            React
          </span>
        </motion.div>
      </div>
    </div>
  );
}
