"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const stackItems = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
];

const TechStackText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= stackItems.length) {
          clearInterval(interval);
          setIsAnimating(false);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 550); // slower cycle for smoother feel

    return () => clearInterval(interval);
  }, [isAnimating]);

  const textVariants = {
    hidden: { y: 10, opacity: 0, filter: "blur(4px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" },
    exit: { y: -10, opacity: 0, filter: "blur(4px)" },
  };

  return (
    <section
      className="flex min-h-[200px] items-center justify-center gap-1 p-4"
      aria-label=""
    >
      <div className="relative h-16 w-72 flex items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="absolute flex items-center gap-2 font-montserrat font-semibold text-3xl text-gray-800 dark:text-gray-200"
              aria-live="off"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={textVariants}
              transition={{ duration: 0.35, ease: [0.22, 0.68, 0.18, 0.99] }}
            >
              <div
                className="h-2 w-2 rounded-full bg-black dark:bg-white"
                aria-hidden="true"
              />
              {stackItems[currentIndex]}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex items-center gap-2 text-3xl font-montserrat font-semibold text-gray-800 dark:text-gray-200">
            <div
              className="h-2 w-2 rounded-full bg-black dark:bg-white"
              aria-hidden="true"
            />
            {stackItems[currentIndex]}
          </div>
        )}
      </div>
    </section>
  );
};

export default TechStackText;
