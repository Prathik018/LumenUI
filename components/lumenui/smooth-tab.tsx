"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface TabItem {
    id: string;
    title: string;
    icon?: LucideIcon;
    content?: React.ReactNode;
    cardContent?: React.ReactNode;
    color: string;
}

interface SmoothTabProps {
    items?: TabItem[];
    defaultTabId?: string;
    className?: string;
    activeColor?: string;
    onChange?: (tabId: string) => void;
}




const DEFAULT_TABS: TabItem[] = [
    {
        id: "Models",
        title: "Models",
        color: "bg-sky-500",
        cardContent: (
            <PanelLayout
                label="Models"
                description="Pick the model profile that matches your latency, cost and quality needs."
                chips={["Auto-routing", "Low latency", "High context window"]}
            />
        ),
    },
    {
        id: "MCPs",
        title: "MCPs",
        color: "bg-violet-500",
        cardContent: (
            <PanelLayout
                label="MCPs"
                description="Securely connect tools, APIs and internal systems via MCP adapters."
                chips={["Secure connectors", "Scoped credentials", "Audit trail"]}
            />
        ),
    },
    {
        id: "Agents",
        title: "Agents",
        color: "bg-emerald-500",
        cardContent: (
            <PanelLayout
                label="Agents"
                description="Compose reusable agents with goals, skills and guardrails in one place."
                chips={["Multi-step tasks", "Guardrails", "Team handoff"]}
            />
        ),
    },
    {
        id: "Users",
        title: "Users",
        color: "bg-amber-500",
        cardContent: (
            <PanelLayout
                label="Users"
                description="Invite teammates, manage roles and control access to workspace features."
                chips={["RBAC", "SSO ready", "Per-workspace roles"]}
            />
        ),
    },
];



function PanelLayout({
    label,
    description,
    chips,
}: {
    label: string;
    description: string;
    chips: string[];
}) {
    return (
        <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-background via-background/95 to-background/90">
            {/* Soft gradient blobs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sky-500/10 blur-3xl" />
                <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />
            </div>

            {/* Corner lines */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute left-5 top-5 h-10 w-px bg-border/70" />
                <div className="absolute left-5 top-5 h-px w-10 bg-border/70" />
                <div className="absolute right-5 bottom-5 h-10 w-px bg-border/70" />
                <div className="absolute right-5 bottom-5 h-px w-10 bg-border/70" />
            </div>

            <div className="relative z-10 flex flex-1 flex-col gap-6 p-6">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
                        {description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-foreground/80">
                    {chips.map((chip) => (
                        <span
                            key={chip}
                            className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 backdrop-blur-sm"
                        >
                            <span className="size-1.5 rounded-full bg-foreground/70" />
                            {chip}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}


const panelVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 24 : -24,
        opacity: 0,
        filter: "blur(6px)",
        scale: 0.98,
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 24 : -24,
        opacity: 0,
        filter: "blur(6px)",
        scale: 0.98,
    }),
};

const panelTransition = {
    duration: 0.35,
    ease: [0.32, 0.72, 0, 1],
};



export default function SmoothTab({
    items = DEFAULT_TABS,
    defaultTabId = DEFAULT_TABS[0].id,
    className,
    activeColor = "bg-[#1F9CFE]",
    onChange,
}: SmoothTabProps) {
    const [selected, setSelected] = React.useState<string>(defaultTabId);
    const [direction, setDirection] = React.useState(0);

    const selectedIndex = items.findIndex((item) => item.id === selected);
    const selectedItem = items[selectedIndex] ?? items[0];

    const handleTabClick = (tabId: string) => {
        const currentIndex = items.findIndex((item) => item.id === selected);
        const newIndex = items.findIndex((item) => item.id === tabId);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setSelected(tabId);
        onChange?.(tabId);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLButtonElement>,
        tabId: string
    ) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTabClick(tabId);
        }
    };

    return (
        <div
            className={cn(
                "flex w-full max-w-4xl flex-col gap-4 rounded-3xl border border-border/70 bg-background/80 p-4 shadow-sm backdrop-blur-xl md:flex-row md:p-5",
                "dark:border-border/80 dark:bg-background/90",
                className
            )}
        >
            {/* LEFT: Vertical pill nav */}
            <div className="md:w-48 flex-shrink-0">
                <div className="relative flex w-full flex-row gap-1 rounded-2xl border border-border/70 bg-background/80 p-1 shadow-xs backdrop-blur-xl md:flex-col">
                    {items.map((item) => {
                        const isActive = item.id === selected;
                        const Icon = item.icon;
                        const tabColor = item.color || activeColor;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls={`panel-${item.id}`}
                                id={`tab-${item.id}`}
                                tabIndex={isActive ? 0 : -1}
                                onClick={() => handleTabClick(item.id)}
                                onKeyDown={(e) => handleKeyDown(e, item.id)}
                                className={cn(
                                    "group relative flex flex-1 items-center gap-2 rounded-xl px-3 py-2 text-left text-xs font-medium transition-all duration-200",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
                                    "md:flex-none",
                                    isActive
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="smooth-tab-pill"
                                        className={cn(
                                            "absolute inset-0 rounded-xl",
                                            tabColor
                                        )}
                                        style={{
                                            boxShadow:
                                                "0 10px 30px rgba(15,23,42,0.20)",
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 420,
                                            damping: 30,
                                        }}
                                    />
                                )}

                                <div className="relative z-10 flex items-center gap-2">
                                    {Icon && (
                                        <Icon
                                            className={cn(
                                                "h-3.5 w-3.5",
                                                isActive
                                                    ? "text-white"
                                                    : "text-muted-foreground"
                                            )}
                                        />
                                    )}
                                    <span
                                        className={cn(
                                            "truncate",
                                            isActive && "text-white"
                                        )}
                                    >
                                        {item.title}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: Panel area */}
            <div
                className="relative flex-1"
                role="tabpanel"
                id={`panel-${selectedItem.id}`}
                aria-labelledby={`tab-${selectedItem.id}`}
            >
                <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-border/70 bg-background/90 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    {/* subtle grid overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:28px_28px]" />
                    </div>

                    <AnimatePresence
                        initial={false}
                        mode="wait"
                        custom={direction}
                    >
                        <motion.div
                            key={selectedItem.id}
                            custom={direction}
                            variants={panelVariants as any}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={panelTransition as any}
                            className="absolute inset-0"
                        >
                            {selectedItem.cardContent ?? (
                                <PanelLayout
                                    label={selectedItem.title}
                                    description="Configure this section in your workspace settings."
                                    chips={["Configurable", "Workspace scoped"]}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
