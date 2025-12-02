"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import {
  Search,
  Send,
  Sparkles,
  Command,
  MousePointer2,
  Zap,
  Keyboard,
} from "lucide-react";

type Action = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string;
  shortcut?: string;
  meta?: string;
};

const DEFAULT_ACTIONS: Action[] = [
  {
    id: "book-tickets",
    label: "Book tickets",
    icon: <MousePointer2 className="h-4 w-4 text-blue-500" />,
    description: "Operator",
    badge: "Agent",
    shortcut: "⌘K",
  },
  {
    id: "summarize",
    label: "Summarize",
    icon: <Zap className="h-4 w-4 text-yellow-500" />,
    description: "gpt-5",
    badge: "Command",
    shortcut: "⌘⇧S",
  },
  {
    id: "screen-studio",
    label: "Screen Studio",
    icon: <Sparkles className="h-4 w-4 text-purple-500" />,
    description: "Claude 4.1",
    badge: "Application",
  },
  {
    id: "talk-jarvis",
    label: "Talk to Jarvis",
    icon: <Keyboard className="h-4 w-4 text-emerald-500" />,
    description: "Voice assistant",
    badge: "Active",
  },
];

const VARIANTS = {
  list: {
    hidden: { opacity: 0, y: 4, height: 0 },
    show: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: 0.18,
        when: "beforeChildren",
        staggerChildren: 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: 2,
      height: 0,
      transition: { duration: 0.16 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.18 },
    },
    exit: {
      opacity: 0,
      y: -6,
      transition: { duration: 0.15 },
    },
  },
} as const;

function useDebouncedValue<T>(value: T, delay = 200) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

interface ActionSearchBarProps {
  actions?: Action[];
  placeholder?: string;
  defaultOpen?: boolean;
  label?: string;
}

const ActionSearchBar = ({
  actions = DEFAULT_ACTIONS,
  placeholder = "What do you want to do?",
  defaultOpen = false,
  label = "Command Palette",
}: ActionSearchBarProps) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);

  const debouncedQuery = useDebouncedValue(query, 180);

  const filteredActions = useMemo(() => {
    if (!debouncedQuery.trim()) return actions;
    const q = debouncedQuery.toLowerCase();
    return actions.filter((a) =>
      `${a.label} ${a.description ?? ""} ${a.meta ?? ""}`
        .toLowerCase()
        .includes(q),
    );
  }, [actions, debouncedQuery]);

  const hasResults = filteredActions.length > 0;
  const isOpen = focused && hasResults && !selectedAction;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setActiveIndex(-1);
      setSelectedAction(null);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!hasResults) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev < filteredActions.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredActions.length - 1,
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (activeIndex >= 0 && filteredActions[activeIndex]) {
          setSelectedAction(filteredActions[activeIndex]);
        }
      } else if (e.key === "Escape") {
        setFocused(false);
        setActiveIndex(-1);
      }
    },
    [filteredActions, activeIndex, hasResults],
  );

  const handleActionClick = useCallback((action: Action) => {
    setSelectedAction(action);
  }, []);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      setFocused(false);
      setActiveIndex(-1);
    }, 120);
  }, []);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setSelectedAction(null);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-gradient-to-b from-background/80 to-background/40 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{label}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 rounded-full border border-border/70 px-2 py-0.5 text-[10px] text-muted-foreground">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </div>

        <div className="relative">
          <Input
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className="h-10 rounded-xl pl-9 pr-9 text-sm bg-background/80 border-border focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <div className="pointer-events-none absolute left-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center">
            <AnimatePresence mode="popLayout">
              {query.length === 0 ? (
                <motion.div
                  key="search"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="send"
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Send className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative mt-1">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="overflow-hidden rounded-xl border border-border/80 bg-popover/95 shadow-lg backdrop-blur-sm"
                variants={VARIANTS.list}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.ul role="listbox" className="max-h-64 overflow-y-auto">
                  {filteredActions.map((action, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <motion.li
                        key={action.id}
                        variants={VARIANTS.item}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleActionClick(action)}
                        className={[
                          "flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent/60",
                        ].join(" ")}
                        role="option"
                        aria-selected={isActive}
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/60">
                            {action.icon}
                          </span>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {action.label}
                            </span>
                            {action.description && (
                              <span className="text-xs text-muted-foreground">
                                {action.description}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {action.badge && (
                            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                              {action.badge}
                            </span>
                          )}
                          {action.shortcut && (
                            <span className="rounded-md border border-border/70 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {action.shortcut}
                            </span>
                          )}
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <div className="flex items-center justify-between border-t border-border/70 bg-background/80 px-3 py-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Keyboard className="h-3.5 w-3.5" />
                    Use ↑ ↓ to navigate, Enter to run
                  </span>
                  <span>ESC to close</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {selectedAction && (
            <motion.div
              className="mt-2 flex items-center justify-between rounded-lg border border-border/70 bg-background/80 px-3 py-2 text-xs text-muted-foreground"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted/70">
                  {selectedAction.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">
                    {selectedAction.label}
                  </span>
                  {selectedAction.description && (
                    <span>{selectedAction.description}</span>
                  )}
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Action ready
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionSearchBar;
