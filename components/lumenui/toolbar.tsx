"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
    Layers,
    SlidersHorizontal,
    FileDown,
    Share2,
    Bell,
    CircleUserRound,
    Palette,
    MousePointer2,
    Move,
    Shapes,
    Frame,
    type LucideIcon,
    Edit2,
    Lock,
} from "lucide-react";

interface ToolbarItem {
    id: string;
    title: string;
    icon: LucideIcon;
    type?: never;
}

interface ToolbarProps {
    className?: string;
    activeColor?: string; // Tailwind text/color class or custom
    onSearch?: (value: string) => void;
}

const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
    },
    animate: (isSelected: boolean) => ({
        gap: isSelected ? 6 : 0,
        paddingLeft: isSelected ? "0.9rem" : ".5rem",
        paddingRight: isSelected ? "0.9rem" : ".5rem",
    }),
};

const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
};

const notificationVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: -6 },
    exit: { opacity: 0, y: -18 },
};

const lineVariants = {
    initial: { scaleX: 0, x: "-50%" },
    animate: {
        scaleX: 1,
        x: "0%",
        transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
        scaleX: 0,
        x: "50%",
        transition: { duration: 0.2, ease: "easeIn" },
    },
};

const transition = { type: "spring", bounce: 0, duration: 0.35 };

export function Toolbar({
    className,
    activeColor = "text-[#1F9CFE]",
    onSearch,
}: ToolbarProps) {
    const [selected, setSelected] = React.useState<string | null>("select");
    const [isToggled, setIsToggled] = React.useState(false);
    const [activeNotification, setActiveNotification] = React.useState<
        string | null
    >(null);
    const [searchValue, setSearchValue] = React.useState("");

    const toolbarItems: ToolbarItem[] = [
        { id: "select", title: "Select", icon: MousePointer2 },
        { id: "move", title: "Move", icon: Move },
        { id: "shapes", title: "Shapes", icon: Shapes },
        { id: "layers", title: "Layers", icon: Layers },
        { id: "frame", title: "Frame", icon: Frame },
        { id: "properties", title: "Properties", icon: SlidersHorizontal },
        { id: "export", title: "Export", icon: FileDown },
        { id: "share", title: "Share", icon: Share2 },
        { id: "notifications", title: "Notifications", icon: Bell },
        { id: "profile", title: "Profile", icon: CircleUserRound },
        { id: "appearance", title: "Appearance", icon: Palette },
    ];

    const handleItemClick = (itemId: string) => {
        setSelected(selected === itemId ? null : itemId);
        setActiveNotification(itemId);
        const timeout = setTimeout(() => setActiveNotification(null), 1400);
        return () => clearTimeout(timeout);
    };

    const handleSearchChange = (value: string) => {
        setSearchValue(value);
        onSearch?.(value);
    };

    const selectedItemTitle =
        activeNotification &&
        toolbarItems.find((item) => item.id === activeNotification)?.title;

    const activeColorClasses = cn(activeColor); // tailwind class passthrough

    return (
        <div className={cn("space-y-2", className)}>
            <div
                className={cn(
                    "relative flex items-center justify-between gap-3 px-3 py-2",
                    "rounded-2xl border bg-background/80 shadow-sm backdrop-blur-xl",
                    "dark:border-border/60"
                )}
            >
                {/* Floating notification */}
                <AnimatePresence>
                    {activeNotification && selectedItemTitle && (
                        <motion.div
                            variants={notificationVariants as any}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.25 }}
                            className="absolute -top-7 left-1/2 z-40 -translate-x-1/2"
                        >
                            <div className="relative rounded-full bg-foreground text-background px-3 py-1 text-[11px] font-medium shadow-md">
                                {selectedItemTitle} clicked!
                                <motion.div
                                    variants={lineVariants as any}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="absolute -bottom-1 left-1/2 h-[2px] w-full origin-left bg-foreground/80"
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* LEFT: Tool buttons */}
                <div className="flex flex-1 items-center gap-1 overflow-x-auto scrollbar-none">
                    <div className="inline-flex items-center gap-1 rounded-xl border border-border/70 bg-background/80 px-1 py-1 shadow-xs backdrop-blur">
                        {toolbarItems.map((item) => {
                            const isSelected = selected === item.id;
                            const Icon = item.icon;

                            return (
                                <motion.button
                                    key={item.id}
                                    type="button"
                                    variants={buttonVariants as any}
                                    initial="initial"
                                    animate="animate"
                                    custom={isSelected}
                                    transition={transition as any}
                                    onClick={() => handleItemClick(item.id)}
                                    className={cn(
                                        "relative inline-flex items-center rounded-lg text-xs font-medium",
                                        "h-8 select-none whitespace-nowrap",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                                        isSelected
                                            ? [
                                                  "bg-foreground text-background shadow-sm",
                                                  "px-4",
                                              ]
                                            : [
                                                  "bg-transparent text-muted-foreground",
                                                  "hover:bg-muted hover:text-foreground",
                                                  "px-2.5",
                                              ]
                                    )}
                                    aria-pressed={isSelected}
                                >
                                    <Icon
                                        size={16}
                                        className={cn(
                                            "shrink-0",
                                            isSelected
                                                ? "text-background"
                                                : activeColorClasses
                                        )}
                                    />
                                    <AnimatePresence initial={false}>
                                        {isSelected && (
                                            <motion.span
                                                variants={spanVariants as any}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                                transition={transition as any}
                                                className="overflow-hidden"
                                            >
                                                <span className="ml-1.5">
                                                    {item.title}
                                                </span>
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT: Mode toggle + search */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setIsToggled((prev) => !prev)}
                        type="button"
                        className={cn(
                            "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium",
                            "transition-all duration-200 shadow-xs",
                            isToggled
                                ? [
                                      "bg-foreground text-background",
                                      "border-foreground/80",
                                  ]
                                : [
                                      "bg-background text-muted-foreground",
                                      "border-border/60",
                                      "hover:bg-muted hover:text-foreground",
                                  ]
                        )}
                    >
                        {isToggled ? (
                            <Edit2 className="h-3.5 w-3.5" />
                        ) : (
                            <Lock className="h-3.5 w-3.5" />
                        )}
                        <span>{isToggled ? "Editing" : "Locked"}</span>
                    </motion.button>

                    {/* Search (optional usage via onSearch) */}
                    <div className="hidden sm:flex h-8 items-center rounded-xl border border-border/60 bg-muted/60 px-2 text-xs text-muted-foreground focus-within:border-foreground/50 focus-within:bg-background/80 focus-within:text-foreground transition-all duration-150">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) =>
                                handleSearchChange(e.target.value)
                            }
                            placeholder="Search tools"
                            className="h-full w-[120px] bg-transparent text-[11px] outline-none placeholder:text-muted-foreground/70"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Toolbar;
