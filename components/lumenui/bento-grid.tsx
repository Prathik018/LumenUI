"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import Anthropic from "@/components/icons/anthropic";
import AnthropicDark from "@/components/icons/anthropic-dark";
import Google from "@/components/icons/gemini";
import OpenAI from "@/components/icons/open-ai";
import OpenAIDark from "@/components/icons/open-ai-dark";
import MistralAI from "@/components/icons/mistral";
import DeepSeek from "@/components/icons/deepseek";

import {
    ArrowUpRight,
    Clock,
    Mic,
    Sparkles,
    Zap,
    Plus,
} from "lucide-react";


const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
} as const;

const cardVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1] as const,
        },
    },
} as const;


function ProvidersRow() {
    const providers: Array<{
        name: string;
        light: React.ReactElement;
        dark: React.ReactElement | null;
    }> = [
            {
                name: "OpenAI",
                light: <OpenAI className="h-5 w-5 dark:hidden" />,
                dark: <OpenAIDark className="h-5 w-5 hidden dark:block" />,
            },
            {
                name: "Anthropic",
                light: <Anthropic className="h-5 w-5 dark:hidden" />,
                dark: <AnthropicDark className="h-5 w-5 hidden dark:block" />,
            },
            {
                name: "Google",
                light: <Google className="h-5 w-5" />,
                dark: null,
            },
            {
                name: "Mistral",
                light: <MistralAI className="h-5 w-5" />,
                dark: null,
            },
            {
                name: "DeepSeek",
                light: <DeepSeek className="h-5 w-5" />,
                dark: null,
            },
        ];

    return (
        <div className="flex flex-wrap items-center gap-3">
            {providers.map((p) => (
                <div
                    key={p.name}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 bg-neutral-50/80 px-3 py-1.5 text-[11px] font-medium text-neutral-700 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/80 dark:text-neutral-200"
                >
                    <div className="flex items-center justify-center">
                        {p.light}
                        {p.dark}
                    </div>
                    <span>{p.name}</span>
                </div>
            ))}
            <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-neutral-200/80 bg-transparent px-3 py-1.5 text-[11px] font-medium text-neutral-500 dark:border-neutral-800/80 dark:text-neutral-400">
                <Plus className="h-3.5 w-3.5" /> Connect more
            </div>
        </div>
    );
}

function MetricRow({
    label,
    value,
    suffix,
    accent,
}: {
    label: string;
    value: string;
    suffix?: string;
    accent?: "green" | "blue" | "amber";
}) {
    const colorMap: Record<string, string> = {
        green: "bg-emerald-500/80",
        blue: "bg-sky-500/80",
        amber: "bg-amber-500/80",
    };

    return (
        <div className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                <span
                    className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        accent ? colorMap[accent] : "bg-neutral-400/70"
                    )}
                />
                <span>{label}</span>
            </div>
            <div className="flex items-baseline gap-1 font-medium text-neutral-900 dark:text-neutral-100">
                <span>{value}</span>
                {suffix && (
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
}

function ActivityList() {
    const items = [
        {
            id: 1,
            label: "Deployed new agent: pricing-optimizer",
            time: "2 min ago",
            badge: "Production",
        },
        {
            id: 2,
            label: "Fine-tuned: support-classifier-v2",
            time: "14 min ago",
            badge: "Training",
        },
        {
            id: 3,
            label: "Connected new MCP: postgres-cluster-eu",
            time: "32 min ago",
            badge: "Infra",
        },
    ];

    return (
        <div className="mt-3 space-y-2">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="rounded-lg border border-neutral-200/70 bg-neutral-50/70 px-3 py-2 text-xs text-neutral-700 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/60 dark:text-neutral-200"
                >
                    <div className="flex items-center justify-between gap-3">
                        <span className="line-clamp-1">{item.label}</span>
                        <span className="rounded-full bg-neutral-900 text-[9px] font-medium uppercase tracking-[0.12em] text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 px-1.5 py-0.5">
                            {item.badge}
                        </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-400">
                        <Clock className="h-3 w-3" />
                        <span>{item.time}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

function VoiceWidget() {
    const [listening, setListening] = useState(false);
    const [time, setTime] = useState(0);
    const [demo, setDemo] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        if (listening) {
            timer = setInterval(() => {
                setTime((t) => t + 1);
            }, 1000);
        } else {
            setTime(0);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [listening]);

    useEffect(() => {
        if (!demo) return;
        let loop: NodeJS.Timeout | undefined;
        const run = () => {
            setListening(true);
            loop = setTimeout(() => {
                setListening(false);
                loop = setTimeout(run, 1400);
            }, 2600);
        };
        const first = setTimeout(run, 200);
        return () => {
            clearTimeout(first);
            if (loop) clearTimeout(loop);
        };
    }, [demo]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] font-semibold text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                        AI
                    </span>
                    Voice console
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    <Sparkles className="h-3 w-3" />
                    Beta
                </span>
            </div>

            <div className="mt-1 flex items-center gap-3 rounded-xl border border-neutral-200/70 bg-neutral-50/70 px-3 py-2.5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/70">
                <button
                    type="button"
                    onClick={() => {
                        if (demo) {
                            setDemo(false);
                            setListening(false);
                        } else {
                            setListening((prev) => !prev);
                        }
                    }}
                    className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-full border text-neutral-900 dark:text-neutral-100 transition-all",
                        listening
                            ? "border-emerald-400 bg-emerald-50 dark:border-emerald-500/70 dark:bg-emerald-900/40"
                            : "border-neutral-200 bg-white/80 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 hover:dark:bg-neutral-800"
                    )}
                >
                    {listening ? (
                        <div className="relative flex h-5 w-5 items-center justify-center">
                            <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                        </div>
                    ) : (
                        <Mic className="h-5 w-5" />
                    )}
                </button>
                <div className="flex-1 space-y-1">
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-300 line-clamp-1">
                        {listening
                            ? "Listening… describe the workflow you want to automate."
                            : "Tap the mic and speak to your agent in natural language."}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 dark:text-neutral-500">
                        <span>{formatTime(time)}</span>
                        <span className="inline-flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            Low-latency mode
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-1 flex h-5 w-full items-center justify-center gap-[2px]">
                {Array.from({ length: 36 }).map((_, i) => {
                    const height = listening
                        ? `${20 + Math.random() * 70}%`
                        : "18%";
                    return (
                        <span
                            key={i}
                            className={cn(
                                "w-[2px] rounded-full bg-neutral-200 dark:bg-neutral-700 transition-all duration-200",
                                listening &&
                                "bg-emerald-400/80 dark:bg-emerald-300/80"
                            )}
                            style={{
                                height,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}




export default function BentoGrid() {
    return (
        <section className="relative bg-white py-16 text-neutral-900 dark:bg-black dark:text-neutral-50 sm:py-24">
            {/* Soft background glow */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_70%)] dark:bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.28),_transparent_75%)]" />

            <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
                {/* Header row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <p className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-neutral-900 text-[9px] text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                                AI
                            </span>
                            Lumen Orchestration Layer
                        </p>
                        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                            One surface for models, agents, and voice-native
                            workflows.
                        </h1>
                        <p className="max-w-xl text-sm text-neutral-600 dark:text-neutral-400">
                            Ship production AI systems faster with unified
                            routing, observability, and multi-provider
                            orchestration—built for real teams, not demos.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950 px-2 py-1 text-[10px] font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                            <Sparkles className="h-3 w-3" />
                            Multi-provider ready
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200/70 px-2 py-1 dark:border-neutral-800/70">
                            <Clock className="h-3 w-3" />
                            <span>Avg integration time: &lt; 2 days</span>
                        </span>
                    </div>
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
                >
                    {/* Left column: Hero + providers */}
                    <motion.div
                        variants={cardVariants}
                        className="flex flex-col gap-5"
                    >
                        {/* Primary “hero” card */}
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            className="relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-gradient-to-br from-neutral-50 via-neutral-50 to-neutral-100/60 p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] dark:border-neutral-800/70 dark:bg-gradient-to-br dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-900 dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]"
                        >
                            <div className="pointer-events-none absolute -right-10 top-[-40px] h-40 w-40 rounded-full bg-[conic-gradient(from_180deg,_rgba(94,234,212,0.1)_0deg,_transparent_120deg,_rgba(56,189,248,0.16)_240deg,_transparent_360deg)] blur-2xl" />
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                                            Control plane
                                        </p>
                                        <h2 className="mt-1 text-lg font-semibold tracking-tight">
                                            Route any request to the best
                                            model, safely.
                                        </h2>
                                    </div>
                                    <Link
                                        href="#"
                                        className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1.5 text-[11px] font-medium text-neutral-50 shadow-sm transition hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200"
                                    >
                                        View playbook
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>
                                <p className="max-w-xl text-xs text-neutral-600 dark:text-neutral-400">
                                    Define routing rules once, experiment with
                                    providers freely, and keep latency,
                                    quality, and cost in a single pane of
                                    glass.
                                </p>
                                <div className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
                                    <div className="space-y-1.5 rounded-xl border border-neutral-200/70 bg-white/70 px-3 py-2.5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/80">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                                Median latency
                                            </span>
                                            <Zap className="h-3 w-3 text-emerald-500" />
                                        </div>
                                        <div className="mt-1 text-sm font-semibold">
                                            542 ms
                                        </div>
                                        <div className="mt-0.5 text-[10px] text-neutral-400">
                                            &lt; 1s for 94% requests
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 rounded-xl border border-neutral-200/70 bg-white/70 px-3 py-2.5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/80">
                                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                            Success rate (last 24h)
                                        </span>
                                        <div className="mt-1 flex items-baseline gap-1">
                                            <span className="text-sm font-semibold">
                                                99.7%
                                            </span>
                                            <span className="text-[10px] text-emerald-500">
                                                +0.6%
                                            </span>
                                        </div>
                                        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200/80 dark:bg-neutral-800">
                                            <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 rounded-xl border border-neutral-200/70 bg-white/70 px-3 py-2.5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/80">
                                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                                            Cost savings
                                        </span>
                                        <div className="mt-1 text-sm font-semibold">
                                            38%
                                        </div>
                                        <div className="mt-0.5 text-[10px] text-neutral-400">
                                            vs single-provider baseline
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Providers card */}
                        <motion.div
                            variants={cardVariants}
                            whileHover={{ y: -3 }}
                            className="rounded-2xl border border-neutral-200/70 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-neutral-800/70 dark:bg-neutral-950/80 dark:shadow-[0_14px_40px_rgba(0,0,0,0.8)]"
                        >
                            <div className="mb-3 flex items-center justify-between gap-2 text-xs">
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                                        Connected providers
                                    </p>
                                    <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                                        Mix and match foundation and
                                        open-source models.
                                    </p>
                                </div>
                                <span className="rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                                    5 active · 2 pending
                                </span>
                            </div>
                            <ProvidersRow />
                        </motion.div>
                    </motion.div>

                    {/* Right column: metrics + voice + activity */}
                    <motion.div
                        variants={cardVariants}
                        className="grid gap-5 md:grid-cols-2 lg:grid-cols-1"
                    >
                        {/* Metrics card */}
                        <motion.div
                            whileHover={{ y: -3 }}
                            className="rounded-2xl border border-neutral-200/70 bg-neutral-50/90 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-neutral-800/70 dark:bg-neutral-950/80 dark:shadow-[0_14px_40px_rgba(0,0,0,0.8)]"
                        >
                            <div className="flex items-center justify-between text-xs">
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                                        Reliability
                                    </p>
                                    <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                                        Real-time health across all providers.
                                    </p>
                                </div>
                                <span className="rounded-full bg-neutral-900 px-2 py-1 text-[10px] font-medium text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900">
                                    SLO · 99.9%
                                </span>
                            </div>

                            <div className="mt-4 space-y-2.5">
                                <MetricRow
                                    label="Global uptime (30d)"
                                    value="99.96"
                                    suffix="%"
                                    accent="green"
                                />
                                <MetricRow
                                    label="Median p95 latency"
                                    value="1.21"
                                    suffix="s"
                                    accent="blue"
                                />
                                <MetricRow
                                    label="Token usage optimized"
                                    value="42"
                                    suffix="%"
                                    accent="amber"
                                />
                            </div>

                            <div className="mt-4 h-16 rounded-xl bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-violet-500/10 p-[1px]">
                                <div className="flex h-full items-center justify-between rounded-[10px] bg-white/80 px-3 text-[10px] text-neutral-500 shadow-sm dark:bg-neutral-950/90 dark:text-neutral-400">
                                    <span className="max-w-[60%]">
                                        Auto-rerouting kicks in when any region
                                        breaches latency or failure thresholds.
                                    </span>
                                    <span className="rounded-full border border-neutral-200/70 bg-neutral-50 px-2 py-1 font-medium dark:border-neutral-800/70 dark:bg-neutral-900">
                                        Safe by design
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Voice + Activity stacked */}
                        <div className="flex flex-col gap-5">
                            <motion.div
                                whileHover={{ y: -3 }}
                                className="rounded-2xl border border-neutral-200/70 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-neutral-800/70 dark:bg-neutral-950/85 dark:shadow-[0_14px_40px_rgba(0,0,0,0.8)]"
                            >
                                <VoiceWidget />
                            </motion.div>

                            <motion.div
                                whileHover={{ y: -3 }}
                                className="rounded-2xl border border-neutral-200/70 bg-neutral-50/90 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-sm dark:border-neutral-800/70 dark:bg-neutral-950/80 dark:shadow-[0_14px_40px_rgba(0,0,0,0.8)]"
                            >
                                <div className="flex items-center justify-between text-xs">
                                    <div>
                                        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                                            Latest activity
                                        </p>
                                        <p className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-400">
                                            Everything your agents and tools are
                                            doing, in one stream.
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="rounded-full border border-neutral-200/70 bg-white px-2 py-1 text-[10px] font-medium text-neutral-600 shadow-sm transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
                                    >
                                        View logs
                                    </button>
                                </div>
                                <ActivityList />
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
