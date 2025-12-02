"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ChevronRight, User2, Sparkles } from "lucide-react";

interface ProfileSetupProps {
  onComplete?: (data: { username: string; avatarBg: string }) => void;
  className?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.3, 0, 0.2, 1],
    },
  },
};

const avatarPreviewVariants: Variants = {
  initial: { scale: 0.9, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const colorBubbleVariants: Variants = {
  initial: { opacity: 0, y: 6, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
};

type AvatarBgOption = {
  id: string;
  label: string;
  ringClass: string;
  innerClass: string;
};

// 4–5 color options for avatar background
const avatarBgOptions: AvatarBgOption[] = [
  {
    id: "blue",
    label: "Blue",
    ringClass: "from-sky-500/50 via-sky-400/30 to-sky-500/0",
    innerClass: "bg-gradient-to-br from-sky-500 via-sky-400 to-sky-600",
  },
  {
    id: "purple",
    label: "Purple",
    ringClass: "from-violet-500/50 via-violet-400/30 to-violet-500/0",
    innerClass: "bg-gradient-to-br from-violet-500 via-violet-400 to-fuchsia-500",
  },
  {
    id: "green",
    label: "Green",
    ringClass: "from-emerald-500/50 via-emerald-400/30 to-emerald-500/0",
    innerClass: "bg-gradient-to-br from-emerald-500 via-emerald-400 to-emerald-600",
  },
  {
    id: "orange",
    label: "Orange",
    ringClass: "from-orange-500/50 via-orange-400/30 to-orange-500/0",
    innerClass: "bg-gradient-to-br from-orange-500 via-amber-400 to-orange-600",
  },
  {
    id: "pink",
    label: "Pink",
    ringClass: "from-rose-500/50 via-rose-400/30 to-rose-500/0",
    innerClass: "bg-gradient-to-br from-rose-500 via-pink-400 to-rose-600",
  },
];

export default function ProfileSetup({ onComplete, className }: ProfileSetupProps) {
  const [selectedBg, setSelectedBg] = useState<AvatarBgOption>(
    avatarBgOptions[0]
  );
  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isValid = username.trim().length >= 3;
  const showError = username.trim().length > 0 && username.trim().length < 3;

  const handleSubmit = () => {
    if (!isValid || !onComplete) return;
    onComplete({
      username: username.trim(),
      avatarBg: selectedBg.id,
    });
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className={cn("relative w-full max-w-[460px] mx-auto", className)}
    >
      <Card className="relative overflow-hidden border border-border/80 bg-gradient-to-b from-background/95 via-background/80 to-background/60 backdrop-blur-xl shadow-xl shadow-primary/10">
        {/* Top accent line */}
        <div className="pointer-events-none absolute inset-x-0 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        {/* Soft background glows */}
        <div className="pointer-events-none absolute -top-24 right-[-40px] h-40 w-40 rounded-full bg-primary/10 blur-3" />
        <div className="pointer-events-none absolute -bottom-24 left-[-40px] h-40 w-40 rounded-full bg-primary/10 blur-3" />

        <CardContent className="relative p-6 sm:p-7">
          <div className="flex flex-col gap-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-2.5 py-0.5 text-[11px] font-medium text-primary border border-primary/20">
                  <Sparkles className="h-3 w-3" />
                  <span>Profile setup</span>
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    Make it{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                      yours
                    </span>
                  </h2>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Choose a username and a color that sets the tone for your avatar.
                  </p>
                </div>
              </div>

              {/* Step indicator */}
              <div className="hidden sm:flex flex-col items-end gap-1 text-[11px] text-muted-foreground">
                <span className="font-medium tracking-tight">Step 1 of 2</span>
                <div className="flex gap-1.5 items-center">
                  <span className="h-1.5 w-7 rounded-full bg-primary" />
                  <span className="h-1.5 w-7 rounded-full bg-muted" />
                </div>
                <span className="text-[10px] text-muted-foreground/80">
                  You&apos;re almost there
                </span>
              </div>
            </div>

            {/* Main layout */}
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)] gap-6 items-center">
              {/* Avatar preview section */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground/80">
                    Avatar preview
                  </span>
                  <motion.div
                    className="relative h-24 w-24 sm:h-28 sm:w-28"
                    variants={avatarPreviewVariants}
                    initial="initial"
                    animate="animate"
                  >
                    {/* Outer ring glow based on selected color */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full bg-gradient-to-br opacity-90 blur-[2px]",
                        selectedBg.ringClass
                      )}
                    />
                    {/* Inner circle with solid gradient */}
                    <div
                      className={cn(
                        "absolute inset-[3px] rounded-full shadow-md shadow-black/20 flex items-center justify-center",
                        selectedBg.innerClass
                      )}
                    >
                      <User2 className="h-9 w-9 text-white/90" />
                    </div>
                  </motion.div>
                </div>
                <p className="text-[11px] text-muted-foreground text-center max-w-[170px]">
                  This is how your avatar will appear across the app.
                </p>
              </div>

              {/* Right side: color selection + username */}
              <div className="flex flex-col gap-4">
                {/* Color selector label row */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">Avatar background</span>
                  <span className="hidden sm:inline">
                    Pick a color that fits your vibe
                  </span>
                </div>

                {/* Color bubbles */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="initial"
                  animate="animate"
                >
                  {avatarBgOptions.map((option) => {
                    const isActive = option.id === selectedBg.id;

                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        variants={colorBubbleVariants}
                        whileHover={{ y: -1, scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedBg(option)}
                        className={cn(
                          "relative flex h-9 w-9 items-center justify-center rounded-full transition-all border",
                          isActive
                            ? "border-primary/70 ring-2 ring-primary/50"
                            : "border-border hover:border-primary/40"
                        )}
                        aria-label={option.label}
                        aria-pressed={isActive}
                      >
                        <div
                          className={cn(
                            "h-7 w-7 rounded-full bg-gradient-to-br",
                            option.innerClass
                          )}
                        />
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.7 }}
                              className="absolute -right-0.5 -bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-background text-primary shadow-sm"
                            >
                              <Check className="h-2.5 w-2.5" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Username input */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-medium">Username</span>
                    <span>{username.length}/20</span>
                  </div>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="e.g. lumen_creator"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      maxLength={20}
                      className={cn(
                        "pl-9 h-11 text-sm transition-all duration-150",
                        "bg-background/90 border-border focus-visible:ring-primary/30",
                        isFocused && "border-primary/60 shadow-sm shadow-primary/20",
                        showError &&
                          "border-destructive/60 focus-visible:ring-destructive/40"
                      )}
                    />
                    <User2
                      className={cn(
                        "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors",
                        isFocused || username
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <AnimatePresence>
                      {showError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-[11px] text-destructive pl-0.5"
                        >
                          Username must be at least 3 characters long.
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {!showError && (
                      <p className="ml-auto text-[11px] text-muted-foreground">
                        Tip: short, simple, and recognizable works best.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div className="pt-1">
              <div className="relative">
                <Button
                  className="group w-full h-11 text-sm font-medium relative overflow-hidden"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    Continue
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>

                  {/* Gradient hover overlay */}
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/25 to-primary/0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </Button>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground text-center">
                You can change this anytime from your profile settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
