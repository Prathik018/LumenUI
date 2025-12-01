"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { Search, Send } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import { componentsList, Component } from "@/lib/components";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

const ANIMATION_VARIANTS = {
  backdrop: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 },
  },
  modal: {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.2 },
    },
  },
  container: {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: {
        height: { duration: 0.3 },
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.15 },
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  },
} as const;

export function ComponentSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debouncedQuery = useDebounce(query, 200);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredComponents = useMemo(() => {
    if (!debouncedQuery) return componentsList.slice(0, 8);

    const normalizedQuery = debouncedQuery.toLowerCase().trim();
    return componentsList
      .filter((component) => {
        const searchableText = `${component.name} ${component.category}`.toLowerCase();
        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [debouncedQuery]);

  useEffect(() => {
    if (!isFocused) {
      setActiveIndex(-1);
    }
  }, [isFocused]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!filteredComponents.length) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < filteredComponents.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredComponents.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && filteredComponents[activeIndex]) {
            handleComponentClick(filteredComponents[activeIndex]);
          }
          break;
        case "Escape":
          setIsFocused(false);
          setActiveIndex(-1);
          break;
      }
    },
    [filteredComponents, activeIndex]
  );

  const handleComponentClick = useCallback(
    (component: Component) => {
      router.push(`/docs/components/${component.slug}`);
      setQuery("");
      setIsFocused(false);
      setActiveIndex(-1);
    },
    [router]
  );

  const handleOpen = useCallback(() => {
    setIsFocused(true);
    setActiveIndex(-1);
  }, []);

  const handleClose = useCallback(() => {
    setIsFocused(false);
    setActiveIndex(-1);
  }, []);

  const searchModal = (
    <AnimatePresence>
      {isFocused && (
        <>
          <motion.div
            className="fixed inset-0 z-[999998] flex items-stretch justify-center"
            variants={ANIMATION_VARIANTS.backdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={handleClose}
            aria-hidden
          >
            {/* This inner div provides the theme-aware fade color */}
            <div className="w-full h-full transition-colors duration-300 bg-white/60 dark:bg-black/60" />
          </motion.div>

          {/* Modal container */}
          <div className="fixed inset-0 z-[999999] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
            <motion.div
              className="w-full max-w-lg pointer-events-auto"
              variants={ANIMATION_VARIANTS.modal}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="bg-white dark:bg-black rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search components..."
                      value={query}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      role="combobox"
                      aria-expanded={filteredComponents.length > 0}
                      aria-autocomplete="list"
                      aria-activedescendant={
                        activeIndex >= 0 ? `component-${filteredComponents[activeIndex]?.slug}` : undefined
                      }
                      autoComplete="off"
                      className="pl-9 pr-9 py-2 h-10 text-sm rounded-lg focus-visible:ring-offset-0 border-0 focus-visible:ring-2"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none">
                      <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none">
                      <AnimatePresence mode="popLayout">
                        {query.length > 0 ? (
                          <motion.div
                            key="send"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Send className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="search"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {filteredComponents.length > 0 && (
                    <motion.div variants={ANIMATION_VARIANTS.container} initial="hidden" animate="show" exit="exit">
                      <motion.ul role="listbox" aria-label="Search results" className="max-h-[50vh] overflow-auto custom-scroll">
                        {filteredComponents.map((component, index) => (
                          <motion.li
                            key={component.slug}
                            id={`component-${component.slug}`}
                            className={`px-3 py-2.5 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800 last:border-b-0 ${
                              activeIndex === index ? "bg-gray-100 dark:bg-zinc-800" : ""
                            }`}
                            variants={ANIMATION_VARIANTS.item}
                            onClick={() => handleComponentClick(component)}
                            role="option"
                            aria-selected={activeIndex === index}
                          >
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{component.name}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">{component.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-400 dark:text-gray-500">Component</span>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                      <div className="px-3 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900/50">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Use ↑↓ to navigate</span>
                          <span>ESC to cancel</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {query && filteredComponents.length === 0 && (
                  <div className="px-3 py-6 text-center text-sm text-gray-500">No components found for "{query}"</div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="w-full max-w-md relative">
        <div className="relative cursor-pointer" onClick={handleOpen}>
          <Input type="text" placeholder="Search components..." value="" readOnly className="pl-9 pr-9 py-1 h-8 text-sm rounded-lg cursor-pointer" />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      </div>

      {mounted && typeof document !== "undefined" && createPortal(searchModal, document.body)}
    </>
  );
}






